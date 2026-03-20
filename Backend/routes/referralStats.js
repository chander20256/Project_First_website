// routes/referralStats.js — FULL FIXED FILE
const express    = require("express");
const router     = express.Router();
const mongoose   = require("mongoose");
const Referral   = require("../models/Referral");
const { protectRoute } = require("../middleware/authMiddleware");

router.get("/", protectRoute, async (req, res) => {
  try {
    // ✅ convert string id → ObjectId for aggregate
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const totalReferrals  = await Referral.countDocuments({ referrer: userId });
    const activeReferrals = await Referral.countDocuments({ referrer: userId, status: "Active" });

    const earningsData = await Referral.aggregate([
      { $match: { referrer: userId } },
      { $group: { _id: null, total: { $sum: "$earnings" } } },
    ]);

    const totalEarnings = earningsData[0]?.total || 0;

    res.json({ totalReferrals, activeReferrals, totalEarnings });
  } catch (err) {
    console.error("Stats error:", err.message);
    res.status(500).json({ message: "Error fetching stats" });
  }
});

module.exports = router;