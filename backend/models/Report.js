const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pdfUrl: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  reportData: {
    name: String,
    age: Number,
    skills: [String],
    knowledge: [String],
    interests: [String],
    passions: [String],
    marks: String,
    exams: {
      sat: String,
      jee: String
    },
    jobPreferences: [String],
    location: String
  },
  fileSize: Number,
  status: {
    type: String,
    enum: ['generating', 'completed', 'failed'],
    default: 'generating'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);
