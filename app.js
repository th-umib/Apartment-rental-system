const express = require("express");
const path = require("path");

const userRoutes = require("./UI/routes/userRoutes");
const apartmentRoutes = require("./UI/routes/apartmentRoutes");
const bookingRoutes = require("./UI/routes/bookingRoutes");
const authRoutes = require("./UI/routes/authRoutes");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "UI/frontend")));
app.use("/users", userRoutes);
app.use("/apartments", apartmentRoutes);
app.use("/bookings", bookingRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));