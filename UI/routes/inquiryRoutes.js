const express = require("express");
const router = express.Router();
const inquiryController = require("../controllers/inquiryController");

router.get("/", inquiryController.getAllInquiries);
router.post("/", inquiryController.createInquiry);

module.exports = router;