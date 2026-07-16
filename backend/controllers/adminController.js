const User = require('../models/User');
const AdminUser = require('../models/AdminUser');
const WaitlistUser = require('../models/WaitlistUser');
const ContactMessage = require('../models/ContactMessage');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const Notification = require('../models/Notification');

/**
 * @desc    Get dashboard analytics
 * @route   GET /api/admin/analytics
 * @access  Private/Admin
 */
exports.getAnalytics = async (req, res, next) => {
  try {
    const waitlistCount = await WaitlistUser.countDocuments();
    const contactCount = await ContactMessage.countDocuments();
    const subscriberCount = await NewsletterSubscriber.countDocuments();
    const userCount = await User.countDocuments();
    const adminCount = await AdminUser.countDocuments();

    // Breakdown waitlist by team size
    const teamSizeBreakdown = await WaitlistUser.aggregate([
      { $group: { _id: '$teamSize', count: { $sum: 1 } } },
    ]);

    // Breakdown waitlist by language
    const languageBreakdown = await WaitlistUser.aggregate([
      { $group: { _id: '$language', count: { $sum: 1 } } },
    ]);

    // Get recent notifications (last 10)
    const recentNotifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(10);

    // Get daily signup statistics (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const dailyWaitlistSignups = await WaitlistUser.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        counts: {
          waitlist: waitlistCount,
          contacts: contactCount,
          subscribers: subscriberCount,
          users: userCount,
          admins: adminCount,
        },
        breakdowns: {
          teamSize: teamSizeBreakdown,
          language: languageBreakdown,
        },
        dailySignups: dailyWaitlistSignups,
        recentNotifications,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get waitlist entries
 * @route   GET /api/admin/waitlist
 * @access  Private/Admin
 */
exports.getWaitlist = async (req, res, next) => {
  try {
    const waitlist = await WaitlistUser.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: waitlist.length,
      data: waitlist,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete a waitlist entry
 * @route   DELETE /api/admin/waitlist/:id
 * @access  Private/Admin
 */
exports.deleteWaitlistEntry = async (req, res, next) => {
  try {
    const entry = await WaitlistUser.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ success: false, message: 'Waitlist entry not found' });
    }
    await entry.deleteOne();
    res.status(200).json({ success: true, message: 'Waitlist entry deleted successfully' });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get contact messages
 * @route   GET /api/admin/contacts
 * @access  Private/Admin
 */
exports.getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update contact message read status
 * @route   PUT /api/admin/contacts/:id
 * @access  Private/Admin
 */
exports.updateContactStatus = async (req, res, next) => {
  const { isRead } = req.body;

  try {
    let message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    message.isRead = isRead;
    await message.save();

    res.status(200).json({ success: true, data: message });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete contact message
 * @route   DELETE /api/admin/contacts/:id
 * @access  Private/Admin
 */
exports.deleteContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    await message.deleteOne();
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get newsletter subscribers
 * @route   GET /api/admin/subscribers
 * @access  Private/Admin
 */
exports.getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete subscriber
 * @route   DELETE /api/admin/subscribers/:id
 * @access  Private/Admin
 */
exports.deleteSubscriber = async (req, res, next) => {
  try {
    const subscriber = await NewsletterSubscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ success: false, message: 'Subscriber not found' });
    }
    await subscriber.deleteOne();
    res.status(200).json({ success: true, message: 'Subscriber deleted successfully' });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get users list
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    const admins = await AdminUser.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: {
        users,
        admins,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get notifications list
 * @route   GET /api/admin/notifications
 * @access  Private/Admin
 */
exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Mark all notifications as read
 * @route   PUT /api/admin/notifications/read
 * @access  Private/Admin
 */
exports.markNotificationsRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ isRead: false }, { isRead: true });
    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (err) {
    next(err);
  }
};
