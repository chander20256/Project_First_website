import React, { useState, useEffect } from "react";

const StatCard = ({ label, value, icon, color, bg, border, statKey, selectedStat, onSelectStat }) => {
  const isSelected = selectedStat === statKey;

  return (
    <div
      onClick={() => onSelectStat(statKey)}
      className="flex flex-col justify-between rounded-xl p-3 sm:p-4 transition-all duration-200 cursor-pointer"
      style={{
        background: "#ffffff",
        border: isSelected ? `2px solid ${color}` : `1px solid ${border}`,
        boxShadow: isSelected
          ? `0 4px 20px ${bg}`
          : "0 2px 12px rgba(0,0,0,0.04)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Top row — label + icon */}
      <div className="flex items-center justify-between gap-1 text-[#030712]">
        <p
          className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate"
          style={{ color: "#9ca3af" }}
        >
          {label}
        </p>
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{
            width: 28,
            height: 28,
            smWidth: 36,
            smHeight: 36,
            background: bg,
            border: `1px solid ${border}`,
            color,
          }}
        >
          {React.cloneElement(icon, { width: 14, height: 14 })}
        </div>
      </div>

      {/* Value */}
      <div className="mt-2 sm:mt-3">
        <h3
          className="text-xl sm:text-2xl font-black leading-none text-[#030712]"
        >
          {value}
        </h3>
        <p className="text-[9px] sm:text-xs mt-1 font-medium" style={{ color: "#9ca3af" }}>
          Active
        </p>
      </div>

      {/* Colored underline indicator */}
      <div
        className="mt-2 sm:mt-3 rounded-full"
        style={{ height: 2, width: 24, background: color }}
      />

      {/* View Graph button - Desktop ONLY */}
      <button
        className="hidden sm:flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 w-fit"
        style={{
          background: isSelected ? color : bg,
          border: `1px solid ${border}`,
          color: isSelected ? "#ffffff" : color,
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent duplicate call if parent also has onClick
          onSelectStat(statKey);
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
        {isSelected ? "Viewing" : "View Graph"}
      </button>
    </div>
  );
};



const StatsLeft = ({ selectedStat, onSelectStat }) => {
  const [stats, setStats] = useState({
    completedTasks: 15,
    totalEarnings: 0, // Will be replaced by real points
    completedSurveys: 8,
    totalReferrals: 0,
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data) {
        setStats(prev => ({
          ...prev,
          totalEarnings: data.creds || 0,
          totalReferrals: data.referralCount || prev.totalReferrals
        }));
      }
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
    
    const handleBalanceUpdate = () => {
      fetchStats();
    };
    window.addEventListener("balanceUpdated", handleBalanceUpdate);
    
    return () => {
      window.removeEventListener("balanceUpdated", handleBalanceUpdate);
    };
  }, []);

  const cards = [
    {
      statKey: "tasks",
      label: "Tasks",
      value: stats.completedTasks,
      color: "#FF6B00",
      bg: "rgba(255,107,0,0.08)",
      border: "rgba(255,107,0,0.2)",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      statKey: "earnings",
      label: "Points Earned",
      value: stats.totalEarnings,
      color: "#16a34a",
      bg: "rgba(22,163,74,0.08)",
      border: "rgba(22,163,74,0.2)",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      statKey: "surveys",
      label: "Surveys",
      value: stats.completedSurveys,
      color: "#7C3AED",
      bg: "rgba(124,58,237,0.08)",
      border: "rgba(124,58,237,0.2)",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      statKey: "referrals",
      label: "Referrals",
      value: stats.totalReferrals,
      color: "#0ea5e9",
      bg: "rgba(14,165,233,0.08)",
      border: "rgba(14,165,233,0.2)",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 h-full">
      {cards.map((card, i) => (
        <StatCard
          key={i}
          {...card}
          selectedStat={selectedStat}
          onSelectStat={onSelectStat}
        />
      ))}
    </div>

  );
};

export default StatsLeft;