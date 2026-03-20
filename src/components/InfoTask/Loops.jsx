import React from "react";

// Beautiful SVG S-Curve (Left to Right)
const CurveLeftToRight = () => (
  // h-[calc(100%+8rem)] matches the new md:gap-32 spacing
  <svg className="hidden md:block absolute top-[50%] left-[46%] w-[54%] h-[calc(100%+8rem)] z-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
    <path d="M 0,0 C 60,0 40,100 100,100" stroke="#ff5c00" strokeWidth="2" strokeDasharray="6,6" fill="none" vectorEffect="non-scaling-stroke" opacity="0.6" className="drop-shadow-[0_0_8px_rgba(255,92,0,0.5)]" />
  </svg>
);

// Beautiful SVG S-Curve (Right to Left)
const CurveRightToLeft = () => (
  <svg className="hidden md:block absolute top-[50%] right-[46%] w-[54%] h-[calc(100%+8rem)] z-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
    <path d="M 100,0 C 40,0 60,100 0,100" stroke="#ff5c00" strokeWidth="2" strokeDasharray="6,6" fill="none" vectorEffect="non-scaling-stroke" opacity="0.6" className="drop-shadow-[0_0_8px_rgba(255,92,0,0.5)]" />
  </svg>
);

// Premium UI Mockups tailored for the 8 steps
const MiniMockup = ({ type }) => {
  if (type === "form") return (
    <div className="w-full max-w-[180px] flex flex-col gap-2 opacity-90 transition-transform duration-500 group-hover:scale-105">
      <div className="w-2/3 h-1.5 bg-orange-500 rounded mb-1 shadow-[0_0_10px_rgba(255,92,0,0.5)]"></div>
      <div className="w-full h-5 bg-neutral-800 rounded border border-neutral-700"></div>
      <div className="w-full h-5 bg-neutral-800 rounded border border-neutral-700"></div>
      <div className="w-full h-7 bg-orange-500 text-black text-[10px] font-bold flex items-center justify-center rounded mt-1">SUBMIT</div>
    </div>
  );
  if (type === "id") return (
    <div className="w-[80%] h-[60%] bg-neutral-800 border-2 border-dashed border-neutral-600 rounded-xl flex items-center justify-center p-3 gap-3 opacity-90 transition-all duration-500 group-hover:border-orange-500 group-hover:scale-105">
      <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
        <span className="text-lg">📸</span>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="w-full h-1.5 bg-neutral-600 rounded"></div>
        <div className="w-1/2 h-1.5 bg-neutral-600 rounded"></div>
      </div>
    </div>
  );
  if (type === "plans") return (
    <div className="w-[85%] h-[70%] flex justify-center gap-3 items-end opacity-90 transition-transform duration-500 group-hover:scale-105">
      <div className="w-1/3 h-[60%] bg-neutral-800 rounded-t-lg border border-b-0 border-neutral-700"></div>
      <div className="w-1/3 h-[100%] bg-orange-500 rounded-t-lg shadow-[0_0_20px_rgba(255,92,0,0.5)] relative overflow-hidden">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-1 bg-white/50 rounded"></div>
      </div>
      <div className="w-1/3 h-[75%] bg-neutral-800 rounded-t-lg border border-b-0 border-neutral-700"></div>
    </div>
  );
  if (type === "ads") return (
    <div className="w-[80%] h-[70%] bg-neutral-800 rounded-xl border border-neutral-700 flex flex-col overflow-hidden opacity-90 transition-transform duration-500 group-hover:scale-105">
      <div className="w-full flex-1 bg-black flex items-center justify-center group-hover:bg-neutral-900 transition-colors">
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-black pl-1 shadow-[0_0_15px_rgba(255,92,0,0.6)] text-sm">▶</div>
      </div>
      <div className="w-full h-6 bg-neutral-800 flex justify-between items-center px-3">
        <div className="w-1/2 h-1 bg-neutral-600 rounded"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
      </div>
    </div>
  );
  if (type === "tasks") return (
    <div className="w-[80%] h-[75%] bg-neutral-800 rounded-xl border border-neutral-700 p-3 flex flex-col gap-2 opacity-90 transition-transform duration-500 group-hover:scale-105">
      <div className="w-1/3 h-1.5 bg-neutral-500 rounded mb-1"></div>
      <div className="flex items-center gap-2 bg-neutral-900 p-2 rounded border border-neutral-700 group-hover:border-orange-500/50 transition-colors">
        <div className="w-3 h-3 rounded-sm border border-orange-500 bg-orange-500/20 flex-shrink-0 flex items-center justify-center"><span className="text-[8px] text-orange-500">✓</span></div>
        <div className="w-full h-1.5 bg-neutral-600 rounded"></div>
      </div>
      <div className="flex items-center gap-2 bg-neutral-900 p-2 rounded border border-neutral-700 group-hover:border-orange-500/50 transition-colors">
        <div className="w-3 h-3 rounded-sm border border-orange-500 bg-orange-500/20 flex-shrink-0 flex items-center justify-center"><span className="text-[8px] text-orange-500">✓</span></div>
        <div className="w-2/3 h-1.5 bg-neutral-600 rounded"></div>
      </div>
    </div>
  );
  if (type === "links") return (
    <div className="w-[85%] h-[40%] bg-neutral-900 rounded-full border border-neutral-700 flex items-center px-4 justify-between opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:border-orange-500 group-hover:shadow-[0_0_15px_rgba(255,92,0,0.3)]">
      <div className="flex items-center gap-2 w-2/3">
        <span className="text-orange-500 text-sm">🔗</span>
        <div className="w-full h-1.5 bg-neutral-600 rounded"></div>
      </div>
      <div className="w-4 h-4 rounded-full bg-neutral-700 group-hover:bg-orange-500 transition-colors"></div>
    </div>
  );

  // REDESIGNED: Step 7 (Games) - Premium Glowing Arcade UI
  if (type === "games") return (
    <div className="w-[85%] h-[80%] bg-neutral-900 border border-neutral-800 rounded-xl p-2.5 flex flex-col gap-2 group-hover:border-orange-500/40 transition-all duration-500 shadow-inner opacity-90">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-1.5 px-1">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
          <div className="w-2 h-2 rounded-full bg-amber-500/80"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-orange-500 text-[9px] font-bold tracking-widest uppercase">Arcade</span>
      </div>
      <div className="flex-1 bg-black rounded-lg border border-neutral-800 relative overflow-hidden flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(255,92,0,0.15)] transition-all duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,92,0,0.2)_0,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <span className="text-4xl relative z-10 group-hover:scale-125 transition-transform duration-500 filter drop-shadow-[0_0_10px_rgba(255,92,0,0.6)]">🕹️</span>
      </div>
    </div>
  );

  // REDESIGNED: Step 8 (Referral) - Futuristic Connected Network
  if (type === "referral") return (
    <div className="w-[90%] h-[85%] flex flex-col items-center justify-center relative gap-3 opacity-90 transition-all duration-500 group-hover:scale-105">
      {/* Network Diagram */}
      <div className="w-full h-16 relative flex items-center justify-center mt-2">
        {/* SVG Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full z-0" style={{ overflow: 'visible' }}>
          <path d="M 50,45 L 20,15" stroke="#ff5c00" strokeWidth="1.5" strokeDasharray="3,3" fill="none" opacity="0.4" className="group-hover:opacity-100 transition-opacity" />
          <path d="M 50,45 L 80,15" stroke="#ff5c00" strokeWidth="1.5" strokeDasharray="3,3" fill="none" opacity="0.4" className="group-hover:opacity-100 transition-opacity" />
        </svg>
        {/* Side Nodes */}
        <div className="absolute top-0 left-3 w-7 h-7 bg-neutral-800 border border-neutral-600 rounded-full flex items-center justify-center text-[10px] z-10 group-hover:border-orange-500 transition-colors shadow-lg">👤</div>
        <div className="absolute top-0 right-3 w-7 h-7 bg-neutral-800 border border-neutral-600 rounded-full flex items-center justify-center text-[10px] z-10 group-hover:border-orange-500 transition-colors shadow-lg">👤</div>
        {/* Center Node */}
        <div className="relative w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl z-20 shadow-[0_0_15px_rgba(255,92,0,0.4)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,92,0,0.6)] transition-all duration-500 text-black">
          🤝
        </div>
      </div>
      {/* Code Box */}
      <div className="w-[85%] h-8 bg-black border border-neutral-700 rounded-full flex items-center justify-between p-1 pl-3 group-hover:border-orange-500/50 transition-colors z-20 shadow-md">
        <div className="w-1/2 h-1.5 bg-neutral-700 rounded-full"></div>
        <div className="bg-orange-500/10 text-orange-500 text-[9px] font-bold px-3 py-1 rounded-full group-hover:bg-orange-500 group-hover:text-black transition-colors cursor-pointer tracking-wider">COPY</div>
      </div>
    </div>
  );

  return null;
};

export default function Loops() {
  const steps = [
    { num: "01", title: "Sign Up Free", desc: "Get started with PTC.ad in seconds! Register now to start earning cash by viewing ads. No credit card required.", mockup: "form", btnText: "Create Account" },
    { num: "02", title: "Verify Account", desc: "Secure your account by completing verification, ensuring a safe platform experience with genuine users and trusted rewards.", mockup: "id", btnText: "Verify ID Now" },
    { num: "03", title: "Choose a Plan", desc: "Pick a plan that fits your goals and budget. Flexible options provide various earning opportunities tailored to your preferences.", mockup: "plans", btnText: "Explore Plans" },
    { num: "04", title: "View Ads", desc: "Watch ads at your convenience and start earning. View tailored ads to grow your rewards and enjoy effortless online income.", mockup: "ads", btnText: "Start Earning" },
    { num: "05", title: "Complete Tasks", desc: "Engage with various micro-tasks available on the platform to boost your daily earnings effortlessly.", mockup: "tasks", btnText: "View Tasks" },
    { num: "06", title: "Shortlinks", desc: "Navigate through our sponsored shortlinks. A quick and easy way to add more to your balance.", mockup: "links", btnText: "Visit Links" },
    { num: "07", title: "Play Games", desc: "Have fun while earning! Play exciting browser games and get rewarded for your time and high scores.", mockup: "games", btnText: "Play Now" },
    { num: "08", title: "Referrals Code", desc: "Invite friends using your unique referral code and earn a percentage of their earnings for life.", mockup: "referral", btnText: "Get Code" }
  ];

  return (
    <section className="bg-black text-white font-barlow py-16 md:py-24 overflow-hidden border-t border-neutral-900">
      
      <div className="text-center mb-16 md:mb-24 px-6">
        <h2 className="font-anton text-4xl md:text-6xl uppercase leading-none">
          THE EARNING <span className="text-orange-500">PATH</span>
        </h2>
        <p className="text-neutral-400 mt-3 text-base md:text-lg">Follow these simple steps to maximize your income.</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative flex flex-col gap-12 md:gap-32">
        
        {/* Mobile Vertical Dotted Line - Centered perfectly */}
        <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] border-l-2 border-dashed border-orange-500/40 z-0"></div>

        {steps.map((step, i) => {
          const isLeft = i % 2 === 0; // 0, 2, 4, 6 are Left. 1, 3, 5, 7 are Right.

          return (
            <div key={i} className={`relative flex w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>

              {/* Connecting Curves (Desktop Only) */}
              {i < steps.length - 1 && (
                isLeft ? <CurveLeftToRight /> : <CurveRightToLeft />
              )}

              {/* COMPRESSED: Smaller width, mx-auto for mobile centering, smaller padding */}
              <div className="relative z-10 w-[92%] sm:w-[80%] md:w-[44%] mx-auto md:mx-0 bg-neutral-950 border border-neutral-800 hover:border-orange-500 rounded-3xl p-5 md:p-6 shadow-2xl group transition-all duration-500 hover:-translate-y-2">
                
                {/* Number & Title */}
                <div className="flex items-center gap-3 mb-4">
                  {/* COMPRESSED: Smaller circle */}
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-xl font-anton text-neutral-400 group-hover:bg-orange-500 group-hover:text-black group-hover:border-orange-500 group-hover:shadow-[0_0_20px_rgba(255,92,0,0.5)] transition-all duration-300">
                    {step.num}
                  </div>
                  {/* COMPRESSED: Smaller title text */}
                  <h3 className="font-anton text-2xl md:text-3xl uppercase tracking-wide text-white">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                {/* COMPRESSED: Smaller description text */}
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-5">
                  {step.desc}
                </p>

                {/* Action Button */}
                {/* COMPRESSED: Smaller button padding */}
                <div className="mb-6">
                  <button 
                    onClick={() => {}} 
                    className="px-5 py-2.5 bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black font-bold uppercase tracking-widest text-xs rounded transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,92,0,0.4)]"
                  >
                    {step.btnText} →
                  </button>
                </div>

                {/* Visual UI Box */}
                {/* COMPRESSED: Smaller height (h-36 instead of h-40/48) */}
                <div className="w-full h-36 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center justify-center overflow-hidden relative group-hover:border-orange-500/50 transition-colors duration-500">
                  <MiniMockup type={step.mockup} />
                  
                  {/* Subtle inner glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>

              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}