import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const DashboardSidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const location = useLocation();

  const mainItems = [
    {
      path: "/dashboard", label: "Dashboard", exact: true,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      path: "/dashboard/wallet", label: "Wallet",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 12V22H4V12" /><path d="M22 7H2v5h20V7z" /><path d="M12 22V7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      ),
    },
    {
      path: "/dashboard/games", label: "Games",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 12h4m-2-2v4" />
          <circle cx="17" cy="10" r="1" fill="currentColor" stroke="none" />
          <circle cx="17" cy="14" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      path: "/dashboard/surveys", label: "Surveys",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="15" y2="17" />
          <line x1="9" y1="9" x2="12" y2="9" />
        </svg>
      ),
    },
    {
      path: "/dashboard/tasks", label: "Tasks",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      path: "/dashboard/leaderboard", label: "Leaderboard",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
        </svg>
      ),
    },
    {
      path: "/dashboard/referrals", label: "Referrals",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      ),
    },
    {
      path: "/dashboard/quizzes", label: "Quizzes",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
  ];

  const bottomItems = [
    {
      path: "/dashboard/profile", label: "Profile",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      path: "/dashboard/settings", label: "Settings",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  const isActiveLink = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const renderNavItem = (item) => {
    const active = isActiveLink(item.path, item.exact);
    return (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.exact || false}
        onClick={onClose}
        className="relative group flex items-center rounded-lg text-sm font-medium transition-all duration-200"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.03em",
          textDecoration: "none",
          color: active ? "#FF6B00" : "rgba(255,255,255,0.5)",
          background: active ? "rgba(255,107,0,0.1)" : "transparent",
          borderLeft: active ? "3px solid #FF6B00" : "3px solid transparent",
          padding: isCollapsed ? "10px 0" : "10px 12px",
          justifyContent: isCollapsed ? "center" : "flex-start",
          gap: isCollapsed ? "0" : "12px",
        }}
        onMouseEnter={(e) => {
          if (!active) {
            e.currentTarget.style.color = "rgba(255,255,255,0.85)";
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        {/* Icon */}
        <span
          className="shrink-0"
          style={{ color: active ? "#FF6B00" : "rgba(255,255,255,0.35)" }}
        >
          {item.icon}
        </span>

        {/* Label — fades out when collapsed */}
        <span
          style={{
            maxWidth: isCollapsed ? "0px" : "160px",
            opacity: isCollapsed ? 0 : 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            transition: "max-width 0.3s ease, opacity 0.2s ease",
            display: "inline-block",
          }}
        >
          {item.label}
        </span>

        {/* Tooltip when collapsed */}
        {isCollapsed && (
          <span
            className="pointer-events-none absolute left-full ml-3 px-2.5 py-1.5 rounded-md text-xs font-semibold
                       opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap"
            style={{
              background: "#1c1c1c",
              color: "#FF6B00",
              border: "1px solid rgba(255,107,0,0.3)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
              zIndex: 999,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {item.label}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <>
      {/*
        ── DESKTOP SIDEBAR (lg+): sticky so it scrolls with page
           and footer naturally appears below it
      ──────────────────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col justify-between flex-shrink-0"
        style={{
          width: isCollapsed ? "64px" : "256px",
          // sticky: stays at top while page scrolls, then scrolls away with footer
          position: "sticky",
          top: "65px",                      // below fixed header
          height: "calc(100vh - 65px)",     // fills viewport
          alignSelf: "flex-start",          // key: don't stretch to full column height
          background: "#0A0A0A",
          borderRight: "1px solid rgba(255,107,0,0.12)",
          transition: "width 0.3s ease",
          overflow: "hidden",
          zIndex: 20,
        }}
      >
        {/* Top section */}
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden mt-2">

          {/* Label + toggle button row */}
          <div
            className="flex items-center justify-between px-3 pt-4 pb-3"
            style={{ minHeight: "40px" }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.2)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                maxWidth: isCollapsed ? "0px" : "160px",
                opacity: isCollapsed ? 0 : 1,
                overflow: "hidden",
                transition: "max-width 0.3s ease, opacity 0.2s ease",
                display: "inline-block",
                paddingLeft: isCollapsed ? 0 : "12px",
              }}
            >
              Main Menu
            </span>

            {/* Collapse / expand toggle */}
            <button
              onClick={onToggleCollapse}
              className="flex items-center justify-center w-7 h-7 rounded-md shrink-0"
              style={{
                background: "rgba(255,107,0,0.08)",
                border: "1px solid rgba(255,107,0,0.25)",
                color: "rgba(255,107,0,0.8)",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
                marginLeft: isCollapsed ? "auto" : "8px",
                marginRight: isCollapsed ? "auto" : "0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,107,0,0.2)";
                e.currentTarget.style.color = "#FF6B00";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,107,0,0.08)";
                e.currentTarget.style.color = "rgba(255,107,0,0.8)";
              }}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg
                width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>

          {/* Main nav items */}
          <nav className="flex flex-col gap-0.5 px-2">
            {mainItems.map(renderNavItem)}
          </nav>
        </div>

        {/* Bottom account section */}
        <div
          className="flex flex-col gap-0.5 px-2 pb-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              maxWidth: isCollapsed ? "0px" : "160px",
              opacity: isCollapsed ? 0 : 1,
              overflow: "hidden",
              transition: "max-width 0.3s ease, opacity 0.2s ease",
              display: "block",
              padding: isCollapsed ? "12px 0 8px 0" : "16px 12px 8px 12px",
            }}
          >
            Account
          </span>
          {bottomItems.map(renderNavItem)}
        </div>
      </aside>

      {/*
        ── MOBILE DRAWER (below lg): fixed overlay, slides in/out
      ────────────────────────────────────────────────────────── */}
      <aside
        className="lg:hidden flex flex-col justify-between"
        style={{
          position: "fixed",
          top: "65px",
          left: 0,
          width: "256px",
          height: "calc(100vh - 65px)",
          background: "#0A0A0A",
          borderRight: "1px solid rgba(255,107,0,0.12)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          overflow: "hidden",
          zIndex: 40,
        }}
      >
        {/* Top section */}
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden mt-2">
          <div
            className="flex items-center justify-between px-3 pt-4 pb-3"
            style={{ minHeight: "40px" }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.2)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                paddingLeft: "12px",
              }}
            >
              Main Menu
            </span>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="flex items-center justify-center w-7 h-7 rounded-md shrink-0"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
              }}
              aria-label="Close sidebar"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-0.5 px-2">
            {mainItems.map(renderNavItem)}
          </nav>
        </div>

        {/* Bottom account section */}
        <div
          className="flex flex-col gap-0.5 px-2 pb-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              display: "block",
              padding: "16px 12px 8px 12px",
            }}
          >
            Account
          </span>
          {bottomItems.map(renderNavItem)}
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;