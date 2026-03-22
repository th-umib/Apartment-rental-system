const FileRepository = require("../Data/FileRepository");

class BookingService {
    constructor() {
        this.bookingRepository = new FileRepository("./Data/bookings.csv");
    }

    getAllBookings() {
        return this.bookingRepository.getAll();
    }

    getBookingById(id) {
        return this.bookingRepository.getById(id);
    }

    addBooking(booking) {
        this.bookingRepository.add(booking);
        this.bookingRepository.save();
    }
}

module.exports = BookingService;