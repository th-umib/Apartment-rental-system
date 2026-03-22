const ApartmentService = require("../../Services/ApartmentService");
const apartmentService = new ApartmentService();

exports.getAllApartments = (req, res) => {
    res.json(apartmentService.getAllApartments());
};

exports.getApartmentById = (req, res) => {
    const apartment = apartmentService.getApartmentById(req.params.id);
    if (!apartment) {
        return res.status(404).json({ message: "Apartment not found" });
    }
    res.json(apartment);
};