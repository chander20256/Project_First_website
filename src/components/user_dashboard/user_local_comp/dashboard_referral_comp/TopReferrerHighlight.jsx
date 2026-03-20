// LOCATION: src/components/user_dashboard/user_local_comp/dashboard_referral_comp/TopReferrerHighlight.jsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Star, Shield, Gem, CheckCircle2, Lock } from "lucide-react";

const MILESTONES = [
  { id: "starter", label: "Starter", Icon: Zap,    refs: 1,  reward: 50,   grad: "from-orange-500 to-orange-300", glow: "rgba(249,115,22,0.5)",  iconBg: "bg-orange-500" },
  { id: "raider",  label: "Raider",  Icon: Star,   refs: 5,  reward: 300,  grad: "from-white to-gray-300",        glow: "rgba(255,255,255,0.3)", iconBg: "bg-white"      },
  { id: "elite",   label: "Elite",   Icon: Shield, refs: 15, reward: 1000, grad: "from-orange-400 to-orange-600", glow: "rgba(249,115,22,0.6)",  iconBg: "bg-orange-500" },
  { id: "legend",  label: "Legend",  Icon: Gem,    refs: 50, reward: 5000, grad: "from-orange-300 to-white",      glow: "rgba(249,115,22,0.7)",  iconBg: "bg-gradient-to-br from-orange-400 to-white" },
];

const MilestoneCard = ({ m, totalReferrals, idx }) => {
  const done   = totalReferrals >= m.refs;
  const pct    = Math.min((totalReferrals / m.refs) * 100, 100);
  const active = !done && totalReferrals > 0 && totalReferrals < m.refs;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.08, type: "spring", stiffness: 180, damping: 18 }}
      className="relative overflow-hidden rounded-2xl border p-4 transition-all duration-300"
      style={{
        background: done
          ? "rgba(249,115,22,0.08)"
          : active
          ? "rgba(255,255,255,0.03)"
          : "rgba(255,255,255,0.01)",
        borderColor: done
          ? "rgba(249,115,22,0.4)"
          : active
          ? "rgba(255,255,255,0.12)"
          : "rgba(255,255,255,0.05)",
        boxShadow: done ? `0 0 24px ${m.glow}` : "none",
      }}
    >
      {/* done card shimmer */}
      {done && (
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#f97316 0px,#f97316 1px,transparent 1px,transparent 12px)",
          }}
        />
      )}

      <div className="relative z-10 flex items-center gap-3">
        {/* icon */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            done ? m.iconBg : "bg-white/5"
          }`}
          style={done ? { boxShadow: `0 0 14px ${m.glow}` } : {}}
        >
          {done
            ? <m.Icon size={18} className="text-black" />
            : <Lock size={16} className="text-gray-700" />
          }
        </div>

        {/* label */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={`text-sm font-black ${done ? "text-white" : "text-gray-600"}`}>
              {m.label}
            </p>
            {done && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 320 }}>
                <CheckCircle2 size={14} className="text-orange-400" />
              </motion.div>
            )}
          </div>
          <p className={`text-[10px] ${done ? "text-gray-400" : "text-gray-700"}`}>
            {m.refs} referrals →{" "}
            <span className={done ? "font-bold text-orange-400" : ""}>
              +{m.reward.toLocaleString()} TKN
            </span>
          </p>
        </div>

        {/* badge / count */}
        {done ? (
          <div
            className="shrink-0 rounded-xl px-2.5 py-1 text-[10px] font-black text-black"
            style={{
              background: "linear-gradient(90deg,#f97316,#fb923c)",
              boxShadow: "0 0 10px rgba(249,115,22,0.5)",
            }}
          >
            DONE
          </div>
        ) : (
          <p className="shrink-0 text-[10px] font-bold text-gray-700">
            {totalReferrals}/{m.refs}
          </p>
        )}
      </div>

      {/* progress bar */}
      {!done && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.1, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
            className={`h-full rounded-full bg-gradient-to-r ${m.grad}`}
          />
        </div>
      )}
    </motion.div>
  );
};

const TopReferrerHighlight = () => {
  const [totalReferrals, setTotal]   = useState(0);
  const [loading,        setLoading] = useState(true);
  const [toast,          setToast]   = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/referrals/stats", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => r.json())
      .then((d) => { setTotal(d.totalReferrals ?? 0); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, []);

  const nextMilestone = MILESTONES.find((m) => totalReferrals < m.refs);
  const refsNeeded    = nextMilestone ? nextMilestone.refs - totalReferrals : 0;

  return (
    <>
      <style>{`
        @keyframes pulseBlob {
          0%,100%{ opacity:.18; transform:scale(1);    }
          50%    { opacity:.32; transform:scale(1.18); }
        }
        @keyframes shimmerText {
          0%  { background-position:-300% center; }
          100%{ background-position: 300% center; }
        }
        @keyframes nudgePulse {
          0%,100% { box-shadow: 0 0 0px rgba(249,115,22,0.2); }
          50%      { box-shadow: 0 0 20px rgba(249,115,22,0.45); }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-white/8 bg-black"
        style={{ boxShadow: "0 0 60px rgba(249,115,22,0.1)" }}
      >
        <div
          className="pointer-events-none absolute -left-12 -top-12 h-56 w-56 rounded-full bg-orange-500 blur-[80px]"
          style={{ animation: "pulseBlob 3.5s ease-in-out infinite" }}
        />
        <div
          className="pointer-events-none absolute -bottom-10 right-0 h-40 w-40 rounded-full bg-orange-400 blur-[70px]"
          style={{ animation: "pulseBlob 4.5s ease-in-out infinite 1s" }}
        />

        {/* top bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

        <div className="relative z-10 px-5 py-6 sm:px-6 sm:py-7">

          {/* header */}
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div
                className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-orange-500/40 px-3 py-0.5"
                style={{ background: "rgba(249,115,22,0.1)" }}
              >
                <Gem size={11} className="text-orange-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-orange-400">
                  Milestones
                </span>
              </div>
              <h3 className="text-lg font-black text-white sm:text-xl">
                Referral Progress
              </h3>
            </div>

            {!loading && (
              <div
                className="flex items-center gap-1.5 rounded-2xl border border-white/8 px-3 py-1.5"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <span className="text-[10px] text-gray-500">Referred</span>
                <span
                  className="text-sm font-black"
                  style={{
                    background: "linear-gradient(90deg,#f97316 0%,#fff 40%,#f97316 60%,#ea580c 100%)",
                    backgroundSize: "300% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmerText 3s linear infinite",
                  }}
                >
                  {totalReferrals}
                </span>
                <span className="text-[10px] text-gray-500">friends</span>
              </div>
            )}
          </div>

          {/* cards */}
          {loading ? (
            <div className="space-y-3">
              {[0,1,2,3].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-2xl border border-white/5 bg-white/3" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {MILESTONES.map((m, i) => (
                <MilestoneCard key={m.id} m={m} totalReferrals={totalReferrals} idx={i} />
              ))}
            </div>
          )}

          {/* nudge */}
          {!loading && nextMilestone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-5 rounded-2xl border border-orange-500/25 px-4 py-3 text-center"
              style={{
                background: "rgba(249,115,22,0.06)",
                animation: "nudgePulse 3s ease-in-out infinite",
              }}
            >
              <p className="text-xs text-gray-400">
                🔥 Refer{" "}
                <span className="font-black text-orange-400">{refsNeeded} more</span>{" "}
                {refsNeeded === 1 ? "friend" : "friends"} to unlock{" "}
                <span className="font-black text-white">{nextMilestone.label}</span> and earn{" "}
                <span className="font-black text-orange-400">+{nextMilestone.reward.toLocaleString()} TKN</span>
              </p>
            </motion.div>
          )}

          {/* all done */}
          {!loading && !nextMilestone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-5 rounded-2xl border border-orange-500/40 px-4 py-3 text-center"
              style={{
                background: "linear-gradient(135deg,rgba(249,115,22,0.15),rgba(0,0,0,0.5))",
                boxShadow: "0 0 30px rgba(249,115,22,0.25)",
              }}
            >
              <p className="text-sm font-black text-orange-400">
                🏆 Legend unlocked — all milestones complete!
              </p>
            </motion.div>
          )}
        </div>

        {/* toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              key="toast"
              initial={{ opacity: 0, y: 16, scale: 0.88 }}
              animate={{ opacity: 1, y: 0,  scale: 1   }}
              exit={{    opacity: 0, y: 16, scale: 0.88 }}
              className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2
                rounded-2xl bg-orange-500 px-5 py-2.5 text-xs font-black text-black shadow-xl"
              style={{ boxShadow: "0 0 24px rgba(249,115,22,0.6)" }}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default TopReferrerHighlight;