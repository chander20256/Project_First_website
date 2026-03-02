import React from "react";

// Icons (using heroicons or any library – here we use inline SVG for simplicity)
const DashboardIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-indigo-600">CouponUp</h1>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            "Dashboard",
            "Wallet",
            "Games",
            "Spin Wheel",
            "Surveys",
            "Tasks",
            "Leaderboard",
            "Referrals",
            "Withdraw",
            "Transactions",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                item === "Dashboard"
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 text-xs text-gray-400">
          v2.14.0 · UPI
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-800">Dashboard</span>
            <span className="text-sm text-gray-400 hidden sm:inline">/ welcome back</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">4,750 pts</span>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
              <span className="text-xs font-medium">JD</span>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome message */}
          <p className="text-sm text-gray-500 mb-6 flex items-center gap-2">
            <span className="text-lg">👋</span> Welcome back! Here's your earnings overview.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "Total Points", value: "4,750", bg: "bg-indigo-50", icon: "⭐" },
              { label: "Today's Earnings", value: "195", bg: "bg-emerald-50", icon: "💰" },
              { label: "Available Tasks", value: "12", bg: "bg-amber-50", icon: "📋" },
              { label: "Active Games", value: "5", bg: "bg-rose-50", icon: "🎮" },
            ].map((card) => (
              <div key={card.label} className={`${card.bg} p-5 rounded-2xl border border-gray-100`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{card.label}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{card.value}</p>
                  </div>
                  <span className="text-xl">{card.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Weekly earnings + Recent transactions */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly earnings (takes 2/3 width on large screens) */}
            <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100">
              <h3 className="text-md font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <span>📈</span> Weekly Earnings
              </h3>
              <div className="space-y-4">
                {[
                  { day: "Mon", points: 320, max: 320 },
                  { day: "Tue", points: 240, max: 320 },
                  { day: "Wed", points: 160, max: 320 },
                  { day: "Thu", points: 280, max: 320 },
                ].map((item) => (
                  <div key={item.day}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-600">{item.day}</span>
                      <span className="font-bold text-gray-800">{item.points}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${(item.points / item.max) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Legend */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-400"></span> Spin Wheel</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-400"></span> Play Games</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-400"></span> Start Survey</span>
              </div>
            </div>

            {/* Recent transactions */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                  <span>🕒</span> Recent Transactions
                </h3>
                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">last 5</span>
              </div>
              <ul className="space-y-4">
                {[
                  { desc: "Completed survey #142", date: "2026-02-27", amount: "+50", positive: true },
                  { desc: "Won Quiz Game", date: "2026-02-27", amount: "+120", positive: true },
                  { desc: "Daily Spin Reward", date: "2026-02-26", amount: "+25", positive: true },
                  { desc: "Referral bonus - Sarah M.", date: "2026-02-25", amount: "+200", positive: true },
                  { desc: "Withdrawal to UPI", date: "2026-02-24", amount: "-500", positive: false },
                ].map((tx, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{tx.desc}</p>
                      <p className="text-xs text-gray-400">{tx.date}</p>
                    </div>
                    <span className={`font-bold text-sm ${tx.positive ? "text-emerald-600" : "text-rose-500"}`}>
                      {tx.amount}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-right">
                <a href="#" className="text-xs text-indigo-600 hover:underline">view all →</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}