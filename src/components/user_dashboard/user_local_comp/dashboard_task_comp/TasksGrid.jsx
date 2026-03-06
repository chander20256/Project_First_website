import TaskCard from "./TaskCard";

const TasksGrid = () => {
  const tasks = [
    { id: 1, title: "Download Gaming App", reward: "80 tokens", time: "3 min" },
    { id: 2, title: "Watch Promo Video", reward: "20 tokens", time: "1 min" },
    {
      id: 3,
      title: "Sign Up for Website",
      reward: "100 tokens",
      time: "4 min",
    },
    {
      id: 4,
      title: "Install Mobile Game",
      reward: "150 tokens",
      time: "5 min",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Tasks</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TasksGrid;
