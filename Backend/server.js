const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const walletRoutes = require("./routes/walletRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userTaskRoutes = require("./routes/userTaskRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/wallet", walletRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/user-tasks", userTaskRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend running successfully",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });