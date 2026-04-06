// LOCATION: src/pages/dashboard/DashboardTasks.jsx
// Matches their component structure exactly — TasksBoard + ActiveTask at page level

import { TasksProvider } from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/Taskscontext";
import TasksHeader from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/TasksHeader";
import TasksStats  from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/TasksStats";
import TasksBoard  from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/TasksBoard";
import ActiveTask  from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/ActiveTask";

const DashboardTasks = () => (
  <TasksProvider>
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <TasksHeader />
      <TasksStats />
      <TasksBoard />
      <ActiveTask />
    </div>
  </TasksProvider>
);

export default DashboardTasks;