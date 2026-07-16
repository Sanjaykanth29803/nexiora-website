const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const Notification = require('../models/Notification');

/**
 * @desc    Subscribe to newsletter
 * @route   POST /api/newsletter/subscribe
 * @access  Public
 */
exports.subscribeNewsletter = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Please provide an email address' });
  }

  try {
    let subscriber = await NewsletterSubscriber.findOne({ email });

    if (subscriber) {
      if (subscriber.isActive) {
        return res.status(200).json({
          success: true,
          message: 'You are already subscribed to our newsletter!',
        });
      } else {
        subscriber.isActive = true;
        await subscriber.save();
        return res.status(200).json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
        });
      }
    }

    subscriber = await NewsletterSubscriber.create({ email });

    // Create system notification
    await Notification.create({
      type: 'newsletter',
      title: 'New Newsletter Subscriber',
      message: `${email} subscribed to the newsletter.`,
    });

    res.status(201).json({
      success: true,
      message: 'Subscribed to newsletter successfully!',
    });
  } catch (err) {
    next(err);
  }
};
