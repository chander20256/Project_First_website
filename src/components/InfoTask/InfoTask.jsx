import { useEffect } from "react";
import Loops from "../InfoTask/Loops";

export default function InfoTask() {
  // Keeping only the essential styles used in the Hero section
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@400;600;700&display=swap');
      .font-anton { font-family: 'Anton', sans-serif !important; }
      .font-barlow { font-family: 'Barlow', sans-serif !important; }
      .orange-glow:hover { box-shadow: 0 12px 36px rgba(255,92,0,0.32); }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="font-barlow bg-black text-white min-h-screen overflow-x-hidden">
      {/* HERO / HOW IT WORKS SECTION */}
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
      <Loops />
    </div>
  );
}