const BookingService = require("../../Services/BookingService");
const bookingService = new BookingService();

exports.getAllBookings = (req, res) => {
    res.json(bookingService.getAllBookings());
};

exports.getBookingById = (req, res) => {
    const booking = bookingService.getBookingById(req.params.id);
    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
};