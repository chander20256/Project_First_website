const ProfileStats = () => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="text-gray-500">Total Earnings</h3>
        <p className="text-2xl font-bold">$128</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="text-gray-500">Tasks Completed</h3>
        <p className="text-2xl font-bold">54</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="text-gray-500">Referrals</h3>
        <p className="text-2xl font-bold">12</p>
      </div>
    </div>
  );
};

export default ProfileStats;
