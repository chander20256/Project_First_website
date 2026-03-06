const SettingsPreferences = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Preferences</h2>

      <select className="w-full border p-2 rounded">
        <option>Light Mode</option>
        <option>Dark Mode</option>
      </select>

      <select className="w-full border p-2 rounded">
        <option>English</option>
        <option>Hindi</option>
      </select>

      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Save Preferences
      </button>
    </div>
  );
};

export default SettingsPreferences;
