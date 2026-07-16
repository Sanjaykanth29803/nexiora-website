const mongoose = require('mongoose');

const WaitlistUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
    default: '',
  },
  teamSize: {
    type: String,
    default: 'Just me',
  },
  language: {
    type: String,
    default: 'English',
  },
  position: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-increment position pre-save
WaitlistUserSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const count = await this.constructor.countDocuments();
      this.position = count + 1;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

module.exports = mongoose.model('WaitlistUser', WaitlistUserSchema);
