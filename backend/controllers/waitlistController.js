const WaitlistUser = require('../models/WaitlistUser');
const Notification = require('../models/Notification');
const emailService = require('../services/emailService');

/**
 * @desc    Add a user to the waitlist
 * @route   POST /api/waitlist
 * @access  Public
 */
exports.addToWaitlist = async (req, res, next) => {
  const { email, company, teamSize, language } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Please provide an email address' });
  }

  try {
    // Check if already in waitlist
    let waitlistUser = await WaitlistUser.findOne({ email });

    if (waitlistUser) {
      return res.status(200).json({
        success: true,
        already: true,
        position: waitlistUser.position,
        message: 'You are already registered on the waitlist.',
      });
    }

    // Create entry
    waitlistUser = await WaitlistUser.create({
      email,
      company,
      teamSize,
      language,
    });

    // Send emails
    try {
      await emailService.sendWaitlistConfirmation(waitlistUser.email, waitlistUser.position);
      await emailService.sendAdminWaitlistNotification(
        waitlistUser.email,
        waitlistUser.company,
        waitlistUser.teamSize,
        waitlistUser.language,
        waitlistUser.position
      );
    } catch (emailErr) {
      console.error('Failed to send waitlist emails:', emailErr);
    }

    // Create system notification
    await Notification.create({
      type: 'waitlist',
      title: 'New Waitlist Sign Up',
      message: `${email} joined the waitlist at position #${waitlistUser.position}.`,
    });

    res.status(201).json({
      success: true,
      already: false,
      position: waitlistUser.position,
      message: 'Waitlist spot reserved successfully!',
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get total waitlist count
 * @route   GET /api/waitlist/count
 * @access  Public
 */
exports.getWaitlistCount = async (req, res, next) => {
  try {
    const count = await WaitlistUser.countDocuments();
    res.status(200).json({
      success: true,
      count,
    });
  } catch (err) {
    next(err);
  }
};
