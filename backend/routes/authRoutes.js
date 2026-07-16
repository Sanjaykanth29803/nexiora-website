const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { submissionLimiter } = require('../middleware/rateLimiter');

router.post('/register', register);
router.post('/login', submissionLimiter, login);
router.post('/logout', logout);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', submissionLimiter, forgotPassword);
router.post('/reset-password/:token', submissionLimiter, resetPassword);

module.exports = router;
