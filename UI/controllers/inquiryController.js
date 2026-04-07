const inquiryService = require("../../Services/inquiryService");

const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await inquiryService.getAllInquiries();
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inquiries", error: error.message });
  }
};

const createInquiry = async (req, res) => {
  try {
    const inquiry = await inquiryService.createInquiry(req.body);
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: "Error creating inquiry", error: error.message });
  }
};

module.exports = {
  getAllInquiries,
  createInquiry,
};