// LOCATION: src/components/admin/tasks/AdminTasksTable.jsx

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, Trash2, Power, Edit3, AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";

const BASE = "http://localhost:5000";

const ConfirmModal = ({ open, title, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle size={18} className="text-red-500" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Delete Task?</h3>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{title}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onCancel}  className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
};

// ── Single task row ───────────────────────────────────────────────────────────
const TaskRow = ({ task, onToggle, onEdit, onDelete, isExpiredSection }) => (
  <tr className={`hover:bg-gray-50 transition-colors ${isExpiredSection ? "opacity-60" : ""}`}>
    {/* Thumbnail */}
    <td className="px-4 py-3">
      {task.thumbnail ? (
        <img src={task.thumbnail} alt="" className="h-10 w-14 rounded-lg object-cover border border-gray-200" />
      ) : (
        <div className="h-10 w-14 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center">
          <span className="text-xs font-black text-orange-300 uppercase">{(task.platform || "?").charAt(0)}</span>
        </div>
      )}
    </td>

    {/* Title */}
    <td className="px-4 py-3">
      <p className="font-semibold text-gray-800 max-w-[160px] truncate">{task.title}</p>
      <p className="text-xs text-gray-400 truncate max-w-[160px]">{task.description}</p>
    </td>

    {/* Platform */}
    <td className="px-4 py-3">
      <span className="rounded-full bg-orange-50 border border-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-600 capitalize">
        {task.platform}
      </span>
    </td>

    {/* Reward */}
    <td className="px-4 py-3 font-bold text-orange-500">{task.reward} TKN</td>

    {/* Time */}
    <td className="px-4 py-3 text-xs text-gray-500">
      {task.timeMinutes > 0 ? `${task.timeMinutes} min` : <span className="text-gray-300">No limit</span>}
    </td>

    {/* Expires */}
    <td className="px-4 py-3 text-xs">
      {task.expiresAt ? (
        <span className={task.expired ? "text-red-500 font-semibold" : "text-gray-500"}>
          {task.expired
            ? `⛔ ${new Date(task.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
            : new Date(task.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
          }
        </span>
      ) : (
        <span className="text-gray-300">Never</span>
      )}
    </td>

    {/* Submissions */}
    <td className="px-4 py-3 text-xs">
      <span className="text-yellow-600 font-semibold">{task.stats?.pending || 0} pending</span>
      {" · "}
      <span className="text-green-600">{task.stats?.paid || 0} paid</span>
    </td>

    {/* Status */}
    <td className="px-4 py-3">
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
        task.expired ? "bg-red-100 text-red-600" :
        task.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
      }`}>
        {task.expired ? "Expired" : task.isActive ? "Active" : "Inactive"}
      </span>
    </td>

    {/* Actions */}
    <td className="px-4 py-3">
      <div className="flex items-center gap-1.5">
        <button onClick={() => onEdit(task)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors" title="Edit">
          <Edit3 size={13} />
        </button>
        {!isExpiredSection && (
          <button onClick={() => onToggle(task._id)} className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${task.isActive ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-500 hover:text-white" : "bg-green-50 text-green-600 hover:bg-green-500 hover:text-white"}`} title={task.isActive ? "Deactivate" : "Activate"}>
            <Power size={13} />
          </button>
        )}
        <button onClick={() => onDelete(task)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-colors" title="Delete">
          <Trash2 size={13} />
        </button>
      </div>
    </td>
  </tr>
);

// ── Main component ────────────────────────────────────────────────────────────
const TasksTable = ({ refreshKey, onEdit }) => {
  const [tasks,           setTasks]           = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [confirm,         setConfirm]         = useState(null);
  const [toast,           setToast]           = useState(null);
  const [expiredCollapsed, setExpiredCollapsed] = useState(false);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${BASE}/api/admin/tasks`)
      .then((r) => r.json())
      .then((d) => { setTasks(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => { showToast("Failed to load tasks", "error"); setLoading(false); });
  }, [refreshKey]);

  useEffect(() => { load(); }, [load]);

  const handleToggle = async (id) => {
    try {
      const res  = await fetch(`${BASE}/api/admin/tasks/${id}/toggle`, { method: "PATCH" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setTasks((prev) => prev.map((t) => t._id === id ? { ...t, isActive: !t.isActive } : t));
      showToast(data.message);
    } catch (err) { showToast(err.message || "Failed", "error"); }
  };

  const handleDelete = async () => {
    if (!confirm) return;
    try {
      const res  = await fetch(`${BASE}/api/admin/tasks/${confirm._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setTasks((prev) => prev.filter((t) => t._id !== confirm._id));
      showToast("Task deleted");
    } catch (err) { showToast(err.message || "Failed", "error"); }
    finally { setConfirm(null); }
  };

  // Separate active vs expired
  const activeTasks  = tasks.filter((t) => !t.expired);
  const expiredTasks = tasks.filter((t) =>  t.expired);

  const TABLE_HEADERS = ["Image", "Title", "Platform", "Reward", "Time Limit", "Expires", "Submissions", "Status", "Actions"];

  const renderHead = () => (
    <thead className="bg-gray-50">
      <tr>
        {TABLE_HEADERS.map((h) => (
          <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">{h}</th>
        ))}
      </tr>
    </thead>
  );

  return (
    <>
      {toast && (
        <div className={`fixed top-4 right-4 z-50 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {toast.msg}
        </div>
      )}
      <ConfirmModal open={!!confirm} title={confirm?.title} onConfirm={handleDelete} onCancel={() => setConfirm(null)} />

      <div className="space-y-4">

        {/* ── Active Tasks ── */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <h2 className="font-bold text-gray-800">All Tasks</h2>
              <p className="text-xs text-gray-400 mt-0.5">{activeTasks.length} active tasks</p>
            </div>
            <button onClick={load} className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-500 hover:border-orange-300 hover:text-orange-500 transition-colors">
              <RefreshCw size={12} /> Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-gray-100">
              {renderHead()}
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i}>{[...Array(9)].map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 animate-pulse rounded bg-gray-100"/></td>)}</tr>
                  ))
                ) : activeTasks.length === 0 ? (
                  <tr><td colSpan={9} className="py-12 text-center text-gray-400">No active tasks — create one above</td></tr>
                ) : activeTasks.map((task) => (
                  <TaskRow key={task._id} task={task} onToggle={handleToggle} onEdit={onEdit} onDelete={setConfirm} isExpiredSection={false} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Expired Tasks (collapsible) ── */}
        {!loading && expiredTasks.length > 0 && (
          <div className="rounded-xl border border-red-100 bg-white shadow-sm overflow-hidden">
            {/* Collapsible header */}
            <button
              onClick={() => setExpiredCollapsed((v) => !v)}
              className="w-full flex items-center justify-between border-b border-red-100 bg-red-50 px-5 py-4 hover:bg-red-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">⛔</span>
                <div className="text-left">
                  <h2 className="font-bold text-red-700">Expired Tasks</h2>
                  <p className="text-xs text-red-400 mt-0.5">
                    {expiredTasks.length} task{expiredTasks.length !== 1 ? "s" : ""} — hidden from user dashboard automatically
                  </p>
                </div>
              </div>
              {expiredCollapsed
                ? <ChevronRight size={18} className="text-red-400" />
                : <ChevronDown  size={18} className="text-red-400" />
              }
            </button>

            {!expiredCollapsed && (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm divide-y divide-gray-100">
                  {renderHead()}
                  <tbody className="divide-y divide-gray-50">
                    {expiredTasks.map((task) => (
                      <TaskRow key={task._id} task={task} onToggle={handleToggle} onEdit={onEdit} onDelete={setConfirm} isExpiredSection={true} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
};

export default TasksTable;