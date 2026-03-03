import React from "react";

const DashboardPage = () => {
  // Sample data for testing
  const recentTransactions = [
    {
      id: 1,
      description: "Completed survey #142",
      date: "2023-02-27",
      amount: "+$5.00",
    },
    {
      id: 2,
      description: "Won Quiz Game",
      date: "2023-02-27",
      amount: "+$2.50",
    },
    {
      id: 3,
      description: "Daily Spin Reward",
      date: "2023-02-26",
      amount: "+$1.00",
    },
    {
      id: 4,
      description: "Referral bonus - Sarah M.",
      date: "2023-02-25",
      amount: "+$10.00",
    },
  ];

  const leaderboardData = [
    { id: 1, name: "John Doe", points: 2500 },
    { id: 2, name: "Jane Smith", points: 2350 },
    { id: 3, name: "Mike Johnson", points: 2100 },
    { id: 4, name: "Sarah Williams", points: 1950 },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Welcome Section */}
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>
          Welcome, User!
        </h1>
        <p style={{ fontSize: "16px", color: "#666" }}>
          Ready to Unlock Your Earning Potential?
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#666" }}>Games</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>
            12
          </p>
        </div>
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#666" }}>Surveys</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>8</p>
        </div>
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#666" }}>Tasks</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>
            15
          </p>
        </div>
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#666" }}>Referrals</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>5</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}
      >
        {/* Recent Transactions */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginTop: "0", marginBottom: "20px" }}>
            Recent Transactions
          </h2>
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <p style={{ margin: "0 0 4px 0", fontWeight: "500" }}>
                  {transaction.description}
                </p>
                <p style={{ margin: "0", fontSize: "12px", color: "#999" }}>
                  {transaction.date}
                </p>
              </div>
              <p style={{ margin: "0", fontWeight: "bold", color: "#4CAF50" }}>
                {transaction.amount}
              </p>
            </div>
          ))}
          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <p style={{ margin: "0", fontWeight: "bold" }}>
              Weekly Earnings: $45.50
            </p>
          </div>
        </div>

        {/* Leaderboard */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginTop: "0", marginBottom: "20px" }}>Leaderboard</h2>
          {leaderboardData.map((user, index) => (
            <div
              key={user.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span
                  style={{
                    width: "24px",
                    height: "24px",
                    background:
                      index === 0
                        ? "#FFD700"
                        : index === 1
                          ? "#C0C0C0"
                          : index === 2
                            ? "#CD7F32"
                            : "#f0f0f0",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {index + 1}
                </span>
                <span>{user.name}</span>
              </div>
              <span style={{ fontWeight: "bold" }}>{user.points} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          marginTop: "30px",
        }}
      >
        <button
          style={{
            padding: "15px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Spin Wheel
        </button>
        <button
          style={{
            padding: "15px",
            background: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Available Tasks
        </button>
        <button
          style={{
            padding: "15px",
            background: "#FF9800",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Withdraw
        </button>
        <button
          style={{
            padding: "15px",
            background: "#9C27B0",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Transaction History
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
