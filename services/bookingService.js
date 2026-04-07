const db = require("../config/db");

const getAllBookings = async () => {
  const result = await db.query(`
    SELECT 
      bookings.*,
      users.full_name AS user_name,
      apartments.title AS apartment_title
    FROM bookings
    JOIN users ON bookings.user_id = users.id
    JOIN apartments ON bookings.apartment_id = apartments.id
    ORDER BY bookings.id DESC
  `);
  return result.rows;
};

const createBooking = async ({ user_id, apartment_id, visit_date, status, notes }) => {
  const result = await db.query(
    `INSERT INTO bookings (user_id, apartment_id, visit_date, status, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [user_id, apartment_id, visit_date, status || "pending", notes]
  );
  return result.rows[0];
};

const updateBookingStatus = async (id, status) => {
  const result = await db.query(
    `UPDATE bookings
     SET status = $1, updated_at = CURRENT_TIMESTAMP
     WHERE id = $2
     RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};

module.exports = {
  getAllBookings,
  createBooking,
  updateBookingStatus,
};