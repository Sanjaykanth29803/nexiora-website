const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

// Load models
const AdminUser = require('../models/AdminUser');
const User = require('../models/User');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const WaitlistUser = require('../models/WaitlistUser');
const ContactMessage = require('../models/ContactMessage');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const Notification = require('../models/Notification');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const projects = [
  {
    title: 'Automated Revenue Pipeline for D2C Brand',
    description: 'Unified Shopify and Razorpay gateways into a real-time Power BI dashboard, reducing monthly audit reconciliation cycles from 5 days to 10 seconds.',
    category: 'Finance Integration',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60',
    client: 'D2C Apparel Brand',
  },
  {
    title: 'Marketing ROI Hub for SaaS Business',
    description: 'Cross-referenced Facebook Ads and Google Ads spend directly with backend subscriber lists, establishing accurate customer acquisition costs.',
    category: 'Marketing Analytics',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=60',
    client: 'SaaS Platform Inc.',
  }
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'CEO, Trendz E-commerce',
    content: 'Before Nexiora, reconciling settlements against Shopify orders took our team hours every day. The automated dashboard saved us countess spreadsheets.',
    rating: 5,
  },
  {
    name: 'Anjali Sharma',
    role: 'Operations Director, GrowthLabs',
    content: 'Sanjaykanth personally helped map our Zoho invoices and build the multi-branch tracker. The Tamil walkthrough call made training our managers simple.',
    rating: 5,
  }
];

const seedDB = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nexiora');
    console.log('MongoDB Connected successfully.');

    // Clear existing data
    console.log('Clearing database collections...');
    await AdminUser.deleteMany();
    await Project.deleteMany();
    await Testimonial.deleteMany();
    await WaitlistUser.deleteMany();
    await ContactMessage.deleteMany();
    await NewsletterSubscriber.deleteMany();
    await Notification.deleteMany();
    console.log('Database cleared.');

    // Seed default admin
    console.log('Creating default administrator...');
    const adminEmail = 'admin@nexiora.tech';
    const adminPassword = 'Password123!';
    
    await AdminUser.create({
      username: 'admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    console.log('----------------------------------------------------');
    console.log(`Admin User Created Successfully:`);
    console.log(`Email:    ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('----------------------------------------------------');

    // Seed projects
    console.log('Seeding projects...');
    await Project.insertMany(projects);

    // Seed testimonials
    console.log('Seeding testimonials...');
    await Testimonial.insertMany(testimonials);

    // Seed a welcome notification
    await Notification.create({
      type: 'system',
      title: 'Database Initialized',
      message: 'System databases successfully seeded with initial catalog data.',
    });

    console.log('Database seeding process finished successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error during seeding database: ', err);
    process.exit(1);
  }
};

seedDB();
