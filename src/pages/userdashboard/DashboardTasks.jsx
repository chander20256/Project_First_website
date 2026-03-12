import { TasksProvider } from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/Taskscontext";
import TasksHeader from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/TasksHeader";
import TasksStats from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/TasksStats";
import TasksGrid from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/TasksGrid";
import TasksQuickActions from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/TasksQuickActions";

// ActiveTask modal is rendered inside TasksGrid — no need to place it separately

const DashboardTasks = () => {
  return (
    <TasksProvider>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <TasksHeader />
        <TasksStats />
        <TasksQuickActions />
        <TasksGrid />
      </div>
    </TasksProvider>
  );
};

export default DashboardTasks;