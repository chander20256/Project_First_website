import { useState } from "react";
import { FiAward, FiEye, FiEdit2 } from "react-icons/fi";

// Sample data – in real app would be fetched based on active tab and date
const sampleDaily = [
  { rank: 1, userId: "user123", name: "John Doe", points: 1250, isLeader: true },
  { rank: 2, userId: "user456", name: "Jane Smith", points: 980, isLeader: false },
  { rank: 3, userId: "user789", name: "Bob Johnson", points: 760, isLeader: false },
  { rank: 4, userId: "user101", name: "Alice Brown", points: 540, isLeader: false },
  { rank: 5, userId: "user112", name: "Charlie Davis", points: 320, isLeader: false },
];

const LeaderboardTable = () => {
  const [users, setUsers] = useState(sampleDaily);

  const makeLeader = (userId) => {
    setUsers(users.map(u => ({
      ...u,
      isLeader: u.userId === userId ? true : false
    })));
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leader Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {users.map((user) => (
            <tr key={user.userId} className={user.isLeader ? "bg-yellow-50" : ""}>
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {user.rank}
                {user.rank === 1 && <span className="ml-2 text-yellow-500">🥇</span>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.userId}</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.points}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.isLeader ? (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Leader</span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => makeLeader(user.userId)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                  title="Make Leader"
                >
                  <FiAward className="w-5 h-5" />
                </button>
                <button className="text-blue-600 hover:text-blue-900 mr-3" title="View Profile">
                  <FiEye className="w-5 h-5" />
                </button>
                <button className="text-yellow-600 hover:text-yellow-900" title="Edit Points">
                  <FiEdit2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;