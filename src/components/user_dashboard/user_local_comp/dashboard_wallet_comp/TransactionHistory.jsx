import { useState, useEffect } from "react";
import axios from "axios";

const TxRow = ({ t, isLast }) => {
  const isCredit = t.type === "credit";
  return (
    <div className={`flex justify-between items-center py-3.5 ${isLast ? "" : "border-b border-gray-100"}`}>
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isCredit ? "bg-green-50" : "bg-orange-50"}`}>
          <span className={`text-base font-bold ${isCredit ? "text-green-600" : "text-orange-500"}`}>
            {isCredit ? "↑" : "↓"}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-black leading-tight truncate">
            {t.description}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(t.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <span className={`text-sm font-bold flex-shrink-0 ml-3 ${isCredit ? "text-green-600" : "text-orange-500"}`}>
        {isCredit ? "+" : "-"}${t.amount}
      </span>
    </div>
  );
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?._id || user?.id;

  const fetchTransactions = async () => {
    if (!userId) {
      setTransactions([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/wallet/transactions/${userId}`
      );
      setTransactions(res.data.transactions || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    }
  };

  useEffect(() => {
    fetchTransactions();
    const updateHandler = () => {
      fetchTransactions();
    };
    window.addEventListener("walletUpdated", updateHandler);
    return () => {
      window.removeEventListener("walletUpdated", updateHandler);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 font-['DM_Sans',sans-serif] w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-bold text-black">Transactions</h3>
        <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
          {transactions.length} total
        </span>
      </div>

      {transactions.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-300">
          No transactions yet
        </div>
      ) : (
        transactions.map((t, i) => (
          <TxRow key={t._id} t={t} isLast={i === transactions.length - 1} />
        ))
      )}
    </div>
  );
};

export default TransactionHistory;