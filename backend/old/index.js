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
const { createClient } = require('@deepgram/sdk');
const pdfParse = require('pdf-parse');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize Groq SDK
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Initialize Deepgram SDK (not used for chat, but kept for consistency)
const deepgramApiKey = process.env.DEEPGRAM_API_KEY || 'bb37e232167e328e21c3b1de4755eea97c507adb';
const deepgram = createClient(deepgramApiKey);

// Tool definition for Groq
const tools = [
  {
    type: 'function',
    function: {
      name: 'get_top_nirf_colleges',
      description: 'Fetch the top N colleges from NIRF 2025 rankings for a specific category (e.g., Engineering, Management, University), optionally filtered by state/location.',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: 'The NIRF category (e.g., Engineering, Management, University).'
          },
          num: {
            type: 'integer',
            description: 'Number of top colleges to fetch (default 4).'
          },
          state: {
            type: 'string',
            description: 'Optional state/location to filter colleges (e.g., Tamil Nadu, Delhi).'
          }
        },
        required: ['category']
      }
    }
  }
];

// Function to execute the tool
async function executeTool(toolCall) {
  const { name, arguments: args } = toolCall.function;
  const parsedArgs = JSON.parse(args);

  if (name === 'get_top_nirf_colleges') {
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
        if (cells.length >= 4) {
          const rank = $(cells[0]).text().trim();
          const name = $(cells[1]).text().trim();
          const city = $(cells[2]).text().trim();
          const state = $(cells[3]).text().trim().toLowerCase();
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

  return 'Tool not found.';
}

// POST /analysis route
app.post('/analysis', async (req, res) => {
  const { name, age, skills, knowledge, interests, passions, marks, exams, jobPreferences, location } = req.body;

  try {
    if (!skills || !interests || !jobPreferences) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const messages = [
      {
        role: 'system',
        content: `You are a human-like AI counselor assistant. Provide a concise, well-structured, and in-depth report based on the student's details. Avoid repetition and focus on unique, data-driven insights including market trends, salary projections, and success rates as of 01:19 PM IST on Wednesday, August 20, 2025. Suggest courses with pros/cons, eligibility thresholds, top future jobs with growth stats, and a detailed roadmap with step-by-step timelines and specific free/paid resources (include URLs). Use the get_top_nirf_colleges tool to fetch the top 4 NIRF-ranked colleges in India for the relevant category, filtered by the student's preferred location/state if provided. Personalize the report with motivational sentences addressing the student by name and age, making it encouraging and engaging. Output in clean markdown format (use ## for subheaders, ** for bold, * for italics, - for bullets, 1. for numbered lists, \n for new lines) suitable for PDF conversion, ensuring proper formatting without malformed characters.`
      },
      {
        role: 'user',
        content: `
          Student's details:
          - Name: ${name || 'Student'}
          - Age: ${age || 'Not specified'}
          - Skills: ${skills.join(', ')}
          - Knowledge: ${knowledge.join(', ')}
          - Interests: ${interests.join(', ')}
          - Passions: ${passions || 'Not specified'}
          - 12th Marks: ${marks || 'Not specified'}
          - Exams: SAT - ${exams.sat || 'Not specified'}, JEE - ${exams.jee || 'Not specified'}
          - Job Preferences: ${jobPreferences.join(', ')}
          - Preferred Location/State: ${location || 'Any (India-wide)'}

          Generate the report in structured markdown format for PDF, with deep analysis and personalized motivation.
        `
      }
    ];

    let reportContent = '';
    let maxIterations = 10;

    while (maxIterations > 0) {
      const completion = await groq.chat.completions.create({
        messages,
        model: 'llama-3.3-70b-versatile',
        tools,
        tool_choice: 'auto',
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
            role: 'tool',
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
      throw new Error('Max iterations reached in agentic loop.');
    }

    const reportsDir = path.join(__dirname, 'reports');
    await fsPromises.mkdir(reportsDir, { recursive: true });

    const fileName = `report_${Date.now()}.pdf`;
    const filePath = path.join(reportsDir, fileName);
    const doc = new PDFDocument({ margin: 50 });
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);
    doc.fontSize(16).text('AI Counseling Report', { align: 'center', underline: true });
    doc.moveDown(1);

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
        doc.font('Helvetica-Bold').fontSize(14).text(line.substring(3), { continued: false });
        doc.moveDown(0.5);
        inList = false;
      } else if (line.match(/^#\s/)) {
        doc.font('Helvetica-Bold').fontSize(16).text(line.substring(2), { continued: false });
        doc.moveDown(0.5);
        inList = false;
      } else if (line.startsWith('- ')) {
        doc.font('Helvetica').fontSize(10).text('• ' + parseInlineMarkdown(line.substring(2)), { indent: 20 });
        inList = true;
      } else if (line.match(/^\d+\.\s/)) {
        doc.font('Helvetica').fontSize(10).text(parseInlineMarkdown(line), { indent: 20 });
        inList = true;
      } else {
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
      res.json({ pdfUrl: `reports/${fileName}` });
    });

    writeStream.on('error', (error) => {
      res.status(500).json({ error: 'Failed to save PDF: ' + error.message });
    });

  } catch (error) {
    console.error('Error in analysis:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// POST /chat route
app.post('/chat', async (req, res) => {
  const { pdfFileName, message } = req.body;

  if (!pdfFileName || !message) {
    return res.status(400).json({ error: 'pdfFileName and message are required' });
  }

  const pdfPath = path.join(__dirname, 'reports', pdfFileName);
  if (!fs.existsSync(pdfPath)) {
    return res.status(404).json({ error: 'PDF file not found' });
  }

  let reportContent = '';
  try {
    const dataBuffer = await fsPromises.readFile(pdfPath);
    const pdfData = await pdfParse(dataBuffer);
    reportContent = pdfData.text;
  } catch (error) {
    return res.status(500).json({ error: 'Failed to read PDF: ' + error.message });
  }

  const messages = [
    {
      role: 'system',
      content: `You are a human-like AI counselor assistant. Use the following report to answer questions: ${reportContent} (Current date and time: 01:19 PM IST on Wednesday, August 20, 2025). Provide concise, accurate, and engaging responses based on the report content.`
    },
    { role: 'user', content: message }
  ];

  try {
    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Helper function to parse inline markdown
function parseInlineMarkdown(text) {
  text = text.replace(/\*\*(.*?)\*\*/g, (match, p1) => p1); // Remove bold markers
  text = text.replace(/\*(.*?)\*/g, (match, p1) => p1); // Remove italic markers
  return text;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));