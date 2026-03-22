const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/BookingController");

router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getBookingById);

module.exports = router;