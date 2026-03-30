
import { useState } from "react";
import TasksHeader from "../../components/admin_dashboard/admin_local_comp/tasks_comp/TasksHeader";
import TasksStats from "../../components/admin_dashboard/admin_local_comp/tasks_comp/TasksStats";
import TasksTable from "../../components/admin_dashboard/admin_local_comp/tasks_comp/TasksTable";
import AdminTaskSubmissions from "../../components/admin_dashboard/admin_local_comp/tasks_comp/Admintasksubmissions";
import AddTaskForm from "../../components/admin_dashboard/admin_local_comp/tasks_comp/AddTaskForm";

const AdminTask = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editTask,   setEditTask]   = useState(null);
  const [activeTab,  setActiveTab]  = useState("tasks"); // "tasks" | "submissions" | "create"

  const refresh = () => setRefreshKey((k) => k + 1);

  const handleEdit = (task) => {
    setEditTask(task);
    setActiveTab("create");
  };

  const handleSaved = () => {
    refresh();
    if (editTask) { setEditTask(null); setActiveTab("tasks"); }
  };

  const TABS = [
    { id: "tasks",       label: "All Tasks"    },
    { id: "submissions", label: "Submissions"  },
    { id: "create",      label: editTask ? "Edit Task" : "Create Task" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <TasksHeader key={`hdr-${refreshKey}`} />

        {/* Stats */}
        <TasksStats key={`stats-${refreshKey}`} />

        {/* Tab switcher */}
        <div className="flex gap-1 rounded-lg border border-gray-200 bg-white p-1 w-fit shadow-sm">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); if (id !== "create") setEditTask(null); }}
              className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                activeTab === id ? "bg-orange-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "tasks" && (
          <TasksTable refreshKey={refreshKey} onEdit={handleEdit} />
        )}

        {activeTab === "submissions" && (
          <AdminTaskSubmissions refreshKey={refreshKey} />
        )}

        {activeTab === "create" && (
          <div className="max-w-xl">
            <AddTaskForm
              editTask={editTask}
              onSaved={handleSaved}
              onCancel={editTask ? () => { setEditTask(null); setActiveTab("tasks"); } : undefined}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminTask;