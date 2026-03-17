// routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Referral = require("../models/Referral");

router.post("/register", async (req, res) => {
  try {
    const { username, password, referralCode } = req.body;

    // 1️⃣ Create new user
    const newUser = await User.create({
      username,
      password,
    });

    // 2️⃣ Check if referral code exists
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });

      if (referrer) {
        // 3️⃣ Create referral entry
        await Referral.create({
          referrer: referrer._id,
          referredUser: newUser._id,
          status: "Active",
          earnings: 50,
        });

        // 4️⃣ (Optional) Add tokens to referrer wallet
        // await Wallet.updateOne({ user: referrer._id }, { $inc: { balance: 50 } });
      }
    }

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

module.exports = router;