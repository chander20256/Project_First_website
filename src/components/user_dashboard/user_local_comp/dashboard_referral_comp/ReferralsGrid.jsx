// LOCATION: src/components/user_dashboard/user_local_comp/dashboard_referral_comp/ReferralsGrid.jsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, RefreshCw, ChevronUp, ChevronDown } from "lucide-react";

const StatusPill = ({ status }) => {
  const active = status === "Active";
  return (
    <>
      <style>{`
        @keyframes pillDot {
          0%,100% { transform: scale(1);   opacity: 1;   }
          50%      { transform: scale(1.8); opacity: 0.5; }
        }
      `}</style>
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider"
        style={{
          background: active ? "rgba(34,197,94,0.12)"  : "rgba(234,179,8,0.12)",
          border:     active ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(234,179,8,0.3)",
          color:      active ? "#4ade80" : "#facc15",
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: active ? "#4ade80" : "#facc15",
            animation: active ? "pillDot 1.8s ease-in-out infinite" : "none",
          }}
        />
        {status}
      </span>
    </>
  );
};

const COLS = [
  { label: "Name",     field: "name",     sortable: true },
  { label: "Joined",   field: "joined",   sortable: true },
  { label: "Status",   field: "status",   sortable: true },
  { label: "Earnings", field: "earnings", sortable: true },
];

const PER_PAGE = 5;

const ReferralsGrid = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [sortField, setSort]      = useState("joined");
  const [sortDir,   setDir]       = useState("desc");
  const [page,      setPage]      = useState(1);

  const load = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/referrals")
      .then((res) => res.json())
      .then((data) => { setReferrals(data); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  };

  useEffect(load, []);

  const toggleSort = (f) => {
    if (sortField === f) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSort(f); setDir("asc"); }
    setPage(1);
  };

  const sorted = [...referrals].sort((a, b) => {
    let av = sortField === "joined" ? new Date(a[sortField]) : a[sortField];
    let bv = sortField === "joined" ? new Date(b[sortField]) : b[sortField];
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const rows = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <style>{`
        @keyframes blobGrid {
          0%,100% { opacity: .15; transform: scale(1);    }
          50%      { opacity: .28; transform: scale(1.2);  }
        }
        @keyframes rowSlide {
          0%   { opacity: 0; transform: translateX(-12px); }
          100% { opacity: 1; transform: translateX(0);     }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative overflow-hidden rounded-3xl border border-white/8 bg-black"
        style={{ boxShadow: "0 0 50px rgba(249,115,22,0.08)" }}
      >
        {/* blob */}
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-orange-500 blur-[70px]"
          style={{ animation: "blobGrid 4.5s ease-in-out infinite" }}
        />
        <div
          className="pointer-events-none absolute -left-8 -bottom-8 h-36 w-36 rounded-full bg-white blur-[80px]"
          style={{ opacity: 0.03 }}
        />

        {/* top bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

        {/* header */}
        <div
          className="relative z-10 flex flex-col gap-3 border-b border-white/5 px-5 py-4
            sm:flex-row sm:items-center sm:justify-between sm:px-6"
          style={{ background: "rgba(249,115,22,0.04)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-orange-500/30"
              style={{ background: "rgba(249,115,22,0.12)" }}
            >
              <Users size={14} className="text-orange-400" />
            </div>
            <span className="font-black text-white">Your Referrals</span>
            {referrals.length > 0 && (
              <span
                className="rounded-full px-2.5 py-0.5 text-[10px] font-black text-orange-400"
                style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.25)" }}
              >
                {referrals.length}
              </span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={load}
            className="flex w-fit items-center gap-1.5 rounded-xl border border-white/10
              bg-white/5 px-3 py-1.5 text-[10px] font-bold text-gray-500
              transition-all hover:border-orange-500/40 hover:bg-orange-500/8 hover:text-orange-400"
          >
            <RefreshCw size={11} /> Refresh
          </motion.button>
        </div>

        {/* table */}
        <div className="relative z-10 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-white/5">
                {COLS.map((col) => (
                  <th
                    key={col.field}
                    onClick={() => col.sortable && toggleSort(col.field)}
                    className={`px-5 py-3 text-left text-[10px] font-black uppercase
                      tracking-[0.15em] text-gray-600 transition-colors sm:px-6
                      ${col.sortable ? "cursor-pointer hover:text-orange-400" : ""}`}
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      {col.sortable && (
                        sortField === col.field
                          ? sortDir === "asc"
                            ? <ChevronUp   size={11} className="text-orange-500" />
                            : <ChevronDown size={11} className="text-orange-500" />
                          : <ChevronUp size={11} className="text-white/10" />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    {[...Array(4)].map((_, j) => (
                      <td key={j} className="px-5 py-4 sm:px-6">
                        <div className="h-3 animate-pulse rounded-lg bg-white/5" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : rows.length > 0 ? (
                <AnimatePresence>
                  {rows.map((r, i) => (
                    <motion.tr
                      key={r._id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-white/5 transition-all duration-200"
                      style={{ }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.05)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <td className="px-5 py-3.5 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-8 w-8 shrink-0 items-center justify-center
                              rounded-full text-[11px] font-black text-black"
                            style={{
                              background: "linear-gradient(135deg,#f97316,#ea580c)",
                              boxShadow: "0 0 12px rgba(249,115,22,0.4)",
                            }}
                          >
                            {r.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <span className="font-semibold text-white">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-500 sm:px-6">
                        {new Date(r.joined).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-3.5 sm:px-6">
                        <StatusPill status={r.status} />
                      </td>
                      <td className="px-5 py-3.5 sm:px-6">
                        <span className="font-black text-orange-400">{r.earnings}</span>
                        <span className="ml-1 text-[10px] text-gray-600">tokens</span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              ) : (
                <tr>
                  <td colSpan="4" className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-full border border-orange-500/20"
                        style={{ background: "rgba(249,115,22,0.08)" }}
                      >
                        <Users size={22} className="text-orange-500/40" />
                      </div>
                      <p className="font-bold text-gray-500">No referrals yet</p>
                      <p className="text-xs text-gray-700">Share your link to start earning</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        {totalPages > 1 && (
          <div
            className="relative z-10 flex items-center justify-between border-t border-white/5 px-5 py-3 sm:px-6"
            style={{ background: "rgba(249,115,22,0.03)" }}
          >
            <p className="text-[10px] text-gray-600">
              {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, sorted.length)} of {sorted.length}
            </p>
            <div className="flex gap-1.5">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className="h-7 w-7 rounded-lg text-[10px] font-black transition-all duration-200"
                  style={
                    page === i + 1
                      ? { background: "#f97316", color: "#000", boxShadow: "0 0 12px rgba(249,115,22,0.5)" }
                      : { background: "rgba(255,255,255,0.05)", color: "#6b7280" }
                  }
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default ReferralsGrid;