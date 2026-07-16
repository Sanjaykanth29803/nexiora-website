const express = require('express');
const router = express.Router();
const {
  getAnalytics,
  getWaitlist,
  deleteWaitlistEntry,
  getContactMessages,
  updateContactStatus,
  deleteContactMessage,
  getSubscribers,
  deleteSubscriber,
  getUsers,
  getNotifications,
  markNotificationsRead,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Protect all routes below
router.use(protect);
router.use(authorize('admin'));

router.get('/analytics', getAnalytics);

router.route('/waitlist')
  .get(getWaitlist);

router.route('/waitlist/:id')
  .delete(deleteWaitlistEntry);

router.route('/contacts')
  .get(getContactMessages);

router.route('/contacts/:id')
  .put(updateContactStatus)
  .delete(deleteContactMessage);

router.route('/subscribers')
  .get(getSubscribers);

router.route('/subscribers/:id')
  .delete(deleteSubscriber);

router.get('/users', getUsers);

router.route('/notifications')
  .get(getNotifications)
  .put(markNotificationsRead);

module.exports = router;
