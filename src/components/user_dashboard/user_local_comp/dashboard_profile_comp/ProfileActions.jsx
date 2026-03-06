const ProfileActions = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex gap-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Edit Profile
      </button>

      <button className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default ProfileActions;
