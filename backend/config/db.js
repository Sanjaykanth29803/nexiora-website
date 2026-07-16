const mongoose = require('mongoose');

let isConnected = false; // Cache connection state

const connectDB = async () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  // Determine URI
  const dbUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nexiora';
  
  if (process.env.NODE_ENV === 'production' && (!process.env.MONGO_URI || process.env.MONGO_URI.includes('localhost') || process.env.MONGO_URI.includes('127.0.0.1'))) {
    throw new Error('FATAL: Vercel is missing the MONGO_URI environment variable! You must add it in the Vercel Dashboard and REDEPLOY.');
  }

  try {
    const db = await mongoose.connect(dbUri);
    isConnected = db.connections[0].readyState === 1;
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // In serverless, we don't want to process.exit(1), just throw error
    throw error;
  }
};

module.exports = connectDB;
