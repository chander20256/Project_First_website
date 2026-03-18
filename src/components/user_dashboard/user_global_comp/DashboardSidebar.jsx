import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome, FaWallet, FaGamepad, FaClipboardList,
  FaTasks, FaTrophy, FaUserFriends, FaQuestionCircle,
  FaUser, FaCog,
} from "react-icons/fa";

const DashboardSidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const location = useLocation();
  const navRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const mainItems = [
    { path: "/dashboard",            label: "Dashboard",   icon: <FaHome /> },
    { path: "/dashboard/wallet",     label: "Wallet",      icon: <FaWallet /> },
    { path: "/dashboard/games",      label: "Games",       icon: <FaGamepad /> },
    { path: "/dashboard/surveys",    label: "Surveys",     icon: <FaClipboardList /> },
    { path: "/dashboard/tasks",      label: "Tasks",       icon: <FaTasks /> },
    { path: "/dashboard/leaderboard",label: "Leaderboard", icon: <FaTrophy /> },
    { path: "/dashboard/referrals",  label: "Referrals",   icon: <FaUserFriends /> },
    { path: "/dashboard/quizzes",    label: "Quizzes",     icon: <FaQuestionCircle /> },
  ];

  const bottomItems = [
    { path: "/dashboard/profile",  label: "Profile",  icon: <FaUser /> },
    { path: "/dashboard/settings", label: "Settings", icon: <FaCog /> },
  ];

  // Update sliding indicator position on route change
  useEffect(() => {
    const activeEl = navRef.current?.querySelector(".active-item");
    if (activeEl) {
      setIndicatorStyle({
        top: activeEl.offsetTop + "px",
        height: activeEl.offsetHeight + "px",
      });
    }
  }, [location.pathname, isCollapsed]);

  // ── Shared nav item renderer ──────────────────────────────────────────────
  const renderItem = (item, closeFn) => (
    <NavLink
      key={item.path}
      to={item.path}
      end={item.path === "/dashboard"}
      onClick={closeFn}
    >
      {({ isActive }) => (
        <motion.div
          whileHover={{ scale: 1.05, x: isCollapsed ? 0 : 5 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`group flex items-center rounded-xl cursor-pointer ${
            isActive ? "active-item" : ""
          }`}
          title={isCollapsed ? item.label : ""}
          style={{
            gap: isCollapsed ? 0 : "12px",
            padding: isCollapsed ? "8px 0" : "10px 12px",
            justifyContent: isCollapsed ? "center" : "flex-start",
            color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
            background: isActive
              ? "linear-gradient(135deg, rgba(255,107,0,0.25), rgba(255,107,0,0.05))"
              : "transparent",
            position: "relative",
          }}
        >
          {/* Animated icon box */}
          <motion.div
            whileHover={{ rotate: 10, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              width: "34px",
              height: "34px",
              flexShrink: 0,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isActive
                ? "linear-gradient(145deg, #ff7a18, #ff6b00)"
                : "linear-gradient(145deg, #1a1a1a, #0c0c0c)",
              boxShadow: isActive
                ? "0 6px 20px rgba(255,107,0,0.6)"
                : "0 4px 12px rgba(0,0,0,0.8)",
            }}
          >
            {item.icon}
          </motion.div>

          {/* Label — fades out when collapsed */}
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  display: "inline-block",
                }}
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Orange glow dot for active item */}
          {isActive && !isCollapsed && (
            <motion.div
              layoutId="activeDot"
              style={{
                marginLeft: "auto",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#FF6B00",
                boxShadow: "0 0 10px #FF6B00",
                flexShrink: 0,
              }}
            />
          )}

          {/* Tooltip when collapsed */}
          {isCollapsed && (
            <span
              className="pointer-events-none absolute left-full ml-3 px-2.5 py-1.5 rounded-md
                         text-xs font-semibold whitespace-nowrap
                         opacity-0 group-hover:opacity-100 transition-opacity duration-150"
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
        </motion.div>
      )}
    </NavLink>
  );

  // ── Shared sidebar inner content ──────────────────────────────────────────
  const SidebarContent = ({ closeFn = () => {} }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {/* TOP */}
      <div>
        {/* Header row: "Main Menu" label + toggle/close button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: isCollapsed ? "20px 12px 10px" : "20px 20px 10px",
            minHeight: "52px",
          }}
        >
          {/* Label */}
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.h2
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "2px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                MAIN MENU
              </motion.h2>
            )}
          </AnimatePresence>

          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md shrink-0"
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

          {/* Mobile close button */}
          <button
            onClick={closeFn}
            className="lg:hidden flex items-center justify-center w-7 h-7 rounded-md shrink-0"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.4)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              marginLeft: "auto",
            }}
            aria-label="Close sidebar"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav items with sliding indicator */}
        <div className="relative flex flex-col gap-2 px-3" ref={navRef}>
          {/* Framer sliding left indicator */}
          <motion.div
            animate={indicatorStyle}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "absolute",
              left: "0",
              width: "4px",
              borderRadius: "4px",
              background: "linear-gradient(to bottom, #ff7a18, #ff6b00)",
              boxShadow: "0 0 12px rgba(255,107,0,0.8)",
            }}
          />
          {mainItems.map((item) => renderItem(item, closeFn))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="px-3 pb-5">
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                padding: "10px",
                margin: 0,
                fontSize: "12px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "2px",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ACCOUNT
            </motion.h2>
          )}
        </AnimatePresence>
        {isCollapsed && <div style={{ paddingTop: "16px" }} />}

        <div className="flex flex-col gap-2">
          {bottomItems.map((item) => renderItem(item, closeFn))}
        </div>
      </div>
    </div>
  );

  // Shared sidebar styles
  const sidebarBase = {
    background: "rgba(10,10,10,0.97)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderRight: "1px solid rgba(255,255,255,0.05)",
    overflow: "hidden",
  };

  return (
    <>
      {/* ── DESKTOP SIDEBAR (lg+): sticky, collapses with animation ── */}
      <motion.aside
        animate={{ width: isCollapsed ? 72 : 260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden lg:block flex-shrink-0 self-start"
        style={{
          ...sidebarBase,
          position: "sticky",
          top: "65px",
          height: "calc(100vh - 65px)",
          zIndex: 20,
        }}
      >
        <SidebarContent />
      </motion.aside>

      {/* ── MOBILE DRAWER (below lg): fixed overlay, slides in/out ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden fixed top-[65px] left-0 z-40"
            style={{
              ...sidebarBase,
              width: "260px",
              height: "calc(100vh - 65px)",
            }}
          >
            <SidebarContent closeFn={onClose} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;