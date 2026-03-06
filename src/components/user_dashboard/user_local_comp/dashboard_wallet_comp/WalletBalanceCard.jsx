import { useState } from "react";

const WalletBalanceCard = () => {
  const [balance] = useState(245.75);

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg flex justify-between items-center flex-wrap gap-4">
      <div>
        <p className="opacity-80">Available Balance</p>

        <h2 className="text-5xl font-bold mt-2">${balance.toFixed(2)}</h2>

        <p className="text-sm opacity-80 mt-2">
          ≈ {(balance * 82).toFixed(2)} INR
        </p>
      </div>

      <div className="flex gap-4">
        <button className="border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-indigo-600 transition">
          Add Money
        </button>

        <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold">
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default WalletBalanceCard;
