import React, { useState, useEffect } from "react";

const ProfileActions = () => {
  const [earnings, setEarnings] = useState(1200);
  const [pendingEarnings, setPendingEarnings] = useState(150);
  const [xpToNext, setXpToNext] = useState(440);
  const [username, setUsername] = useState("user");
  const [earningsProgress] = useState(78);

  useEffect(() => {
    if (!document.getElementById("actions-fonts")) {
      const link = document.createElement("link");
      link.id = "actions-fonts";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const user = JSON.parse(stored);
        const u = (user.username || "user").toLowerCase().replace(/\s/g, "");
        setUsername(u);
      }
      const statsStored = localStorage.getItem("userStats");
      if (statsStored) {
        const s = JSON.parse(statsStored);
        if (s.totalEarnings) setEarnings(s.totalEarnings);
        if (s.pendingEarnings) setPendingEarnings(s.pendingEarnings);
        if (s.xpToNext) setXpToNext(s.xpToNext);
      }
    } catch (e) {}
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("userAvatar");
      window.location.href = "/AuthPage";
    }
  };

  return (
    <>
      <style>{`
        .wa-card {
          background: #fff;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .wa-logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: none;
          border: 1.5px solid #fde0d0;
          border-radius: 10px;
          padding: 11px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem;
          font-weight: 700;
          color: #ef4444;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s, transform 0.15s;
          margin-top: 16px;
          letter-spacing: 0.02em;
        }
        .wa-logout-btn:hover { background: #fff5f5; border-color: #ef4444; transform: translateY(-1px); }
      `}</style>

      <div className="wa-card">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", letterSpacing: "0.07em", color: "#0a0a0a" }}>
            Wallet
          </span>
        </div>

        {/* Earnings row */}
        <div style={{ display: "flex", gap: 20, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 120 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "#0a0a0a", letterSpacing: "0.03em", lineHeight: 1 }}>
              ${earnings.toLocaleString()}.00
            </div>
            <div style={{ fontSize: "0.72rem", color: "#aaa", fontWeight: 500, marginTop: 3 }}>Total Earnings</div>
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "#0a0a0a", letterSpacing: "0.03em", lineHeight: 1 }}>
              ${pendingEarnings.toLocaleString()}.00
            </div>
            <div style={{ fontSize: "0.72rem", color: "#aaa", fontWeight: 500, marginTop: 3 }}>
              ↑{xpToNext} XP to go...
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, background: "#f0f0f0", borderRadius: 99, marginBottom: 20, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${earningsProgress}%`,
            borderRadius: 99,
            background: "linear-gradient(90deg, #0a0a0a, #333)",
          }} />
        </div>

        <div style={{ height: 1, background: "#f4f4f4", marginBottom: 2 }} />

        {/* Logout */}
        <button className="wa-logout-btn" onClick={handleLogout}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </>
  );
};

export default ProfileActions;