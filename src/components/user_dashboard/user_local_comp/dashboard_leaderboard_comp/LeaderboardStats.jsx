const stats = [
  {
    title: "Total Players",
    value: "1,245",
    icon: "👥",
    change: "+12%",
    positive: true,
  },
  {
    title: "Total Points Awarded",
    value: "98,765",
    icon: "⭐",
    change: "+8%",
    positive: true,
  },
  {
    title: "Avg Daily Earnings",
    value: "$54",
    icon: "💰",
    change: "+3%",
    positive: true,
  },
  {
    title: "Active This Week",
    value: "432",
    icon: "🔥",
    change: "-2%",
    positive: false,
  },
];

const LeaderboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="rounded-2xl p-5 flex flex-col gap-3 transition-transform duration-200 hover:-translate-y-1"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,107,0,0.12)",
          }}
        >
          {/* Icon + change badge */}
          <div className="flex items-center justify-between">
            <span
              className="w-10 h-10 flex items-center justify-center rounded-xl text-xl"
              style={{ background: "rgba(255,107,0,0.12)" }}
            >
              {stat.icon}
            </span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={
                stat.positive
                  ? { background: "rgba(34,197,94,0.12)", color: "#22c55e" }
                  : { background: "rgba(239,68,68,0.12)", color: "#ef4444" }
              }
            >
              {stat.change}
            </span>
          </div>

          {/* Value + title */}
          <div>
            <p className="text-2xl font-extrabold text-white">{stat.value}</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
              {stat.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaderboardStats;
