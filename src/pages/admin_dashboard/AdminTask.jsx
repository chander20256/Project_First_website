// import React from 'react'

// const AdminTask = () => {
//   return (
//     <div>
//       <h1>Admin Task</h1>
//     </div>
//   )
// }

// export default AdminTask








import TasksHeader from "../../components/admin_dashboard/admin_local_comp/tasks_comp/TasksHeader";
import TasksStats from "../../components/admin_dashboard/admin_local_comp/tasks_comp/TasksStats";
import AddTaskForm from "../../components/admin_dashboard/admin_local_comp/tasks_comp/AddTaskForm";
import TasksTable from "../../components/admin_dashboard/admin_local_comp/tasks_comp/TasksTable";
import TasksQuickActions from "../../components/admin_dashboard/admin_local_comp/tasks_comp/TasksQuickActions";

const AdminTasks = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <TasksHeader />
      <TasksStats />
      <AddTaskForm />
      <TasksTable />
      <TasksQuickActions />
    </div>
  );
};

export default AdminTasks;