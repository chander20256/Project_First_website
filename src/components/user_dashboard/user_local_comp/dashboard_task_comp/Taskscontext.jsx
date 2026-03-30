// LOCATION: src/components/user_dashboard/user_local_comp/dashboard_task_comp/Taskscontext.jsx
//
// PERF STRATEGY:
//  1. stale-while-revalidate — show cached data instantly, refresh silently in bg
//  2. Tasks list cached in localStorage (TTL 60s)
//  3. Submissions cached in sessionStorage (TTL 30s) — cleared on tab close
//  4. Thumbnail lazy-loaded only when user opens a task modal
//  5. Single combined fetch with Promise.all

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

const TasksContext = createContext(null);
const BASE = "http://localhost:5000";

const TASKS_TTL  = 60_000;   // 60 s — task list cache
const SUBS_TTL   = 30_000;   // 30 s — submissions cache

// ── Cache helpers ─────────────────────────────────────────────────────────────
const cacheSet = (store, key, data, ttl) => {
  try { store.setItem(key, JSON.stringify({ data, expires: Date.now() + ttl })); } catch {}
};
const cacheGet = (store, key) => {
  try {
    const raw = store.getItem(key);
    if (!raw) return null;
    const { data, expires } = JSON.parse(raw);
    return Date.now() < expires ? data : null;
  } catch { return null; }
};
const cacheDel = (store, key) => { try { store.removeItem(key); } catch {} };

// ── Verification mock (replace with real API) ─────────────────────────────────
export async function verifyPlatformAction(platform) {
  await new Promise((r) => setTimeout(r, 1200));
  return { verified: true };
}

// ── Provider ─────────────────────────────────────────────────────────────────
export function TasksProvider({ children }) {
  const [tasks,        setTasks]        = useState(() => cacheGet(localStorage, "tasks_list") || []);
  const [submissions,  setSubmissions]  = useState(() => cacheGet(sessionStorage, "tasks_subs") || {});
  const [activeTask,   setActiveTaskRaw]= useState(null);
  const [loading,      setLoading]      = useState(tasks.length === 0); // skip spinner if cache hit
  const [refreshing,   setRefreshing]   = useState(false);
  const fetchingRef = useRef(false);

  const getToken = () => localStorage.getItem("token");
  const authHeaders = () => {
    const t = getToken();
    return { "Content-Type": "application/json", ...(t ? { Authorization: `Bearer ${t}` } : {}) };
  };

  // ── Fetch tasks + submissions (combined, cancellation-safe) ──────────────
  const loadData = useCallback(async ({ silent = false } = {}) => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    if (!silent) setLoading(tasks.length === 0);
    else         setRefreshing(true);

    try {
      const [tasksRes, subsRes] = await Promise.all([
        fetch(`${BASE}/api/tasks`),
        fetch(`${BASE}/api/task-submissions/my`, { headers: authHeaders() }),
      ]);

      if (tasksRes.ok) {
        const data = await tasksRes.json();
        const arr  = Array.isArray(data) ? data : [];
        setTasks(arr);
        cacheSet(localStorage, "tasks_list", arr, TASKS_TTL);
      }

      if (subsRes.ok) {
        const data = await subsRes.json();
        const map  = {};
        (Array.isArray(data) ? data : []).forEach((s) => {
          map[s.taskId?._id || s.taskId] = s;
        });
        setSubmissions(map);
        cacheSet(sessionStorage, "tasks_subs", map, SUBS_TTL);
      }
    } catch (err) {
      console.error("Load tasks:", err.message);
    } finally {
      fetchingRef.current = false;
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // On mount: if cache hit → show instantly + silently refresh in bg
  useEffect(() => {
    const hasCached = tasks.length > 0;
    if (hasCached) loadData({ silent: true });
    else           loadData();
  }, []);

  // ── Lazy-load thumbnail when user opens a task ───────────────────────────
  const setActiveTask = useCallback(async (task) => {
    if (!task) { setActiveTaskRaw(null); return; }

    // If already have thumbnail, open immediately
    if (task.thumbnail) { setActiveTaskRaw(task); return; }

    // Otherwise fetch the full task (with thumbnail) first
    try {
      const res  = await fetch(`${BASE}/api/tasks/${task._id || task.id}`);
      const full = res.ok ? await res.json() : task;
      setActiveTaskRaw(full);
    } catch {
      setActiveTaskRaw(task); // fallback — open without thumbnail
    }
  }, []);

  // ── Submit task ───────────────────────────────────────────────────────────
  const submitTask = useCallback(async (taskId, screenshotData = "") => {
    try {
      const res  = await fetch(`${BASE}/api/task-submissions`, {
        method:  "POST",
        headers: authHeaders(),
        body:    JSON.stringify({ taskId, screenshotData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Optimistic update — no need to refetch
      setSubmissions((prev) => {
        const updated = { ...prev, [taskId]: data.submission };
        cacheSet(sessionStorage, "tasks_subs", updated, SUBS_TTL);
        return updated;
      });
      setActiveTaskRaw(null);
      return { success: true, submission: data.submission };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  // Invalidate caches and hard-reload
  const invalidateAndRefresh = useCallback(() => {
    cacheDel(localStorage,   "tasks_list");
    cacheDel(sessionStorage,  "tasks_subs");
    loadData();
  }, [loadData]);

  // ── Derived getters ───────────────────────────────────────────────────────
  const getSubmission  = (id) => submissions[id] || null;
  const isCompleted    = (id) => !!submissions[id];
  const isPaid         = (id) => submissions[id]?.status === "paid";
  const isPending      = (id) => submissions[id]?.status === "pending";
  const isApproved     = (id) => submissions[id]?.status === "approved";
  const isRejected     = (id) => submissions[id]?.status === "rejected";
  const completedCount = Object.keys(submissions).length;
  const totalCredits   = Object.values(submissions)
    .filter((s) => s.status === "paid")
    .reduce((sum, s) => sum + (s.earnedPoints || 0), 0);

  return (
    <TasksContext.Provider value={{
      tasks, submissions, loading, refreshing,
      activeTask, setActiveTask,
      submitTask, loadData: invalidateAndRefresh,
      getSubmission, isCompleted, isPaid, isPending, isApproved, isRejected,
      completedCount, totalCredits,
    }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasksContext must be inside <TasksProvider>");
  return ctx;
}