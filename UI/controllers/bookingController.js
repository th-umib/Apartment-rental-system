const bookingService = require("../../Services/bookingService");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const updated = await bookingService.updateBookingStatus(req.params.id, req.body.status);

    if (!updated) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating booking status", error: error.message });
  }
};

module.exports = {
  getAllBookings,
  createBooking,
  updateBookingStatus,
};