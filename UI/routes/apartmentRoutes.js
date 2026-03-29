const express = require("express");
const router = express.Router();

const {
  getAllApartments,
  getApartmentById,
  createApartment,
  updateApartment,
  deleteApartment,
} = require("../controllers/apartmentController");

router.get("/", getAllApartments);
router.get("/:id", getApartmentById);
router.post("/", createApartment);
router.put("/:id", updateApartment);
router.delete("/:id", deleteApartment);

module.exports = router;