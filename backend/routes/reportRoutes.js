const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  generateAnalysis,
  getUserReports,
  getSingleReport,
  deleteReport,
  getDashboardStats
} = require('../controllers/reportController');

// Report Routes
router.post('/analysis', authenticateToken, generateAnalysis);
router.get('/reports', authenticateToken, getUserReports);
router.get('/reports/:reportId', authenticateToken, getSingleReport);
router.delete('/reports/:reportId', authenticateToken, deleteReport);
router.get('/dashboard/stats', authenticateToken, getDashboardStats);

module.exports = router;
