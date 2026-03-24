import React, { useState, useEffect } from "react";

const ACTIVITY_ICONS = {
  task: (
    <div style={{
      width: 38, height: 38, borderRadius: "50%",
      border: "2px solid #FF6B00",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#fff8f0", flexShrink: 0,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  ),
  rank: (
    <div style={{
      width: 38, height: 38, borderRadius: "50%",
      border: "2px solid #f59e0b",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#fffbeb", flexShrink: 0,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
        <path d="M8 21h8M12 21v-5M17 7l-5-5-5 5M12 3v10M5 13a7 7 0 0 0 14 0" />
      </svg>
    </div>
  ),
  referral: (
    <div style={{
      width: 38, height: 38, borderRadius: "50%",
      border: "2px solid #10b981",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#f0fdf9", flexShrink: 0,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    </div>
  ),
  quiz: (
    <div style={{
      width: 38, height: 38, borderRadius: "50%",
      border: "2px solid #8b5cf6",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#f5f3ff", flexShrink: 0,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    </div>
  ),
};

const DEFAULT_ACTIVITIES = [
  { id: 1, type: "task", title: "Completed Task – Bug Fix Challenge", meta: "+150 Points | Earned $5", time: "2 hours ago" },
  { id: 2, type: "rank", title: "Reached Gold III Rank", meta: "+500 Points | +100 XP", time: "1 day ago" },
  { id: 3, type: "task", title: "Completed Task – Website Speed Optimization", meta: "+200 Points | Earned $10", time: "2 days ago" },
  { id: 4, type: "referral", title: "Referred a Friend", meta: "+500 Points | Earned $5", time: "3 days ago" },
  { id: 5, type: "quiz", title: "Completed Quiz – JavaScript Basics", meta: "+100 Points | Earned $1", time: "4 days ago" },
];

const ProfileActivity = () => {
  const [activities, setActivities] = useState(DEFAULT_ACTIVITIES);
  const [xp] = useState(5448);

  useEffect(() => {
    if (!document.getElementById("activity-fonts")) {
      const link = document.createElement("link");
      link.id = "activity-fonts";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
    try {
      const stored = localStorage.getItem("userActivity");
      if (stored) setActivities(JSON.parse(stored));
    } catch (e) {}
  }, []);

  return (
    <>
      <style>{`
        .act-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid #f4f4f4;
          transition: background 0.15s;
          border-radius: 10px;
          padding-left: 8px; padding-right: 8px;
        }
        .act-row:last-child { border-bottom: none; }
        .act-row:hover { background: #fff8f0; }
        .act-connector {
          position: absolute;
          left: 18px;
          top: 38px;
          bottom: -14px;
          width: 2px;
          background: linear-gradient(180deg, #FF6B00 0%, transparent 100%);
          opacity: 0.18;
        }
      `}</style>
      <div style={{
        background: "#ffffff",
        borderRadius: 20,
        padding: "24px 24px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", letterSpacing: "0.07em", color: "#0a0a0a" }}>
              Recent Activity
            </span>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#0a0a0a", borderRadius: 99,
            padding: "5px 14px",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF6B00" stroke="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#FF6B00", letterSpacing: "0.06em" }}>
              {xp.toLocaleString()} XP
            </span>
          </div>
        </div>

        {/* Activity list */}
        <div>
          {activities.map((act, i) => (
            <div key={act.id} className="act-row" style={{ position: "relative" }}>
              {i < activities.length - 1 && <div className="act-connector" />}
              {ACTIVITY_ICONS[act.type] || ACTIVITY_ICONS.task}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0a0a0a", lineHeight: 1.4 }}>
                    {act.title}
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "#bbb", whiteSpace: "nowrap", flexShrink: 0, marginTop: 2 }}>
                    {act.time}
                  </span>
                </div>
                <span style={{ fontSize: "0.75rem", color: "#FF6B00", fontWeight: 600, marginTop: 3, display: "block" }}>
                  {act.meta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileActivity;