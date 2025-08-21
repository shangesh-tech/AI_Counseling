const express = require('express');
const router = express.Router();
const { validateSignup } = require('../middleware/auth');
const {
  signup,
  signin,
  getProfile,
  updateProfile
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Auth Routes
router.post('/signup', validateSignup, signup);
router.post('/signin', signin);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;
