import React from "react";

const DashboardHeader = () => {
  return (
    <header
      style={{
        background: "white",
        padding: "16px 24px",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "20px" }}>Dashboard</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span>Welcome, User!</span>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          👤
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
