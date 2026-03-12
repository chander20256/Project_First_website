import { useTasksContext } from "./Taskscontext";

const C = { orange: "#FF6B00", black: "#0A0A0A", borderGray: "#E5E5E5", textGray: "#888" };

const totalCredits = { 1: 50, 2: 35, 3: 75 };

const taskBanners = {
  1: (
    <div style={{ width: "100%", height: 180, background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)" }} />
      <svg width="80" height="80" viewBox="0 0 24 24" fill="white" style={{ opacity: 0.9 }}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
      <div style={{ position: "absolute", bottom: 12, right: 14 }}>
        <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, backdropFilter: "blur(4px)" }}>SOCIAL</span>
      </div>
    </div>
  ),
  2: (
    <div style={{ width: "100%", height: 180, background: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 70% 40%, rgba(34,158,217,0.3) 0%, transparent 60%)" }} />
      <svg width="80" height="80" viewBox="0 0 24 24" fill="#229ED9">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
      <div style={{ position: "absolute", bottom: 12, right: 14 }}>
        <span style={{ background: "rgba(34,158,217,0.25)", color: "#7dd3fc", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>COMMUNITY</span>
      </div>
    </div>
  ),
  3: (
    <div style={{ width: "100%", height: 180, background: "linear-gradient(135deg,#1a0a00,#2d1200,#3d1a00)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,107,0,0.35) 0%, transparent 65%)" }} />
      <span style={{ fontSize: 72, filter: "drop-shadow(0 0 20px rgba(255,107,0,0.7))" }}>🔤</span>
      <div style={{ position: "absolute", bottom: 12, right: 14 }}>
        <span style={{ background: "rgba(255,107,0,0.25)", color: "#fdba74", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>GAME</span>
      </div>
    </div>
  ),
};

const TaskCard = ({ task }) => {
  const { isCompleted, setActiveTask } = useTasksContext();
  const completed = isCompleted(task.id);
  const maxCredits = totalCredits[task.id] || 100;
  const earned = completed ? maxCredits : 0;
  const pct = (earned / maxCredits) * 100;

  return (
    <div
      style={{ background: "#fff", border: `1px solid ${completed ? "rgba(34,197,94,0.3)" : C.borderGray}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", transition: "box-shadow 0.2s, transform 0.2s" }}
      onMouseOver={(e) => { if (!completed) e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(0,0,0,0.13)"; }}
      onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.08)"; }}
    >
      {/* Banner */}
      <div style={{ position: "relative" }}>
        {taskBanners[task.id]}
        {completed && (
          <div style={{ position: "absolute", top: 12, left: 12, background: "#22c55e", color: "#fff", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 800 }}>
            ✓ COMPLETED
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px 20px" }}>
        <p style={{ fontWeight: 800, fontSize: 15, color: C.black, marginBottom: 14 }}>{task.title}</p>

        {/* Credits progress label */}
        <p style={{ color: "#3b82f6", fontWeight: 600, fontSize: 14, marginBottom: 8, textAlign: "center" }}>
          {earned.toLocaleString()} of {maxCredits.toLocaleString()} credits
        </p>

        {/* Progress bar */}
        <div style={{ background: "#e5e7eb", borderRadius: 99, height: 8, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ height: "100%", width: `${pct}%`, borderRadius: 99, background: completed ? "linear-gradient(90deg,#22c55e,#16a34a)" : "linear-gradient(90deg,#3b82f6,#6366f1)", transition: "width 0.6s ease" }} />
        </div>

        {/* CTA */}
        <button
          onClick={() => !completed && setActiveTask(task)}
          style={{ width: "100%", background: completed ? "#f0fdf4" : C.black, color: completed ? "#16a34a" : "#fff", border: `2px solid ${completed ? "#22c55e" : C.black}`, borderRadius: 10, padding: "11px", fontWeight: 800, fontSize: 14, cursor: completed ? "default" : "pointer", transition: "all 0.2s" }}
          onMouseOver={(e) => { if (!completed) { e.currentTarget.style.background = C.orange; e.currentTarget.style.borderColor = C.orange; } }}
          onMouseOut={(e) => { if (!completed) { e.currentTarget.style.background = C.black; e.currentTarget.style.borderColor = C.black; } }}
        >
          {completed ? "✓ Completed" : "Start Task →"}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;