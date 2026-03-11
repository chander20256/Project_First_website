const ReferralsStats = () => {
  const stats = [
    { label: "Total Referrals", value: "1,234" },
    { label: "Pending Payouts", value: "$450" },
    { label: "Paid Out", value: "$5,678" },
    { label: "Active Referrers", value: "342" },
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

export default ReferralsStats;