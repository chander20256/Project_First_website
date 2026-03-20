// routes/referral.js
const express    = require("express");
const router     = express.Router();
const Referral   = require("../models/Referral");
const { protectRoute } = require("../middleware/authMiddleware");

router.get("/", protectRoute, async (req, res) => {
  try {
    console.log("👤 Logged in user ID:", req.user._id);
    console.log("🔍 Searching referrals for:", req.user._id);

    const referrals = await Referral.find({ referrer: req.user._id })
      .populate("referredUser", "username createdAt")
      .sort({ createdAt: -1 });

    console.log("📋 Found referrals:", referrals.length);

    const formatted = referrals.map((r) => ({
      _id:      r._id,
      name:     r.referredUser?.username || "Unknown",
      joined:   r.referredUser?.createdAt || r.createdAt,
      status:   r.status,
      earnings: r.earnings,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Referral fetch error:", err.message);
    res.status(500).json({ message: "Error fetching referrals" });
  }
});

module.exports = router; // ✅ THIS LINE WAS MISSING