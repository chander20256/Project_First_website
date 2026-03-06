const QuizzesStats = () => {
  const stats = [
    { title: "Quizzes Completed", value: 14 },
    { title: "Tokens Earned", value: 560 },
    { title: "Available Quizzes", value: 7 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-xl shadow border flex flex-col items-center"
        >
          <span className="text-gray-500">{stat.title}</span>
          <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
        </div>
      ))}
    </div>
  );
};

export default QuizzesStats;
