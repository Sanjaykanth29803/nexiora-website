const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  enquiryId: {
    type: String,
    unique: true,
  },
  customerName: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  companyName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    trim: true,
  },
  industry: {
    type: String,
    required: [true, 'Please provide an industry'],
    trim: true,
  },
  requiredService: {
    type: String,
    required: [true, 'Please provide a required service'],
    trim: true,
  },
  budget: {
    type: String,
    required: [true, 'Please provide a project budget'],
    trim: true,
  },
  meetingDate: {
    type: String, // String representation of date
    required: [true, 'Please provide a meeting date'],
  },
  requirement: {
    type: String,
    required: [true, 'Please provide requirement description'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['Received', 'Under Review', 'Discussion Scheduled', 'Proposal Sent', 'Project Started', 'Completed'],
    default: 'Received',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to generate NX-YYYY-XXXX Enquiry ID
EnquirySchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  const currentYear = new Date().getFullYear();
  const prefix = `NX-${currentYear}-`;

  try {
    // Find the latest enquiry for the current year
    const latestEnquiry = await this.constructor.findOne({
      enquiryId: new RegExp(`^${prefix}`),
    }).sort({ createdAt: -1 });

    let nextNumber = 1;
    if (latestEnquiry && latestEnquiry.enquiryId) {
      const parts = latestEnquiry.enquiryId.split('-');
      if (parts.length === 3) {
        nextNumber = parseInt(parts[2], 10) + 1;
      }
    }

    const paddedNumber = nextNumber.toString().padStart(4, '0');
    this.enquiryId = `${prefix}${paddedNumber}`;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
