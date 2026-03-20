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
    <div className="flex flex-col gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Greeting */}
      <p
        className="text-sm font-semibold uppercase tracking-widest"
        style={{ color: "#FF6B00" }}
      >
        {getGreeting()} 👋
      </p>

      {/* Welcome + Username */}
      <h2
        className="text-4xl font-bold"
        style={{ color: "#0a0a0a", lineHeight: 1.2 }}
      >
        Welcome,{" "}
        <span style={{ color: "#FF6B00" }}>{username}!</span>
      </h2>

      {/* Taglines */}
      <p className="text-base mt-2" style={{ color: "#6b7280" }}>
        Ready to Unlock Your Earning Potential?
      </p>
      <p className="text-sm" style={{ color: "#9ca3af" }}>
        Complete surveys, refer friends & grow your earnings every day.
      </p>

    </div>
  );
};

export default WelcomeLeft;