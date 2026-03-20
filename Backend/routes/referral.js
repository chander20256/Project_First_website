// routes/referral.js — TEMPORARY (to test if data shows)
const express  = require("express");
const router   = express.Router();
const Referral = require("../models/Referral");

router.get("/", async (req, res) => {
  try {
    const referrals = await Referral.find()
      .populate("referredUser", "username createdAt")
      .sort({ createdAt: -1 });

    const formatted = referrals.map((r) => ({
      _id:      r._id,
      name:     r.referredUser?.username || "Unknown",
      joined:   r.referredUser?.createdAt || r.createdAt,
      status:   r.status,
      earnings: r.earnings,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching referrals" });
  }
});

module.exports = router;