const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  duration: {
    type: String,
    default: '4 weeks',
  },
  track: {
    type: String,
    enum: ['Data Analyst', 'Business Analyst', 'Data Scientist', 'AI/ML Engineer'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Course', CourseSchema);
