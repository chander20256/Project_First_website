import { useState } from "react";

const ManualAdjustment = () => {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState("");

  const handleAdjust = () => {
    // API call to adjust balance
    alert(`Adjust user ${userId} by ${amount} for ${reason}`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Manual Balance Adjustment</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="User ID or Email"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Amount (+/-)"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleAdjust}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Apply Adjustment
        </button>
      </div>
    </div>
  );
};

export default ManualAdjustment;