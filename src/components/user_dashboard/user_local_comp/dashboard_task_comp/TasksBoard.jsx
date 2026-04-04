// LOCATION: src/components/user_dashboard/user_local_comp/dashboard_task_comp/TasksBoard.jsx
// OPTIMIZED: useMemo everywhere, filter never re-derives unless tasks change,
//            TaskCard wrapped in React.memo to skip renders when props unchanged

import { useState, useMemo, useRef, useEffect, memo } from "react";
import { useTasksContext } from "./Taskscontext";
import TaskCard from "./TaskCard";

const ALL = "all";

const CATEGORY_META = {
  "ptc":        { icon: "💰", label: "PTC"        },
  "captcha":    { icon: "🤖", label: "Captcha"    },
  "lucky-draw": { icon: "🎰", label: "Lucky Draw" },
  "short-link": { icon: "🔗", label: "Short Link" },
};
const CAT_ORDER = ["ptc", "captcha", "lucky-draw", "short-link"];

// ── Chip (memoized — never re-renders unless active changes) ──────────────
const Chip = memo(({ value, icon, label, count, active, onClick }) => (
  <button
    onClick={() => onClick(value)}
    className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-150 ${
      active
        ? "bg-orange-500 text-white shadow-md shadow-orange-100"
        : "border border-gray-200 bg-white text-gray-500 hover:border-orange-300 hover:text-orange-500"
    }`}
  >
    <span>{icon}</span>
    <span>{label}</span>
    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-black leading-none ${
      active ? "bg-white/25 text-white" : "bg-gray-100 text-gray-400"
    }`}>
      {count}
    </span>
  </button>
));

// ── Mobile dropdown ───────────────────────────────────────────────────────
const Dropdown = memo(({ items, active, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const activeItem = items.find((i) => i.value === active) || items[0];

  return (
    <div ref={ref} className="relative sm:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm"
      >
        <span>{activeItem.icon}</span>
        <span>{activeItem.label}</span>
        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-black text-orange-600">
          {activeItem.count}
        </span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-40 mt-2 w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
          {items.map(({ value, icon, label, count }) => (
            <button
              key={value}
              onClick={() => { onChange(value); setOpen(false); }}
              className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-bold transition-colors ${
                active === value ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="w-6 text-center text-lg">{icon}</span>
              <span className="flex-1 text-left">{label}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                active === value ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"
              }`}>{count}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

// ── Static skeletons (defined outside — never re-created) ─────────────────
const SKELETONS = Array.from({ length: 6 }, (_, i) => (
  <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
    <div className="h-40 bg-gray-100" />
    <div className="space-y-3 p-5">
      <div className="h-4 w-3/4 rounded-lg bg-gray-100" />
      <div className="h-3 w-full rounded-lg bg-gray-100" />
      <div className="h-3 w-2/3 rounded-lg bg-gray-100" />
      <div className="mt-4 h-10 w-full rounded-xl bg-gray-100" />
    </div>
  </div>
));

// ── Main board ────────────────────────────────────────────────────────────
const TasksBoard = () => {
  const { tasks, loading, refreshing } = useTasksContext();
  const [activeFilter, setActiveFilter] = useState(ALL);

  // Visible tasks — memoized, only recalculates when tasks array changes
  const visibleTasks = useMemo(() => {
    const now = Date.now();
    return tasks.filter(
      (t) => t.isActive && !(t.expiresAt && now > new Date(t.expiresAt).getTime())
    );
  }, [tasks]);

  // Categories that actually exist in the data
  const categories = useMemo(() => {
    const existing = new Set(visibleTasks.map((t) => t.platform?.toLowerCase()));
    return CAT_ORDER.filter((c) => existing.has(c));
  }, [visibleTasks]);

  // Counts per category
  const counts = useMemo(() => {
    const c = { [ALL]: visibleTasks.length };
    for (const t of visibleTasks) {
      const k = t.platform?.toLowerCase() || "other";
      c[k] = (c[k] || 0) + 1;
    }
    return c;
  }, [visibleTasks]);

  // Filtered tasks
  const filtered = useMemo(
    () => activeFilter === ALL
      ? visibleTasks
      : visibleTasks.filter((t) => t.platform?.toLowerCase() === activeFilter),
    [visibleTasks, activeFilter]
  );

  // Items for dropdown
  const dropdownItems = useMemo(() => [
    { value: ALL, icon: "🗂️", label: "All Tasks", count: counts[ALL] },
    ...categories.map((c) => ({
      value: c,
      ...(CATEGORY_META[c] || { icon: "📌", label: c }),
      count: counts[c] || 0,
    })),
  ], [categories, counts]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          {[80, 100, 90, 115, 95].map((w, i) => (
            <div key={i} className="h-9 animate-pulse rounded-full bg-gray-100" style={{ width: w }} />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {SKELETONS}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* ── Filter bar ── */}
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">

        {/* Mobile */}
        <Dropdown items={dropdownItems} active={activeFilter} onChange={setActiveFilter} />

        {/* Desktop chips */}
        <div className="hidden sm:flex items-center gap-2 flex-wrap flex-1">
          {dropdownItems.map(({ value, icon, label, count }) => (
            <Chip
              key={value}
              value={value}
              icon={icon}
              label={label}
              count={count}
              active={activeFilter === value}
              onClick={setActiveFilter}
            />
          ))}
        </div>

        <span className={`shrink-0 text-xs font-semibold transition-colors ${refreshing ? "text-orange-400" : "text-gray-400"}`}>
          {refreshing ? "Syncing…" : `${filtered.length} task${filtered.length !== 1 ? "s" : ""}`}
        </span>
      </div>

      {/* ── Cards ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-white py-20">
          <span className="mb-4 text-5xl">
            {activeFilter === ALL ? "📋" : (CATEGORY_META[activeFilter]?.icon || "🔍")}
          </span>
          <p className="text-xl font-bold text-gray-900">
            {activeFilter === ALL ? "No tasks available" : `No ${CATEGORY_META[activeFilter]?.label} tasks`}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {activeFilter === ALL ? "Check back soon!" : "Try another category."}
          </p>
          {activeFilter !== ALL && (
            <button
              onClick={() => setActiveFilter(ALL)}
              className="mt-4 rounded-full bg-orange-500 px-5 py-2 text-xs font-bold text-white hover:bg-orange-600 transition-colors"
            >
              Show all tasks
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((task) => (
            <TaskCard key={task._id || task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksBoard;