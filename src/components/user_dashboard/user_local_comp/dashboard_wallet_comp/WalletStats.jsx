const WalletStats = () => {
  const stats = [
    { title: "Total Earned", amount: "$1,245.50", color: "text-green-500" },
    { title: "Total Withdrawn", amount: "$999.75", color: "text-red-500" },
    {
      title: "Pending Withdrawals",
      amount: "$50.00",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {stats.map((stat, index) => (
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
