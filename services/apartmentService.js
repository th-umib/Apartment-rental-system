const db = require("../config/db");

const getAllApartments = async () => {
  const result = await db.query("SELECT * FROM apartments ORDER BY id DESC");
  return result.rows;
};

const getApartmentById = async (id) => {
  const result = await db.query("SELECT * FROM apartments WHERE id = $1", [id]);
  return result.rows[0];
};

const createApartment = async (apartment) => {
  const {
    title,
    description,
    city,
    address,
    price_per_month,
    bedrooms,
    bathrooms,
    size_m2,
    image_url,
    is_available,
    created_by,
  } = apartment;

  const result = await db.query(
    `INSERT INTO apartments 
    (title, description, city, address, price_per_month, bedrooms, bathrooms, size_m2, image_url, is_available, created_by)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *`,
    [
      title,
      description,
      city,
      address,
      price_per_month,
      bedrooms,
      bathrooms,
      size_m2,
      image_url,
      is_available,
      created_by,
    ]
  );

  return result.rows[0];
};

const updateApartment = async (id, apartment) => {
  const {
    title,
    description,
    city,
    address,
    price_per_month,
    bedrooms,
    bathrooms,
    size_m2,
    image_url,
    is_available,
  } = apartment;

  const result = await db.query(
    `UPDATE apartments
     SET title = $1,
         description = $2,
         city = $3,
         address = $4,
         price_per_month = $5,
         bedrooms = $6,
         bathrooms = $7,
         size_m2 = $8,
         image_url = $9,
         is_available = $10,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $11
     RETURNING *`,
    [
      title,
      description,
      city,
      address,
      price_per_month,
      bedrooms,
      bathrooms,
      size_m2,
      image_url,
      is_available,
      id,
    ]
  );

  return result.rows[0];
};

const deleteApartment = async (id) => {
  const result = await db.query(
    "DELETE FROM apartments WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllApartments,
  getApartmentById,
  createApartment,
  updateApartment,
  deleteApartment,
};