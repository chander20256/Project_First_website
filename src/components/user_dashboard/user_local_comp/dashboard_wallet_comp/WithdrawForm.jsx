import { useState } from "react";

const WithdrawForm = () => {
  const [balance, setBalance] = useState(245.75);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [method, setMethod] = useState("PayPal");

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

  const methods = ["PayPal", "Bank Transfer", "Crypto"];

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 font-['DM_Sans',sans-serif] w-full">
      <h3 className="text-base font-bold text-black mb-4">Withdraw Funds</h3>

      <form onSubmit={handleWithdraw} className="space-y-4">

        {/* Amount */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">
            Amount
          </label>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-orange-500 transition-colors duration-150">
            <span className="px-3 text-orange-500 font-semibold text-sm border-r border-gray-200 bg-gray-50 self-stretch flex items-center">
              $
            </span>
            <input
              type="number"
              placeholder="0.00"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              required
              className="flex-1 px-3 py-2.5 text-sm font-semibold text-black bg-transparent outline-none placeholder:text-gray-300 w-0 min-w-0"
            />
          </div>
        </div>

        {/* Method */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">
            Payout Method
          </label>
          <div className="flex flex-wrap gap-2">
            {methods.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={`flex-1 min-w-[80px] py-2 text-xs font-semibold rounded-lg border transition-all duration-150 ${
                  method === m
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-500 border-gray-200 hover:border-orange-300"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Available */}
        <div className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2.5">
          <span className="text-xs font-medium text-gray-400">Available</span>
          <span className="text-sm font-bold text-black">${balance.toFixed(2)}</span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-3 rounded-lg transition-colors duration-150"
        >
          Request Withdrawal
        </button>

        <p className="text-center text-xs text-gray-300">
          Minimum withdrawal: $10
        </p>
      </form>
    </div>
  );
};

export default WithdrawForm;