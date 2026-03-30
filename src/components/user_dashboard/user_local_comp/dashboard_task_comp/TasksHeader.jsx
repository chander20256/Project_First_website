// ─────────────────────────────────────────────────────────────────────────────
// LOCATION: TasksHeader.jsx
// ─────────────────────────────────────────────────────────────────────────────
import { useTasksContext } from "./Taskscontext";

export const TasksHeader = () => {
  const { completedCount, tasks } = useTasksContext();
  return (
    <div className="mb-2">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
        Task <span className="text-orange-600">Center</span>
      </h1>
      <p className="text-gray-500 mt-2 text-lg max-w-2xl">
        Complete tasks, upload proof and earn <span className="font-bold text-orange-500">credits</span> after admin approval.
      </p>
      <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-300 mt-4 rounded-full" />
    </div>
  );
};

export default TasksHeader;


