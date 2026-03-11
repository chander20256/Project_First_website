
import React from "react";
import DashboardHeader from "../../components/admin_dashboard/admin_local_comp/dashboard_page_comp/DashboardHeader";
// import StatsCards from "../../components/admin_dashboard/admin_local_comp/dashboard_page_comp/StatsCards";
import QuickActions from "../../components/admin_dashboard/admin_local_comp/dashboard_page_comp/QuickActions";
import RecentActivity from "../../components/admin_dashboard/admin_local_comp/dashboard_page_comp/RecentActivity";
import ModulesGrid from "../../components/admin_dashboard/admin_local_comp/dashboard_page_comp/ModulesGrid";
const AdminDashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <DashboardHeader />
      {/* <StatsCards /> */}
      <RecentActivity />
      <QuickActions />
      <ModulesGrid/>
    
   
    
    </div>
  );
};

export default AdminDashboardPage;


