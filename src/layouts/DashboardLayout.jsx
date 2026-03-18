import { Outlet } from "react-router-dom";
import { useState } from "react";
import DashboardHeader from "../components/user_dashboard/user_global_comp/DashboardHeader";
import DashboardSidebar from "../components/user_dashboard/user_global_comp/DashboardSidebar";
import DashboardFooter from "../components/user_dashboard/user_global_comp/DashbordFooter";
import ScrollToTop from "../components/globalcomp/ScrollToTop";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    /*
      FINAL SANDWICH LAYOUT
      ┌─────────────────────────────────────┐
      │         HEADER (fixed, 65px)        │
      ├──────────┬──────────────────────────┤
      │          │                          │
      │ SIDEBAR  │    MAIN CONTENT          │  ← both scroll together
      │ (sticky) │    (bg-white)            │
      │          │                          │
      ├──────────┴──────────────────────────┤
      │        FOOTER (full width)          │
      └─────────────────────────────────────┘
    */
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#030712",
      }}
    >
      <ScrollToTop />

      {/* 1. Fixed header */}
      <DashboardHeader onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

      {/* 2. Middle row: sidebar + content (below fixed header) */}
      <div
        style={{
          display: "flex",
          flex: 1,
          paddingTop: "65px", // exactly header height
        }}
      >
        {/*
          Sidebar handles its own two modes internally:
          - Desktop (lg+): sticky, part of normal flow — no manual margin needed
          - Mobile (<lg): fixed overlay drawer
        */}
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        />

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content — sits naturally next to sticky sidebar */}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            background: "#ffffff",
            padding: "24px",
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* 3. Footer — full width, appears after all content */}
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;