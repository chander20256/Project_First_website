import { useState, useEffect, useRef } from "react";
import { useTasksContext, verifyPlatformAction } from "./Taskscontext";

const C = {
  orange: "#FF6B00",
  orangeGlow: "rgba(255,107,0,0.15)",
  black: "#0A0A0A",
  borderGray: "#E5E5E5",
  textGray: "#888",
};

const WORD_QUESTIONS = [
  { question: "Which word means the opposite of 'OBSCURE'?", options: ["HIDDEN", "CLEAR", "VAGUE", "DARK"], answer: "CLEAR" },
  { question: "Choose the word that BEST completes: 'The detective made a __ observation'", options: ["CARELESS", "RANDOM", "KEEN", "SLOW"], answer: "KEEN" },
  { question: "Which word is a synonym for 'RESILIENT'?", options: ["FRAGILE", "STURDY", "HOLLOW", "RIGID"], answer: "STURDY" },
];

// ─── INSTAGRAM TASK ───────────────────────────────────────────────────────────
const InstagramTask = ({ task, onComplete }) => {
  const [linkOpened, setLinkOpened] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const timerRef = useRef(null);

  const handleOpenLink = () => {
    window.open(task.link, "_blank", "noopener,noreferrer");
    setLinkOpened(true);
    setCountdown(5);
  };

  useEffect(() => {
    if (countdown <= 0) return;
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(timerRef.current); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [countdown]);

  const handleVerify = async () => {
    setVerifying(true);
    setError("");
    try {
      const result = await verifyPlatformAction("instagram");
      if (result.verified) {
        setVerified(true);
      } else {
        setError("Could not verify. Make sure you followed and try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      {/* Platform Icon */}
      <div style={{ background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", borderRadius: 24, padding: 18, display: "inline-flex" }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </div>

      {/* Steps */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Step 1 */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: linkOpened ? "rgba(34,197,94,0.06)" : "#fafafa", border: `1px solid ${linkOpened ? "#22c55e55" : C.borderGray}` }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: linkOpened ? "#22c55e" : C.orange, color: "#fff", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {linkOpened ? "✓" : "1"}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: C.black }}>Open Instagram & Follow</p>
            <p style={{ fontSize: 11, color: C.textGray, marginTop: 1 }}>Tap the button to visit our page</p>
          </div>
          <button
            onClick={handleOpenLink}
            style={{ background: linkOpened ? "#f0fdf4" : C.orange, color: linkOpened ? "#16a34a" : "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}
          >
            {linkOpened ? "Opened ✓" : "Open →"}
          </button>
        </div>

        {/* Step 2 */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: !linkOpened ? "#f9f9f9" : verified ? "rgba(34,197,94,0.06)" : "#fafafa", border: `1px solid ${verified ? "#22c55e55" : C.borderGray}`, opacity: !linkOpened ? 0.5 : 1 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: verified ? "#22c55e" : countdown > 0 ? "#f59e0b" : linkOpened ? C.orange : "#ccc", color: "#fff", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {verified ? "✓" : countdown > 0 ? countdown : "2"}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: C.black }}>Verify your follow</p>
            <p style={{ fontSize: 11, color: C.textGray, marginTop: 1 }}>
              {countdown > 0 ? `Please wait ${countdown}s…` : "Click to confirm you followed"}
            </p>
          </div>
          <button
            onClick={handleVerify}
            disabled={!linkOpened || countdown > 0 || verifying || verified}
            style={{
              background: verified ? "#f0fdf4" : verifying ? "#f3f4f6" : !linkOpened || countdown > 0 ? "#e5e5e5" : C.orange,
              color: verified ? "#16a34a" : verifying ? C.textGray : !linkOpened || countdown > 0 ? "#aaa" : "#fff",
              border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 700, fontSize: 12,
              cursor: !linkOpened || countdown > 0 || verifying || verified ? "default" : "pointer",
              minWidth: 72, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            {verifying ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> Checking…</> : verified ? "Verified ✓" : "Verify"}
          </button>
        </div>
      </div>

      {error && <p style={{ color: "#ef4444", fontSize: 13, fontWeight: 600, textAlign: "center" }}>{error}</p>}

      {verified && (
        <button
          onClick={onComplete}
          style={{ width: "100%", background: C.orange, color: "#fff", border: "none", borderRadius: 12, padding: "13px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}
        >
          🎁 Claim +50 Credits →
        </button>
      )}
    </div>
  );
};

// ─── TELEGRAM TASK ────────────────────────────────────────────────────────────
const TelegramTask = ({ task, onComplete }) => {
  const [linkOpened, setLinkOpened] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const timerRef = useRef(null);

  const handleOpenLink = () => {
    window.open(task.link, "_blank", "noopener,noreferrer");
    setLinkOpened(true);
    setCountdown(5);
  };

  useEffect(() => {
    if (countdown <= 0) return;
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(timerRef.current); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [countdown]);

  const handleVerify = async () => {
    setVerifying(true);
    setError("");
    try {
      const result = await verifyPlatformAction("telegram");
      if (result.verified) setVerified(true);
      else setError("Could not verify. Make sure you joined and try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <div style={{ background: "#229ED9", borderRadius: 24, padding: 18, display: "inline-flex" }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Step 1 */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: linkOpened ? "rgba(34,197,94,0.06)" : "#fafafa", border: `1px solid ${linkOpened ? "#22c55e55" : C.borderGray}` }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: linkOpened ? "#22c55e" : "#229ED9", color: "#fff", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {linkOpened ? "✓" : "1"}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: C.black }}>Open Telegram & Join</p>
            <p style={{ fontSize: 11, color: C.textGray, marginTop: 1 }}>Tap to open our channel</p>
          </div>
          <button onClick={handleOpenLink} style={{ background: linkOpened ? "#f0fdf4" : "#229ED9", color: linkOpened ? "#16a34a" : "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
            {linkOpened ? "Opened ✓" : "Open →"}
          </button>
        </div>

        {/* Step 2 */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: !linkOpened ? "#f9f9f9" : verified ? "rgba(34,197,94,0.06)" : "#fafafa", border: `1px solid ${verified ? "#22c55e55" : C.borderGray}`, opacity: !linkOpened ? 0.5 : 1 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: verified ? "#22c55e" : countdown > 0 ? "#f59e0b" : linkOpened ? "#229ED9" : "#ccc", color: "#fff", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {verified ? "✓" : countdown > 0 ? countdown : "2"}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: C.black }}>Verify your join</p>
            <p style={{ fontSize: 11, color: C.textGray, marginTop: 1 }}>
              {countdown > 0 ? `Please wait ${countdown}s…` : "Click to confirm you joined"}
            </p>
          </div>
          <button
            onClick={handleVerify}
            disabled={!linkOpened || countdown > 0 || verifying || verified}
            style={{
              background: verified ? "#f0fdf4" : verifying ? "#f3f4f6" : !linkOpened || countdown > 0 ? "#e5e5e5" : "#229ED9",
              color: verified ? "#16a34a" : verifying ? C.textGray : !linkOpened || countdown > 0 ? "#aaa" : "#fff",
              border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 700, fontSize: 12,
              cursor: !linkOpened || countdown > 0 || verifying || verified ? "default" : "pointer",
              minWidth: 72, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            {verifying ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> Checking…</> : verified ? "Verified ✓" : "Verify"}
          </button>
        </div>
      </div>

      {error && <p style={{ color: "#ef4444", fontSize: 13, fontWeight: 600, textAlign: "center" }}>{error}</p>}

      {verified && (
        <button onClick={onComplete} style={{ width: "100%", background: C.orange, color: "#fff", border: "none", borderRadius: 12, padding: "13px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
          🎁 Claim +35 Credits →
        </button>
      )}
    </div>
  );
};

// ─── WORD GAME TASK ───────────────────────────────────────────────────────────
const WordGameTask = ({ onComplete }) => {
  const [state, setState] = useState({ currentQ: 0, selected: null, confirmed: false, score: 0, finished: false });

  const handleChoice = (opt) => { if (!state.confirmed) setState((s) => ({ ...s, selected: opt })); };

  const handleConfirm = () => {
    const q = WORD_QUESTIONS[state.currentQ];
    const correct = state.selected === q.answer;
    const newScore = state.score + (correct ? 1 : 0);
    const next = state.currentQ + 1;
    if (next >= WORD_QUESTIONS.length) {
      setState((s) => ({ ...s, confirmed: true, score: newScore, finished: true }));
    } else {
      setState((s) => ({ ...s, confirmed: true, score: newScore }));
      setTimeout(() => setState({ currentQ: next, selected: null, confirmed: false, score: newScore, finished: false }), 900);
    }
  };

  if (state.finished) {
    const pct = Math.round((state.score / WORD_QUESTIONS.length) * 100);
    return (
      <div className="flex flex-col items-center gap-5 py-4">
        <div style={{ fontSize: 56 }}>{pct >= 67 ? "🏆" : "📖"}</div>
        <p style={{ fontWeight: 900, fontSize: 22, color: C.black }}>{state.score} / {WORD_QUESTIONS.length} Correct</p>
        <div style={{ background: "#f3f4f6", borderRadius: 99, width: "100%", height: 10, overflow: "hidden" }}>
          <div style={{ background: pct >= 67 ? "linear-gradient(90deg,#22c55e,#16a34a)" : "#f87171", width: `${pct}%`, height: "100%", borderRadius: 99, transition: "width 0.6s ease" }} />
        </div>
        <p style={{ color: C.textGray, fontSize: 13 }}>{pct >= 67 ? "Excellent! You've earned your credits." : "You need 2/3 correct to earn credits. Try again next time."}</p>
        {pct >= 67 && (
          <button onClick={onComplete} style={{ width: "100%", background: C.orange, color: "#fff", border: "none", borderRadius: 12, padding: "13px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
            🎁 Claim +75 Credits →
          </button>
        )}
      </div>
    );
  }

  const q = WORD_QUESTIONS[state.currentQ];
  return (
    <div className="flex flex-col gap-5">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.textGray, letterSpacing: 1, textTransform: "uppercase" }}>
          Question {state.currentQ + 1} / {WORD_QUESTIONS.length}
        </span>
        <span style={{ background: C.orangeGlow, color: C.orange, borderRadius: 20, padding: "2px 12px", fontSize: 12, fontWeight: 700 }}>
          Score: {state.score}
        </span>
      </div>
      <div style={{ background: "#f3f4f6", borderRadius: 99, height: 6 }}>
        <div style={{ background: C.orange, width: `${(state.currentQ / WORD_QUESTIONS.length) * 100}%`, height: "100%", borderRadius: 99, transition: "width 0.4s" }} />
      </div>
      <p style={{ fontWeight: 700, fontSize: 15, color: C.black, lineHeight: 1.5 }}>{q.question}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {q.options.map((opt) => {
          const isSel = state.selected === opt;
          const isCorrect = state.confirmed && opt === q.answer;
          const isWrong = state.confirmed && isSel && opt !== q.answer;
          return (
            <button key={opt} onClick={() => handleChoice(opt)} style={{ padding: "13px 10px", borderRadius: 12, fontWeight: 700, fontSize: 13, letterSpacing: 1, border: `2px solid ${isCorrect ? "#22c55e" : isWrong ? "#ef4444" : isSel ? C.orange : C.borderGray}`, background: isCorrect ? "rgba(34,197,94,0.1)" : isWrong ? "rgba(239,68,68,0.08)" : isSel ? C.orangeGlow : "#fafafa", color: isCorrect ? "#16a34a" : isWrong ? "#dc2626" : isSel ? C.orange : C.black, cursor: state.confirmed ? "default" : "pointer", transition: "all 0.2s" }}>
              {opt}
            </button>
          );
        })}
      </div>
      <button onClick={handleConfirm} disabled={!state.selected || state.confirmed} style={{ background: !state.selected || state.confirmed ? "#e5e5e5" : C.orange, color: !state.selected || state.confirmed ? C.textGray : "#fff", border: "none", borderRadius: 12, padding: "13px", fontWeight: 800, fontSize: 15, cursor: !state.selected || state.confirmed ? "default" : "pointer", transition: "all 0.2s" }}>
        {state.confirmed ? "Next question…" : "Confirm Answer"}
      </button>
    </div>
  );
};

// ─── ACTIVE TASK MODAL ────────────────────────────────────────────────────────
const ActiveTask = () => {
  const { activeTask, setActiveTask, completeTask } = useTasksContext();
  if (!activeTask) return null;

  const handleComplete = () => completeTask(activeTask.id);
  const handleClose = () => setActiveTask(null);

  return (
    <>
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      <div
        style={{ position: "fixed", inset: 0, background: "rgba(10,10,10,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20 }}
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <div style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 480, boxShadow: "0 32px 80px rgba(0,0,0,0.28)", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ background: C.black, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ color: C.orange, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>Active Task</p>
              <p style={{ color: "#fff", fontWeight: 800, fontSize: 17, marginTop: 2 }}>{activeTask.title}</p>
            </div>
            <button onClick={handleClose} style={{ color: "#aaa", background: "#2a2a2a", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>
          {/* Reward bar */}
          <div style={{ background: C.orangeGlow, borderBottom: "1px solid rgba(255,107,0,0.2)", padding: "9px 22px", display: "flex", gap: 20 }}>
            <span style={{ color: C.orange, fontWeight: 700, fontSize: 13 }}>🎁 {activeTask.reward}</span>
            <span style={{ color: C.textGray, fontSize: 13 }}>⏱ {activeTask.time}</span>
          </div>
          {/* Body */}
          <div style={{ padding: 22 }}>
            {activeTask.platform === "instagram" && <InstagramTask task={activeTask} onComplete={handleComplete} />}
            {activeTask.platform === "telegram" && <TelegramTask task={activeTask} onComplete={handleComplete} />}
            {activeTask.platform === "game" && <WordGameTask onComplete={handleComplete} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveTask;