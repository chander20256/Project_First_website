import { useTasksContext } from "./Taskscontext";

const TasksHeader = () => {
  const { completedIds, tasks, totalCredits } = useTasksContext();
  const allDone = completedIds.length === tasks.length;

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
      <div>
        <p style={{ color: "#FF6B00", fontWeight: 800, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
          Earn Rewards
        </p>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: "#0A0A0A", margin: 0, letterSpacing: -1 }}>
          Task Center
        </h1>
        <p style={{ color: "#888", marginTop: 4, fontSize: 14 }}>
          Complete tasks and earn GamingForge credits
        </p>
      </div>
      {allDone && (
        <div style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", borderRadius: 14, padding: "14px 24px", fontWeight: 800, fontSize: 14 }}>
          🎉 All tasks complete! You've earned {totalCredits} credits
        </div>
      )}
    </div>
  );
};

export default TasksHeader;