const express = require('express');
const router = express.Router();
const { subscribeNewsletter } = require('../controllers/newsletterController');
const { submissionLimiter } = require('../middleware/rateLimiter');

router.post('/subscribe', submissionLimiter, subscribeNewsletter);

module.exports = router;
