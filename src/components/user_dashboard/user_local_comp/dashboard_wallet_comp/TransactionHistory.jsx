import { useState, useEffect } from "react";
import axios from "axios";

const TransactionHistory = () => {

  const [transactions, setTransactions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTransactions = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/wallet/transactions/${user.id}`
      );

      setTransactions(res.data);

    } catch (error) {
      console.error("Error fetching transactions:", error);
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
    <div className="bg-white p-6 rounded-xl shadow-sm border">

      <h3 className="text-lg font-semibold mb-4">Transaction History</h3>

      <div className="space-y-4">

        {transactions.map((t) => (

          <div
            key={t._id}
            className="flex justify-between items-center border-b pb-3"
          >

            <div>
              <p className="font-medium">{t.description}</p>
              <p className="text-xs text-gray-400">
                {new Date(t.createdAt).toLocaleString()}
              </p>
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

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default TransactionHistory;