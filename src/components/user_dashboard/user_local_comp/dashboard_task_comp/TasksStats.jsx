// LOCATION: src/components/user_dashboard/user_local_comp/dashboard_task_comp/TasksStats.jsx

import { useTasksContext } from "./Taskscontext";

const StatCard = ({ icon, label, value, highlight }) => (
  <div className={`bg-white rounded-2xl shadow-sm border p-5 flex flex-col gap-3 transition-all ${highlight ? "border-orange-200 shadow-orange-100" : "border-gray-100"}`}>
    <div className="flex items-center justify-between">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{label}</p>
      <span className="text-xl">{icon}</span>
    </div>
    <p className={`text-3xl font-black ${highlight ? "text-orange-600" : "text-gray-900"}`}>{value}</p>
  </div>
);

const TasksStats = () => {
  const { completedCount, tasks, totalCredits, submissions } = useTasksContext();
  const pendingCount  = Object.values(submissions).filter((s) => s.status === "pending").length;
  const available     = tasks.length - completedCount;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <StatCard icon="✅" label="Tasks Done"      value={`${completedCount}/${tasks.length}`} />
      <StatCard icon="🪙" label="Credits Earned"  value={totalCredits}  highlight={totalCredits > 0} />
      <StatCard icon="⏳" label="Under Review"    value={pendingCount} />
      <StatCard icon="🔥" label="Available"       value={available > 0 ? available : "All done!"} />
    </div>
  );
};

export default TasksStats;