import { useEffect, useState } from "react";
import axios from "axios";

const StatCard = ({ label, value, orange }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 font-['DM_Sans',sans-serif]">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${orange ? "bg-orange-50" : "bg-gray-100"}`}>
      <div className={`w-2.5 h-2.5 rounded-full ${orange ? "bg-orange-500" : "bg-black"}`} />
    </div>
    <p className="text-xs font-medium text-gray-400 mb-1 truncate">{label}</p>
    <p className={`text-xl sm:text-2xl font-bold tracking-tight ${orange ? "text-orange-500" : "text-black"}`}>
      ${value.toFixed(2)}
    </p>
  </div>
);

const WalletStats = () => {
  const [stats, setStats] = useState({ earned: 0, withdrawn: 0, pending: 0 });

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

  useEffect(() => {
    fetchStats();
  }, []);

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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
      <StatCard label="Total Earned"    value={stats.earned}    orange={false} />
      <StatCard label="Total Withdrawn" value={stats.withdrawn} orange={true}  />
      <StatCard label="Pending"         value={stats.pending}   orange={false} />
    </div>
  );
};

export default WalletStats;