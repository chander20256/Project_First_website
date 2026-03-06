import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/user_dashboard/user_global_comp/DashboardHeader";
import DashboardSidebar from "../components/user_dashboard/user_global_comp/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex-1 ml-64 p-6 bg-white overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
