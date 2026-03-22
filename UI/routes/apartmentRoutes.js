const express = require("express");
const router = express.Router();
const apartmentController = require("../controllers/ApartmentController");

router.get("/", apartmentController.getAllApartments);
router.get("/:id", apartmentController.getApartmentById);

module.exports = router;