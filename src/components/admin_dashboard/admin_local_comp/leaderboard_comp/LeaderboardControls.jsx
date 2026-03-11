import { useState } from "react";
import { FiCalendar, FiRefreshCw } from "react-icons/fi";

const LeaderboardControls = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [mode, setMode] = useState("auto"); // 'auto' or 'manual'

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-wrap items-center gap-4">
      <div className="flex items-center space-x-2">
        <FiCalendar className="text-gray-400" />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Mode:</span>
        <button
          onClick={() => setMode("auto")}
          className={`px-3 py-1 rounded-full text-sm ${
            mode === "auto"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Auto
        </button>
        <button
          onClick={() => setMode("manual")}
          className={`px-3 py-1 rounded-full text-sm ${
            mode === "manual"
              ? "bg-yellow-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Manual
        </button>
      </div>
      <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 ml-auto">
        <FiRefreshCw />
        <span>Refresh</span>
      </button>
    </div>
  );
};

export default LeaderboardControls;