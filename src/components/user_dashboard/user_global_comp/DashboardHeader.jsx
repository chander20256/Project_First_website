import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardHeader = ({ onMenuToggle }) => {
  const [userData, setUserData] = useState({
    username: "User",
    initial: "U",
    balance: 0,
  });

  useEffect(() => {
    if (!document.getElementById("dashboard-fonts")) {
      const link = document.createElement("link");
      link.id = "dashboard-fonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }

    let initialUser = null;
    try {
      const stored = localStorage.getItem("user");
      if (stored) initialUser = JSON.parse(stored);
    } catch (e) {}

    if (initialUser) {
      setUserData({
        username: initialUser.username || "User",
        initial: (initialUser.username || "U").charAt(0).toUpperCase(),
        balance: initialUser.creds || 0,
      });
    }

    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.user) {
          setUserData({
            username: data.user.username || "User",
            initial: (data.user.username || "U").charAt(0).toUpperCase(),
            balance: data.user.creds || 0,
          });
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchMe();
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8"
      style={{
        background: "rgba(10,10,10,0.98)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,107,0,0.15)",
        boxShadow: "0 2px 24px rgba(0,0,0,0.4)",
        height: "65px",
      }}
    >
      {/* Left: Hamburger (mobile only) + Logo */}
      <div className="flex items-center gap-3">
        {/* Hamburger button — hidden on lg and above */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg gap-1.5"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,107,0,0.2)",
          }}
          aria-label="Toggle sidebar"
        >
          <span
            className="block w-4 h-0.5 rounded-full"
            style={{ background: "#FF6B00" }}
          />
          <span
            className="block w-4 h-0.5 rounded-full"
            style={{ background: "rgba(255,107,0,0.6)" }}
          />
          <span
            className="block w-3 h-0.5 rounded-full"
            style={{ background: "rgba(255,107,0,0.35)" }}
          />
        </button>

        {/* Logo */}
        <Link
          to="/dashboard"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.85rem",
            letterSpacing: "0.08em",
            lineHeight: 1,
            textDecoration: "none",
            color: "white",
          }}
        >
          REVA<span style={{ color: "#FF6B00" }}>Doo</span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Notifications */}
        <button
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.5)",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6B00")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
          }
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        {/* Balance — hide label on very small screens */}
        <div
          className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-semibold"
          style={{
            background: "rgba(255,107,0,0.1)",
            border: "1px solid rgba(255,107,0,0.25)",
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <span className="hidden sm:inline">Balance:</span>
          <span style={{ color: "#FF6B00" }}>{userData.balance}</span>
        </div>

        {/* Divider — hidden on small screens */}
        <div
          className="hidden sm:block"
          style={{ width: 1, height: 28, background: "rgba(255,255,255,0.08)" }}
        />

        {/* Profile */}
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{
              background: "linear-gradient(135deg, #FF6B00, #FF8C00)",
              boxShadow: "0 4px 14px rgba(255,107,0,0.32)",
            }}
          >
            {userData.initial}
          </div>
          {/* Username — hidden on small screens */}
          <span
            className="hidden sm:block text-sm font-medium"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {userData.username}
          </span>
        </div>
      </div>

      {/* Orange accent line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #FF6B00 50%, transparent 100%)",
        }}
      />
    </header>
  );
};

export default DashboardHeader;