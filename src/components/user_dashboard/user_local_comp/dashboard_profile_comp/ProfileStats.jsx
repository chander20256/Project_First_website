import React, { useState, useEffect } from "react";

const StatCard = ({ icon, label, value, sub, progress, color = "#FF6B00", suffix = "" }) => (
  <div style={{
    background: "#ffffff",
    borderRadius: 16,
    padding: "22px 24px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    fontFamily: "'DM Sans', sans-serif",
    flex: 1,
    minWidth: 140,
  }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
      <div style={{
        width: 34, height: 34, borderRadius: 9,
        background: `${color}14`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
      <span style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "2.1rem",
        color: "#0a0a0a",
        letterSpacing: "0.04em",
        lineHeight: 1,
      }}>{value}</span>
      {suffix && <span style={{ fontSize: "0.95rem", color: "#aaa", fontWeight: 600, marginBottom: 3 }}>{suffix}</span>}
    </div>
    {sub && (
      <span style={{ fontSize: "0.72rem", color: "#aaa", fontWeight: 500 }}>{sub}</span>
    )}
    {progress !== undefined && (
      <div style={{ marginTop: 4 }}>
        <div style={{
          height: 5, borderRadius: 99,
          background: "#f0f0f0",
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${Math.min(progress, 100)}%`,
            borderRadius: 99,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            transition: "width 0.8s cubic-bezier(.34,1.56,.64,1)",
          }} />
        </div>
      </div>
    )}
  </div>
);

const ProfileStats = () => {
  const [stats, setStats] = useState({
    points: 2150,
    pointsGoal: 2850,
    tasksCompleted: 38,
    tasksGoal: 50,
    rank: "Gold III",
    dailyStreak: 8,
    totalEarnings: 1200,
    referrals: 12,
  });

  useEffect(() => {
    if (!document.getElementById("stats-fonts")) {
      const link = document.createElement("link");
      link.id = "stats-fonts";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }

    try {
      const stored = localStorage.getItem("userStats");
      if (stored) setStats(JSON.parse(stored));
    } catch (e) {}
  }, []);

  const rankColors = { "Bronze": "#cd7f32", "Silver": "#a8a9ad", "Gold III": "#FF6B00", "Platinum": "#00b4d8" };
  const rankColor = rankColors[stats.rank] || "#FF6B00";

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .stats-grid { flex-wrap: wrap !important; }
          .stats-grid > * { min-width: calc(50% - 8px) !important; }
        }
      `}</style>
      <div className="stats-grid" style={{
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <StatCard
          label="Points"
          value={stats.points.toLocaleString()}
          sub={`Goal: ${stats.pointsGoal.toLocaleString()}`}
          progress={(stats.points / stats.pointsGoal) * 100}
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#FF6B00" />
            </svg>
          }
        />
        <StatCard
          label="Tasks Completed"
          value={stats.tasksCompleted}
          sub={`Goal: ${stats.tasksGoal}`}
          progress={(stats.tasksCompleted / stats.tasksGoal) * 100}
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          }
        />
        <StatCard
          label="Rank"
          value={stats.rank}
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill={rankColor} stroke="none">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
          }
          color={rankColor}
        />
        <StatCard
          label="Daily Streak"
          value={stats.dailyStreak}
          suffix="days"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF6B00" stroke="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          }
        />
      </div>
    </>
  );
};

export default ProfileStats;