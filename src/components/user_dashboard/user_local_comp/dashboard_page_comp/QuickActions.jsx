import React from "react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Games",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M12 12h.01M8 12h.01M16 12h.01M12 8h.01M12 16h.01" />
        </svg>
      ),
      color: "#FF6B00",
      bg: "rgba(255,107,0,0.06)",
      border: "rgba(255,107,0,0.12)",
      route: "/dashboard/games",
    },
    {
      label: "Deposit",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      ),
      color: "#FF6B00",
      bg: "rgba(255,107,0,0.06)",
      border: "rgba(255,107,0,0.12)",
      route: "/dashboard/wallet",
    },
    {
      label: "Withdraw",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      ),
      color: "#FF6B00",
      bg: "rgba(255,107,0,0.06)",
      border: "rgba(255,107,0,0.12)",
      route: "/dashboard/wallet",
    },
    {
      label: "View Ads",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      color: "#FF6B00",
      bg: "rgba(255,107,0,0.06)",
      border: "rgba(255,107,0,0.12)",
      route: "/dashboard/ads",
    },

  ];

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => navigate(action.route)}
          className="flex flex-col items-center justify-center gap-2 rounded-xl py-4 px-3 transition-all duration-200"
          style={{
            background: "#ffffff",
            border: `1px solid ${action.border}`,
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 6px 20px ${action.bg}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)";
          }}
        >
          {/* Icon circle */}
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 40,
              height: 40,
              background: action.bg,
              border: `1px solid ${action.border}`,
              color: action.color,
            }}
          >
            {action.icon}
          </div>

          {/* Label */}
          <span
            className="text-xs font-semibold"
            style={{ color: "#0a0a0a" }}
          >
            {action.label}
          </span>

          {/* Arrow */}
          <span
            className="text-xs"
            style={{ color: action.color }}
          >
            Go →
          </span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;