const TransactionHistory = () => {
  const transactions = [
    {
      id: 1,
      type: "credit",
      desc: "Survey #142",
      amount: 5,
      date: "2023-02-27",
      status: "completed",
    },
    {
      id: 2,
      type: "credit",
      desc: "Quiz Game Win",
      amount: 2.5,
      date: "2023-02-27",
      status: "completed",
    },
    {
      id: 3,
      type: "debit",
      desc: "Withdrawal PayPal",
      amount: 50,
      date: "2023-02-24",
      status: "pending",
    },
  ];

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
                  t.type === "credit" ? "text-green-500" : "text-red-500"
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
