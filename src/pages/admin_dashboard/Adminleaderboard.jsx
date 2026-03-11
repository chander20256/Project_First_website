// import React from 'react'

// const Adminleaderboard = () => {
//   return (
//     <div>
//       <h1>Admin Leaderboard</h1>
//     </div>
//   )
// }

// export default Adminleaderboard




import LeaderboardHeader from "../../components/admin_dashboard/admin_local_comp/leaderboard_comp/LeaderboardHeader";
import LeaderboardTabs from "../../components/admin_dashboard/admin_local_comp/leaderboard_comp/LeaderboardTabs";
import LeaderboardControls from "../../components/admin_dashboard/admin_local_comp/leaderboard_comp/LeaderboardControls";
import LeaderboardTable from "../../components/admin_dashboard/admin_local_comp/leaderboard_comp/LeaderboardTable";
import LeaderboardSettings from "../../components/admin_dashboard/admin_local_comp/leaderboard_comp/LeaderboardSettings";
import LeaderboardQuickActions from "../../components/admin_dashboard/admin_local_comp/leaderboard_comp/LeaderboardQuickActions";

const AdminLeaderboard = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <LeaderboardHeader />
      <LeaderboardTabs />
      <LeaderboardControls />
      <LeaderboardTable />
      <LeaderboardSettings />
      <LeaderboardQuickActions />
    </div>
  );
};

export default AdminLeaderboard;