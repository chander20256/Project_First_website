import { FiSearch, FiCalendar } from "react-icons/fi";

const TransactionFilters = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-wrap items-center gap-4">
      {/* Search input */}
      <div className="flex-1 min-w-[200px] relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by user or transaction ID..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Transaction type filter */}
      <select className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500">
        <option value="">All Types</option>
        <option value="deposit">Deposit</option>
        <option value="withdrawal">Withdrawal</option>
        <option value="game_reward">Game Reward</option>
        <option value="referral_bonus">Referral Bonus</option>
      </select>

      {/* Status filter */}
      <select className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500">
        <option value="">All Statuses</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="rejected">Rejected</option>
      </select>

      {/* Date range picker (simplified) */}
      <div className="flex items-center space-x-2">
        <FiCalendar className="text-gray-400" />
        <input
          type="date"
          className="px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
        />
        <span>to</span>
        <input
          type="date"
          className="px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Apply filters button */}
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
        Apply Filters
      </button>
    </div>
  );
};

export default TransactionFilters;