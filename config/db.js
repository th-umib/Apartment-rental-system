const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "smartapart",
  password: "1234",
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }

  console.log("Database connected successfully to PostgreSQL.");
  release();
});

module.exports = pool;