// LOCATION: src/components/user_dashboard/user_local_comp/dashboard_task_comp/TasksGrid.jsx

import { useTasksContext } from "./Taskscontext";
import TaskCard   from "./TaskCard";
import ActiveTask from "./ActiveTask";

const TasksGrid = () => {
  const { tasks, loading } = useTasksContext();

  // Filter out expired tasks — they should NOT appear in user dashboard
  const activeTasks = tasks.filter(
    (t) => t.isActive && !(t.expiresAt && new Date() > new Date(t.expiresAt))
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-pulse">
            <div className="h-40 bg-gray-100" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-100 rounded-lg w-3/4" />
              <div className="h-3 bg-gray-100 rounded-lg w-full" />
              <div className="h-3 bg-gray-100 rounded-lg w-2/3" />
              <div className="h-10 bg-gray-100 rounded-xl mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activeTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
        <div className="p-4 bg-white rounded-full shadow-sm mb-4">
          <span className="text-4xl">📋</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">No tasks available</h3>
        <p className="text-gray-500 mt-2">Check back later for new challenges!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeTasks.map((task) => (
          <TaskCard key={task._id || task.id} task={task} />
        ))}
      </div>
      <ActiveTask />
    </div>
  );
};

export default TasksGrid;