const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');
const { submissionLimiter } = require('../middleware/rateLimiter');

router.post('/', submissionLimiter, submitContactForm);

module.exports = router;
