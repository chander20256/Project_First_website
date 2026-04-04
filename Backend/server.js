const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

// Force known-good DNS resolvers for Atlas SRV lookups when local resolver blocks querySrv.
const dnsServers = (process.env.DNS_SERVERS || "8.8.8.8,1.1.1.1")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);
if (dnsServers.length) {
  dns.setServers(dnsServers);
}
const ensureIndexes = require("./utils/dbIndexes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

// Routes import
const walletRoutes = require("./routes/walletRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userTaskRoutes = require("./routes/userTaskRoutes");
const userRoutes = require("./routes/userRoutes");
// 👇 NEW: Survey route import kiya
const surveyRoutes = require("./routes/surveyRoutes");
const leaderboardRoutes = require("./routes/Leaderboardroutes");

// ✅ Initialize app FIRST
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ✅ FIXED server.js — only change these 2 lines order
app.use("/api/auth", require("./routes/auth"));
app.use("/api/wallet", walletRoutes);
app.use("/api/user-tasks", userTaskRoutes);
app.use("/api/user", require("./routes/user"));
app.use("/api/user", userRoutes);
app.use("/api/top-referrer", require("./routes/topReferrer"));

// Admin task management routes
app.use("/api/tasks/bundle", require("./routes/taskBundle"));
app.use("/api/tasks", taskRoutes);
app.use("/api/task-submissions",  require("./routes/Tasksubmissions"));  // ← NEW
app.use("/api/admin/tasks",       require("./routes/Admintasks")); 

// Quiz & Attempt Routes
app.use("/api/quizzes", require("./routes/quizzes"));
app.use("/api/attempts", require("./routes/attempts"));

// Contact & Feedback Routes
app.use("/api/contact", require("./routes/Contactroutes"));
app.use("/api/feedback", require("./routes/Feedbackroutes"));

// ⚠️ STATS must come BEFORE /api/referrals
app.use("/api/referrals/stats", require("./routes/referralStats"));
app.use("/api/referrals", require("./routes/referral"));

// 👇 NEW: Survey API route register kiya
app.use("/api/surveys", surveyRoutes);

//top leaderboard route
app.use("/api/leaderboard", leaderboardRoutes);

//Admin routes
app.use("/api/admin/leaderboard", require("./routes/adminLeaderboard"));
app.use("/api/admin/referrals", require("./routes/Adminreferral"));
app.use("/api/admin/users", require("./routes/adminUsers"));

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
    ensureIndexes();                        // ← add this line
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
