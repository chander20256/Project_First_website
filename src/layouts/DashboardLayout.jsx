import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/user_dashboard/user_global_comp/DashboardHeader";
import DashboardSidebar from "../components/user_dashboard/user_global_comp/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div
      className="dashboard-layout"
      style={{ display: "flex", height: "100vh" }}
    >
      <DashboardSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <DashboardHeader />
        <main
          style={{
            flex: 1,
            padding: "24px",
            backgroundColor: "#f5f5f5",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
