const express = require("express");
const router = express.Router();
const Referral = require("../models/Referral");

router.get("/", async (req, res) => {
  try {
    const referrals = await Referral.find()
      .populate("referredUser", "username")
      .sort({ createdAt: -1 });

    const formatted = referrals.map((r) => ({
      _id: r._id,
      name: r.referredUser?.username || "Unknown",
      joined: r.createdAt,
      status: r.status,
      earnings: r.earnings,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Error fetching referrals" });
  }
});

module.exports = router;