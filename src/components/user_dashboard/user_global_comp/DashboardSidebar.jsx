import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const DashboardSidebar = () => {
  const location = useLocation();

  const mainItems = [
    { path: "/dashboard", label: "Dashboard", exact: true,
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
    { path: "/dashboard/wallet", label: "Wallet",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg> },
    { path: "/dashboard/games", label: "Games",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4m-2-2v4"/><circle cx="17" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="17" cy="14" r="1" fill="currentColor" stroke="none"/></svg> },
    { path: "/dashboard/surveys", label: "Surveys",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/><line x1="9" y1="9" x2="12" y2="9"/></svg> },
    { path: "/dashboard/tasks", label: "Tasks",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
    { path: "/dashboard/leaderboard", label: "Leaderboard",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg> },
    { path: "/dashboard/referrals", label: "Referrals",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
    { path: "/dashboard/quizzes", label: "Quizzes",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  ];

  const bottomItems = [
    { path: "/dashboard/profile", label: "Profile",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { path: "/dashboard/settings", label: "Settings",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  ];

  const isActiveLink = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className="sticky self-start flex flex-col justify-between w-64 shrink-0"
      style={{
        top: "65px",
        height: "calc(100vh - 65px)",
        background: "#0A0A0A",
        borderRight: "1px solid rgba(255,107,0,0.12)",
      }}
    >
      {/* Main Nav */}
      <div className="flex flex-col mt-2">
        {/* Section label */}
        <span
          className="px-6 pt-4 pb-2 text-xs font-bold tracking-widest uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.2)" }}
        >
          Main Menu
        </span>

        <nav className="flex flex-col gap-1 px-3">
          {mainItems.map((item) => {
            const active = isActiveLink(item.path, item.exact);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact || false}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.03em",
                  textDecoration: "none",
                  color: active ? "#FF6B00" : "rgba(255,255,255,0.5)",
                  background: active ? "rgba(255,107,0,0.1)" : "transparent",
                  borderLeft: active ? "3px solid #FF6B00" : "3px solid transparent",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.85)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "transparent"; }}}
              >
                <span style={{ color: active ? "#FF6B00" : "rgba(255,255,255,0.3)" }}>{item.icon}</span>
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Nav */}
      <div
        className="flex flex-col gap-1 px-3 pb-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span
          className="px-3 pt-4 pb-2 text-xs font-bold tracking-widest uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.2)" }}
        >
          Account
        </span>
        {bottomItems.map((item) => {
          const active = isActiveLink(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.03em",
                textDecoration: "none",
                color: active ? "#FF6B00" : "rgba(255,255,255,0.5)",
                background: active ? "rgba(255,107,0,0.1)" : "transparent",
                borderLeft: active ? "3px solid #FF6B00" : "3px solid transparent",
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.85)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "transparent"; }}}
            >
              <span style={{ color: active ? "#FF6B00" : "rgba(255,255,255,0.3)" }}>{item.icon}</span>
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default DashboardSidebar;