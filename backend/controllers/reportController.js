const Report = require('../models/Report');
const fs = require('fs').promises;
const PDFDocument = require('pdfkit');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { Groq } = require('groq-sdk');
const path = require('path');


// Initialize Groq SDK (make sure this is in your main server file)
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

  return "Tool not found.";
}

// Helper function to parse inline markdown
function parseInlineMarkdown(text) {
  text = text.replace(/\*\*(.*?)\*\*/g, (match, p1) => p1);
  text = text.replace(/\*(.*?)\*/g, (match, p1) => p1);
  return text;
}

// Enhanced Generate Report Analysis
const generateAnalysis = async (req, res) => {
  const { 
    name, age, grade, school, location, skills, interests, 
    passions, goals, preferredFields, marks, exams 
  } = req.body;
  
  try {
    // Enhanced validation
    const requiredFields = { skills, interests, preferredFields, goals, name };
    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value || (Array.isArray(value) && value.length === 0) || 
          (typeof value === 'string' && !value.trim())) {
        return res.status(400).json({ 
          error: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
          field
        });
      }
    }

    // Validate array fields
    const arrayFields = { skills, interests, preferredFields };
    for (const [field, value] of Object.entries(arrayFields)) {
      if (!Array.isArray(value)) {
        return res.status(400).json({ 
          error: `${field} must be an array`,
          field
        });
      }
    }

    console.log('Generating enhanced report for user:', req.user.name);

    // Create Groq messages
    const messages = [
      {
        role: "system",
        content: "You are a human-like AI counselor assistant. Provide a concise, well-structured, and in-depth report based on the student's details. Avoid repetition and focus on unique, data-driven insights including market trends, salary projections, and success rates. Suggest courses with pros/cons, eligibility thresholds, top future jobs with growth stats, and a detailed roadmap with step-by-step timelines and specific free/paid resources (include URLs). Use the get_top_nirf_colleges tool to fetch the top 4 NIRF-ranked colleges in India for the relevant category, filtered by the student's preferred location/state if provided. Personalize the report with motivational sentences addressing the student by name and age, making it encouraging and engaging. Output in clean markdown format (use ## for subheaders, ** for bold, * for italics, - for bullets, 1. for numbered lists, \\n for new lines) suitable for PDF conversion, ensuring proper formatting without malformed characters."
      },
      {
        role: "user",
        content: `
          Student's details:
          - Name: ${name}
          - Age: ${age || 'Not specified'}
          - Grade/Year: ${grade || 'Not specified'}
          - School/Institution: ${school || 'Not specified'}
          - Skills: ${skills.join(', ')}
          - Interests: ${interests.join(', ')}
          - Passions: ${passions || 'Not specified'}
          - Career Goals: ${goals}
          - Academic Performance: ${marks || 'Not specified'}
          - Exam Scores: JEE - ${exams?.jee || 'Not specified'}, NEET - ${exams?.neet || 'Not specified'}, Boards - ${exams?.boards || 'Not specified'}
          - Preferred Career Fields: ${preferredFields.join(', ')}
          - Preferred Location/State: ${location || 'Any (India-wide)'}

          Generate the report in structured markdown format for PDF, with deep analysis and personalized motivation.
        `
      }
    ];

    let reportContent = "";
    let maxIterations = 10;

    // Agentic loop with tool calls
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

    if (!reportContent || reportContent.trim().length === 0) {
      throw new Error('Failed to generate report content');
    }

    // Create reports directory
    const reportsDir = path.join(__dirname, '..', 'reports');
    await fs.mkdir(reportsDir, { recursive: true });

    // Create file name and path
    const fileName = `report_${req.user._id}_${Date.now()}.pdf`;
    const filePath = path.join(reportsDir, fileName);

    // Generate PDF with enhanced formatting
    const doc = new PDFDocument({ margin: 50 });
    const writeStream = require('fs').createWriteStream(filePath);

    doc.pipe(writeStream);
    
    // PDF Header
    doc.fontSize(20).font('Helvetica-Bold').text('AI Career Counseling Report', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica').text(`Generated for: ${name}`, { align: 'center' });
    doc.fontSize(10).text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' });
    doc.moveDown(1);

    // Parse and format content
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
        if (inList) doc.moveDown(0.5);
        doc.font('Helvetica-Bold').fontSize(14).text(line.substring(3));
        doc.moveDown(0.5);
        inList = false;
      } else if (line.match(/^#\s/)) {
        // Main header
        if (inList) doc.moveDown(0.5);
        doc.font('Helvetica-Bold').fontSize(16).text(line.substring(2));
        doc.moveDown(0.5);
        inList = false;
      } else if (line.startsWith('- ')) {
        // Bullet points
        doc.font('Helvetica').fontSize(10).text('• ' + parseInlineMarkdown(line.substring(2)), { 
          indent: 20,
          continued: false 
        });
        inList = true;
      } else if (line.match(/^\d+\.\s/)) {
        // Numbered list
        doc.font('Helvetica').fontSize(10).text(parseInlineMarkdown(line), { 
          indent: 20,
          continued: false 
        });
        inList = true;
      } else {
        // Normal text
        if (inList) {
          doc.moveDown(0.5);
          inList = false;
        }
        doc.font('Helvetica').fontSize(10).text(parseInlineMarkdown(line), { 
          align: 'justify',
          continued: false 
        });
      }
      doc.moveDown(0.3);
    });

    doc.end();

    // Wait for PDF to be written
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    // Get file size
    const fileStats = await fs.stat(filePath);
    const fileSize = fileStats.size;

    // Prepare report data for database
    const reportData = {
      userId: req.user._id,
      pdfUrl: `reports/${fileName}`,
      fileName: fileName,
      reportData: {
        name: name || req.user.name,
        age: age || req.user.age,
        grade: grade || 'Not specified',
        school: school || 'Not specified',
        location: location || 'Not specified',
        skills,
        interests,
        passions: passions || '',
        goals,
        marks: marks || 'Not specified',
        exams: {
          jee: exams?.jee || 'Not specified',
          neet: exams?.neet || 'Not specified',
          sat: exams?.sat || 'Not specified',
          boards: exams?.boards || 'Not specified'
        },
        jobPreferences: preferredFields
      },
      fileSize,
      status: 'completed'
    };

    const report = new Report(reportData);
    await report.save();

    console.log('Enhanced report saved successfully:', report._id);

    res.json({
      success: true,
      message: 'Report generated successfully',
      data: {
        reportId: report._id,
        pdfUrl: `reports/${fileName}`,
        fileName: fileName,
        fileSize: fileSize,
        createdAt: report.createdAt
      }
    });

  } catch (error) {
    console.error('Enhanced analysis error:', error);
    
    // Save failed report record
    try {
      const failedReport = new Report({
        userId: req.user._id,
        pdfUrl: '',
        fileName: `failed_${Date.now()}.pdf`,
        reportData: req.body,
        status: 'failed',
        errorMessage: error.message
      });
      await failedReport.save();
    } catch (dbError) {
      console.error('Failed to save error report:', dbError);
    }

    res.status(500).json({ 
      success: false,
      error: 'Failed to generate report. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      code: 'REPORT_GENERATION_ERROR'
    });
  }
};




// Get User Reports
const getUserReports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reports = await Report.find({ 
      userId: req.user._id 
    })
    .select('pdfUrl fileName reportData.name reportData.interests fileSize status createdAt')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

    const totalReports = await Report.countDocuments({ userId: req.user._id });
    const totalPages = Math.ceil(totalReports / limit);

    res.json({
      reports: reports.map(report => ({
        id: report._id,
        fileName: report.fileName,
        pdfUrl: report.pdfUrl,
        studentName: report.reportData?.name || 'Unknown',
        interests: report.reportData?.interests || [],
        fileSize: report.fileSize,
        status: report.status,
        createdAt: report.createdAt
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalReports,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch reports',
      code: 'REPORTS_FETCH_ERROR'
    });
  }
};

// Get Single Report
const getSingleReport = async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.reportId,
      userId: req.user._id
    });

    if (!report) {
      return res.status(404).json({ 
        error: 'Report not found or access denied' 
      });
    }

    res.json({
      id: report._id,
      fileName: report.fileName,
      pdfUrl: report.pdfUrl,
      reportData: report.reportData,
      fileSize: report.fileSize,
      status: report.status,
      createdAt: report.createdAt,
      updatedAt: report.updatedAt
    });
  } catch (error) {
    console.error('Get single report error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch report',
      code: 'REPORT_FETCH_ERROR'
    });
  }
};

// Delete Report
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.reportId,
      userId: req.user._id
    });

    if (!report) {
      return res.status(404).json({ 
        error: 'Report not found or access denied' 
      });
    }

    // Delete PDF file
    const pdfPath = path.join(__dirname, '..', report.pdfUrl);
    if (fs.existsSync(pdfPath)) {
      await fs.unlink(pdfPath);
    }

    // Delete from database
    await Report.findByIdAndDelete(req.params.reportId);

    res.json({
      message: 'Report deleted successfully',
      reportId: req.params.reportId
    });
  } catch (error) {
    console.error('Delete report error:', error);
    res.status(500).json({ 
      error: 'Failed to delete report',
      code: 'REPORT_DELETE_ERROR'
    });
  }
};

// Get Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const totalReports = await Report.countDocuments({ userId });
    const completedReports = await Report.countDocuments({ userId, status: 'completed' });
    const failedReports = await Report.countDocuments({ userId, status: 'failed' });
    const generatingReports = await Report.countDocuments({ userId, status: 'generating' });

    // Recent reports (last 5)
    const recentReports = await Report.find({ userId })
                                  .select('fileName reportData.name status createdAt')
                                  .sort({ createdAt: -1 })
                                  .limit(5);

    // Total file size
    const sizeAggregate = await Report.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: null, totalSize: { $sum: '$fileSize' } } }
    ]);

    const totalFileSize = sizeAggregate.length > 0 ? sizeAggregate[0].totalSize : 0;

    res.json({
      stats: {
        totalReports,
        completedReports,
        failedReports,
        generatingReports,
        totalFileSize,
        totalFileSizeMB: Math.round(totalFileSize / 1024 / 1024 * 100) / 100
      },
      recentReports: recentReports.map(report => ({
        id: report._id,
        fileName: report.fileName,
        studentName: report.reportData?.name || 'Unknown',
        status: report.status,
        createdAt: report.createdAt
      }))
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch dashboard stats',
      code: 'STATS_FETCH_ERROR'
    });
  }
};

module.exports = {
  generateAnalysis,
  getUserReports,
  getSingleReport,
  deleteReport,
  getDashboardStats
};
