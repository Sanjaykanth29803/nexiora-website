const mongoose = require('mongoose');

const LearningPathSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a learning path title'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LearningPath', LearningPathSchema);
