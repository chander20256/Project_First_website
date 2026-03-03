import React, { useState } from "react";

const DashboardWallet = () => {
  // Sample wallet data
  const [walletBalance, setWalletBalance] = useState(245.75);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const transactions = [
    {
      id: 1,
      type: "credit",
      description: "Completed survey #142",
      amount: 5.0,
      date: "2023-02-27",
      status: "completed",
    },
    {
      id: 2,
      type: "credit",
      description: "Won Quiz Game",
      amount: 2.5,
      date: "2023-02-27",
      status: "completed",
    },
    {
      id: 3,
      type: "credit",
      description: "Daily Spin Reward",
      amount: 1.0,
      date: "2023-02-26",
      status: "completed",
    },
    {
      id: 4,
      type: "credit",
      description: "Referral bonus - Sarah M.",
      amount: 10.0,
      date: "2023-02-25",
      status: "completed",
    },
    {
      id: 5,
      type: "debit",
      description: "Withdrawal to PayPal",
      amount: 50.0,
      date: "2023-02-24",
      status: "pending",
    },
    {
      id: 6,
      type: "credit",
      description: "Game Tournament Win",
      amount: 25.0,
      date: "2023-02-23",
      status: "completed",
    },
  ];

  const handleWithdraw = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= walletBalance) {
      setWalletBalance((prev) => prev - amount);
      alert(`Withdrawal of $${amount} requested successfully!`);
      setWithdrawAmount("");
    } else {
      alert("Invalid amount or insufficient balance!");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Wallet Header */}
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>My Wallet</h1>
        <p style={{ fontSize: "16px", color: "#666" }}>
          Manage your earnings and withdrawals
        </p>
      </div>

      {/* Balance Card */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "15px",
          padding: "30px",
          color: "white",
          marginBottom: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{ margin: "0 0 10px 0", opacity: "0.9", fontSize: "16px" }}
            >
              Available Balance
            </p>
            <h2 style={{ margin: "0", fontSize: "48px", fontWeight: "bold" }}>
              ${walletBalance.toFixed(2)}
            </h2>
            <p
              style={{ margin: "10px 0 0 0", opacity: "0.8", fontSize: "14px" }}
            >
              ≈ {(walletBalance * 82).toFixed(2)} INR
            </p>
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            <button
              style={{
                padding: "12px 30px",
                background: "rgba(255,255,255,0.2)",
                border: "2px solid white",
                borderRadius: "25px",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              Add Money
            </button>
            <button
              style={{
                padding: "12px 30px",
                background: "white",
                border: "none",
                borderRadius: "25px",
                color: "#667eea",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ margin: "0 0 8px 0", color: "#666", fontSize: "14px" }}>
            Total Earned
          </p>
          <h3 style={{ margin: "0", color: "#4CAF50", fontSize: "24px" }}>
            $1,245.50
          </h3>
        </div>
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ margin: "0 0 8px 0", color: "#666", fontSize: "14px" }}>
            Total Withdrawn
          </p>
          <h3 style={{ margin: "0", color: "#f44336", fontSize: "24px" }}>
            $999.75
          </h3>
        </div>
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ margin: "0 0 8px 0", color: "#666", fontSize: "14px" }}>
            Pending Withdrawals
          </p>
          <h3 style={{ margin: "0", color: "#FF9800", fontSize: "24px" }}>
            $50.00
          </h3>
        </div>
      </div>

      {/* Withdrawal Form and Recent Transactions */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}
      >
        {/* Withdrawal Form */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginTop: "0", marginBottom: "20px" }}>
            Withdraw Funds
          </h3>
          <form onSubmit={handleWithdraw}>
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                max={walletBalance}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Withdraw To
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  background: "white",
                }}
              >
                <option>PayPal</option>
                <option>Bank Transfer</option>
                <option>Cryptocurrency</option>
                <option>Mobile Money</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
            >
              Request Withdrawal
            </button>

            <p
              style={{
                margin: "15px 0 0 0",
                fontSize: "12px",
                color: "#999",
                textAlign: "center",
              }}
            >
              Minimum withdrawal: $10.00
            </p>
          </form>

          {/* Payment Methods */}
          <div style={{ marginTop: "30px" }}>
            <h4 style={{ marginBottom: "15px", color: "#666" }}>
              Linked Accounts
            </h4>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <span
                style={{
                  padding: "8px 15px",
                  background: "#f0f0f0",
                  borderRadius: "20px",
                  fontSize: "14px",
                }}
              >
                PayPal
              </span>
              <span
                style={{
                  padding: "8px 15px",
                  background: "#f0f0f0",
                  borderRadius: "20px",
                  fontSize: "14px",
                }}
              >
                Bank Account
              </span>
              <span
                style={{
                  padding: "8px 15px",
                  background: "#4CAF50",
                  color: "white",
                  borderRadius: "20px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                + Add New
              </span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: "0" }}>Transaction History</h3>
            <div>
              <select
                style={{
                  padding: "8px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                }}
              >
                <option>All</option>
                <option>Credits</option>
                <option>Debits</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 0",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background:
                        transaction.type === "credit" ? "#e8f5e8" : "#ffebee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                    }}
                  >
                    {transaction.type === "credit" ? "💰" : "💳"}
                  </div>
                  <div>
                    <p style={{ margin: "0 0 4px 0", fontWeight: "500" }}>
                      {transaction.description}
                    </p>
                    <p style={{ margin: "0", fontSize: "12px", color: "#999" }}>
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      margin: "0 0 4px 0",
                      fontWeight: "bold",
                      color:
                        transaction.type === "credit" ? "#4CAF50" : "#f44336",
                    }}
                  >
                    {transaction.type === "credit" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </p>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "3px 8px",
                      borderRadius: "12px",
                      background:
                        transaction.status === "completed"
                          ? "#e8f5e8"
                          : "#fff3e0",
                      color:
                        transaction.status === "completed"
                          ? "#4CAF50"
                          : "#FF9800",
                    }}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#667eea",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              View All Transactions →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "15px",
          marginTop: "30px",
        }}
      >
        <button
          style={{
            padding: "15px",
            background: "#f5f5f5",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.3s",
          }}
        >
          <span style={{ fontSize: "24px" }}>📊</span>
          <span>Earnings Report</span>
        </button>
        <button
          style={{
            padding: "15px",
            background: "#f5f5f5",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "24px" }}>📧</span>
          <span>Payment Settings</span>
        </button>
        <button
          style={{
            padding: "15px",
            background: "#f5f5f5",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "24px" }}>📱</span>
          <span>Mobile Money</span>
        </button>
        <button
          style={{
            padding: "15px",
            background: "#f5f5f5",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "24px" }}>⚙️</span>
          <span>Support</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardWallet;
