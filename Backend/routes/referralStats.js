// routes/referralStats.js
const express = require("express");
const router = express.Router();
const Referral = require("../models/Referral");

router.get("/", async (req, res) => {
  try {
    const userId = req.user?.id; // from JWT (recommended)

    // 1️⃣ Total referrals
    const totalReferrals = await Referral.countDocuments({
      referrer: userId,
    });

    // 2️⃣ Active referrals
    const activeReferrals = await Referral.countDocuments({
      referrer: userId,
      status: "Active",
    });

    // 3️⃣ Total earnings
    const earningsData = await Referral.aggregate([
      { $match: { referrer: userId } },
      {
        $group: {
          _id: null,
          total: { $sum: "$earnings" },
        },
      },
    ]);

    const totalEarnings = earningsData[0]?.total || 0;

    res.json({
      totalReferrals,
      activeReferrals,
      totalEarnings,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});

module.exports = router;