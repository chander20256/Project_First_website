import UsersHeader from "../../components/admin_dashboard/admin_local_comp/users_comp/UsersHeader";
import UsersStats from "../../components/admin_dashboard/admin_local_comp/users_comp/UsersStats";
import UsersFilters from "../../components/admin_dashboard/admin_local_comp/users_comp/UsersFilters";
import UsersTable from "../../components/admin_dashboard/admin_local_comp/users_comp/UsersTable";
import UsersQuickActions from "../../components/admin_dashboard/admin_local_comp/users_comp/UsersQuickActions";

const AdminUsers = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <UsersHeader />
      <UsersStats />
      <UsersFilters />
      <UsersTable />
      <UsersQuickActions />
    </div>
  );
};

export default AdminUsers;