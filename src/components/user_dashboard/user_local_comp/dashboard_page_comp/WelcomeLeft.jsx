import React from "react";

const WelcomeLeft = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const username = (() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) return JSON.parse(stored).username || "User";
    } catch (e) {}
    return "User";
  })();

  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 sm:gap-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Greeting */}
      <div className="flex items-center gap-2">
        <span className="w-8 h-[2px] bg-[#FF6B00] hidden md:block" />
        <p
          className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em]"
          style={{ color: "#FF6B00" }}
        >
          {getGreeting()} 👋
        </p>
      </div>

      {/* Welcome + Username */}
      <div className="space-y-1">
        <h2
          className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight"
          style={{ color: "#0a0a0a", lineHeight: 1.1 }}
        >
          Welcome Back,
        </h2>
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight" style={{ color: "#FF6B00", lineHeight: 1.1 }}>
          {username}!
        </h3>
      </div>

      {/* Taglines */}
      <div className="max-w-md">
        <p className="text-sm sm:text-base font-medium mt-2" style={{ color: "#4b5563" }}>
          Ready to unlock your earning potential today?
        </p>
        <p className="text-xs sm:text-sm mt-1 leading-relaxed" style={{ color: "#9ca3af" }}>
          Join thousands of users completing surveys, playing games, and growing their portfolios every day.
        </p>
      </div>
    </div>


  );
};

export default WelcomeLeft;