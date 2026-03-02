const UserDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-lg">Welcome back, User!</p>
        <p className="text-gray-600 dark:text-gray-400">This is your personal dashboard.</p>
      </div>
    </div>
  );
};

export default UserDashboard;