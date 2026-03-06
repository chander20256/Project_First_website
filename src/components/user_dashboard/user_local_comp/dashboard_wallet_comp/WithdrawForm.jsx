import { useState } from "react";

const WithdrawForm = () => {
  const [balance, setBalance] = useState(245.75);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleWithdraw = (e) => {
    e.preventDefault();

    const amount = parseFloat(withdrawAmount);

    if (amount > 0 && amount <= balance) {
      setBalance(balance - amount);
      alert(`Withdrawal of $${amount} requested`);
      setWithdrawAmount("");
    } else {
      alert("Invalid amount");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Withdraw Funds</h3>

      <form onSubmit={handleWithdraw} className="space-y-4">
        <input
          type="number"
          placeholder="Enter amount"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          className="w-full border rounded-lg p-3"
          required
        />

        <select className="w-full border rounded-lg p-3">
          <option>PayPal</option>
          <option>Bank Transfer</option>
          <option>Crypto</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
        >
          Request Withdrawal
        </button>
      </form>

      <p className="text-xs text-gray-400 text-center mt-3">
        Minimum withdrawal: $10
      </p>
    </div>
  );
};

export default WithdrawForm;
