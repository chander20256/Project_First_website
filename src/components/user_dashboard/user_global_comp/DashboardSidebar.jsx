import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaWallet,
  FaGamepad,
  FaClipboardList,
  FaTasks,
  FaTrophy,
  FaUserFriends,
  FaQuestionCircle,
  FaUser,
  FaCog,
} from "react-icons/fa";

const DashboardSidebar = () => {
  const location = useLocation();
  const navRef = useRef(null);

  const [indicatorStyle, setIndicatorStyle] = useState({});

  const mainItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaHome /> },
    { path: "/dashboard/wallet", label: "Wallet", icon: <FaWallet /> },
    { path: "/dashboard/games", label: "Games", icon: <FaGamepad /> },
    { path: "/dashboard/surveys", label: "Surveys", icon: <FaClipboardList /> },
    { path: "/dashboard/tasks", label: "Tasks", icon: <FaTasks /> },
    { path: "/dashboard/leaderboard", label: "Leaderboard", icon: <FaTrophy /> },
    { path: "/dashboard/referrals", label: "Referrals", icon: <FaUserFriends /> },
    { path: "/dashboard/quizzes", label: "Quizzes", icon: <FaQuestionCircle /> },
  ];

  const bottomItems = [
    { path: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
    { path: "/dashboard/settings", label: "Settings", icon: <FaCog /> },
  ];

  useEffect(() => {
    const activeEl = navRef.current?.querySelector(".active-item");
    if (activeEl) {
      setIndicatorStyle({
        top: activeEl.offsetTop + "px",
        height: activeEl.offsetHeight + "px",
      });
    }
  }, [location.pathname]);

  const renderItem = (item) => (
    <NavLink key={item.path} to={item.path} end={item.path === "/dashboard"}>
      {({ isActive }) => (
        <motion.div
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer ${
            isActive ? "active-item" : ""
          }`}
          style={{
            color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
            background: isActive
              ? "linear-gradient(135deg, rgba(255,107,0,0.25), rgba(255,107,0,0.05))"
              : "transparent",
          }}
        >
          {/* 🔥 Animated Icon */}
          <motion.div
            whileHover={{ rotate: 10, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isActive
                ? "linear-gradient(145deg, #ff7a18, #ff6b00)"
                : "linear-gradient(145deg, #1a1a1a, #0c0c0c)",
              boxShadow: isActive
                ? "0 6px 20px rgba(255,107,0,0.6)"
                : "0 4px 12px rgba(0,0,0,0.8)",
            }}
          >
            {item.icon}
          </motion.div>

          {/* Label */}
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.04em",
            }}
          >
            {item.label}
          </span>

          {/* Glow Dot */}
          {isActive && (
            <motion.div
              layoutId="activeDot"
              style={{
                marginLeft: "auto",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#FF6B00",
                boxShadow: "0 0 10px #FF6B00",
              }}
            />
          )}
        </motion.div>
      )}
    </NavLink>
  );

  return (
    <aside
      style={{
        width: "260px",
        height: "100vh",
        background: "rgba(10,10,10,0.7)",
        backdropFilter: "blur(16px)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* TOP */}
      <div>
        <h2
          style={{
            padding: "20px",
            fontSize: "12px",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "2px",
          }}
        >
          MAIN MENU
        </h2>

        <div className="relative flex flex-col gap-2 px-3" ref={navRef}>
          {/* 🔥 Sliding Indicator */}
          <motion.div
            animate={indicatorStyle}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "absolute",
              left: "0",
              width: "4px",
              borderRadius: "4px",
              background: "linear-gradient(to bottom, #ff7a18, #ff6b00)",
              boxShadow: "0 0 12px rgba(255,107,0,0.8)",
            }}
          />

          {mainItems.map(renderItem)}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="px-3 pb-5">
        <h2
          style={{
            padding: "10px",
            fontSize: "12px",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "2px",
          }}
        >
          ACCOUNT
        </h2>

        <div className="flex flex-col gap-2">
          {bottomItems.map(renderItem)}
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;