import { useState } from "react";
import { FiCheck, FiX, FiEye } from "react-icons/fi";

const sampleReferrals = [
  { id: 1, referrer: "john@example.com", referred: "jane@example.com", date: "2025-03-10", status: "paid", amount: 5.0 },
  { id: 2, referrer: "alice@example.com", referred: "bob@example.com", date: "2025-03-09", status: "pending", amount: 2.5 },
  { id: 3, referrer: "charlie@example.com", referred: "dave@example.com", date: "2025-03-08", status: "paid", amount: 2.5 },
  { id: 4, referrer: "eve@example.com", referred: "frank@example.com", date: "2025-03-07", status: "pending", amount: 5.0 },
];

const ReferralsTable = () => {
  const [referrals, setReferrals] = useState(sampleReferrals);

  const markAsPaid = (id) => {
    setReferrals(referrals.map(r => r.id === id ? { ...r, status: "paid" } : r));
  };

  const reject = (id) => {
    setReferrals(referrals.filter(r => r.id !== id)); // or mark as rejected
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referrer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referred User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {referrals.map((ref) => (
            <tr key={ref.id}>
              <td className="px-6 py-4 whitespace-nowrap">{ref.referrer}</td>
              <td className="px-6 py-4 whitespace-nowrap">{ref.referred}</td>
              <td className="px-6 py-4 whitespace-nowrap">{ref.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">${ref.amount.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  ref.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {ref.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {ref.status === 'pending' && (
                  <>
                    <button
                      onClick={() => markAsPaid(ref.id)}
                      className="text-green-600 hover:text-green-900 mr-3"
                      title="Mark as paid"
                    >
                      <FiCheck className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => reject(ref.id)}
                      className="text-red-600 hover:text-red-900 mr-3"
                      title="Reject"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </>
                )}
                <button className="text-indigo-600 hover:text-indigo-900" title="View details">
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

export default ReferralsTable;