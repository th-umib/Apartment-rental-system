class Apartment {
    constructor(id, title, city, address, pricePerNight, isAvailable) {
        this.id = id;
        this.title = title;
        this.city = city;
        this.address = address;
        this.pricePerNight = pricePerNight;
        this.isAvailable = isAvailable;
    }
}

module.exports = Apartment;