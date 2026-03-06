import ProfileHeader from "../../components/user_dashboard/user_local_comp/dashboard_profile_comp/ProfileHeader";
import ProfileCard from "../../components/user_dashboard/user_local_comp/dashboard_profile_comp/ProfileCard";
import ProfileStats from "../../components/user_dashboard/user_local_comp/dashboard_profile_comp/ProfileStats";
import ProfileActivity from "../../components/user_dashboard/user_local_comp/dashboard_profile_comp/ProfileActivity";
import ProfileActions from "../../components/user_dashboard/user_local_comp/dashboard_profile_comp/ProfileActions";

const DashboardProfile = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <ProfileHeader />

      <ProfileCard />

      <ProfileStats />

      <ProfileActivity />

      <ProfileActions />
    </div>
  );
};

export default DashboardProfile;
