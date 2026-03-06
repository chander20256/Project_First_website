import TasksHeader from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/TasksHeader";
import TasksStats from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/TasksStats";
import TasksGrid from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/TasksGrid";
import ActiveTask from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/ActiveTask";
import TasksQuickActions from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/TasksQuickActions";

const DashboardTasks = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <TasksHeader />

      <TasksStats />

      <TasksGrid />

      <ActiveTask />

      <TasksQuickActions />
    </div>
  );
};

export default DashboardTasks;
