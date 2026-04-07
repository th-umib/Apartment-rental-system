const express = require("express");
const path = require("path");
const cors = require("cors");

const authRoutes = require("./UI/routes/authRoutes");
const userRoutes = require("./UI/routes/userRoutes");
const apartmentRoutes = require("./UI/routes/apartmentRoutes");
const bookingRoutes = require("./UI/routes/bookingRoutes");
const inquiryRoutes = require("./UI/routes/inquiryRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "UI/frontend")));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/apartments", apartmentRoutes);
app.use("/bookings", bookingRoutes);
app.use("/inquiries", inquiryRoutes);

app.get("/", (req, res) => {
  res.send("SmartApart API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});