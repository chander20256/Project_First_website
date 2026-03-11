import { FiAward, FiRefreshCw, FiDownload, FiClock } from "react-icons/fi";

const LeaderboardQuickActions = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-wrap gap-4">
      <button className="flex items-center space-x-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
        <FiAward />
        <span>Announce Winners</span>
      </button>
      <button className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
        <FiRefreshCw />
        <span>Reset Leaderboard</span>
      </button>
      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
        <FiDownload />
        <span>Export Rankings</span>
      </button>
      <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100">
        <FiClock />
        <span>View History</span>
      </button>
    </div>
  );
};

export default LeaderboardQuickActions;