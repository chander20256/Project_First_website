const express = require("express");
const {
  getBalance,
  addMoney,
  withdrawMoney,
} = require("../Controllers/walletController");

const router = express.Router();

const { getTransactions } = require("../Controllers/walletController");

router.get("/transactions", getTransactions);

router.get("/balance", getBalance);
router.post("/add", addMoney);
router.post("/withdraw", withdrawMoney);
console.log(getTransactions);

module.exports = router;