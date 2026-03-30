// LOCATION: src/components/user_dashboard/user_local_comp/dashboard_task_comp/TaskCard.jsx

import { useTasksContext } from "./Taskscontext";

const StatusBadge = ({ status }) => {
  const configs = {
    pending:  { icon: "⏳", label: "Under Review",              bg: "bg-yellow-50 border-yellow-200", text: "text-yellow-700" },
    approved: { icon: "✅", label: "Approved — Awaiting Payment",bg: "bg-green-50 border-green-200",   text: "text-green-700"  },
    rejected: { icon: "❌", label: "Rejected",                   bg: "bg-red-50 border-red-200",       text: "text-red-600"    },
    paid:     { icon: "🎉", label: "Reward Paid!",               bg: "bg-orange-50 border-orange-200", text: "text-orange-600" },
  };
  const cfg = configs[status];
  if (!cfg) return null;
  return (
    <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${cfg.bg}`}>
      <span className="text-base">{cfg.icon}</span>
      <p className={`text-xs font-black ${cfg.text}`}>{cfg.label}</p>
    </div>
  );
};

// Derive a readable label from platform string
const PlatformBadge = ({ platform }) => (
  <div className="absolute top-2 left-2 rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-white capitalize">
    {platform}
  </div>
);

const TaskCard = ({ task }) => {
  const { getSubmission, setActiveTask } = useTasksContext();
  const submission = getSubmission(task._id || task.id);
  const status     = submission?.status || null;
  const isLocked   = !!status;

  const isExpired = task.expiresAt && new Date() > new Date(task.expiresAt);
  const timeLabel = task.timeMinutes > 0
    ? `${task.timeMinutes} min${task.timeMinutes !== 1 ? "s" : ""}`
    : "No limit";

  const buttonConfig = ({
    null:     { label: isExpired ? "Expired" : "Start Task →", disabled: isExpired, cls: isExpired ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-100 hover:-translate-y-0.5" },
    pending:  { label: "⏳ Under Review",                 disabled: true, cls: "bg-yellow-100 text-yellow-700 cursor-not-allowed" },
    approved: { label: "✅ Approved — Awaiting Payment",  disabled: true, cls: "bg-green-100 text-green-700 cursor-not-allowed"   },
    rejected: { label: "❌ Rejected",                     disabled: true, cls: "bg-red-100 text-red-600 cursor-not-allowed"        },
    paid:     { label: "🔒 Reward Claimed",               disabled: true, cls: "bg-gray-100 text-gray-500 cursor-not-allowed"     },
  })[status];

  return (
    <div className={`bg-white rounded-2xl shadow-sm border flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden ${isLocked ? "border-gray-100 opacity-90" : "border-gray-100"}`}>

      {/* ── Banner ── */}
      <div className="relative">
        <div className="w-full h-40 overflow-hidden bg-gray-100 border-b border-gray-100 group-hover:border-orange-200 transition-colors">
          {task.thumbnail ? (
            <img
              src={task.thumbnail}
              alt={task.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-orange-50">
              <span className="text-5xl font-black text-orange-200 uppercase">
                {(task.platform || "T").charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Reward pill */}
        <div className="absolute top-2 right-2 flex items-center bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-orange-100 shadow-sm">
          <span className="text-sm font-bold text-orange-600">🪙 {task.reward}</span>
        </div>

        {/* Platform badge */}
        <PlatformBadge platform={task.platform} />

        {/* Paid lock overlay */}
        {status === "paid" && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl">🔒</span>
              <p className="text-white font-black text-sm mt-1">Reward Claimed</p>
            </div>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className={`text-lg font-bold mb-1 transition-colors line-clamp-1 ${isLocked ? "text-gray-500" : "text-gray-900 group-hover:text-orange-600"}`}>
          {task.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">
          {task.description || "Complete this task to earn rewards."}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider flex-wrap">
          <span>⏱ {timeLabel}</span>
          {task.expiresAt && (
            <span className={isExpired ? "text-red-400" : "text-gray-400"}>
              {isExpired ? "⛔ Expired" : `📅 Expires ${new Date(task.expiresAt).toLocaleDateString()}`}
            </span>
          )}
        </div>

        {/* Submission status */}
        {submission && <div className="mb-3"><StatusBadge status={status} /></div>}

        {/* CTA */}
        <button
          onClick={() => !buttonConfig.disabled && setActiveTask(task)}
          disabled={buttonConfig.disabled}
          className={`w-full py-3 rounded-xl font-bold transition-all duration-300 text-sm mt-auto ${buttonConfig.cls}`}
        >
          {buttonConfig.label}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;