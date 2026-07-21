const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  getEnquiry,
  updateEnquiryStatus,
  deleteEnquiry
} = require('../controllers/enquiryController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public route to submit enquiry
router.post('/', createEnquiry);

// Protected Admin Routes
router.get('/', protect, authorize('admin'), getEnquiries);
router.get('/:id', protect, authorize('admin'), getEnquiry);
router.put('/:id/status', protect, authorize('admin'), updateEnquiryStatus);
router.delete('/:id', protect, authorize('admin'), deleteEnquiry);

module.exports = router;
