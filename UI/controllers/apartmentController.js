const apartmentService = require("../../Services/apartmentService");

const getAllApartments = async (req, res) => {
  try {
    const apartments = await apartmentService.getAllApartments();
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching apartments", error: error.message });
  }
};

const getApartmentById = async (req, res) => {
  try {
    const apartment = await apartmentService.getApartmentById(req.params.id);

    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching apartment", error: error.message });
  }
};

const createApartment = async (req, res) => {
  try {
    const newApartment = await apartmentService.createApartment(req.body);
    res.status(201).json(newApartment);
  } catch (error) {
    res.status(500).json({ message: "Error creating apartment", error: error.message });
  }
};

const updateApartment = async (req, res) => {
  try {
    const updatedApartment = await apartmentService.updateApartment(req.params.id, req.body);

    if (!updatedApartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    res.status(200).json(updatedApartment);
  } catch (error) {
    res.status(500).json({ message: "Error updating apartment", error: error.message });
  }
};

const deleteApartment = async (req, res) => {
  try {
    const deletedApartment = await apartmentService.deleteApartment(req.params.id);

    if (!deletedApartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    res.status(200).json({ message: "Apartment deleted successfully", deletedApartment });
  } catch (error) {
    res.status(500).json({ message: "Error deleting apartment", error: error.message });
  }
};

module.exports = {
  getAllApartments,
  getApartmentById,
  createApartment,
  updateApartment,
  deleteApartment,
};