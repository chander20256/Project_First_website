import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

const DashboardSidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const location = useLocation();

  // helper to check active link
  const isActiveLink = (path, exact) => {
    return exact
      ? location.pathname === path
      : location.pathname.startsWith(path);
  };

  const mainItems = [
    { path: "/dashboard", label: "Dashboard", exact: true },
    { path: "/dashboard/wallet", label: "Wallet" },
    { path: "/dashboard/games", label: "Games" },
    { path: "/dashboard/surveys", label: "Surveys" },
    { path: "/dashboard/tasks", label: "Tasks" },
    { path: "/dashboard/leaderboard", label: "Leaderboard" },
    { path: "/dashboard/referrals", label: "Referrals" },
    { path: "/dashboard/quizzes", label: "Quizzes" },
  ];

  const bottomItems = [
    { path: "/dashboard/profile", label: "Profile" },
    { path: "/dashboard/settings", label: "Settings" },
  ];

  const renderNavItem = (item) => {
    const active = isActiveLink(item.path, item.exact);

    return (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.exact || false}
        onClick={onClose}
        className="relative group flex items-center rounded-lg text-sm font-medium transition-all duration-200"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.03em",
          textDecoration: "none",
          color: active ? "#FF6B00" : "rgba(255,255,255,0.5)",
          background: active ? "rgba(255,107,0,0.1)" : "transparent",
          borderLeft: active ? "3px solid #FF6B00" : "3px solid transparent",
          padding: isCollapsed ? "10px 0" : "10px 12px",
          justifyContent: isCollapsed ? "center" : "flex-start",
          gap: isCollapsed ? "0" : "12px",
        }}
        onMouseEnter={(e) => {
          if (!active) {
            e.currentTarget.style.color = "rgba(255,255,255,0.85)";
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        {/* Label */}
        <span
          style={{
            maxWidth: isCollapsed ? "0px" : "160px",
            opacity: isCollapsed ? 0 : 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            transition: "max-width 0.3s ease, opacity 0.2s ease",
            display: "inline-block",
          }}
        >
          {item.label}
        </span>

        {/* Tooltip (collapsed mode) */}
        {isCollapsed && (
          <span
            className="pointer-events-none absolute left-full ml-3 px-2.5 py-1.5 rounded-md text-xs font-semibold
                       opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap"
            style={{
              background: "#1c1c1c",
              color: "#FF6B00",
              border: "1px solid rgba(255,107,0,0.3)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
              zIndex: 999,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {item.label}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col justify-between flex-shrink-0"
        style={{
          width: isCollapsed ? "64px" : "256px",
          position: "sticky",
          top: "65px",
          height: "calc(100vh - 65px)",
          background: "#0A0A0A",
          borderRight: "1px solid rgba(255,107,0,0.12)",
          transition: "width 0.3s ease",
          overflow: "hidden",
          zIndex: 20,
        }}
      >
        <div className="flex flex-col flex-1 overflow-y-auto mt-2">
          <div className="flex items-center justify-between px-3 pt-4 pb-3">
            <span
              style={{
                color: "rgba(255,255,255,0.2)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: isCollapsed ? 0 : 1,
              }}
            >
              Main Menu
            </span>

            <button onClick={onToggleCollapse}>
              {isCollapsed ? ">" : "<"}
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-2">
            {mainItems.map(renderNavItem)}
          </nav>
        </div>

        <div className="flex flex-col gap-1 px-2 pb-4">
          <span style={{ fontSize: "0.65rem", opacity: isCollapsed ? 0 : 1 }}>
            Account
          </span>
          {bottomItems.map(renderNavItem)}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className="lg:hidden"
        style={{
          position: "fixed",
          top: "65px",
          left: 0,
          width: "256px",
          height: "calc(100vh - 65px)",
          background: "#0A0A0A",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          zIndex: 40,
        }}
      >
        <div className="flex flex-col p-3">
          {mainItems.map(renderNavItem)}
          {bottomItems.map(renderNavItem)}
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;