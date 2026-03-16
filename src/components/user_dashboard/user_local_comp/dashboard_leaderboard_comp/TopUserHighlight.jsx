const podium = [
  {
    rank: 2,
    username: "GamerGirl",
    points: 870,
    tasks: 12,
    surveys: 7,
    avatar: "https://i.pravatar.cc/100?img=5",
    medal: "🥈",
    height: "h-28",
    color: "#94a3b8",
    glow: "rgba(148,163,184,0.25)",
  },
  {
    rank: 1,
    username: "PlayerOne",
    points: 980,
    tasks: 15,
    surveys: 5,
    avatar: "https://i.pravatar.cc/100?img=1",
    medal: "🥇",
    height: "h-40",
    color: "#FF6B00",
    glow: "rgba(255,107,0,0.35)",
  },
  {
    rank: 3,
    username: "NoobMaster",
    points: 820,
    tasks: 10,
    surveys: 8,
    avatar: "https://i.pravatar.cc/100?img=8",
    medal: "🥉",
    height: "h-20",
    color: "#cd7f32",
    glow: "rgba(205,127,50,0.25)",
  },
];

const TopUserHighlight = () => {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,107,0,0.12)",
      }}
    >
      <h2 className="text-lg font-bold text-white mb-6">🏅 Top Players This Week</h2>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 md:gap-8">
        {podium.map((player) => (
          <div key={player.rank} className="flex flex-col items-center gap-2 flex-1 max-w-[140px]">
            {/* Avatar */}
            <div className="relative">
              <img
                src={player.avatar}
                alt={player.username}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
                style={{
                  border: `3px solid ${player.color}`,
                  boxShadow: `0 0 18px ${player.glow}`,
                }}
              />
              <span className="absolute -bottom-1 -right-1 text-lg leading-none">{player.medal}</span>
            </div>

            {/* Username + points */}
            <p className="text-sm font-semibold text-white text-center truncate w-full">
              {player.username}
            </p>
            <p className="text-xs font-bold" style={{ color: player.color }}>
              {player.points} pts
            </p>

            {/* Podium block */}
            <div
              className={`w-full ${player.height} rounded-t-xl flex items-center justify-center`}
              style={{
                background: `linear-gradient(180deg, ${player.color}33, ${player.color}11)`,
                border: `1px solid ${player.color}44`,
              }}
            >
              <span className="text-2xl font-black" style={{ color: player.color }}>
                #{player.rank}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopUserHighlight;
