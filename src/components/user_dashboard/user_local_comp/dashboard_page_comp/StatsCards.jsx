const StatsCards = () => {
  const stats = [
    { title: "Games", value: 12 },
    { title: "Surveys", value: 8 },
    { title: "Tasks", value: 15 },
    { title: "Referrals", value: 5 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-gray-500 text-sm">{stat.title}</h3>

          <p className="text-2xl font-bold mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
