



import { Link } from "react-router-dom";
import { FiArrowRight, FiEye, FiTrendingUp, FiDollarSign, FiCalendar, FiUser } from "react-icons/fi";

const topGames = [
  { id: 1, name: "Space Invaders", category: "Action", plays: 1234, revenue: 5670, trend: "+12%" },
  { id: 2, name: "Math Quiz", category: "Puzzle", plays: 987, revenue: 4320, trend: "+8%" },
  { id: 3, name: "Word Puzzle", category: "Puzzle", plays: 876, revenue: 3890, trend: "+5%" },
  { id: 4, name: "Trivia Challenge", category: "Trivia", plays: 654, revenue: 2980, trend: "+15%" },
];

const recentUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", joined: "2025-03-10", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", joined: "2025-03-09", status: "active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", joined: "2025-03-08", status: "pending" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", joined: "2025-03-07", status: "active" },
];

const ManagementTables = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Games Table - Enhanced */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        {/* Header with gradient icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <FiEye className="text-white w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Top Performing Games</h2>
              <p className="text-xs text-gray-500">Based on last 30 days activity</p>
            </div>
          </div>
          <Link 
            to="/admin/games" 
            className="group flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-lg transition-all duration-300"
          >
            <span>View All</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Games Table */}
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="min-w-full">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Game</th>
                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Plays</th>
                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody>
              {topGames.map((game, index) => (
                <tr 
                  key={game.id} 
                  className="group border-b border-gray-50 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-transparent transition-all duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 text-sm font-medium text-gray-800 group-hover:text-purple-600 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {game.name}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {game.category}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <FiTrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-sm text-gray-600">{game.plays.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1">
                      <FiDollarSign className="w-3 h-3 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-800">${game.revenue}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {game.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Stats */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
          <span>Showing top 4 games</span>
          <span>Total revenue: $16,860</span>
        </div>
      </div>

      {/* Recent Users Table - Enhanced */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        {/* Header with gradient icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <FiUser className="text-white w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Recent Users</h2>
              <p className="text-xs text-gray-500">Newest registrations</p>
            </div>
          </div>
          <Link 
            to="/admin/users" 
            className="group flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-all duration-300"
          >
            <span>View All</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="min-w-full">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, index) => (
                <tr 
                  key={user.id} 
                  className="group border-b border-gray-50 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {user.name}
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">{user.joined}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-yellow-50 text-yellow-600'
                    }`}>
                      {user.status === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Stats */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
          <span>Showing 4 most recent users</span>
          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full">3 active</span>
        </div>
      </div>
    </div>
  );
};

export default ManagementTables;