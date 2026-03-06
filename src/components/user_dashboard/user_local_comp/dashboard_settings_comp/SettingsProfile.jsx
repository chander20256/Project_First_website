const SettingsProfile = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Profile Settings</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full border p-2 rounded"
      />

      <input
        type="email"
        placeholder="Email Address"
        className="w-full border p-2 rounded"
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </div>
  );
};

export default SettingsProfile;
