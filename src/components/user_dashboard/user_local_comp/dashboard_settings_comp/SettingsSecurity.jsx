const SettingsSecurity = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Security</h2>

      <input
        type="password"
        placeholder="New Password"
        className="w-full border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full border p-2 rounded"
      />

      <button className="bg-red-500 text-white px-4 py-2 rounded">
        Update Password
      </button>
    </div>
  );
};

export default SettingsSecurity;
