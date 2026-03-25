import React from "react";
import { FaClipboardList, FaGamepad, FaGift, FaUserPlus } from "react-icons/fa";

const RecentTransactions = () => {
  const transactions = [
    {
      id: 1,
      description: "Completed survey #142",
      date: "2023-02-27",
      amount: "+$5.00",
      type: "survey",
    },
    {
      id: 2,
      description: "Won Quiz Game",
      date: "2023-02-27",
      amount: "+$2.50",
      type: "game",
    },
    {
      id: 3,
      description: "Daily Spin Reward",
      date: "2023-02-26",
      amount: "+$1.00",
      type: "bonus",
    },
    {
      id: 4,
      description: "Referral bonus - Sarah M.",
      date: "2023-02-25",
      amount: "+$10.00",
      type: "referral",
    },
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'survey':
        return <FaClipboardList className="text-lg" style={{ color: "#7C3AED" }} />;
      case 'game':
        return <FaGamepad className="text-lg" style={{ color: "#FF6B00" }} />;
      case 'bonus':
        return <FaGift className="text-lg" style={{ color: "#FF6B00" }} />;
      case 'referral':
        return <FaUserPlus className="text-lg" style={{ color: "#0ea5e9" }} />;
      default:
        return null;
    }
  };

  const getIconBg = (type) => {
    switch(type) {
      case 'survey':
        return "rgba(124,58,237,0.08)";
      case 'game':
        return "rgba(255,107,0,0.08)";
      case 'bonus':
        return "rgba(255,107,0,0.08)";
      case 'referral':
        return "rgba(14,165,233,0.08)";
      default:
        return "#f3f4f6";
    }
  };

  const getIconBorder = (type) => {
    switch(type) {
      case 'survey':
        return "rgba(124,58,237,0.2)";
      case 'game':
        return "rgba(255,107,0,0.2)";
      case 'bonus':
        return "rgba(255,107,0,0.2)";
      case 'referral':
        return "rgba(14,165,233,0.2)";
      default:
        return "#e5e7eb";
    }
  };

  // Calculate weekly earnings
  const weeklyEarnings = transactions
    .filter(t => {
      const transactionDate = new Date(t.date);
      const today = new Date();
      const weekAgo = new Date(today.setDate(today.getDate() - 7));
      return transactionDate >= weekAgo;
    })
    .reduce((sum, t) => sum + parseFloat(t.amount.replace('+$', '')), 0);

  return (
    <div
      className="rounded-2xl p-5 sm:p-7 w-full"
      style={{
        background: "#ffffff",
        border: "1px solid #f0f0f0",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div
            className="rounded-full hidden sm:block"
            style={{ width: 4, height: 28, background: "#FF6B00" }}
          />
          <div>
            <h2 className="text-lg sm:text-xl font-bold" style={{ color: "#0a0a0a" }}>
              Recent Transactions
            </h2>
            <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: "#9ca3af" }}>
              Your latest earnings activity
            </p>
          </div>
        </div>

        {/* Week badge */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: "#f3f4f6" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-xs sm:text-sm font-medium" style={{ color: "#374151" }}>
            This Week
          </span>
        </div>
      </div>

      {/* Transactions list */}
      <div className="space-y-2 sm:space-y-3">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl transition-all duration-200"
            style={{
              border: "1px solid #f0f0f0",
              background: "#ffffff",
            }}
          >
            {/* Icon */}
            <div
              className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{
                width: 36,
                height: 36,
                smWidth: 40,
                smHeight: 40,
                background: getIconBg(t.type),
                border: `1px solid ${getIconBorder(t.type)}`,
              }}
            >
              {getIcon(t.type)}
            </div>

            {/* Transaction details */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm sm:text-base truncate" style={{ color: "#0a0a0a" }}>
                {t.description}
              </p>
              
              <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                {new Date(t.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Amount */}
            <p className="text-base sm:text-lg font-bold flex-shrink-0" style={{ color: "#22c55e" }}>
              {t.amount}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="mt-6 pt-4"
        style={{ borderTop: "1px solid #f0f0f0" }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-[10px] sm:text-xs" style={{ color: "#9ca3af" }}>
              Weekly Earnings
            </p>
            <p className="text-xl sm:text-2xl font-bold mt-0.5 sm:mt-1" style={{ color: "#0a0a0a" }}>
              ${weeklyEarnings.toFixed(2)}
            </p>
          </div>
          
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 w-full sm:w-auto justify-center"
            style={{
              background: "rgba(255,107,0,0.08)",
              border: "1px solid rgba(255,107,0,0.2)",
              color: "#FF6B00",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FF6B00";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,107,0,0.08)";
              e.currentTarget.style.color = "#FF6B00";
            }}
          >
            View All
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>

  );
};

export default RecentTransactions;