const { Resend } = require('resend');

const apiKey = process.env.RESEND_API_KEY;
let resend = null;

if (apiKey && apiKey !== 're_xxxxxxxxxxxxxxxxxxxxxxxx') {
  resend = new Resend(apiKey);
} else {
  console.log('Resend API key not configured. Email service will run in development fallback mode (logging to console).');
}

const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const adminEmail = process.env.ADMIN_EMAIL || 'sanjaykanth.chandran@gmail.com';

/**
 * Helper to send email or log to console
 */
const sendMail = async ({ to, subject, html }) => {
  if (resend) {
    try {
      const response = await resend.emails.send({
        from: `Nexiora <${fromEmail}>`,
        to,
        subject,
        html,
      });
      return response;
    } catch (error) {
      console.error(`Resend Email Error sending to ${to}:`, error);
      throw error;
    }
  } else {
    console.log('\n================== [MOCK EMAIL SENT] ==================');
    console.log(`From: Nexiora <${fromEmail}>`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content:\n${html.replace(/<[^>]*>/g, ' ').trim()}`);
    console.log('=======================================================\n');
    return { id: 'mock-id-' + Math.random().toString(36).substr(2, 9) };
  }
};

/**
 * Send waitlist confirmation to the user
 */
const sendWaitlistConfirmation = async (email, position) => {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #E3D5B8; border-radius: 6px; background-color: #FBF6EB;">
      <h2 style="color: #7C1F2D;">Welcome to Nexiora Technologies!</h2>
      <p>Hi there,</p>
      <p>Thanks for joining our founding cohort waitlist. We are thrilled to have you with us!</p>
      <div style="background-color: #F3EAD6; padding: 15px; border-radius: 4px; border: 1.5px solid #2C1B14; margin: 20px 0; text-align: center;">
        <span style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #7A6A5B;">Your Queue Position</span>
        <h1 style="font-size: 48px; margin: 5px 0; color: #7C1F2D;">#${position}</h1>
      </div>
      <p>Our founding cohort is limited in size so we can give each client our dedicated analyst support. We will review your database compatibility and reach out to you within 24 hours to schedule a free 20-minute data discovery call.</p>
      <p>Best regards,<br><strong>SanjayKanth Chandran</strong><br>Founder, Nexiora Technologies</p>
      <hr style="border: 0; border-top: 1px solid #E3D5B8; margin: 20px 0;">
      <p style="font-size: 12px; color: #7A6A5B;">This is an automated confirmation of waitlist reservation. If you did not sign up, please disregard this email.</p>
    </div>
  `;
  return await sendMail({
    to: email,
    subject: 'Nexiora Technologies — Waitlist Confirmed!',
    html,
  });
};

/**
 * Send waitlist notification to the admin
 */
const sendAdminWaitlistNotification = async (userEmail, company, teamSize, language, position) => {
  const html = `
    <div style="font-family: sans-serif; padding: 20px;">
      <h2>New Waitlist Sign Up (#${position})</h2>
      <p>A new user has reserved their spot on the waitlist:</p>
      <ul>
        <li><strong>Email:</strong> ${userEmail}</li>
        <li><strong>Company:</strong> ${company || 'N/A'}</li>
        <li><strong>Team Size:</strong> ${teamSize}</li>
        <li><strong>Preferred Call Language:</strong> ${language}</li>
      </ul>
      <p>Check the admin dashboard to manage entries.</p>
    </div>
  `;
  return await sendMail({
    to: adminEmail,
    subject: `[Admin Alert] New Waitlist Sign Up: ${userEmail}`,
    html,
  });
};

/**
 * Send contact confirmation to the user
 */
const sendContactConfirmation = async (name, email, subject, message) => {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #E3D5B8; border-radius: 6px; background-color: #FBF6EB;">
      <h2 style="color: #7C1F2D;">We Received Your Message</h2>
      <p>Hi ${name},</p>
      <p>Thank you for reaching out to Nexiora Technologies. We have received your inquiry and our team will get back to you shortly.</p>
      <div style="background-color: #F3EAD6; padding: 15px; border-radius: 4px; border: 1px dashed #E3D5B8; margin: 20px 0;">
        <strong>Subject:</strong> ${subject || 'General Inquiry'}<br>
        <strong>Message:</strong><br>
        <p style="white-space: pre-wrap; font-style: italic;">${message}</p>
      </div>
      <p>Best regards,<br>Nexiora Technologies Team</p>
    </div>
  `;
  return await sendMail({
    to: email,
    subject: 'Nexiora Technologies — Message Received',
    html,
  });
};

/**
 * Send contact notification to the admin
 */
const sendAdminContactNotification = async (name, email, subject, message) => {
  const html = `
    <div style="font-family: sans-serif; padding: 20px;">
      <h2>New Contact Form Inquiry</h2>
      <p>You have received a new contact message:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Subject:</strong> ${subject || 'General Inquiry'}</li>
      </ul>
      <p><strong>Message:</strong></p>
      <blockquote style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #7C1F2D; font-style: italic;">
        ${message}
      </blockquote>
    </div>
  `;
  return await sendMail({
    to: adminEmail,
    subject: `[Admin Alert] New Contact Inquiry: ${subject || 'General Inquiry'}`,
    html,
  });
};

/**
 * Send email verification token
 */
const sendVerificationEmail = async (email, token) => {
  const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:5000'}/api/auth/verify-email/${token}`;
  const html = `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #E3D5B8; border-radius: 6px; background-color: #FBF6EB;">
      <h2>Verify Your Nexiora Account</h2>
      <p>Please click the button below to verify your email address and complete registration:</p>
      <p style="margin: 20px 0;">
        <a href="${verifyUrl}" style="background-color: #0E6B60; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Verify Email</a>
      </p>
      <p>Or copy and paste this link in your browser:</p>
      <p style="word-break: break-all;"><a href="${verifyUrl}">${verifyUrl}</a></p>
    </div>
  `;
  return await sendMail({
    to: email,
    subject: 'Nexiora Technologies — Verify Your Email',
    html,
  });
};

/**
 * Send password reset token
 */
const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5000'}/api/auth/reset-password/${token}`;
  const html = `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #E3D5B8; border-radius: 6px; background-color: #FBF6EB;">
      <h2>Reset Your Nexiora Password</h2>
      <p>We received a request to reset the password for your account. Click the button below to set a new password:</p>
      <p style="margin: 20px 0;">
        <a href="${resetUrl}" style="background-color: #7C1F2D; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reset Password</a>
      </p>
      <p>This link is valid for 10 minutes. If you did not request a password reset, you can safely ignore this email.</p>
    </div>
  `;
  return await sendMail({
    to: email,
    subject: 'Nexiora Technologies — Password Reset Request',
    html,
  });
};

module.exports = {
  sendWaitlistConfirmation,
  sendAdminWaitlistNotification,
  sendContactConfirmation,
  sendAdminContactNotification,
  sendVerificationEmail,
  sendPasswordResetEmail,
};
