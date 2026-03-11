import { useEffect, useState } from "react";
import axios from "axios";

const WalletStats = () => {

  const [stats, setStats] = useState({
    earned: 0,
    withdrawn: 0,
    pending: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/wallet/transactions"
      );

      const transactions = res.data;

      let earned = 0;
      let withdrawn = 0;
      let pending = 0;

      transactions.forEach((t) => {
        if (t.type === "credit") {
          earned += t.amount;
        }

        if (t.type === "debit" && t.status === "completed") {
          withdrawn += t.amount;
        }

        if (t.type === "debit" && t.status === "pending") {
          pending += t.amount;
        }
      });

      setStats({ earned, withdrawn, pending });

    } catch (error) {
      console.error(error);
    }
  };

  const statCards = [
    {
      title: "Total Earned",
      amount: `$${stats.earned.toFixed(2)}`,
      color: "text-green-500",
    },
    {
      title: "Total Withdrawn",
      amount: `$${stats.withdrawn.toFixed(2)}`,
      color: "text-red-500",
    },
    {
      title: "Pending Withdrawals",
      amount: `$${stats.pending.toFixed(2)}`,
      color: "text-orange-500",
    },
  ];
  useEffect(() => {
  fetchStats();

  const updateHandler = () => {
    fetchStats();
  };

  window.addEventListener("walletUpdated", updateHandler);

  return () => {
    window.removeEventListener("walletUpdated", updateHandler);
  };
}, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">{stat.title}</p>

          <h3 className={`text-2xl font-bold mt-2 ${stat.color}`}>
            {stat.amount}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default WalletStats;