const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Transaction = require("../models/Transaction");


// GET WALLET BALANCE
router.get("/balance/:userId", async (req, res) => {

  try {

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      balance: user.wallet || 0
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});


// ADD MONEY
router.post("/add", async (req, res) => {

  try {

    const { userId, amount } = req.body;

     console.log("Request body:", req.body); // 👈 ADD THIS

    if (!userId || !amount) {
      return res.status(400).json({ message: "Missing data" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const value = Number(amount);

    user.wallet = (user.wallet || 0) + value;

    await user.save();

    await Transaction.create({
      userId,
      type: "credit",
      amount: value,
      description: "Money added"
    });

    res.json({
      message: "Money added successfully",
      balance: user.wallet
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }

});





// WITHDRAW MONEY
router.post("/withdraw", async (req, res) => {

  try {

    const { userId, amount } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const value = Number(amount);

    if (user.wallet < value) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.wallet -= value;

    await user.save();

    await Transaction.create({
      userId,
      type: "debit",
      amount: value,
      description: "Money withdrawn"
    });

    res.json({
      message: "Withdraw successful",
      balance: user.wallet
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});


// TRANSACTION HISTORY
router.get("/transactions/:userId", async (req, res) => {

  try {

    const transactions = await Transaction.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(transactions);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  

});

module.exports = router;