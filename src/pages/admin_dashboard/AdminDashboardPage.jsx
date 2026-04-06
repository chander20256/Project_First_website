
import React from "react";
import DashboardHeader from "../../components/admin_dashboard/admin_local_comp/dashboard_page_comp/DashboardHeader";
import QuickActions from "../../components/admin_dashboard/admin_local_comp/dashboard_page_comp/QuickActions";
import RecentActivity from "../../components/admin_dashboard/admin_local_comp/dashboard_page_comp/RecentActivity";
import ModulesGrid from "../../components/admin_dashboard/admin_local_comp/dashboard_page_comp/ModulesGrid";
import AnalyticsCharts from "../../components/admin_dashboard/admin_local_comp/dashboard_page_comp/AnalyticsCharts";
import ManagementTables from "../../components/admin_dashboard/admin_local_comp/dashboard_page_comp/ManagementTables";  
const AdminDashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <DashboardHeader />
      <AnalyticsCharts />
      <ManagementTables />
      <ModulesGrid />
      <RecentActivity />
      <QuickActions />

    
   
    
    </div>
  );
};

export default AdminDashboardPage;



