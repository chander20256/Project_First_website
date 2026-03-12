import { useTasksContext } from "./Taskscontext";

const TasksStats = () => {
  const { completedIds, tasks, totalCredits } = useTasksContext();

  const stats = [
    { label: "Tasks Completed", value: `${completedIds.length}/${tasks.length}`, icon: "✅" },
    { label: "Credits Earned",  value: totalCredits,                              icon: "🎁", highlight: true },
    { label: "Available Tasks", value: tasks.length - completedIds.length,        icon: "🔥" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
      {stats.map((stat, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            border: `1px solid ${stat.highlight && totalCredits > 0 ? "rgba(255,107,0,0.25)" : "#E5E5E5"}`,
            borderRadius: 16,
            padding: "18px 20px",
            boxShadow: stat.highlight && totalCredits > 0 ? "0 4px 20px rgba(255,107,0,0.1)" : "0 2px 8px rgba(0,0,0,0.05)",
            transition: "all 0.4s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>{stat.icon}</span>
            <p style={{ color: "#888", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, margin: 0 }}>
              {stat.label}
            </p>
          </div>
          <p style={{ fontSize: 28, fontWeight: 900, color: stat.highlight ? "#FF6B00" : "#0A0A0A", margin: 0, transition: "color 0.3s" }}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TasksStats;