import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    num: "01",
    icon: "⚡",
    title: "Sign Up Free",
    short: "Create account in 30s",
    desc: "No credit card. No hidden fees. Just your email and you're inside the earning ecosystem instantly.",
    perks: ["Email or Google sign-in", "Zero upfront cost", "Instant dashboard access"],
  },
  {
    num: "02",
    icon: "🎯",
    title: "Browse Tasks",
    short: "Match your skills",
    desc: "Hundreds of micro-tasks updated daily — surveys, app testing, content reviews, referrals, and more.",
    perks: ["Filter by time & reward", "Rewards shown upfront", "New tasks every day"],
  },
  {
    num: "03",
    icon: "🔥",
    title: "Do The Work",
    short: "Complete at your pace",
    desc: "Work from anywhere, anytime. Submit your task and our AI engine verifies it in seconds.",
    perks: ["Work on mobile or desktop", "AI-powered verification", "No deadline pressure"],
  },
  {
    num: "04",
    icon: "💰",
    title: "Collect Rewards",
    short: "Cash out same day",
    desc: "PayPal, crypto, gift cards, bank transfer — your rewards, your rules. No minimums, no delays.",
    perks: ["10+ payout methods", "No minimum threshold", "Same-day transfers"],
  },
];

const stats = [
  { value: "2.4M+", label: "Active Earners" },
  { value: "$18M+", label: "Paid Out" },
  { value: "98%", label: "Satisfaction" },
  { value: "4s", label: "Avg Verification" },
];

const payouts = ["PayPal", "Bitcoin", "Gift Cards", "Bank Wire", "USDT", "Ethereum"];

const testimonials = [
  { name: "Amara K.", role: "Student", earn: "$340/mo", quote: "I do tasks during lunch breaks. The payouts hit the same day every time." },
  { name: "Dev R.", role: "Freelancer", earn: "$890/mo", quote: "Best side income I've found. The task variety keeps it fresh and the rewards are real." },
  { name: "Suki L.", role: "Stay-at-home parent", earn: "$220/mo", quote: "So simple. Sign up, pick a task, get paid. No catch. I've referred 12 friends." },
];

const tickItems = ["EARN REAL MONEY", "DO TASKS", "GET PAID TODAY", "500+ TASKS DAILY", "ZERO FEES", "INSTANT PAYOUTS"];

export default function InfoTask() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState({});
  const refs = useRef({});
  const navigate = useNavigate();
  const s = steps[active];

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@400;600;700&display=swap');
      .font-anton { font-family: 'Anton', sans-serif !important; }
      .font-barlow { font-family: 'Barlow', sans-serif !important; }
      @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      .animate-ticker { animation: ticker 22s linear infinite; }
      @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
      .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
      .fade-up.visible { opacity: 1; transform: translateY(0); }
      .glow-dot { box-shadow: 0 0 7px #ff5c00; }
      .orange-glow:hover { box-shadow: 0 12px 36px rgba(255,92,0,0.32); }
      .cta-glow-bg::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 500px; height: 1px; background: linear-gradient(90deg, transparent, #ff5c00, transparent); }
      .tab-active { border-bottom: 3px solid #ff5c00 !important; color: #ff5c00 !important; }
      .progress-dot-active { width: 22px !important; border-radius: 3px !important; background: #ff5c00 !important; box-shadow: 0 0 8px rgba(255,92,0,0.5) !important; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setVisible((v) => ({ ...v, [e.target.dataset.id]: true }));
      }),
      { threshold: 0.12 }
    );
    Object.values(refs.current).forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  const reg = (id) => ({
    ref: (el) => { refs.current[id] = el; },
    "data-id": id,
    className: `fade-up ${visible[id] ? "visible" : ""}`,
  });

  const ticks = [...tickItems, ...tickItems];

  return (
    <div className="font-barlow bg-black text-white min-h-screen overflow-x-hidden">
      {/* HERO */}
<section className="max-w-6xl mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-16">
  <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
    
    {/* LEFT — Text Content */}
    <div className="flex-1 w-full">
      <div className="inline-flex items-center gap-2 bg-neutral-950 border border-neutral-800 border-l-4 border-l-orange-500 px-4 py-1.5 rounded-sm text-orange-500 text-xs font-bold tracking-widest uppercase mb-8">
        <span>●</span> How It Works
      </div>
      <h1 className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-[90px] leading-none tracking-tight uppercase mb-7">
        <span className="text-orange-500">DO</span> TASKS<br />
        <span style={{ WebkitTextStroke: "2px white", color: "transparent" }}>EARN</span><br />
        REWARDS
      </h1>
      <p className="text-lg text-neutral-400 max-w-md leading-relaxed mb-10">
        The simplest way to turn spare time into real money. No skills required — just pick a task, do it, and get paid.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <button
          className="bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm uppercase tracking-wide px-8 py-4 rounded transition-all hover:-translate-y-0.5 orange-glow"
          onClick={() => window.location.href = "/login"}
        >
          Start Earning Free →
        </button>
        <button className="bg-transparent text-white border border-neutral-800 hover:border-orange-500 hover:text-orange-500 font-semibold text-sm uppercase tracking-wide px-8 py-4 rounded transition-all">
          Watch Demo
        </button>
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <span className="text-orange-500 font-bold">●</span> 2.4M earners active right now
        </div>
      </div>
    </div>

    {/* RIGHT — YouTube Video */}
    <div className="flex-1 w-full">
      {/* Outer glow border */}
      <div className="relative rounded-xl p-[2px]"
        style={{ background: "linear-gradient(135deg, #ff5c00, #1a1a1a, #ff5c00)" }}>
        
        {/* Video wrapper — 16:9 */}
        <div className="relative w-full rounded-xl overflow-hidden bg-black"
          style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0&modestbranding=1"
            title="InfoTask - How It Works"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Bottom label bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 rounded-b-xl border-t border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-neutral-400">
              Watch How It Works
            </span>
          </div>
          <span className="text-xs text-neutral-600 font-semibold">2:47</span>
        </div>
      </div>

      {/* Caption below video */}
      <p className="text-xs text-neutral-600 text-center mt-3 tracking-wide">
        🔒 No sign-up needed to watch · 2.4M+ earners joined after this video
      </p>
    </div>

  </div>
</section>

      {/* TICKER */}
      <div className="overflow-hidden bg-orange-500 py-3" style={{ transform: "rotate(-1.1deg) scaleX(1.04)", margin: "52px 0" }}>
        <div className="animate-ticker flex gap-16 whitespace-nowrap">
          {ticks.map((t, i) => (
            <span key={i} className="font-anton text-black text-sm tracking-widest">{t}&nbsp;/&nbsp;</span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div {...reg("stats")} className={`max-w-6xl mx-auto px-6 md:px-12 mb-24 fade-up ${visible["stats"] ? "visible" : ""}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 border border-neutral-900 rounded-lg overflow-hidden">
          {stats.map((st, i) => (
            <div key={i} className="bg-neutral-950 hover:bg-neutral-900 p-8 md:p-10 text-center border-b md:border-b-0 border-r border-neutral-900 last:border-r-0 transition-colors">
              <div className="font-anton text-5xl text-orange-500 leading-none mb-2">{st.value}</div>
              <div className="text-xs font-bold tracking-widest uppercase text-neutral-600">{st.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* STEPS */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-28">
        <div className={`fade-up ${visible["shdr"] ? "visible" : ""}`}
          ref={(el) => { refs.current["shdr"] = el; }} data-id="shdr">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 text-orange-500 text-xs font-bold tracking-widest uppercase mb-3">
                The Process
                <span className="block h-px w-14 bg-neutral-800"></span>
              </div>
              <h2 className="font-anton text-5xl md:text-6xl lg:text-7xl uppercase leading-none">
                4 STEPS TO<br /><span className="text-orange-500">GETTING PAID</span>
              </h2>
            </div>
            <p className="text-neutral-600 text-sm leading-relaxed max-w-xs">
              We stripped out all the complexity. Four clean steps from sign-up to payout.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-900 overflow-x-auto mb-0">
          {steps.map((st, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-4 md:px-6 py-4 text-xs font-bold tracking-widest uppercase whitespace-nowrap border-b-2 -mb-px transition-all ${active === i
                  ? "text-orange-500 border-orange-500"
                  : "text-neutral-600 border-transparent hover:text-white"
                }`}
            >
              {st.num} {st.short}
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-neutral-950 border border-t-0 border-neutral-900 rounded-b-lg overflow-hidden min-h-80">
          {/* Left */}
          <div className="relative p-10 md:p-14 border-b md:border-b-0 md:border-r border-neutral-900 overflow-hidden">
            <span className="font-anton text-9xl md:text-[180px] text-neutral-900 absolute bottom-0 right-0 leading-none pointer-events-none select-none">
              {s.num}
            </span>
            <span className="text-5xl mb-5 block relative z-10">{s.icon}</span>
            <div className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-2 relative z-10">Step {s.num}</div>
            <div className="font-anton text-4xl md:text-5xl uppercase leading-none mb-5 relative z-10">{s.title}</div>
            <p className="text-neutral-500 text-sm leading-relaxed relative z-10 max-w-xs">{s.desc}</p>
          </div>
          {/* Right */}
          <div className="p-10 md:p-14 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-3">
              {s.perks.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-4 py-4 bg-neutral-900 border border-neutral-800 hover:border-orange-500 hover:text-white text-neutral-400 text-sm font-semibold rounded-md transition-all cursor-default hover:translate-x-1"
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 glow-dot"></span>
                  {p}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-5">
              <button
                onClick={() => setActive((a) => (a + 1) % steps.length)}
                className="bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs uppercase tracking-wide px-5 py-3 rounded transition-all hover:-translate-y-0.5"
              >
                {active < 3 ? "Next Step →" : "Start Now →"}
              </button>
              <div className="flex gap-1.5 items-center">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${i === active ? "w-6 bg-orange-500" : "w-1.5 bg-neutral-700"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-20">
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #ff5c00, transparent)" }} />
      </div>

      {/* PAYOUTS */}
      <section
        ref={(el) => { refs.current["pay"] = el; }} data-id="pay"
        className={`max-w-6xl mx-auto px-6 md:px-12 mb-28 fade-up ${visible["pay"] ? "visible" : ""}`}
      >
        <div className="flex items-center gap-3 text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">
          Payout Methods <span className="block h-px w-14 bg-neutral-800"></span>
        </div>
        <h2 className="font-anton text-5xl md:text-6xl lg:text-7xl uppercase leading-none mb-4">
          CASH OUT<br /><span className="text-orange-500">YOUR WAY</span>
        </h2>
        <p className="text-neutral-600 text-sm leading-relaxed max-w-md mb-8">
          No minimums. No waiting. Choose how and when you get your earnings.
        </p>
        <div className="flex flex-wrap gap-3">
          {payouts.map((p, i) => (
            <div
              key={i}
              className="px-6 py-3 bg-neutral-950 border border-neutral-800 hover:bg-orange-500 hover:text-black hover:border-orange-500 text-neutral-400 font-bold text-sm rounded-full cursor-pointer transition-all hover:-translate-y-1"
            >
              {p}
            </div>
          ))}
          <div className="px-6 py-3 bg-neutral-950 border border-dashed border-neutral-800 text-neutral-600 font-bold text-sm rounded-full cursor-pointer transition-all hover:border-orange-500 hover:text-orange-500">
            + More Coming
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-20">
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #ff5c00, transparent)" }} />
      </div>

      {/* TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-28">
        <div className="flex items-center gap-3 text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">
          Real Earners <span className="block h-px w-14 bg-neutral-800"></span>
        </div>
        <h2 className="font-anton text-5xl md:text-6xl lg:text-7xl uppercase leading-none mb-10">
          THEY EARN.<br /><span className="text-orange-500">YOU CAN TOO.</span>
        </h2>
        <div
          ref={(el) => { refs.current["testi"] = el; }} data-id="testi"
          className={`grid grid-cols-1 md:grid-cols-3 gap-5 fade-up ${visible["testi"] ? "visible" : ""}`}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-neutral-950 border border-neutral-900 hover:border-orange-500 rounded-lg p-8 transition-all hover:-translate-y-1 overflow-hidden"
            >
              <span className="font-anton text-8xl text-neutral-900 absolute top-0 right-3 leading-none pointer-events-none select-none">"</span>
              <div className="font-anton text-3xl text-orange-500 mb-4">{t.earn}</div>
              <p className="text-sm text-neutral-500 leading-relaxed italic mb-6 relative z-10">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-anton text-base text-black flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{t.name}</div>
                  <div className="text-xs text-neutral-600 tracking-wide">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div
        ref={(el) => { refs.current["cta"] = el; }} data-id="cta"
        className={`max-w-6xl mx-auto px-6 md:px-12 mb-20 fade-up ${visible["cta"] ? "visible" : ""}`}
      >
        <div className="relative bg-neutral-950 border border-neutral-900 rounded-xl px-8 md:px-20 py-20 md:py-24 text-center overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ width: "500px", height: "1px", background: "linear-gradient(90deg, transparent, #ff5c00, transparent)" }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ width: "480px", height: "280px", background: "radial-gradient(ellipse, rgba(255,92,0,0.11) 0%, transparent 70%)" }}
          />
          <h2 className="font-anton text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-none mb-5 relative z-10">
            READY TO<br /><span className="text-orange-500">START EARNING?</span>
          </h2>
          <p className="text-neutral-600 text-base md:text-lg mb-10 relative z-10">
            Join 2.4 million people turning spare time into real income. Free forever.
          </p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <button
              className="bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm uppercase tracking-wide px-10 py-5 rounded-md transition-all hover:-translate-y-1 orange-glow"
              onClick={() => navigate("/login")}
            >
              Create Free Account →
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}