const ContactMessage = require('../models/ContactMessage');
const Notification = require('../models/Notification');
const emailService = require('../services/emailService');

/**
 * @desc    Submit a contact form inquiry
 * @route   POST /api/contact
 * @access  Public
 */
exports.submitContactForm = async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields: name, email, and message',
    });
  }

  try {
    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
    });

    // Send notification emails
    try {
      await emailService.sendContactConfirmation(name, email, subject, message);
      await emailService.sendAdminContactNotification(name, email, subject, message);
    } catch (emailErr) {
      console.error('Failed to send contact inquiry emails:', emailErr);
    }

    // Create system notification
    await Notification.create({
      type: 'contact',
      title: 'New Contact Inquiry',
      message: `Inquiry from ${name} (${email}): "${subject || 'General Inquiry'}"`,
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully. We will get back to you soon!',
    });
  } catch (err) {
    next(err);
  }
};
