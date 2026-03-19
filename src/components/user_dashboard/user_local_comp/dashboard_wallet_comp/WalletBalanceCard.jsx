import { useState, useEffect } from "react";
import axios from "axios";

const WalletBalanceCard = () => {
  const [balance, setBalance] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      fetchBalance();
    }
  }, []);

  const fetchBalance = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/wallet/balance/${user.id}`
      );
      setBalance(res.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const addMoney = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/wallet/add", {
        userId: user.id,
        amount: 100,
      });
      setBalance(res.data.balance);
      window.dispatchEvent(new Event("walletUpdated"));
    } catch (error) {
      console.error("Add money error:", error.response?.data || error);
    }
  };

  const withdrawMoney = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/wallet/withdraw", {
        userId: user.id,
        amount: 50,
      });
      setBalance(res.data.balance);
      window.dispatchEvent(new Event("walletUpdated"));
    } catch (error) {
      alert(error.response?.data?.message || "Withdraw failed");
    }
  };

  return (
    <div className="relative overflow-hidden bg-orange-500 rounded-2xl p-6 sm:p-8 mb-4 font-['DM_Sans',sans-serif] w-full">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

      <p className="text-sm font-medium text-white/75 mb-2">Available Balance</p>

      <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-none mb-1">
        ${balance.toFixed(2)}
      </h2>

      <p className="text-sm text-white/60 mb-7">
        ≈ {(balance * 82).toLocaleString()} INR
      </p>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={addMoney}
          className="bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-orange-50 transition-colors duration-150"
        >
          + Add Money
        </button>
        <button
          onClick={withdrawMoney}
          className="bg-white/15 text-white text-sm font-semibold px-5 py-2.5 rounded-lg border border-white/40 hover:bg-white/25 transition-colors duration-150"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default WalletBalanceCard;