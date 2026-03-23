import { useEffect } from "react";
import Loops from "../InfoTask/Loops"; // Make sure path is correct for your project

export default function InfoTask() {
  // Keeping only the essential styles used in the Hero section
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@400;600;700&display=swap');
      .font-anton { font-family: 'Anton', sans-serif !important; }
      .font-barlow { font-family: 'Barlow', sans-serif !important; }
      .orange-glow:hover { box-shadow: 0 12px 36px rgba(255,107,0,0.25); }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="font-barlow bg-[#FAFAFA] text-neutral-900 min-h-screen overflow-x-hidden">
      {/* HERO / HOW IT WORKS SECTION */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* LEFT — Text Content */}
          <div className="flex-1 w-full">
            <div className="inline-flex items-center gap-2 bg-white border border-neutral-200 border-l-4 border-l-[#FF6B00] px-4 py-1.5 rounded-sm text-[#FF6B00] text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
              <span>●</span> How It Works
            </div>
            <h1 className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-[90px] leading-none tracking-tight uppercase mb-7">
              <span className="text-[#FF6B00]">DO</span> TASKS<br />
              <span style={{ WebkitTextStroke: "2px #171717", color: "transparent" }}>EARN</span><br />
              REWARDS
            </h1>
            <p className="text-lg text-neutral-600 max-w-md leading-relaxed mb-10">
              The simplest way to turn spare time into real money. No skills required — just pick a task, do it, and get paid.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                className="bg-[#FF6B00] hover:bg-[#e66000] text-white font-bold text-sm uppercase tracking-wide px-8 py-4 rounded transition-all hover:-translate-y-0.5 orange-glow"
                onClick={() => window.location.href = "/login"}
              >
                Start Earning Free →
              </button>
              <button className="bg-transparent text-neutral-700 border border-neutral-300 hover:border-[#FF6B00] hover:text-[#FF6B00] font-semibold text-sm uppercase tracking-wide px-8 py-4 rounded transition-all bg-white">
                Watch Demo
              </button>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <span className="text-[#FF6B00] font-bold">●</span> 2.4M earners active right now
              </div>
            </div>
          </div>

          {/* RIGHT — YouTube Video */}
          <div className="flex-1 w-full">
            {/* Outer glow border - Adapted for Light Theme */}
            <div className="relative rounded-xl p-[2px] shadow-[0_8px_30px_rgba(255,107,0,0.15)]"
              style={{ background: "linear-gradient(135deg, #FF6B00, #ffffff, #FF6B00)" }}>
              
              {/* Video wrapper — 16:9 */}
              <div className="relative w-full rounded-xl overflow-hidden bg-neutral-100"
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
              <div className="flex items-center justify-between px-4 py-3 bg-white rounded-b-xl border-t border-neutral-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FF6B00] rounded-full animate-pulse"></span>
                  <span className="text-xs font-bold tracking-widest uppercase text-neutral-600">
                    Watch How It Works
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-semibold">2:47</span>
              </div>
            </div>

            {/* Caption below video */}
            <p className="text-xs text-neutral-500 text-center mt-3 tracking-wide">
              🔒 No sign-up needed to watch · 2.4M+ earners joined after this video
            </p>
          </div>

        </div>
      </section>
      
      {/* Light Theme Timeline Component */}
      <Loops />
    </div>
  );
}