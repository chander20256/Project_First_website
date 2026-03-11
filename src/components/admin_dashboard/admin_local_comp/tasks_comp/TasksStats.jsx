const TasksStats = () => {
  const stats = [
    { label: "Active Tasks", value: "18" },
    { label: "Completed Today", value: "342" },
    { label: "Total Rewards Paid", value: "$2,450" },
    { label: "Avg. Completion Rate", value: "73%" },
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

export default TasksStats;