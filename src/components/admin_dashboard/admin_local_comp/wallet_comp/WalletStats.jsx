const WalletStats = () => {
  const stats = [
    { label: "Total Deposits", value: "$123,456" },
    { label: "Total Withdrawals", value: "$78,901" },
    { label: "Pending Withdrawals", value: "$2,345" },
    { label: "Total Fees", value: "$1,234" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">{stat.label}</p>
          <p className="text-2xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default WalletStats;