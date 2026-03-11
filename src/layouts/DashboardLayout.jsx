import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/user_dashboard/user_global_comp/DashboardHeader";
import DashboardSidebar from "../components/user_dashboard/user_global_comp/DashboardSidebar";
import Footer from "../components/globalcomp/Footer";
import ScrollToTop from "../components/globalcomp/ScrollToTop";
const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <ScrollToTop />
      <DashboardHeader />

      <div className="flex flex-1 pt-[65px]">
        <DashboardSidebar />

        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
      </div>

      <Footer/>
    </div>
  );
};

export default DashboardLayout;
