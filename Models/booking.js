class Booking {
    constructor(id, userId, apartmentId, startDate, endDate, status) {
        this.id = id;
        this.userId = userId;
        this.apartmentId = apartmentId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }
}

module.exports = Booking;