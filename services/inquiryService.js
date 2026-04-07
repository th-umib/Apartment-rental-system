const db = require("../config/db");

const getAllInquiries = async () => {
  const result = await db.query(`
    SELECT 
      inquiries.*,
      apartments.title AS apartment_title
    FROM inquiries
    JOIN apartments ON inquiries.apartment_id = apartments.id
    ORDER BY inquiries.id DESC
  `);
  return result.rows;
};

const createInquiry = async ({ user_id, apartment_id, name, email, message }) => {
  const result = await db.query(
    `INSERT INTO inquiries (user_id, apartment_id, name, email, message)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [user_id || null, apartment_id, name, email, message]
  );
  return result.rows[0];
};

module.exports = {
  getAllInquiries,
  createInquiry,
};