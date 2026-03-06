import React from "react";

const DashboardHeader = () => {
  return (
    <header className="ml-64 bg-gray-900 border-b border-gray-800 px-8 py-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>

        <span className="text-sm text-gray-400">User Control Panel</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="text-gray-400 hover:text-white transition">
          Notifications
        </button>

        {/* Balance */}
        <div className="text-sm text-gray-300">
          Balance: <span className="text-green-400 font-medium">$124</span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-700"></div>
          <span className="text-sm text-gray-300">User</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
