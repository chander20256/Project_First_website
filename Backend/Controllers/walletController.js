let balance = 0;

// 🔹 transactions array declare karo
let transactions = [];

const getBalance = (req, res) => {
  res.json({ balance });
};

const getTransactions = (req, res) => {
  res.json(transactions);
};

const addMoney = (req, res) => {
  const { amount } = req.body;

  balance += amount;

  // transaction add
  transactions.unshift({
    id: Date.now(),
    type: "credit",
    desc: "Money Added",
    amount,
    date: new Date().toISOString().split("T")[0],
    status: "completed",
  });

  res.json({ balance });
};

const withdrawMoney = (req, res) => {
  const { amount } = req.body;

  if (amount > balance) {
    return res.status(400).json({
      message: "Balance cannot be negative",
    });
  }

  balance -= amount;

  transactions.unshift({
    id: Date.now(),
    type: "debit",
    desc: "Withdraw",
    amount,
    date: new Date().toISOString().split("T")[0],
    status: "completed",
  });

  res.json({ balance });
};

module.exports = {
  getBalance,
  addMoney,
  withdrawMoney,
  getTransactions,
};