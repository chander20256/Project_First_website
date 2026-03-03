import React from "react";
import { NavLink } from "react-router-dom";

const DashboardSidebar = () => {
  const menuItems = [
    { path: "/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/dashboard/wallet", icon: "💰", label: "Wallet" },
    { path: "/dashboard/games", icon: "🎮", label: "Games" },
    { path: "/dashboard/surveys", icon: "📝", label: "Surveys" },
    { path: "/dashboard/tasks", icon: "✅", label: "Tasks" },
    { path: "/dashboard/leaderboard", icon: "🏆", label: "Leaderboard" },
    { path: "/dashboard/referrals", icon: "👥", label: "Referrals" },
  ];

  return (
    <aside
      style={{
        width: "250px",
        background: "#1a1a1a",
        color: "white",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <div style={{ padding: "20px", borderBottom: "1px solid #333" }}>
        <h3 style={{ margin: 0, color: "white" }}>Menu</h3>
      </div>
      <nav style={{ padding: "20px 0" }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 20px",
              color: isActive ? "#4CAF50" : "#fff",
              textDecoration: "none",
              background: isActive ? "#333" : "transparent",
              borderLeft: isActive
                ? "4px solid #4CAF50"
                : "4px solid transparent",
            })}
          >
            <span style={{ fontSize: "20px" }}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
