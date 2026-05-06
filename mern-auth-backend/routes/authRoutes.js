const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

/**
 * Public Routes
 */

// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);

/**
 * Protected Routes
 * Require valid JWT token
 */

// Get current user profile
router.get('/profile', protect, getProfile);

module.exports = router;
