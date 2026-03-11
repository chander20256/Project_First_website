import { useState } from "react";
import { FiCheck, FiX, FiEye } from "react-icons/fi";

const sampleTransactions = [
  { id: 1, user: "john@example.com", type: "deposit", amount: 50, status: "completed", date: "2025-03-09" },
  { id: 2, user: "jane@example.com", type: "withdrawal", amount: 20, status: "pending", date: "2025-03-08" },
  { id: 3, user: "bob@example.com", type: "withdrawal", amount: 100, status: "pending", date: "2025-03-07" },
];

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState(sampleTransactions);

  const approveWithdrawal = (id) => {
    setTransactions(transactions.map(tx => tx.id === id ? { ...tx, status: "completed" } : tx));
  };

  const rejectWithdrawal = (id) => {
    setTransactions(transactions.map(tx => tx.id === id ? { ...tx, status: "rejected" } : tx));
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td className="px-6 py-4 whitespace-nowrap">{tx.user}</td>
              <td className="px-6 py-4 whitespace-nowrap capitalize">{tx.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">${tx.amount.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  tx.status === 'completed' ? 'bg-green-100 text-green-700' :
                  tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {tx.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {tx.type === 'withdrawal' && tx.status === 'pending' && (
                  <>
                    <button onClick={() => approveWithdrawal(tx.id)} className="text-green-600 hover:text-green-900 mr-3">
                      <FiCheck className="w-5 h-5" />
                    </button>
                    <button onClick={() => rejectWithdrawal(tx.id)} className="text-red-600 hover:text-red-900 mr-3">
                      <FiX className="w-5 h-5" />
                    </button>
                  </>
                )}
                <button className="text-indigo-600 hover:text-indigo-900">
                  <FiEye className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;