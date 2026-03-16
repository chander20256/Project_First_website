const actions = [
  { icon: "🏆", label: "Top Players", desc: "View all-time leaders" },
  { icon: "🎁", label: "Rewards", desc: "Claim your prizes" },
  { icon: "⚡", label: "Weekly Challenge", desc: "Join this week's event" },
  { icon: "📊", label: "Stats Overview", desc: "Detailed analytics" },
];

const LeaderboardQuickActions = () => {
  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">⚡ Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, idx) => (
          <button
            key={idx}
            className="group rounded-2xl p-5 flex flex-col items-start gap-3 text-left transition-all duration-200 cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,107,0,0.12)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,107,0,0.08)";
              e.currentTarget.style.border = "1px solid rgba(255,107,0,0.35)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.border = "1px solid rgba(255,107,0,0.12)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span
              className="w-10 h-10 flex items-center justify-center rounded-xl text-xl"
              style={{ background: "rgba(255,107,0,0.12)" }}
            >
              {action.icon}
            </span>
            <div>
              <p className="font-bold text-sm text-white">{action.label}</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                {action.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardQuickActions;
