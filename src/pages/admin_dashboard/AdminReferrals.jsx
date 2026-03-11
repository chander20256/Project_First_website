// import React from 'react'

// const AdminReferrals = () => {
//   return (
//     <div>
//       <h1>Admin Referrals</h1>
//     </div>
//   )
// }

// export default AdminReferrals





import ReferralsHeader from "../../components/admin_dashboard/admin_local_comp/referrals_comp/ReferralsHeader";
import ReferralsStats from "../../components/admin_dashboard/admin_local_comp/referrals_comp/ReferralsStats";
import ReferralsSettings from "../../components/admin_dashboard/admin_local_comp/referrals_comp/ReferralsSettings";
import ReferralsTable from "../../components/admin_dashboard/admin_local_comp/referrals_comp/ReferralsTable";
import ReferralsQuickActions from "../../components/admin_dashboard/admin_local_comp/referrals_comp/ReferralsQuickActions";

const AdminReferrals = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <ReferralsHeader />
      <ReferralsStats />
      <ReferralsSettings />
      <ReferralsTable />
      <ReferralsQuickActions />
    </div>
  );
};

export default AdminReferrals;