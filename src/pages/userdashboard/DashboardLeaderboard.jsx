import LeaderboardHeader from "../../components/user_dashboard/user_local_comp/dashboard_leaderboard_comp/LeaderboardHeader";
import LeaderboardStats from "../../components/user_dashboard/user_local_comp/dashboard_leaderboard_comp/LeaderboardStats";
import LeaderboardGrid from "../../components/user_dashboard/user_local_comp/dashboard_leaderboard_comp/LeaderboardGrid";
import TopUserHighlight from "../../components/user_dashboard/user_local_comp/dashboard_leaderboard_comp/TopUserHighlight";
import LeaderboardQuickActions from "../../components/user_dashboard/user_local_comp/dashboard_leaderboard_comp/LeaderboardQuickActions";

const DashboardLeaderboard = () => {
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <LeaderboardHeader />
        <LeaderboardStats />
        <TopUserHighlight />
        <LeaderboardGrid />
        <LeaderboardQuickActions />
      </div>
    </div>
  );
};

export default DashboardLeaderboard;
