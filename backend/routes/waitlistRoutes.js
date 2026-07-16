const express = require('express');
const router = express.Router();
const { addToWaitlist, getWaitlistCount } = require('../controllers/waitlistController');
const { submissionLimiter } = require('../middleware/rateLimiter');

router.post('/', submissionLimiter, addToWaitlist);
router.get('/count', getWaitlistCount);

module.exports = router;
