const GamesStats = () => {
  const stats = [
    { title: "Games Played", value: 42 },
    { title: "Tokens Earned", value: 1240 },
    { title: "High Score", value: 890 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">{stat.title}</p>

          <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default GamesStats;
