// LOCATION: src/components/user_dashboard/user_local_comp/dashboard_task_comp/ActiveTask.jsx

import { useState, useEffect, useRef, useCallback } from "react";
import { useTasksContext, verifyPlatformAction } from "./Taskscontext";

const C = {
  orange: "#FF6B00", orangeGlow: "rgba(255,107,0,0.15)",
  black: "#0A0A0A", borderGray: "#E5E5E5", textGray: "#888",
};

const WORD_QUESTIONS = [
  { question: "Which word means the opposite of 'OBSCURE'?",                               options: ["HIDDEN","CLEAR","VAGUE","DARK"],    answer: "CLEAR"  },
  { question: "Choose the word that BEST completes: 'The detective made a __ observation'", options: ["CARELESS","RANDOM","KEEN","SLOW"],  answer: "KEEN"   },
  { question: "Which word is a synonym for 'RESILIENT'?",                                  options: ["FRAGILE","STURDY","HOLLOW","RIGID"], answer: "STURDY" },
];

// ── Countdown ring ────────────────────────────────────────────────────────────
const CountdownRing = ({ secondsLeft, totalSeconds }) => {
  const pct  = totalSeconds > 0 ? secondsLeft / totalSeconds : 1;
  const r    = 22;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const urgent = secondsLeft <= 30 && totalSeconds > 0;

  return (
    <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0 }}>
      <svg width="56" height="56" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="28" cy="28" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle
          cx="28" cy="28" r={r} fill="none"
          stroke={urgent ? "#ef4444" : C.orange}
          strokeWidth="4"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s linear" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 800, color: urgent ? "#ef4444" : C.black, lineHeight: 1 }}>
          {mins > 0 ? `${mins}:${String(secs).padStart(2, "0")}` : `${secs}s`}
        </p>
      </div>
    </div>
  );
};

// ── Screenshot upload step ────────────────────────────────────────────────────
const ScreenshotUpload = ({ onSubmit, submitting }) => {
  const [preview, setPreview] = useState(null);
  const [error,   setError]   = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("File must be under 5 MB"); return; }
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
    setError("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ textAlign: "center" }}>
        <span style={{ fontSize: 40 }}>📸</span>
        <p style={{ fontWeight: 800, fontSize: 16, color: C.black, marginTop: 8 }}>Upload Proof Screenshot</p>
        <p style={{ color: C.textGray, fontSize: 13, marginTop: 4 }}>
          Screenshot is optional but speeds up review — under review for up to 24 hours.
        </p>
      </div>

      {preview ? (
        <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: `2px solid ${C.orange}` }}>
          <img src={preview} alt="proof" style={{ width: "100%", maxHeight: 200, objectFit: "cover" }} />
          <button
            onClick={() => setPreview(null)}
            style={{ position: "absolute", top: 8, right: 8, background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 14, fontWeight: 800 }}
          >✕</button>
        </div>
      ) : (
        <label
          htmlFor="ss-upload"
          style={{ border: `2px dashed ${C.borderGray}`, borderRadius: 12, padding: "32px 20px", textAlign: "center", cursor: "pointer", background: "#fafafa", display: "block" }}
        >
          <input type="file" id="ss-upload" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
          <p style={{ color: C.textGray, fontSize: 13, fontWeight: 600 }}>Click to upload screenshot</p>
          <p style={{ color: "#bbb", fontSize: 11, marginTop: 4 }}>PNG, JPG up to 5 MB</p>
        </label>
      )}

      {error && <p style={{ color: "#ef4444", fontSize: 13, fontWeight: 600, textAlign: "center" }}>{error}</p>}

      <button
        onClick={() => onSubmit(preview || "")}
        disabled={submitting}
        style={{ width: "100%", background: submitting ? "#e5e5e5" : C.orange, color: submitting ? C.textGray : "#fff", border: "none", borderRadius: 12, padding: 13, fontWeight: 800, fontSize: 15, cursor: submitting ? "default" : "pointer" }}
      >
        {submitting ? "Submitting…" : "Submit for Review →"}
      </button>
    </div>
  );
};

// ── Time expired screen ───────────────────────────────────────────────────────
const TimeExpired = ({ onClose }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "16px 0", textAlign: "center" }}>
    <span style={{ fontSize: 56 }}>⏰</span>
    <p style={{ fontWeight: 900, fontSize: 20, color: C.black }}>Time's Up!</p>
    <p style={{ color: C.textGray, fontSize: 14, lineHeight: 1.6 }}>
      You didn't complete the task within the time limit.<br />
      Try again when the task is available.
    </p>
    <button
      onClick={onClose}
      style={{ width: "100%", background: C.black, color: "#fff", border: "none", borderRadius: 12, padding: 13, fontWeight: 800, fontSize: 15, cursor: "pointer" }}
    >
      Back to Tasks
    </button>
  </div>
);

// ── Submitted success ─────────────────────────────────────────────────────────
const SubmittedSuccess = ({ onClose }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "16px 0", textAlign: "center" }}>
    <span style={{ fontSize: 56 }}>🎉</span>
    <p style={{ fontWeight: 900, fontSize: 20, color: C.black }}>Submitted!</p>
    <p style={{ color: C.textGray, fontSize: 14, lineHeight: 1.6 }}>
      Your task is <strong>under review</strong>.<br />
      You'll receive your reward within <strong>24 hours</strong> after admin approval.
    </p>
    <button
      onClick={onClose}
      style={{ width: "100%", background: C.black, color: "#fff", border: "none", borderRadius: 12, padding: 13, fontWeight: 800, fontSize: 15, cursor: "pointer" }}
    >
      Back to Tasks
    </button>
  </div>
);

// ── Generic platform task (follow/join flow) ──────────────────────────────────
const PlatformTask = ({ task, color, actionLabel, onVerified }) => {
  const [linkOpened, setLinkOpened] = useState(false);
  const [countdown,  setCountdown]  = useState(0);
  const [verifying,  setVerifying]  = useState(false);
  const [verified,   setVerified]   = useState(false);
  const [error,      setError]      = useState("");
  const timerRef = useRef(null);

  const handleOpenLink = () => {
    if (task.link) window.open(task.link, "_blank", "noopener,noreferrer");
    setLinkOpened(true);
    setCountdown(5);
  };

  useEffect(() => {
    if (countdown <= 0) return;
    timerRef.current = setInterval(() => {
      setCountdown((c) => { if (c <= 1) { clearInterval(timerRef.current); return 0; } return c - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [countdown]);

  const handleVerify = async () => {
    setVerifying(true); setError("");
    try {
      const result = await verifyPlatformAction(task.platform);
      if (result.verified) { setVerified(true); onVerified(); }
      else setError("Could not verify. Make sure you completed the action and try again.");
    } catch { setError("Network error. Please try again."); }
    finally   { setVerifying(false); }
  };

  const stepBase  = { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12 };
  const circleBg  = (done, waiting, active) => done ? "#22c55e" : waiting ? "#f59e0b" : active ? color : "#ccc";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Step 1 */}
      <div style={{ ...stepBase, background: linkOpened ? "rgba(34,197,94,0.06)" : "#fafafa", border: `1px solid ${linkOpened ? "#22c55e55" : C.borderGray}` }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: circleBg(linkOpened, false, true), color: "#fff", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {linkOpened ? "✓" : "1"}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, fontSize: 13, color: C.black }}>Open & {actionLabel}</p>
          <p style={{ fontSize: 11, color: C.textGray, marginTop: 1 }}>Tap to open the page</p>
        </div>
        <button
          onClick={handleOpenLink}
          style={{ background: linkOpened ? "#f0fdf4" : color, color: linkOpened ? "#16a34a" : "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}
        >
          {linkOpened ? "Opened ✓" : "Open →"}
        </button>
      </div>

      {/* Step 2 */}
      <div style={{ ...stepBase, background: verified ? "rgba(34,197,94,0.06)" : "#fafafa", border: `1px solid ${verified ? "#22c55e55" : C.borderGray}`, opacity: !linkOpened ? 0.5 : 1 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: circleBg(verified, countdown > 0 && linkOpened, linkOpened), color: "#fff", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {verified ? "✓" : countdown > 0 ? countdown : "2"}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, fontSize: 13, color: C.black }}>Verify action</p>
          <p style={{ fontSize: 11, color: C.textGray, marginTop: 1 }}>
            {countdown > 0 ? `Please wait ${countdown}s…` : "Click to confirm you completed it"}
          </p>
        </div>
        <button
          onClick={handleVerify}
          disabled={!linkOpened || countdown > 0 || verifying || verified}
          style={{
            background: verified ? "#f0fdf4" : (!linkOpened || countdown > 0) ? "#e5e5e5" : color,
            color:      verified ? "#16a34a"  : (!linkOpened || countdown > 0) ? "#aaa"    : "#fff",
            border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 700, fontSize: 12,
            cursor: (!linkOpened || countdown > 0 || verifying || verified) ? "default" : "pointer",
            minWidth: 72, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          {verifying ? "⟳ Checking…" : verified ? "Verified ✓" : "Verify"}
        </button>
      </div>

      {error && <p style={{ color: "#ef4444", fontSize: 13, fontWeight: 600, textAlign: "center" }}>{error}</p>}
    </div>
  );
};

// ── Word game ─────────────────────────────────────────────────────────────────
const WordGameTask = ({ onVerified }) => {
  const [state, setState] = useState({ currentQ: 0, selected: null, confirmed: false, score: 0, finished: false });

  const handleChoice  = (opt) => { if (!state.confirmed) setState((s) => ({ ...s, selected: opt })); };
  const handleConfirm = () => {
    const q = WORD_QUESTIONS[state.currentQ];
    const correct  = state.selected === q.answer;
    const newScore = state.score + (correct ? 1 : 0);
    const next     = state.currentQ + 1;
    if (next >= WORD_QUESTIONS.length) setState((s) => ({ ...s, confirmed: true, score: newScore, finished: true }));
    else {
      setState((s) => ({ ...s, confirmed: true, score: newScore }));
      setTimeout(() => setState({ currentQ: next, selected: null, confirmed: false, score: newScore, finished: false }), 900);
    }
  };

  if (state.finished) {
    const pct = Math.round((state.score / WORD_QUESTIONS.length) * 100);
    if (pct >= 67) { onVerified(); return null; }
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
        <span style={{ fontSize: 48 }}>📖</span>
        <p style={{ fontWeight: 900, fontSize: 18, color: C.black }}>{state.score}/{WORD_QUESTIONS.length} Correct</p>
        <p style={{ color: C.textGray, fontSize: 13 }}>You need 2/3 correct. Try again next time.</p>
      </div>
    );
  }

  const q = WORD_QUESTIONS[state.currentQ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.textGray, textTransform: "uppercase" }}>
          Q {state.currentQ + 1}/{WORD_QUESTIONS.length}
        </span>
        <span style={{ background: C.orangeGlow, color: C.orange, borderRadius: 20, padding: "2px 12px", fontSize: 12, fontWeight: 700 }}>
          Score: {state.score}
        </span>
      </div>
      <p style={{ fontWeight: 700, fontSize: 15, color: C.black }}>{q.question}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {q.options.map((opt) => {
          const isSel = state.selected === opt;
          const isCorrect = state.confirmed && opt === q.answer;
          const isWrong   = state.confirmed && isSel && !isCorrect;
          return (
            <button key={opt} onClick={() => handleChoice(opt)} style={{ padding: "13px 10px", borderRadius: 12, fontWeight: 700, fontSize: 13, border: `2px solid ${isCorrect ? "#22c55e" : isWrong ? "#ef4444" : isSel ? C.orange : C.borderGray}`, background: isCorrect ? "rgba(34,197,94,0.1)" : isWrong ? "rgba(239,68,68,0.08)" : isSel ? C.orangeGlow : "#fafafa", color: isCorrect ? "#16a34a" : isWrong ? "#dc2626" : isSel ? C.orange : C.black, cursor: state.confirmed ? "default" : "pointer" }}>
              {opt}
            </button>
          );
        })}
      </div>
      <button onClick={handleConfirm} disabled={!state.selected || state.confirmed} style={{ background: !state.selected || state.confirmed ? "#e5e5e5" : C.orange, color: !state.selected || state.confirmed ? C.textGray : "#fff", border: "none", borderRadius: 12, padding: 13, fontWeight: 800, fontSize: 15, cursor: !state.selected || state.confirmed ? "default" : "pointer" }}>
        {state.confirmed ? "Next question…" : "Confirm Answer"}
      </button>
    </div>
  );
};

// ── Main modal ────────────────────────────────────────────────────────────────
const ActiveTask = () => {
  const { activeTask, setActiveTask, submitTask } = useTasksContext();

  // "task" | "screenshot" | "success" | "expired"
  const [step,        setStep]        = useState("task");
  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Countdown timer state
  const [secondsLeft,   setSecondsLeft]   = useState(0);
  const [totalSeconds,  setTotalSeconds]  = useState(0);
  const timerRef = useRef(null);

  // Initialize and start countdown when task opens
  useEffect(() => {
    if (!activeTask) return;
    setStep("task");
    setSubmitError("");

    const mins = activeTask.timeMinutes || 0;
    if (mins > 0) {
      const secs = mins * 60;
      setTotalSeconds(secs);
      setSecondsLeft(secs);
    } else {
      setTotalSeconds(0);
      setSecondsLeft(0);
    }
  }, [activeTask]);

  // Tick countdown
  useEffect(() => {
    if (step !== "task" || totalSeconds === 0 || secondsLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          setStep("expired");
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [step, totalSeconds]);

  // Stop timer when leaving task step
  useEffect(() => {
    if (step !== "task") clearInterval(timerRef.current);
  }, [step]);

  if (!activeTask) return null;

  const handleClose = () => {
    clearInterval(timerRef.current);
    setActiveTask(null);
    setStep("task");
  };

  const handleVerified = () => {
    clearInterval(timerRef.current);
    // Word game auto-submits without screenshot
    if (activeTask.platform?.toLowerCase() === "game") {
      handleSubmit("");
    } else {
      setStep("screenshot");
    }
  };

  const handleSubmit = async (screenshotData) => {
    setSubmitting(true);
    setSubmitError("");
    const result = await submitTask(activeTask._id || activeTask.id, screenshotData);
    setSubmitting(false);
    if (result.success) {
      setStep("success");
    } else {
      setSubmitError(result.error || "Submission failed. Please try again.");
    }
  };

  const stepLabel = { task: "Active Task", screenshot: "Upload Proof", success: "Submitted!", expired: "Time's Up" }[step];

  return (
    <>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <div
        style={{ position: "fixed", inset: 0, background: "rgba(10,10,10,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20 }}
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <div style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 480, boxShadow: "0 32px 80px rgba(0,0,0,0.28)", overflow: "hidden" }}>

          {/* Header */}
          <div style={{ background: C.black, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ color: C.orange, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>{stepLabel}</p>
              <p style={{ color: "#fff", fontWeight: 800, fontSize: 17, marginTop: 2 }}>{activeTask.title}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Countdown ring — only show during task step with time limit */}
              {step === "task" && totalSeconds > 0 && (
                <CountdownRing secondsLeft={secondsLeft} totalSeconds={totalSeconds} />
              )}
              <button onClick={handleClose} style={{ color: "#aaa", background: "#2a2a2a", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>
          </div>

          {/* Reward bar */}
          {step === "task" && (
            <div style={{ background: C.orangeGlow, borderBottom: "1px solid rgba(255,107,0,0.2)", padding: "9px 22px", display: "flex", gap: 20, alignItems: "center" }}>
              <span style={{ color: C.orange, fontWeight: 700, fontSize: 13 }}>🎁 {activeTask.reward} Credits</span>
              {totalSeconds > 0 && (
                <span style={{ color: C.textGray, fontSize: 12 }}>
                  ⏱ {activeTask.timeMinutes} min limit
                </span>
              )}
            </div>
          )}

          {/* Body */}
          <div style={{ padding: 22 }}>
            {step === "expired"    && <TimeExpired onClose={handleClose} />}
            {step === "success"    && <SubmittedSuccess onClose={handleClose} />}
            {step === "screenshot" && (
              <>
                <ScreenshotUpload onSubmit={handleSubmit} submitting={submitting} />
                {submitError && <p style={{ color: "#ef4444", fontSize: 13, fontWeight: 600, textAlign: "center", marginTop: 8 }}>{submitError}</p>}
              </>
            )}
            {step === "task" && (
              <>
                {/* Generic platform task — works for any platform text */}
                {activeTask.platform?.toLowerCase() === "game" ? (
                  <WordGameTask onVerified={handleVerified} />
                ) : (
                  <PlatformTask
                    task={activeTask}
                    platform={activeTask.platform}
                    color={C.orange}
                    actionLabel={activeTask.platform}
                    onVerified={handleVerified}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveTask;