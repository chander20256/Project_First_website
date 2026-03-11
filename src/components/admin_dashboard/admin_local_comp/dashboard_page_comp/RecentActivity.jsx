import { FiUser, FiDollarSign, FiMessageSquare, FiEdit } from "react-icons/fi";

const activities = [
  { id: 1, type: "user", message: "New user registered: john@example.com", time: "5 minutes ago", icon: FiUser, color: "text-blue-500" },
  { id: 2, type: "withdrawal", message: "Withdrawal request of $50 from jane@example.com", time: "1 hour ago", icon: FiDollarSign, color: "text-green-500" },
  { id: 3, type: "contact", message: "New contact message from Bob Johnson", time: "3 hours ago", icon: FiMessageSquare, color: "text-yellow-500" },
  { id: 4, type: "blog", message: "New blog post published: 'How to earn more'", time: "5 hours ago", icon: FiEdit, color: "text-purple-500" },
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-4">
        {activities.map((act) => (
          <li key={act.id} className="flex items-start space-x-3">
            <act.icon className={`w-5 h-5 ${act.color} mt-0.5`} />
            <div className="flex-1">
              <p className="text-sm text-gray-800">{act.message}</p>
              <p className="text-xs text-gray-400">{act.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;