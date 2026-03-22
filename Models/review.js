class Review {
    constructor(id, userId, apartmentId, rating, comment) {
        this.id = id;
        this.userId = userId;
        this.apartmentId = apartmentId;
        this.rating = rating;
        this.comment = comment;
    }
}

module.exports = Review;