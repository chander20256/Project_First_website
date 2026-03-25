import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";

const StatisticsGraph = () => {
  // User login/visit data
  const visitData = [
    { day: "Mon", visits: 3 },
    { day: "Tue", visits: 5 },
    { day: "Wed", visits: 4 },
    { day: "Thu", visits: 7 },
    { day: "Fri", visits: 6 },
    { day: "Sat", visits: 9 },
    { day: "Sun", visits: 5 },
  ];

  const totalVisits = visitData.reduce((sum, day) => sum + day.visits, 0);
  const averageVisits = (totalVisits / 7).toFixed(1);
  const mostActiveDay = visitData.reduce((max, day) => day.visits > max.visits ? day : max, visitData[0]);
  const weeklyGrowth = "+24%"; // This would come from API comparing to last week

  return (
    <div
      className="rounded-2xl p-7 w-full"
      style={{
        background: "#ffffff",
        border: "1px solid #f0f0f0",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="rounded-full"
            style={{ width: 4, height: 28, background: "#FF6B00" }}
          />
          <div>
            <h2 className="text-xl font-bold" style={{ color: "#0a0a0a" }}>
              Your Site Activity
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
              How often you visit the site
            </p>
          </div>
        </div>

        {/* Stats Badge - Desktop Only */}
        <div
          className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg"
          style={{ background: "#f3f4f6" }}
        >
          <div className="text-right">
            <p className="text-xs text-gray-500">Total Visits</p>
            <p className="text-sm font-bold" style={{ color: "#FF6B00" }}>
              {totalVisits}
            </p>
          </div>
          <div className="w-px h-8 bg-gray-300" />
          <div className="text-right">
            <p className="text-xs text-gray-500">Daily Avg</p>
            <p className="text-sm font-bold" style={{ color: "#FF6B00" }}>
              {averageVisits}
            </p>
          </div>
        </div>
      </div>

      {/* Graph Section - Desktop Only */}
      <div className="hidden sm:block" style={{ height: 280 }}>
        {/* ... (LineChart code remains same) ... */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={visitData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="day"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "2px solid #FF6B00",
                borderRadius: "12px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                fontFamily: "'DM Sans', sans-serif",
              }}
              labelStyle={{ color: "#0a0a0a", fontWeight: 700 }}
              formatter={(value) => [`${value} visits`, "Site Visits"]}
            />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="#FF6B00"
              strokeWidth={3}
              dot={{ fill: "#FF6B00", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: "#FF6B00" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Mobile-Optimized 2x2 Grid (Visible only on small screens) */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {/* Total Visits */}
        <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Visits</p>
          <p className="text-lg font-black mt-1" style={{ color: "#0a0a0a" }}>{totalVisits}</p>
          <div className="h-1 w-8 bg-orange-500 rounded-full mt-1" />
        </div>

        {/* Daily Avg */}
        <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Daily Avg</p>
          <p className="text-lg font-black mt-1" style={{ color: "#0a0a0a" }}>{averageVisits}</p>
          <div className="h-1 w-8 bg-blue-500 rounded-full mt-1" />
        </div>

        {/* Most Active */}
        <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Peak Day</p>
          <p className="text-lg font-black mt-1" style={{ color: "#FF6B00" }}>{mostActiveDay.day}</p>
          <p className="text-[9px] text-gray-400 mt-1 font-medium">{mostActiveDay.visits} visits</p>
        </div>

        {/* Growth */}
        <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Trend</p>
          <p className="text-lg font-black mt-1 text-green-500">{weeklyGrowth}</p>
          <p className="text-[9px] text-gray-400 mt-1 font-medium">vs last week</p>
        </div>

        {/* Mini Sparkline Bar Chart at Bottom - Full Width */}
        <div className="col-span-2 p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">7-Day Activity</p>
            <p className="text-xs font-bold mt-0.5" style={{ color: "#0a0a0a" }}>Weekly Snapshot</p>
          </div>
          <div className="h-8 w-32 flex items-end gap-1.5 px-1">
             {visitData.map((d, i) => (
               <div key={i} className="flex-1 rounded-sm bg-orange-100" style={{ height: `${(d.visits/10)*100}%`, background: i === 5 ? '#FF6B00' : '' }} />
             ))}
          </div>
        </div>
      </div>


      {/* Insights - Desktop Only */}
      <div className="hidden sm:block mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="rounded-full"
              style={{ width: 10, height: 10, background: "#FF6B00" }}
            />
            <span className="text-sm" style={{ color: "#6b7280" }}>
              Site Visits
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500">Most active day:</span>
              <span className="text-xs font-semibold" style={{ color: "#FF6B00" }}>
                {mostActiveDay.day} ({mostActiveDay.visits} visits)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500">vs last week:</span>
              <span className="text-xs font-semibold" style={{ color: "#22c55e" }}>
                ↑ {weeklyGrowth}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StatisticsGraph;