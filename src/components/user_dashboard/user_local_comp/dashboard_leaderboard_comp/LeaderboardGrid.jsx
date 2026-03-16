const players = [
  { rank: 1, username: "PlayerOne",  avatar: "https://i.pravatar.cc/40?img=1",  points: 980, tasks: 15, surveys: 5,  badge: "🥇" },
  { rank: 2, username: "GamerGirl",  avatar: "https://i.pravatar.cc/40?img=5",  points: 870, tasks: 12, surveys: 7,  badge: "🥈" },
  { rank: 3, username: "NoobMaster", avatar: "https://i.pravatar.cc/40?img=8",  points: 820, tasks: 10, surveys: 8,  badge: "🥉" },
  { rank: 4, username: "ProPlayer",  avatar: "https://i.pravatar.cc/40?img=12", points: 750, tasks: 8,  surveys: 6,  badge: null },
  { rank: 5, username: "LuckyOne",   avatar: "https://i.pravatar.cc/40?img=15", points: 700, tasks: 9,  surveys: 4,  badge: null },
  { rank: 6, username: "StarCoder",  avatar: "https://i.pravatar.cc/40?img=20", points: 650, tasks: 7,  surveys: 5,  badge: null },
  { rank: 7, username: "SpeedRun",   avatar: "https://i.pravatar.cc/40?img=23", points: 610, tasks: 11, surveys: 3,  badge: null },
];

const maxPoints = players[0].points;

const rankStyle = (rank) => {
  if (rank === 1) return { color: "#FF6B00", bg: "rgba(255,107,0,0.12)" };
  if (rank === 2) return { color: "#94a3b8", bg: "rgba(148,163,184,0.12)" };
  if (rank === 3) return { color: "#cd7f32", bg: "rgba(205,127,50,0.12)" };
  return { color: "rgba(255,255,255,0.3)", bg: "rgba(255,255,255,0.05)" };
};

const LeaderboardGrid = () => {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,107,0,0.12)",
      }}
    >
      {/* Section heading */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <h2 className="text-lg font-bold text-white">📋 Full Rankings</h2>
        <span
          className="text-xs px-3 py-1 rounded-full font-semibold"
          style={{ background: "rgba(255,107,0,0.15)", color: "#FF6B00" }}
        >
          {players.length} players
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)" }}>
              {["Rank", "Player", "Points", "Progress", "Tasks", "Surveys"].map((h) => (
                <th
                  key={h}
                  className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map((p) => {
              const rs = rankStyle(p.rank);
              const progress = Math.round((p.points / maxPoints) * 100);
              return (
                <tr
                  key={p.rank}
                  className="transition-colors duration-150"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,107,0,0.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {/* Rank */}
                  <td className="py-3 px-4">
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-black"
                      style={{ background: rs.bg, color: rs.color }}
                    >
                      {p.badge ? p.badge : `#${p.rank}`}
                    </span>
                  </td>

                  {/* Player */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.avatar}
                        alt={p.username}
                        className="w-9 h-9 rounded-full object-cover"
                        style={{ border: `2px solid ${rs.color}` }}
                      />
                      <span className="font-semibold text-sm text-white">{p.username}</span>
                    </div>
                  </td>

                  {/* Points */}
                  <td className="py-3 px-4">
                    <span className="font-bold text-sm" style={{ color: "#FF6B00" }}>
                      {p.points.toLocaleString()}
                    </span>
                  </td>

                  {/* Progress bar */}
                  <td className="py-3 px-4 min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex-1 h-1.5 rounded-full overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${progress}%`,
                            background: "linear-gradient(90deg, #FF6B00, #FFB347)",
                          }}
                        />
                      </div>
                      <span className="text-xs w-8 text-right" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {progress}%
                      </span>
                    </div>
                  </td>

                  {/* Tasks */}
                  <td className="py-3 px-4">
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {p.tasks}
                    </span>
                  </td>

                  {/* Surveys */}
                  <td className="py-3 px-4">
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {p.surveys}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardGrid;
