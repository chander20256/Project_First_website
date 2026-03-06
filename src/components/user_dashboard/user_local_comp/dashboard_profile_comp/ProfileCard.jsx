const ProfileCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-6">
      <img
        src="https://i.pravatar.cc/100"
        alt="profile"
        className="w-20 h-20 rounded-full"
      />

      <div>
        <h2 className="text-xl font-semibold">Suraj Kumar</h2>
        <p className="text-gray-500">suraj@email.com</p>
        <p className="text-sm text-gray-400 mt-1">Member since 2025</p>
      </div>
    </div>
  );
};

export default ProfileCard;
