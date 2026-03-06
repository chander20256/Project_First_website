const ProfileActivity = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

      <ul className="space-y-3 text-gray-600">
        <li>🎮 Played Spin Game (+$2)</li>
        <li>📝 Completed Survey (+$1.5)</li>
        <li>👥 Referred a friend (+$5)</li>
        <li>❓ Completed Quiz (+$1)</li>
      </ul>
    </div>
  );
};

export default ProfileActivity;
