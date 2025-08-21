const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs'); // Add this import
const fsPromises = require('fs').promises; // Add this import
const pdfParse = require('pdf-parse'); // Add this import
const mongoose = require('mongoose'); // Add this import
const connectDB = require('./lib/database');

// Load environment variables
dotenv.config();

// Import Groq SDK
const { Groq } = require('groq-sdk');
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Import models and middleware
const Report = require('./models/Report'); // Adjust path as needed
const { authenticateToken } = require('./middleware/auth'); // Adjust path as needed

const app = express();

app.use(compression());
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use(limiter);

// Serve static files
app.use('/reports', express.static(path.join(__dirname, 'reports')));

// Import routes
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Use routes
app.use('/auth', authRoutes);
app.use('/', reportRoutes);

// Enhanced Chat Route with better PDF handling
app.post('/chat', authenticateToken, async (req, res) => {
  try {
    const { reportId, message } = req.body;

    // Validate input
    if (!reportId || !message) {
      return res.status(400).json({ 
        success: false,
        error: 'reportId and message are required' 
      });
    }

    // Find the report in database
    const report = await Report.findOne({
      _id: reportId,
      userId: req.user._id
    });

    if (!report) {
      return res.status(404).json({ 
        success: false,
        error: 'Report not found or access denied' 
      });
    }

    // Check if report is completed
    if (report.status !== 'completed') {
      return res.status(400).json({ 
        success: false,
        error: 'Report is not ready for chat' 
      });
    }

    // Build PDF file path
    const pdfPath = path.join(__dirname, report.pdfUrl);
    
    // Check if PDF file exists
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ 
        success: false,
        error: 'Report PDF file not found' 
      });
    }

    // Try multiple methods to extract PDF content
    let reportContent = '';
    
    try {
      // Method 1: Try with pdf-parse with options
      const dataBuffer = await fsPromises.readFile(pdfPath);
      
      const options = {
        normalizeWhitespace: false,
        disableCombineTextItems: false,
        max: 0, // Extract all pages
        version: 'v1.10.100'
      };
      
      const pdfData = await pdfParse(dataBuffer, options);
      reportContent = pdfData.text;
      
    } catch (pdfError) {
      console.log('pdf-parse failed, trying alternative method:', pdfError.message);
      
      try {
        // Method 2: Use report data from database if available
        if (report.reportData) {
          reportContent = `
Student Name: ${report.reportData.name || 'N/A'}
Age: ${report.reportData.age || 'N/A'}
Grade: ${report.reportData.grade || 'N/A'}
School: ${report.reportData.school || 'N/A'}
Location: ${report.reportData.location || 'N/A'}
Skills: ${report.reportData.skills?.join(', ') || 'N/A'}
Interests: ${report.reportData.interests?.join(', ') || 'N/A'}
Career Goals: ${report.reportData.goals || 'N/A'}
Preferred Fields: ${report.reportData.jobPreferences?.join(', ') || 'N/A'}
Academic Performance: ${report.reportData.marks || 'N/A'}
Exam Scores: ${JSON.stringify(report.reportData.exams || {})}
Passions: ${report.reportData.passions || 'N/A'}
          `;
        } else {
          throw new Error('No report data available');
        }
        
      } catch (fallbackError) {
        console.error('All PDF reading methods failed:', fallbackError);
        return res.status(500).json({ 
          success: false,
          error: 'Unable to read report content. Please try regenerating the report.' 
        });
      }
    }

    // Check if we have content
    if (!reportContent || reportContent.trim().length === 0) {
      return res.status(500).json({ 
        success: false,
        error: 'Report content is empty or unreadable' 
      });
    }

    // Create chat messages for AI
    const messages = [
      {
        role: 'system',
        content: `You are a professional AI career counselor assistant. Use the following career report data to answer questions accurately and helpfully: 

${reportContent}

Instructions:
- Provide specific, actionable career advice based on the report
- Be encouraging and supportive
- Reference specific details from the report when relevant
- Keep responses concise but informative (max 300 words)
- If asked about details not in the report, politely say you need more information
- Current date: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}`
      },
      { role: 'user', content: message }
    ];

    // Get AI response
    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500
    });

    const reply = completion.choices[0].message.content;
    
    res.json({ 
      success: true,
      reply,
      reportId 
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to process chat message',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API Documentation
app.get('/api/docs', (req, res) => {
  const endpoints = [
    { method: 'POST', path: '/auth/signup', description: 'Register new user', auth: false },
    { method: 'POST', path: '/auth/signin', description: 'User login', auth: false },
    { method: 'GET', path: '/auth/profile', description: 'Get user profile', auth: true },
    { method: 'PUT', path: '/auth/profile', description: 'Update user profile', auth: true },
    { method: 'POST', path: '/analysis', description: 'Generate career report', auth: true },
    { method: 'POST', path: '/chat', description: 'Chat about report', auth: true },
    { method: 'GET', path: '/reports', description: 'Get user reports', auth: true },
    { method: 'GET', path: '/reports/:id', description: 'Get single report', auth: true },
    { method: 'DELETE', path: '/reports/:id', description: 'Delete report', auth: true },
    { method: 'GET', path: '/dashboard/stats', description: 'Get dashboard statistics', auth: true },
    { method: 'GET', path: '/health', description: 'Health check', auth: false }
  ];

  res.json({
    title: 'AI Career Counseling API',
    version: '2.0.0',
    description: 'Enhanced API for AI-powered career counseling with user authentication',
    baseUrl: `${req.protocol}://${req.get('host')}`,
    endpoints
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
// Graceful shutdown
const gracefulShutdown = () => {
  console.log('Received shutdown signal. Shutting down gracefully...');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
