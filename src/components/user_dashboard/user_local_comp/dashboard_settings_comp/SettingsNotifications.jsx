const SettingsNotifications = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-3">
      <h2 className="text-xl font-semibold">Notifications</h2>

      <label className="flex items-center gap-2">
        <input type="checkbox" />
        Email Notifications
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" />
        Task Updates
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" />
        Reward Alerts
      </label>
    </div>
  );
};

export default SettingsNotifications;
