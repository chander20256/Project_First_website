import { useState, useEffect } from "react";
import axios from "axios";

const TransactionHistory = () => {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/wallet/transactions"
    );
    setTransactions(res.data);
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
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Transaction History</h3>

      <div className="space-y-4">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <p className="font-medium">{t.desc}</p>
              <p className="text-xs text-gray-400">{t.date}</p>
            </div>

            <div className="text-right">
              <p
                className={`font-bold ${
                  t.type === "credit"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {t.type === "credit" ? "+" : "-"}${t.amount}
              </p>

              <span className="text-xs text-gray-400">{t.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;