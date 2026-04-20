const express = require("express");
const router = express.Router();

const db = require("../../config/db");

// GET all apartments
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM apartments ORDER BY id DESC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET /apartments error:", error);
    res.status(500).json({ message: "Failed to load apartments." });
  }
});

// GET apartment by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid apartment ID." });
  }

  try {
    const result = await db.query("SELECT * FROM apartments WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Apartment not found." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("GET /apartments/:id error:", error);
    res.status(500).json({ message: "Failed to load apartment." });
  }
});

// POST new apartment
router.post("/", async (req, res) => {
  console.log("POST /apartments req.body:", req.body);

  const {
    title,
    description,
    city,
    address,
    price_per_month,
    price,
    bedrooms,
    bathrooms,
    isAvailable
  } = req.body || {};

  const finalDescription =
    description && description.trim() !== ""
      ? description.trim()
      : "Apartment added from frontend form";

  const finalPrice =
    price_per_month !== undefined && price_per_month !== null
      ? Number(price_per_month)
      : Number(price);

  const finalBedrooms =
    bedrooms !== undefined && bedrooms !== null && bedrooms !== ""
      ? Number(bedrooms)
      : 1;

  const finalBathrooms =
    bathrooms !== undefined && bathrooms !== null && bathrooms !== ""
      ? Number(bathrooms)
      : 1;

  const finalAvailability =
    isAvailable === false || isAvailable === "false" ? false : true;

  if (!title || !city || !address || isNaN(finalPrice) || finalPrice <= 0) {
    return res.status(400).json({
      message: "Missing required fields.",
      receivedBody: req.body
    });
  }

  if (isNaN(finalBedrooms) || finalBedrooms < 0 || isNaN(finalBathrooms) || finalBathrooms < 0) {
    return res.status(400).json({
      message: "Invalid numeric values."
    });
  }

  try {
    const result = await db.query(
      `
      INSERT INTO apartments (
        title,
        description,
        city,
        address,
        price_per_month,
        bedrooms,
        bathrooms,
        is_available
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
      [
        title,
        finalDescription,
        city,
        address,
        finalPrice,
        finalBedrooms,
        finalBathrooms,
        finalAvailability
      ]
    );

    console.log("Apartment saved to database:", result.rows[0]);

    res.status(201).json({
      message: "Apartment created successfully.",
      apartment: result.rows[0]
    });
  } catch (error) {
    console.error("POST /apartments error:", error);
    res.status(500).json({
      message: "Failed to create apartment.",
      error: error.message
    });
  }
});

// UPDATE apartment by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid apartment ID." });
  }

  const {
    title,
    description,
    city,
    address,
    price_per_month,
    price,
    bedrooms,
    bathrooms,
    isAvailable
  } = req.body || {};

  const finalDescription =
    description && description.trim() !== ""
      ? description.trim()
      : "Apartment updated from frontend form";

  const finalPrice =
    price_per_month !== undefined && price_per_month !== null
      ? Number(price_per_month)
      : Number(price);

  const finalBedrooms =
    bedrooms !== undefined && bedrooms !== null && bedrooms !== ""
      ? Number(bedrooms)
      : 1;

  const finalBathrooms =
    bathrooms !== undefined && bathrooms !== null && bathrooms !== ""
      ? Number(bathrooms)
      : 1;

  const finalAvailability =
    isAvailable === false || isAvailable === "false" ? false : true;

  if (!title || !city || !address || isNaN(finalPrice) || finalPrice <= 0) {
  return res.status(400).json({
    message: "PUBLIC/ADMIN NEW ROUTE IS ACTIVE",
    receivedBody: req.body
  });
}

  try {
    const existing = await db.query("SELECT * FROM apartments WHERE id = $1", [id]);

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Apartment not found." });
    }

    const result = await db.query(
      `
      UPDATE apartments
      SET
        title = $1,
        description = $2,
        city = $3,
        address = $4,
        price_per_month = $5,
        bedrooms = $6,
        bathrooms = $7,
        is_available = $8,
        updated_at = NOW()
      WHERE id = $9
      RETURNING *
      `,
      [
        title,
        finalDescription,
        city,
        address,
        finalPrice,
        finalBedrooms,
        finalBathrooms,
        finalAvailability,
        id
      ]
    );

    res.status(200).json({
      message: "Apartment updated successfully.",
      apartment: result.rows[0]
    });
  } catch (error) {
    console.error("PUT /apartments/:id error:", error);
    res.status(500).json({ message: "Failed to update apartment." });
  }
});

// DELETE apartment by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid apartment ID." });
  }

  try {
    const existing = await db.query("SELECT * FROM apartments WHERE id = $1", [id]);

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Apartment not found." });
    }

    await db.query("DELETE FROM apartments WHERE id = $1", [id]);

    res.status(200).json({ message: "Apartment deleted successfully." });
  } catch (error) {
    console.error("DELETE /apartments/:id error:", error);
    res.status(500).json({ message: "Failed to delete apartment." });
  }
});

module.exports = router;