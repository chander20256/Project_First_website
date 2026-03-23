const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes import
const walletRoutes = require("./routes/walletRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userTaskRoutes = require("./routes/userTaskRoutes");
const userRoutes = require("./routes/userRoutes");
const feedbackRoutes = require("./routes/Feedbackroutes");
const contactRoutes = require("./routes/Contactroutes");

// ✅ Initialize app FIRST
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ FIXED server.js — only change these 2 lines order
app.use("/api/auth",              require("./routes/auth"));
app.use("/api/wallet",            walletRoutes);
app.use("/api/tasks",             taskRoutes);
app.use("/api/user-tasks",        userTaskRoutes);
app.use("/api/user",              require("./routes/user"));
app.use("/api/top-referrer",      require("./routes/topReferrer"));
app.use("/api/user",              userRoutes);

// ⚠️ STATS must come BEFORE /api/referrals
app.use("/api/referrals/stats",   require("./routes/referralStats"));
app.use("/api/referrals",         require("./routes/referral"));

// Feedback route 
app.use("/api/feedback",          feedbackRoutes);
app.use("/api/contact", contactRoutes);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend running successfully",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

// DB + Server start
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