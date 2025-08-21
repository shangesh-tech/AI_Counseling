const express = require('express');
const bodyParser = require('body-parser');
const Groq = require('groq-sdk');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Initialize Groq SDK
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Tool definition for Groq
const tools = [
  {
    type: "function",
    function: {
      name: "get_top_nirf_colleges",
      description: "Fetch the top N colleges from NIRF 2025 rankings for a specific category (e.g., Engineering, Management, University), optionally filtered by state/location.",
      parameters: {
        type: "object",
        properties: {
          category: {
            type: "string",
            description: "The NIRF category (e.g., Engineering, Management, University)."
          },
          num: {
            type: "integer",
            description: "Number of top colleges to fetch (default 4)."
          },
          state: {
            type: "string",
            description: "Optional state/location to filter colleges (e.g., Tamil Nadu, Delhi)."
          }
        },
        required: ["category"]
      }
    }
  }
];

// Function to execute the tool
async function executeTool(toolCall) {
  const { name, arguments: args } = toolCall.function;
  const parsedArgs = JSON.parse(args);

  if (name === "get_top_nirf_colleges") {
    const category = parsedArgs.category;
    const num = parsedArgs.num || 4;
    const stateFilter = parsedArgs.state ? parsedArgs.state.toLowerCase() : null;
    const url = `https://www.nirfindia.org/Rankings/2025/${category}Ranking.html`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const html = await response.text();
      const $ = cheerio.load(html);

      const colleges = [];
      $('table tbody tr').each((i, row) => {
        if (colleges.length >= num) return false;
        const cells = $(row).find('td');
        if (cells.length >= 4) { // Adjust if needed; typically rank, name, city, state
          const rank = $(cells[0]).text().trim();
          const name = $(cells[1]).text().trim();
          const city = $(cells[2]).text().trim();
          const state = $(cells[3]).text().trim().toLowerCase(); // Assuming state is in cell 3
          if (rank && name && (!stateFilter || state.includes(stateFilter))) {
            colleges.push(`${rank}. ${name}, ${city}, ${state.charAt(0).toUpperCase() + state.slice(1)}`);
          }
        }
      });

      return `Top ${num} colleges in ${category} from NIRF 2025${stateFilter ? ` (filtered by ${parsedArgs.state})` : ''}:\n${colleges.join('\n')}`;
    } catch (error) {
      return `Error fetching NIRF data for ${category}: ${error.message}`;
    }
  }

  return "Tool not found.";
}

// POST /analysis route
app.post('/analysis', async (req, res) => {
  const { name, age, skills, knowledge, interests, passions, marks, exams, jobPreferences, location } = req.body;

  try {
    if (!skills || !interests || !exams || !jobPreferences) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const messages = [
      {
        role: "system",
        content: "You are a human-like AI counselor assistant. Provide a concise, well-structured, and in-depth report based on the student's details. Avoid repetition and focus on unique, data-driven insights including market trends, salary projections, and success rates. Suggest courses with pros/cons, eligibility thresholds, top future jobs with growth stats, and a detailed roadmap with step-by-step timelines and specific free/paid resources (include URLs). Use the get_top_nirf_colleges tool to fetch the top 4 NIRF-ranked colleges in India for the relevant category, filtered by the student's preferred location/state if provided. Personalize the report with motivational sentences addressing the student by name and age, making it encouraging and engaging. Output in clean markdown format (use ## for subheaders, ** for bold, * for italics, - for bullets, 1. for numbered lists, \n for new lines) suitable for PDF conversion, ensuring proper formatting without malformed characters."
      },
      {
        role: "user",
        content: `
          Student's details:
          - Name: ${name || 'Student'}
          - Age: ${age || 'Not specified'}
          - Skills: ${skills.join(', ')}
          - Knowledge: ${knowledge.join(', ')}
          - Interests: ${interests.join(', ')}
          - Passions: ${passions.join(', ')}
          - 12th Marks: ${marks}
          - Exams: SAT - ${exams.sat}, JEE - ${exams.jee}
          - Job Preferences: ${jobPreferences.join(', ')}
          - Preferred Location/State: ${location || 'Any (India-wide)'}

          Generate the report in structured markdown format for PDF, with deep analysis and personalized motivation.
        `
      }
    ];

    let reportContent = "";
    let maxIterations = 10;

    while (maxIterations > 0) {
      const completion = await groq.chat.completions.create({
        messages,
        model: 'llama-3.3-70b-versatile',
        tools,
        tool_choice: "auto",
        temperature: 0.7,
        max_tokens: 4096
      });

      const message = completion.choices[0].message;

      if (message.content) {
        reportContent += message.content + '\n';
      }

      if (message.tool_calls) {
        messages.push(message);

        for (const toolCall of message.tool_calls) {
          const toolResponse = await executeTool(toolCall);
          messages.push({
            role: "tool",
            name: toolCall.function.name,
            content: toolResponse,
            tool_call_id: toolCall.id
          });
        }
      } else {
        break;
      }

      maxIterations--;
    }

    if (maxIterations === 0) {
      throw new Error("Max iterations reached in agentic loop.");
    }

    // Create reports directory if it doesn't exist
    const reportsDir = path.join(__dirname, 'reports');
    await fsPromises.mkdir(reportsDir, { recursive: true });

    // Generate and save PDF locally with improved markdown parsing
    const fileName = `report_${Date.now()}.pdf`;
    const filePath = path.join(reportsDir, fileName);
    const doc = new PDFDocument({ margin: 50 });
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);
    doc.fontSize(16).text('AI Counseling Report', { align: 'center', underline: true });
    doc.moveDown(1);

    // Improved markdown parsing for PDF
    const lines = reportContent.split('\n');
    let inList = false;
    lines.forEach(line => {
      line = line.trim();
      if (!line) {
        doc.moveDown(0.5);
        inList = false;
        return;
      }

      if (line.startsWith('## ')) {
        // Subheader
        doc.font('Helvetica-Bold').fontSize(14).text(line.substring(3), { continued: false });
        doc.moveDown(0.5);
        inList = false;
      } else if (line.match(/^#\s/)) {
        // Main header (shouldn't occur, but handled)
        doc.font('Helvetica-Bold').fontSize(16).text(line.substring(2), { continued: false });
        doc.moveDown(0.5);
        inList = false;
      } else if (line.startsWith('- ')) {
        // Bullets
        doc.font('Helvetica').fontSize(10).text('• ' + parseInlineMarkdown(line.substring(2)), { indent: 20 });
        inList = true;
      } else if (line.match(/^\d+\.\s/)) {
        // Numbered list
        doc.font('Helvetica').fontSize(10).text(parseInlineMarkdown(line), { indent: 20 });
        inList = true;
      } else {
        // Normal text, handle inline bold/italic
        if (inList) {
          doc.moveDown(0.5);
          inList = false;
        }
        doc.font('Helvetica').fontSize(10).text(parseInlineMarkdown(line), { align: 'justify' });
      }
      doc.moveDown(0.3);
    });

    doc.end();

    writeStream.on('finish', () => {
      res.json({ pdfUrl: `reports/${fileName}` }); // Relative path for frontend to access
    });

    writeStream.on('error', (error) => {
      res.status(500).json({ error: 'Failed to save PDF: ' + error.message });
    });

  } catch (error) {
    console.error('Error in analysis:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// Helper function to parse inline markdown (bold and italic)
function parseInlineMarkdown(text) {
  // Handle **bold** by removing markers (PDFKit handles bold via font switching)
  text = text.replace(/\*\*(.*?)\*\*/g, (match, p1) => p1);
  // Handle *italic* by removing markers (PDFKit doesn't support italic easily, so simplify)
  text = text.replace(/\*(.*?)\*/g, (match, p1) => p1);
  return text;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));