import { FiDollarSign, FiDownload, FiMail, FiBarChart2 } from "react-icons/fi";

const ReferralsQuickActions = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-wrap gap-4">
      <button className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
        <FiDollarSign />
        <span>Pay All Pending</span>
      </button>
      <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
        <FiDownload />
        <span>Export Referrals</span>
      </button>
      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
        <FiMail />
        <span>Email Referrers</span>
      </button>
      <button className="flex items-center space-x-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
        <FiBarChart2 />
        <span>View Analytics</span>
      </button>
    </div>
  );
};

export default ReferralsQuickActions;