// LOCATION: src/components/user_dashboard/user_local_comp/dashboard_referral_comp/ReferralsHeader.jsx

import { motion } from "framer-motion";
import { Flame, Zap } from "lucide-react";

const ReferralsHeader = () => {
  return (
    <>
      <style>{`
        @keyframes pulseBlob1 {
          0%,100% { transform: scale(1);    opacity: .18; }
          50%      { transform: scale(1.3);  opacity: .35; }
        }
        @keyframes pulseBlob2 {
          0%,100% { transform: scale(1);    opacity: .12; }
          50%      { transform: scale(1.2);  opacity: .28; }
        }
        @keyframes shimmerText {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }
        @keyframes floatIcon {
          0%,100% { transform: translateY(0px) rotate(0deg);   }
          33%      { transform: translateY(-8px) rotate(-4deg); }
          66%      { transform: translateY(-4px) rotate(3deg);  }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(400%);  }
        }
        @keyframes borderPulse {
          0%,100% { border-color: rgba(249,115,22,0.3); }
          50%      { border-color: rgba(249,115,22,0.8); }
        }
        @keyframes statCount {
          0%   { transform: translateY(8px); opacity: 0; }
          100% { transform: translateY(0px); opacity: 1; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: -32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl bg-black border border-orange-500/20"
        style={{ boxShadow: "0 0 60px rgba(249,115,22,0.12), inset 0 1px 0 rgba(255,255,255,0.05)" }}
      >
        {/* scanline sweep */}
        <div
          className="pointer-events-none absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent"
          style={{ animation: "scanline 4s ease-in-out infinite" }}
        />

        {/* blobs */}
        <div
          className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-orange-500 blur-[80px]"
          style={{ animation: "pulseBlob1 3.5s ease-in-out infinite" }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 right-8 h-56 w-56 rounded-full bg-orange-400 blur-[70px]"
          style={{ animation: "pulseBlob2 4.5s ease-in-out infinite 1s" }}
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-white blur-[100px]"
          style={{ opacity: 0.03 }}
        />

        {/* grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(249,115,22,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

        <div className="relative z-10 px-6 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex-1">
              {/* badge */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 240 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5"
                style={{ animation: "borderPulse 2.5s ease-in-out infinite" }}
              >
                <Zap size={11} className="text-orange-400" fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-400">
                  Earn · Refer · Redeem
                </span>
              </motion.div>

              {/* headline */}
              <motion.h1
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.55 }}
                className="text-5xl font-black leading-none tracking-tight text-white sm:text-6xl md:text-7xl"
              >
                Referral
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(90deg,#f97316 0%,#ffffff 35%,#fb923c 55%,#f97316 75%,#ea580c 100%)",
                    backgroundSize: "300% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmerText 4s linear infinite",
                  }}
                >
                  Rewards
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 max-w-md text-sm leading-relaxed text-gray-400"
              >
                Invite friends to{" "}
                <span className="font-bold text-orange-400">REVADOO</span>,
                referral and redeem Creds , perks and rewards.
              </motion.p>

              {/* stat pills */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="mt-6 flex flex-wrap gap-2"
              >
                {[
                  { label: "Per referral", value: "50 TKN" },
                  { label: "Legend tier",  value: "5,000 TKN" },
                  { label: "Active users", value: "12.4K" },
                ].map(({ label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm"
                  >
                    <span className="text-[10px] text-gray-500">{label}</span>
                    <span className="text-[11px] font-black text-orange-400">{value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* floating flame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 140 }}
              className="flex h-28 w-28 shrink-0 items-center justify-center self-start
                rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-black
                sm:h-32 sm:w-32 md:self-auto"
              style={{
                animation: "floatIcon 4s ease-in-out infinite",
                boxShadow: "0 0 40px rgba(249,115,22,0.3), inset 0 1px 0 rgba(249,115,22,0.2)",
              }}
            >
              <Flame
                size={48}
                className="text-orange-400"
                style={{ filter: "drop-shadow(0 0 18px rgba(249,115,22,1))" }}
              />
            </motion.div>
          </div>
        </div>

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </motion.div>
    </>
  );
};

export default ReferralsHeader;