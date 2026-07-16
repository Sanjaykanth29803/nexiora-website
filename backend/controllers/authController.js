const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const AdminUser = require('../models/AdminUser');
const Notification = require('../models/Notification');
const emailService = require('../services/emailService');

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'local_development_secret_key_987654321',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      username: user.username || undefined,
    },
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = async (req, res, next) => {
  const { email, password, username, role } = req.body;

  try {
    // Check if user already exists in either collection
    const userExists = (await User.findOne({ email })) || (await AdminUser.findOne({ email }));
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    let newUser;
    const isFirstAdmin = (await AdminUser.countDocuments()) === 0;

    // If role is admin or they are the first user registered (auto-promote first to admin for ease of setup)
    if (role === 'admin' || isFirstAdmin) {
      newUser = await AdminUser.create({
        username: username || 'admin',
        email,
        password,
        role: 'admin',
      });

      // Create notification
      await Notification.create({
        type: 'system',
        title: 'New Admin Registered',
        message: `Admin user ${email} has been registered.`,
      });
    } else {
      // Standard User
      // Generate verification token
      const verificationToken = crypto.randomBytes(20).toString('hex');

      newUser = await User.create({
        email,
        password,
        role: 'user',
        verificationToken,
      });

      // Send verification email
      try {
        await emailService.sendVerificationEmail(email, verificationToken);
      } catch (err) {
        console.error('Error sending email verification: ', err);
      }

      await Notification.create({
        type: 'system',
        title: 'New User Registered',
        message: `User ${email} has been registered. Email verification sent.`,
      });
    }

    sendTokenResponse(newUser, 201, res);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Login user / admin
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  try {
    // Check for user in AdminUser first, then User
    let user = await AdminUser.findOne({ email }).select('+password');
    let isAdmin = true;

    if (!user) {
      user = await User.findOne({ email }).select('+password');
      isAdmin = false;
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Logout user / clear cookie
 * @route   POST /api/auth/logout
 * @access  Public
 */
exports.logout = async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

/**
 * @desc    Verify email token
 * @route   GET /api/auth/verify-email/:token
 * @access  Public
 */
exports.verifyEmail = async (req, res, next) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Redirect to login page or custom success page
    res.send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1 style="color: #0E6B60;">Email Verified Successfully!</h1>
        <p>Thank you. Your email address has been verified. You can now close this tab.</p>
      </div>
    `);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Forgot password
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    let user = await AdminUser.findOne({ email });
    if (!user) {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'No user registered with this email' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set expire (10 minutes)
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    // Send email
    try {
      await emailService.sendPasswordResetEmail(user.email, resetToken);
      res.status(200).json({ success: true, message: 'Password reset link sent to your email' });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      console.error(err);
      return res.status(500).json({ success: false, message: 'Email could not be sent' });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Reset password
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
 */
exports.resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  // Hash the incoming token to match what's stored in DB
  const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

  try {
    let user = await AdminUser.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
    }

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired password reset token' });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (err) {
    next(err);
  }
};
