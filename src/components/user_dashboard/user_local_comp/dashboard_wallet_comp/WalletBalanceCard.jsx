import { useState, useEffect } from "react";
import axios from "axios";

const WalletBalanceCard = () => {

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/wallet/balance");
      setBalance(res.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const addMoney = async () => {
    const amount = 100;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/wallet/add",
        { amount }
      );

      setBalance(res.data.balance);

      // refresh balance
      fetchBalance();

      // notify other components
      window.dispatchEvent(new Event("walletUpdated"));

    } catch (error) {
      console.error("Add money error:", error);
    }
  };

  const withdrawMoney = async () => {
    const amount = 50;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/wallet/withdraw",
        { amount }
      );

      setBalance(res.data.balance);

      // notify other components
      window.dispatchEvent(new Event("walletUpdated"));

    } catch (error) {
      alert(error.response?.data?.message || "Withdraw failed");
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg flex justify-between items-center flex-wrap gap-4">

      <div>
        <p className="opacity-80">Available Balance</p>

        <h2 className="text-5xl font-bold mt-2">
          ${balance.toFixed(2)}
        </h2>

        <p className="text-sm opacity-80 mt-2">
          ≈ {(balance * 82).toFixed(2)} INR
        </p>
      </div>

      <div className="flex gap-4">

        <button
          onClick={addMoney}
          className="border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-indigo-600 transition"
        >
          Add Money
        </button>

        <button
          onClick={withdrawMoney}
          className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold"
        >
          Withdraw
        </button>

      </div>

    </div>
  );
};

export default WalletBalanceCard;