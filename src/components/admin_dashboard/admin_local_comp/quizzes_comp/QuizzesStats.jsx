const QuizzesStats = () => {

  const stats = [
    { label: "Active Quizzes", value: "12" },
    { label: "Total Attempts", value: "3456" },
    { label: "Avg Score", value: "78%" },
    { label: "Points Awarded", value: "12345" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">{stat.label}</p>
          <p className="text-xl font-bold">{stat.value}</p>
        </div>
      ))}

    </div>
  );
};

export default QuizzesStats;