const RecentTransactions = () => {
  const transactions = [
    {
      id: 1,
      description: "Completed survey #142",
      date: "2023-02-27",
      amount: "+$5.00",
    },
    {
      id: 2,
      description: "Won Quiz Game",
      date: "2023-02-27",
      amount: "+$2.50",
    },
    {
      id: 3,
      description: "Daily Spin Reward",
      date: "2023-02-26",
      amount: "+$1.00",
    },
    {
      id: 4,
      description: "Referral bonus - Sarah M.",
      date: "2023-02-25",
      amount: "+$10.00",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>

      {transactions.map((t) => (
        <div
          key={t.id}
          className="flex justify-between items-center py-3 border-b last:border-none"
        >
          <div>
            <p className="font-medium">{t.description}</p>

            <p className="text-xs text-gray-400">{t.date}</p>
          </div>

          <p className="font-bold text-green-500">{t.amount}</p>
        </div>
      ))}

      <div className="text-right mt-4 font-semibold">
        Weekly Earnings: $45.50
      </div>
    </div>
  );
};

export default RecentTransactions;
