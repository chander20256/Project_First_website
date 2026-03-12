import { createContext, useContext, useState, useCallback } from "react";

const TasksContext = createContext(null);

export const TASKS = [
  {
    id: 1,
    title: "Follow on Instagram",
    desc: "Follow our official Instagram page",
    reward: "50 Credits",
    time: "1 min",
    credits: 50,
    platform: "instagram",
    link: "https://instagram.com",   // 🔁 replace with your real handle URL
  },
  {
    id: 2,
    title: "Join Telegram Channel",
    desc: "Join our Telegram community channel",
    reward: "35 Credits",
    time: "1 min",
    credits: 35,
    platform: "telegram",
    link: "https://t.me/yourchannel",  // 🔁 replace with your real channel link
  },
  {
    id: 3,
    title: "Word Solving Game",
    desc: "Answer 3 vocabulary questions correctly",
    reward: "75 Credits",
    time: "3 min",
    credits: 75,
    platform: "game",
  },
];

/**
 * Mock backend verification call.
 * Replace this with your real API endpoint, e.g.:
 *   POST /api/verify  { platform: "instagram", userId: "..." }
 * Returns { verified: boolean, message: string }
 */
export async function verifyPlatformAction(platform, userId = "guest") {
  // Simulate network latency
  await new Promise((res) => setTimeout(res, 1800));

  // In production, call your real backend here:
  // const res = await fetch("/api/verify", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ platform, userId }),
  // });
  // return res.json();

  // Mock: always succeeds after the user has visited the link
  return { verified: true, message: "Verification successful!" };
}

export function TasksProvider({ children }) {
  const [completedIds, setCompletedIds] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [activeTask, setActiveTask] = useState(null);
  // history: [{ id, title, credits, completedAt }]
  const [history, setHistory] = useState([]);

  const completeTask = useCallback((taskId) => {
    const task = TASKS.find((t) => t.id === taskId);
    if (!task || completedIds.includes(taskId)) return;
    setCompletedIds((prev) => [...prev, taskId]);
    setTotalCredits((prev) => prev + task.credits);
    setHistory((prev) => [
      { id: taskId, title: task.title, credits: task.credits, completedAt: new Date() },
      ...prev,
    ]);
    setActiveTask(null);
  }, [completedIds]);

  const isCompleted = (taskId) => completedIds.includes(taskId);

  return (
    <TasksContext.Provider value={{
      tasks: TASKS,
      completedIds,
      totalCredits,
      activeTask,
      setActiveTask,
      completeTask,
      isCompleted,
      history,
    }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasksContext must be used inside <TasksProvider>");
  return ctx;
}