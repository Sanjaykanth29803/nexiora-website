const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { apiLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Note: We don't call connectDB() directly here anymore.
// We will call it in a middleware so Vercel waits for the connection on every request.

const app = express();

// Trust proxy is required for rate limiters behind Vercel/proxies
app.set('trust proxy', 1);

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Apply rate limiting to all requests
app.use(apiLimiter);

// Database Connection Middleware (CRITICAL FOR VERCEL)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// Mount routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/waitlist', require('./routes/waitlistRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/newsletter', require('./routes/newsletterRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));

// Serve static assets in production/development
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Fallback route for SPA or landing page
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
});

// Centralized error handler middleware
app.use(errorHandler);

// Export for Vercel Serverless
module.exports = app;

// Only listen locally if not in Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process if running locally
  if (typeof server !== 'undefined' && server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});
