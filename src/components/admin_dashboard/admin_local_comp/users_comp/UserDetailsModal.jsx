import {
  X,
  Ban,
  Trash2,
  DollarSign,
  TrendingUp,
  Award,
  Users,
} from "lucide-react";

const UserDetailsModal = ({ user, isOpen, onClose, onBan, onDelete }) => {
  if (!isOpen || !user) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user.username}
            </h2>
            <p className="text-gray-600 mt-1">{user.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Profile Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 uppercase font-semibold">
                Referral Code
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {user.referralCode || "N/A"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 uppercase font-semibold">
                Member Since
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {formatDate(user.createdAt)}
              </p>
            </div>
            <div
              className={`rounded-lg p-4 ${
                user.status === "active" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <p className="text-xs text-gray-600 uppercase font-semibold">
                Status
              </p>
              <p
                className={`text-lg font-semibold mt-1 ${
                  user.status === "active" ? "text-green-800" : "text-red-800"
                }`}
              >
                {user.status === "active" ? "Active" : "Banned"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 uppercase font-semibold">
                Balance
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {user.creds}
              </p>
            </div>
          </div>

          {/* Financial Stats */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-orange-500" />
              Financial Overview
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <p className="text-xs text-blue-700 uppercase font-semibold">
                  Total Earned
                </p>
                <p className="text-2xl font-bold text-blue-900 mt-2">
                  {user.financials?.totalEarned || 0}
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
                <p className="text-xs text-red-700 uppercase font-semibold">
                  Total Spent
                </p>
                <p className="text-2xl font-bold text-red-900 mt-2">
                  {user.financials?.totalSpent || 0}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 uppercase font-semibold">
                  Current Wallet
                </p>
                <p className="text-2xl font-bold text-green-900 mt-2">
                  ${user.wallet}
                </p>
              </div>
            </div>
          </div>

          {/* Quiz Stats */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-500" />
              Quiz Statistics
            </h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-xs text-purple-700 uppercase font-semibold">
                  Attempts
                </p>
                <p className="text-xl font-bold text-purple-900 mt-1">
                  {user.quizStats?.totalAttempts || 0}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-green-700 uppercase font-semibold">
                  Correct
                </p>
                <p className="text-xl font-bold text-green-900 mt-1">
                  {user.quizStats?.totalCorrect || 0}
                </p>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-xs text-red-700 uppercase font-semibold">
                  Wrong
                </p>
                <p className="text-xl font-bold text-red-900 mt-1">
                  {user.quizStats?.totalWrong || 0}
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-700 uppercase font-semibold">
                  Avg Score
                </p>
                <p className="text-xl font-bold text-blue-900 mt-1">
                  {user.quizStats?.averageScore}%
                </p>
              </div>
            </div>
          </div>

          {/* Referral Stats */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              Referral Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-xs text-indigo-700 uppercase font-semibold">
                  Referrals
                </p>
                <p className="text-2xl font-bold text-indigo-900 mt-2">
                  {user.referralStats?.totalReferrals || 0}
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-xs text-orange-700 uppercase font-semibold">
                  Referral Earnings
                </p>
                <p className="text-2xl font-bold text-orange-900 mt-2">
                  {user.referralStats?.referralEarnings || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              Activity Overview
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-700 uppercase font-semibold">
                  Transactions
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {user.activityStats?.transactionCount || 0}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-700 uppercase font-semibold">
                  Tasks
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {user.activityStats?.taskCount || 0}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-700 uppercase font-semibold">
                  Quiz Attempts
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {user.activityStats?.quizAttempts || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          {user.recentTransactions && user.recentTransactions.length > 0 && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Transactions
              </h3>
              <div className="space-y-2">
                {user.recentTransactions.map((trans, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {trans.description}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatDate(trans.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`font-semibold ${
                        trans.type === "credit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {trans.type === "credit" ? "+" : "-"}
                      {trans.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 flex gap-3 flex-shrink-0">
          <button
            onClick={() => {
              onBan(user._id);
              onClose();
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
              user.status === "banned"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-yellow-600 hover:bg-yellow-700 text-white"
            }`}
          >
            <Ban className="w-4 h-4" />
            {user.status === "banned" ? "Unban User" : "Ban User"}
          </button>
          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this user?")
              ) {
                onDelete(user._id);
                onClose();
              }
            }}
            className="flex-1 py-2 px-4 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete User
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 rounded-lg font-semibold bg-gray-300 hover:bg-gray-400 text-gray-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
