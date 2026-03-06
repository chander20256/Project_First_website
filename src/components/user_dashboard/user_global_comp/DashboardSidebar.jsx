import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const DashboardSidebar = () => {
  const location = useLocation();

  const mainItems = [
    { path: "/dashboard", label: "Dashboard", exact: true },
    { path: "/dashboard/wallet", label: "Wallet" },
    { path: "/dashboard/games", label: "Games" },
    { path: "/dashboard/surveys", label: "Surveys" },
    { path: "/dashboard/tasks", label: "Tasks" },
    { path: "/dashboard/leaderboard", label: "Leaderboard" },
    { path: "/dashboard/referrals", label: "Referrals" },
    { path: "/dashboard/quizzes", label: "Quizzes" },
  ];

  const bottomItems = [
    { path: "/dashboard/profile", label: "Profile" },
    { path: "/dashboard/settings", label: "Settings" },
  ];

  const isActiveLink = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-gray-300 border-r border-gray-800 flex flex-col justify-between">
      {/* TOP SECTION */}
      <div>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Gaming Forge</h2>
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col mt-4">
          {mainItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact || false}
              className={`px-6 py-3 text-sm font-medium transition
                ${
                  isActiveLink(item.path, item.exact)
                    ? "bg-gray-800 text-white border-l-4 border-green-500"
                    : "hover:bg-gray-800 hover:text-white"
                }`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-gray-800">
        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`block px-6 py-3 text-sm font-medium transition
              ${
                isActiveLink(item.path)
                  ? "bg-gray-800 text-white border-l-4 border-green-500"
                  : "hover:bg-gray-800 hover:text-white"
              }`}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
