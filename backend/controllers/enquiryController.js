const Enquiry = require('../models/Enquiry');
const { sendEnquiryConfirmation, sendAdminEnquiryNotification, sendEnquiryStatusUpdate } = require('../services/emailService');

// @desc    Create a new enquiry
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res) => {
  try {
    const { customerName, companyName, email, phone, industry, requiredService, budget, meetingDate, requirement } = req.body;

    if (!customerName || !email || !phone || !industry || !requiredService || !budget || !meetingDate || !requirement) {
      return res.status(400).json({ success: false, error: 'Please provide all required fields' });
    }

    const enquiry = await Enquiry.create({
      customerName,
      companyName,
      email,
      phone,
      industry,
      requiredService,
      budget,
      meetingDate,
      requirement
    });

    // Send emails (non-blocking)
    Promise.all([
      sendEnquiryConfirmation(customerName, email, enquiry.enquiryId),
      sendAdminEnquiryNotification(enquiry)
    ]).catch(err => console.error('Failed to send enquiry emails', err));

    res.status(201).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    console.error('Create Enquiry Error:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all enquiries
// @route   GET /api/admin/enquiries
// @access  Private/Admin
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single enquiry
// @route   GET /api/admin/enquiries/:id
// @access  Private/Admin
const getEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, error: 'Enquiry not found' });
    }
    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update enquiry status
// @route   PUT /api/admin/enquiries/:id/status
// @access  Private/Admin
const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['Received', 'Under Review', 'Discussion Scheduled', 'Proposal Sent', 'Project Started', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    let enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({ success: false, error: 'Enquiry not found' });
    }

    const previousStatus = enquiry.status;
    enquiry.status = status;
    await enquiry.save();

    // Send email notification if status changed
    if (previousStatus !== status) {
      sendEnquiryStatusUpdate(enquiry.customerName, enquiry.email, enquiry.enquiryId, status)
        .catch(err => console.error('Failed to send status update email', err));
    }

    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/admin/enquiries/:id
// @access  Private/Admin
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, error: 'Enquiry not found' });
    }
    await enquiry.deleteOne();
    res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiry,
  updateEnquiryStatus,
  deleteEnquiry
};
