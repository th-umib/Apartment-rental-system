const db = require("./config/db");
db.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully:");
    console.log(res.rows);
  }
});