import { useEffect, useState } from "react";

const ReferralsGrid = () => {
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/referrals")
      .then((res) => res.json())
      .then((data) => setReferrals(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Joined On</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Earnings</th>
          </tr>
        </thead>

        <tbody>
          {referrals.length > 0 ? (
            referrals.map((r) => (
              <tr key={r._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 font-medium">{r.name}</td>
                <td className="py-3 px-6">
                  {new Date(r.joined).toLocaleDateString()}
                </td>
                <td className="py-3 px-6">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      r.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="py-3 px-6">{r.earnings} tokens</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No referrals yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReferralsGrid;