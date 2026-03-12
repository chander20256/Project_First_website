import { useTasksContext } from "./Taskscontext";
import TaskCard from "./TaskCard";
import ActiveTask from "./ActiveTask";

const TasksGrid = () => {
  const { tasks } = useTasksContext();

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      {/* Modal rendered here so it sits at grid level */}
      <ActiveTask />
    </div>
  );
};

export default TasksGrid;