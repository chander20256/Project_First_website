import { useState } from "react";

const periods = ["Daily", "Weekly", "Monthly", "All Time"];

const LeaderboardHeader = () => {
  const [active, setActive] = useState("Weekly");

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Title */}
      <div>
        <h1
          className="text-3xl md:text-4xl font-extrabold tracking-tight"
          style={{
            background: "linear-gradient(90deg, #FF6B00, #FFB347)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🏆 Leaderboard
        </h1>
        <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          See who&apos;s dominating the charts this week!
        </p>
      </div>

      {/* Period filter tabs */}
      <div
        className="flex gap-1 rounded-xl p-1 self-start md:self-auto"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,107,0,0.15)" }}
      >
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setActive(p)}
            className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
            style={
              active === p
                ? {
                    background: "linear-gradient(135deg, #FF6B00, #ff8c00)",
                    color: "#fff",
                    boxShadow: "0 2px 12px rgba(255,107,0,0.35)",
                  }
                : { color: "rgba(255,255,255,0.45)" }
            }
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardHeader;
