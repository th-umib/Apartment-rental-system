class Apartment {
  constructor(id, title, city, address, price, isAvailable) {
    this.id = Number(id);
    this.title = title;
    this.city = city;
    this.address = address;
    this.price = Number(price);
    this.isAvailable = isAvailable === true || isAvailable === "true";
  }
}

module.exports = Apartment;