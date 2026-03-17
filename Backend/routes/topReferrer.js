// routes/topReferrer.js
const express = require("express");
const router = express.Router();
const Referral = require("../models/Referral");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    // Group by referrer and count referrals
    const top = await Referral.aggregate([
      {
        $group: {
          _id: "$referrer",
          totalReferrals: { $sum: 1 },
          totalEarnings: { $sum: "$earnings" },
        },
      },
      { $sort: { totalReferrals: -1 } },
      { $limit: 1 },
    ]);

    if (!top.length) {
      return res.json(null);
    }

    // Get user details
    const user = await User.findById(top[0]._id);

    res.json({
      name: user.username,
      referrals: top[0].totalReferrals,
      earnings: top[0].totalEarnings,
      avatar: user.avatar || `https://i.pravatar.cc/100`,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching top referrer" });
  }
});

module.exports = router;