const ApartmentRepository = require("../../Data/apartmentRepository");
const ApartmentService = require("../../Services/apartmentService");

const apartmentRepository = new ApartmentRepository();
const apartmentService = new ApartmentService(apartmentRepository);

const getAllApartments = (req, res) => {
  try {
    const filters = {
      city: req.query.city,
      isAvailable: req.query.isAvailable,
    };

    const apartments = apartmentService.listo(filters);
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getApartmentById = (req, res) => {
  try {
    const apartment = apartmentService.gjejById(req.params.id);

    if (!apartment) {
      return res.status(404).json({ message: "Apartment nuk u gjet." });
    }

    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createApartment = (req, res) => {
  try {
    const newApartment = apartmentService.shto(req.body);
    res.status(201).json(newApartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateApartment = (req, res) => {
  try {
    const updatedApartment = apartmentService.update(req.params.id, req.body);
    res.status(200).json(updatedApartment);
  } catch (error) {
    if (error.message === "Apartment nuk u gjet.") {
      return res.status(404).json({ message: error.message });
    }

    res.status(400).json({ message: error.message });
  }
};

const deleteApartment = (req, res) => {
  try {
    apartmentService.delete(req.params.id);
    res.status(200).json({ message: "Apartment u fshi me sukses." });
  } catch (error) {
    if (error.message === "Apartment nuk u gjet.") {
      return res.status(404).json({ message: error.message });
    }

    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllApartments,
  getApartmentById,
  createApartment,
  updateApartment,
  deleteApartment,
};