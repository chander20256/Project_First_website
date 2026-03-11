const DashboardHeader = () => {
  const adminName = "Admin User";

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {adminName}!
        </h1>
        <p className="text-gray-500 mt-1">
          Here's an overview of your admin panel.
        </p>
      </div>

      <p className="text-sm text-gray-400">
        {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default DashboardHeader;