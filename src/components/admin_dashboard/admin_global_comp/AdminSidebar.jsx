

// import React from "react";
// import { NavLink, useLocation } from "react-router-dom";

// const AdminSidebar = ({
//   isOpen,
//   closeSidebar,
//   isCollapsed,
//   toggleCollapse,
// }) => {
//   const location = useLocation();

//   const mainItems = [
//     { path: "/Admin", label: "Dashboard", exact: true, icon: "📊" },
//     { path: "/Admin/wallet", label: "Wallet", icon: "💰" },
//     { path: "/Admin/games", label: "Games", icon: "🎮" },
//     { path: "/Admin/surveys", label: "Surveys", icon: "📋" },
//     { path: "/Admin/tasks", label: "Tasks", icon: "✅" },
//     { path: "/Admin/leaderboard", label: "Leaderboard", icon: "🏆" },
//     { path: "/Admin/referrals", label: "Referrals", icon: "🔗" },
//     { path: "/Admin/users", label: "Users", icon: "👥" },
//     { path: "/Admin/quizes", label: "Quizzes", icon: "❓" },
//     { path: "/Admin/reports", label: "Reports", icon: "📈" },
//   ];

//   const bottomItems = [
//     { path: "/Admin/profile", label: "Profile", icon: "👤" },
//     { path: "/Admin/settings", label: "Settings", icon: "⚙️" },
//   ];

//   const isActiveLink = (path, exact = false) => {
//     if (exact) return location.pathname === path;
//     return location.pathname.startsWith(path);
//   };

//   const linkStyle = (active) => ({
//     display: "flex",
//     alignItems: "center",
//     gap: isCollapsed ? "0px" : "12px",
//     padding: "10px 14px",
//     borderRadius: "10px",
//     fontSize: "14px",
//     fontWeight: "500",
//     textDecoration: "none",
//     transition: "all 0.25s ease",
//     color: active ? "#FF6B00" : "rgba(255,255,255,0.6)",
//     background: active
//       ? "linear-gradient(90deg, rgba(255,107,0,0.15), transparent)"
//       : "transparent",
//     borderLeft: active ? "3px solid #FF6B00" : "3px solid transparent",
//     justifyContent: isCollapsed ? "center" : "flex-start",
//   });

//   return (
//     <aside
//       className={`
//         fixed lg:sticky top-[65px] left-0 z-40
//         h-[calc(100vh-65px)]
//         transition-all duration-300
//         ${isCollapsed ? "w-[80px]" : "w-[260px]"}
//         ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//       `}
//       style={{
//         background: "#0A0A0A",
//         borderRight: "1px solid rgba(255,107,0,0.15)",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//       }}
//     >
//       {/* TOP SECTION */}
//       <div>
//         {/* COLLAPSE BUTTON */}
//        <div
//   style={{
//     padding: "10px",
//     display: "flex",
//     justifyContent: "flex-start", // 👈 force LEFT
//   }}
// >
//   <button
//     onClick={toggleCollapse}
//     style={{
//       color: "#fff",
//       fontSize: "12px",
//       opacity: 0.6,
//       cursor: "pointer",
//       background: "transparent",
//       border: "none",
//     }}
//   >
//     {isCollapsed ? "➡️" : "⬅️"}
//   </button>
// </div>

//         {/* MAIN MENU */}
//         {!isCollapsed && (
//           <div
//             style={{
//               padding: "10px 24px",
//               fontSize: "11px",
//               letterSpacing: "2px",
//               textTransform: "uppercase",
//               color: "rgba(255,255,255,0.25)",
//               fontWeight: "600",
//             }}
//           >
//             Main Menu
//           </div>
//         )}

//         <nav style={{ display: "flex", flexDirection: "column", gap: "6px", padding: "0 12px" }}>
//           {mainItems.map((item) => {
//             const active = isActiveLink(item.path, item.exact);

//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 style={linkStyle(active)}
//                 onClick={closeSidebar}
//               >
//                 <span>{item.icon}</span>
//                 {!isCollapsed && item.label}
//               </NavLink>
//             );
//           })}
//         </nav>
//       </div>

//       {/* BOTTOM SECTION */}
//       <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "10px" }}>
//         {!isCollapsed && (
//           <div
//             style={{
//               padding: "10px 24px",
//               fontSize: "11px",
//               letterSpacing: "2px",
//               textTransform: "uppercase",
//               color: "rgba(255,255,255,0.25)",
//               fontWeight: "600",
//             }}
//           >
//             Account
//           </div>
//         )}

//         <div style={{ display: "flex", flexDirection: "column", gap: "6px", padding: "0 12px 16px" }}>
//           {bottomItems.map((item) => {
//             const active = isActiveLink(item.path);

//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 style={linkStyle(active)}
//                 onClick={closeSidebar}
//               >
//                 <span>{item.icon}</span>
//                 {!isCollapsed && item.label}
//               </NavLink>
//             );
//           })}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;












import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const AdminSidebar = ({
  isOpen,
  closeSidebar,
  isCollapsed,
  toggleCollapse,
}) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0 });

  const mainItems = [
    { path: "/Admin", label: "Dashboard", exact: true, icon: "📊", icon3d: "🚀", gradient: "from-blue-500 to-blue-600" },
    { path: "/Admin/wallet", label: "Wallet", icon: "💰", icon3d: "💎", gradient: "from-green-500 to-green-600" },
    { path: "/Admin/games", label: "Games", icon: "🎮", icon3d: "🎯", gradient: "from-purple-500 to-purple-600" },
    { path: "/Admin/surveys", label: "Surveys", icon: "📋", icon3d: "📊", gradient: "from-yellow-500 to-yellow-600" },
    { path: "/Admin/tasks", label: "Tasks", icon: "✅", icon3d: "⭐", gradient: "from-indigo-500 to-indigo-600" },
    { path: "/Admin/leaderboard", label: "Leaderboard", icon: "🏆", icon3d: "👑", gradient: "from-orange-500 to-orange-600" },
    { path: "/Admin/referrals", label: "Referrals", icon: "🔗", icon3d: "🤝", gradient: "from-teal-500 to-teal-600" },
    { path: "/Admin/users", label: "Users", icon: "👥", icon3d: "👤", gradient: "from-cyan-500 to-cyan-600" },
    { path: "/Admin/quizes", label: "Quizzes", icon: "❓", icon3d: "🎓", gradient: "from-pink-500 to-pink-600" },
    { path: "/Admin/reports", label: "Reports", icon: "📈", icon3d: "📊", gradient: "from-red-500 to-red-600" },
  ];

  const bottomItems = [
    { path: "/Admin/profile", label: "Profile", icon: "👤", icon3d: "👨‍💼", gradient: "from-gray-500 to-gray-600" },
    { path: "/Admin/settings", label: "Settings", icon: "⚙️", icon3d: "🔧", gradient: "from-gray-600 to-gray-700" },
  ];

  const isActiveLink = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const linkStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: isCollapsed ? "0px" : "12px",
    padding: isCollapsed ? "12px" : "10px 14px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    textDecoration: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    color: active ? "#FF6B00" : "rgba(255,255,255,0.7)",
    background: active
      ? "linear-gradient(135deg, rgba(255,107,0,0.12) 0%, rgba(255,107,0,0.05) 100%)"
      : "transparent",
    borderLeft: active ? "3px solid #FF6B00" : "3px solid transparent",
    justifyContent: isCollapsed ? "center" : "flex-start",
    position: "relative",
    cursor: "pointer",
    width: "100%",
  });

  const iconStyle = (active, gradient) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: isCollapsed ? "36px" : "32px",
    height: isCollapsed ? "36px" : "32px",
    fontSize: isCollapsed ? "20px" : "18px",
    background: active 
      ? `linear-gradient(135deg, #FF6B00, #FF8C00)`
      : `linear-gradient(135deg, ${gradient.split(' ')[0]}, ${gradient.split(' ')[1]})`,
    borderRadius: "10px",
    transition: "all 0.3s ease",
    boxShadow: active 
      ? "0 4px 12px rgba(255,107,0,0.3)"
      : "0 2px 6px rgba(0,0,0,0.2)",
    flexShrink: 0,
  });

  const handleMouseEnter = (e, path) => {
    setHoveredItem(path);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({ top: rect.top + rect.height / 2 });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-[65px] left-0 z-40
          transition-all duration-300 overflow-y-auto overflow-x-hidden
          ${isCollapsed ? "w-[80px]" : "w-[280px]"}
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{
          background: "linear-gradient(180deg, #0A0A0A 0%, #0F0F0F 100%)",
          borderRight: "1px solid rgba(255,107,0,0.2)",
          boxShadow: "4px 0 20px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 65px)",
          scrollbarWidth: "thin",
          scrollbarColor: "#FF6B00 #1A1A1A",
        }}
      >
        {/* Custom scrollbar styles */}
        <style>{`
          aside::-webkit-scrollbar {
            width: 4px;
          }
          aside::-webkit-scrollbar-track {
            background: #1A1A1A;
          }
          aside::-webkit-scrollbar-thumb {
            background: #FF6B00;
            border-radius: 4px;
          }
          aside::-webkit-scrollbar-thumb:hover {
            background: #FF8C00;
          }
        `}</style>

        {/* TOP SECTION - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Toggle Button */}
          <div
            style={{
              padding: "16px 12px",
              display: "flex",
              justifyContent: isCollapsed ? "center" : "flex-start",
              borderBottom: "1px solid rgba(255,107,0,0.1)",
              marginBottom: "16px",
              position: "sticky",
              top: 0,
              background: "linear-gradient(180deg, #0A0A0A 0%, #0F0F0F 100%)",
              zIndex: 10,
            }}
          >
            <button
              onClick={toggleCollapse}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 0 0 2px rgba(255,107,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
              style={{
                color: "#FF6B00",
                fontSize: "20px",
                cursor: "pointer",
                background: "rgba(255,107,0,0.1)",
                border: "1px solid rgba(255,107,0,0.3)",
                borderRadius: "12px",
                padding: "8px 12px",
                transition: "all 0.3s ease",
                width: isCollapsed ? "auto" : "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <span style={{ transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
                {isCollapsed ? "➡️" : "⬅️"}
              </span>
              {!isCollapsed && (
                <span style={{ fontSize: "12px", fontWeight: "500" }}>
                  Collapse Menu
                </span>
              )}
            </button>
          </div>

          {/* Main Menu Label */}
          {!isCollapsed && (
            <div
              style={{
                padding: "0 20px 12px 20px",
                fontSize: "11px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "rgba(255,107,0,0.5)",
                fontWeight: "700",
                borderBottom: "1px solid rgba(255,107,0,0.1)",
                marginBottom: "12px",
              }}
            >
              Main Menu
            </div>
          )}

          {/* Navigation Items */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "0 12px 20px 12px" }}>
            {mainItems.map((item) => {
              const active = isActiveLink(item.path, item.exact);
              const isHovered = hoveredItem === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={linkStyle(active)}
                  onClick={closeSidebar}
                  onMouseEnter={(e) => handleMouseEnter(e, item.path)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* 3D Icon */}
                  <div
                    style={{
                      ...iconStyle(active, item.gradient),
                      transform: isHovered ? "scale(1.1) translateY(-2px)" : "scale(1)",
                      boxShadow: isHovered 
                        ? "0 6px 16px rgba(255,107,0,0.4)"
                        : active 
                          ? "0 4px 12px rgba(255,107,0,0.3)"
                          : "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    <span style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.2))" }}>
                      {isCollapsed ? item.icon3d : item.icon}
                    </span>
                  </div>
                  
                  {/* Label */}
                  {!isCollapsed && (
                    <span style={{ 
                      fontWeight: active ? "600" : "500",
                      letterSpacing: "0.3px",
                      transition: "color 0.2s",
                      flex: 1,
                    }}>
                      {item.label}
                    </span>
                  )}

                  {/* Active Indicator Dot (when collapsed) */}
                  {isCollapsed && active && (
                    <span
                      style={{
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "6px",
                        height: "6px",
                        background: "#FF6B00",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM SECTION - Fixed at bottom */}
        <div 
          style={{ 
            borderTop: "1px solid rgba(255,107,0,0.1)", 
            paddingTop: "12px",
            background: "linear-gradient(180deg, #0F0F0F 0%, #0A0A0A 100%)",
            position: "sticky",
            bottom: 0,
          }}
        >
          {!isCollapsed && (
            <div
              style={{
                padding: "0 20px 12px 20px",
                fontSize: "11px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "rgba(255,107,0,0.5)",
                fontWeight: "700",
              }}
            >
              Account
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "0 12px 20px" }}>
            {bottomItems.map((item) => {
              const active = isActiveLink(item.path);
              const isHovered = hoveredItem === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={linkStyle(active)}
                  onClick={closeSidebar}
                  onMouseEnter={(e) => handleMouseEnter(e, item.path)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    style={{
                      ...iconStyle(active, item.gradient),
                      transform: isHovered ? "scale(1.1) translateY(-2px)" : "scale(1)",
                    }}
                  >
                    <span>{isCollapsed ? item.icon3d : item.icon}</span>
                  </div>
                  {!isCollapsed && <span style={{ flex: 1 }}>{item.label}</span>}
                  {isCollapsed && active && (
                    <span
                      style={{
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "6px",
                        height: "6px",
                        background: "#FF6B00",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Global Tooltip for collapsed mode */}
      {isCollapsed && hoveredItem && (
        <div
          style={{
            position: "fixed",
            left: "92px",
            top: `${tooltipPosition.top}px`,
            transform: "translateY(-50%)",
            background: "#FF6B00",
            color: "white",
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: "500",
            whiteSpace: "nowrap",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            pointerEvents: "none",
            animation: "fadeIn 0.2s ease",
          }}
        >
          {hoveredItem === "/Admin" ? "Dashboard" :
           hoveredItem === "/Admin/wallet" ? "Wallet" :
           hoveredItem === "/Admin/games" ? "Games" :
           hoveredItem === "/Admin/surveys" ? "Surveys" :
           hoveredItem === "/Admin/tasks" ? "Tasks" :
           hoveredItem === "/Admin/leaderboard" ? "Leaderboard" :
           hoveredItem === "/Admin/referrals" ? "Referrals" :
           hoveredItem === "/Admin/users" ? "Users" :
           hoveredItem === "/Admin/quizes" ? "Quizzes" :
           hoveredItem === "/Admin/reports" ? "Reports" :
           hoveredItem === "/Admin/profile" ? "Profile" :
           hoveredItem === "/Admin/settings" ? "Settings" : ""}
          <div
            style={{
              position: "absolute",
              left: "-4px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "0",
              height: "0",
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderRight: "5px solid #FF6B00",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;