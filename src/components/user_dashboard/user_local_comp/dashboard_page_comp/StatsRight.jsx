import React from "react";

const StatsRight = ({ selectedStat }) => {
  // Weekly data for different stats (last 7 days)
  const weeklyData = {
    tasks: {
      label: "Tasks Completed",
      color: "#FF6B00",
      total: 15,
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [3, 5, 4, 7, 6, 9, 5], // Daily tasks completed
      unit: "",
    },
    earnings: {
      label: "Earnings",
      color: "#16a34a",
      total: 240,
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [12, 18, 15, 22, 28, 35, 20], // Daily earnings in $
      unit: "$",
    },
    surveys: {
      label: "Surveys Completed",
      color: "#7C3AED",
      total: 8,
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [1, 2, 1, 3, 2, 4, 2], // Daily surveys completed
      unit: "",
    },
    referrals: {
      label: "Referrals",
      color: "#0ea5e9",
      total: 5,
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [0, 1, 0, 2, 1, 2, 1], // Daily referrals made
      unit: "",
    },
  };

  const current = weeklyData[selectedStat] || weeklyData.tasks;
  const max = Math.max(...current.values);
  
  // Calculate weekly total and average
  const weeklyTotal = current.values.reduce((sum, val) => sum + val, 0);
  const weeklyAverage = (weeklyTotal / 7).toFixed(1);
  
  // Calculate growth from previous week (mock data - would come from API)
  const growthRates = {
    tasks: 12,
    earnings: 8,
    surveys: 15,
    referrals: 20,
  };
  const growthRate = growthRates[selectedStat] || 0;
  
  // Find best day
  const bestDayIndex = current.values.indexOf(Math.max(...current.values));
  const bestDay = current.days[bestDayIndex];
  const bestDayValue = current.values[bestDayIndex];

  // Generate Y-axis ticks
  const getYAxisTicks = () => {
    if (max <= 5) return [0, 1, 2, 3, 4, 5];
    if (max <= 10) return [0, 2, 4, 6, 8, 10];
    if (max <= 20) return [0, 5, 10, 15, 20];
    if (max <= 50) return [0, 10, 20, 30, 40, 50];
    return [0, 10, 20, 30, 40, 50];
  };

  const yAxisTicks = getYAxisTicks();

  return (
    <div
      className="flex flex-col h-full w-full rounded-2xl p-4 sm:p-6"
      style={{
        background: "#ffffff",
        border: "1px solid #f0f0f0",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <p
            className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest"
            style={{ color: current.color }}
          >
            {current.label} (This Week)
          </p>
          <h3
            className="text-2xl sm:text-3xl font-bold mt-1"
            style={{ color: "#0a0a0a" }}
          >
            {selectedStat === "earnings" ? `$${current.total}` : current.total}
          </h3>
          <p className="text-[10px] sm:text-xs mt-1" style={{ color: "#9ca3af" }}>
            Total this week
          </p>
        </div>
        <div
          className="flex items-center justify-center rounded-full flex-shrink-0"
          style={{
            width: 40,
            height: 40,
            mdWidth: 48,
            mdHeight: 48,
            background: `${current.color}14`,
            border: `1px solid ${current.color}33`,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke={current.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
      </div>

      {/* Weekly Summary Stats */}
      <div className="grid grid-cols-2 sm:flex sm:justify-between gap-3 mb-4 px-1 sm:px-2">
        <div className="text-left sm:text-center">
          <p className="text-[10px] text-gray-500">Weekly Total</p>
          <p className="text-xs sm:text-sm font-bold" style={{ color: current.color }}>
            {selectedStat === "earnings" ? `$${weeklyTotal}` : weeklyTotal}
          </p>
        </div>
        <div className="text-left sm:text-center">
          <p className="text-[10px] text-gray-500">Daily Avg</p>
          <p className="text-xs sm:text-sm font-bold" style={{ color: current.color }}>
            {selectedStat === "earnings" ? `$${weeklyAverage}` : weeklyAverage}
          </p>
        </div>
        <div className="text-left sm:text-center col-span-2 sm:col-span-1">
          <p className="text-[10px] text-gray-500">Best Day</p>
          <p className="text-xs sm:text-sm font-bold" style={{ color: current.color }}>
            {bestDay} ({bestDayValue})
          </p>
        </div>
      </div>

      {/* Bar Chart with Y-axis */}
      <div className="flex gap-1 sm:gap-2 flex-1 min-h-[140px]">
        {/* Y-axis Labels */}
        <div className="flex flex-col justify-between text-right pr-1 sm:pr-2" style={{ height: "140px" }}>
          {yAxisTicks.slice().reverse().map((tick) => (
            <div key={tick} className="text-[9px] sm:text-xs" style={{ color: "#9ca3af", lineHeight: "1" }}>
              {current.unit}{tick}
            </div>
          ))}
        </div>
        
        {/* Bars Container */}
        <div className="flex items-end gap-1.5 sm:gap-3 flex-1">
          {current.days.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1 sm:gap-2 flex-1">
              <div
                className="w-full rounded-md sm:rounded-lg transition-all duration-500 relative group"
                style={{
                  height: max > 0 ? `${(current.values[i] / max) * 120}px` : "0px",
                  background:
                    i === current.days.length - 1
                       ? `linear-gradient(180deg, ${current.color}, ${current.color}cc)`
                       : `${current.color}1F`,
                }}
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-[10px] text-white rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {current.unit}{current.values[i]}
                </div>
              </div>
              <span className="text-[8px] sm:text-[0.65rem]" style={{ color: "#9ca3af" }}>
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4"
        style={{ borderTop: "1px solid #f0f0f0" }}
      >
        <span style={{ color: growthRate >= 0 ? "#22c55e" : "#ef4444", fontSize: "0.75rem", fontWeight: 600 }}>
          {growthRate >= 0 ? "↑" : "↓"} {Math.abs(growthRate)}%
        </span>
        <span style={{ color: "#9ca3af", fontSize: "0.75rem" }}>
          vs last week
        </span>
      </div>
    </div>

  );
};

export default StatsRight;