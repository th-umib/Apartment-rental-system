const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/", bookingController.getAllBookings);
router.post("/", bookingController.createBooking);
router.put("/:id/status", bookingController.updateBookingStatus);

module.exports = router;