import ReportsHeader from "../../components/admin_dashboard/admin_local_comp/reports_comp/ReportsHeader";
import DateRangeSelector from "../../components/admin_dashboard/admin_local_comp/reports_comp/DateRangeSelector";
// import OverviewStats from "../../components/admin_dashboard/admin_local_comp/reports_comp/OverviewStats";
import UserReports from "../../components/admin_dashboard/admin_local_comp/reports_comp/UserReports";
import FinancialReports from "../../components/admin_dashboard/admin_local_comp/reports_comp/FinancialReports";
import ContentReports from "../../components/admin_dashboard/admin_local_comp/reports_comp/ContentReports";
import ExportButtons from "../../components/admin_dashboard/admin_local_comp/reports_comp/ExportButtons";

const AdminReports = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <ReportsHeader />
      <DateRangeSelector />
      {/* <OverviewStats /> */}
      <UserReports />
      <FinancialReports />
      <ContentReports />
      <ExportButtons />
    </div>
  );
};

export default AdminReports;



// import React from 'react'

// const AdminReports = () => {
//   return (
//     <div>
      
//       <h1 className='text-3xl font-bold text-gray-800'>Reports Page</h1>
//     </div>
//   )
// }

// export default AdminReports
