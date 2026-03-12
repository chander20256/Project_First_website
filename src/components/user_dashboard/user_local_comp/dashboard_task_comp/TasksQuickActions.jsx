import { useTasksContext } from "./Taskscontext";

const actions = [
  { icon: "🔥", label: "Trending" },
  { icon: "🎁", label: "Bonus Offers" },
  { icon: "🏆", label: "Leaderboard" },
  { icon: "📊", label: "History" },
];

const TasksQuickActions = () => {
  const { history } = useTasksContext();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
      {actions.map((action, i) => (
        <button
          key={i}
          style={{ background: "#fff", border: "1px solid #E5E5E5", borderRadius: 14, padding: "14px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", transition: "all 0.2s", position: "relative" }}
          onMouseOver={(e) => { e.currentTarget.style.borderColor = "#FF6B00"; e.currentTarget.style.background = "rgba(255,107,0,0.07)"; }}
          onMouseOut={(e) => { e.currentTarget.style.borderColor = "#E5E5E5"; e.currentTarget.style.background = "#fff"; }}
        >
          <span style={{ fontSize: 22 }}>{action.icon}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#0A0A0A" }}>{action.label}</span>
          {/* Badge: show history count on History tab */}
          {i === 3 && history.length > 0 && (
            <span style={{ position: "absolute", top: 8, right: 8, background: "#FF6B00", color: "#fff", borderRadius: 99, fontSize: 10, fontWeight: 800, padding: "1px 6px" }}>
              {history.length}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TasksQuickActions;