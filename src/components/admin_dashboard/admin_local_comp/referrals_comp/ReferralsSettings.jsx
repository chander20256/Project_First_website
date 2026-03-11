import { useState } from "react";

const ReferralsSettings = () => {
  const [settings, setSettings] = useState({
    signupBonus: 5.0,
    referrerBonus: 2.5,
    refereeBonus: 2.5,
    minPayout: 10.0,
    autoPayout: true,
    payoutMethod: "wallet",
  });

  const handleSave = () => {
    // API call to save settings
    console.log("Saving settings:", settings);
    alert("Settings saved (demo)");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Referral Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Signup Bonus ($)</label>
            <input
              type="number"
              step="0.1"
              value={settings.signupBonus}
              onChange={(e) => setSettings({ ...settings, signupBonus: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Referrer Bonus ($)</label>
            <input
              type="number"
              step="0.1"
              value={settings.referrerBonus}
              onChange={(e) => setSettings({ ...settings, referrerBonus: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Referee Bonus ($)</label>
            <input
              type="number"
              step="0.1"
              value={settings.refereeBonus}
              onChange={(e) => setSettings({ ...settings, refereeBonus: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Payout ($)</label>
            <input
              type="number"
              step="0.1"
              value={settings.minPayout}
              onChange={(e) => setSettings({ ...settings, minPayout: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payout Method</label>
            <select
              value={settings.payoutMethod}
              onChange={(e) => setSettings({ ...settings, payoutMethod: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg bg-white"
            >
              <option value="wallet">Wallet Balance</option>
              <option value="paypal">PayPal</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoPayout"
              checked={settings.autoPayout}
              onChange={(e) => setSettings({ ...settings, autoPayout: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="autoPayout" className="ml-2 block text-sm text-gray-900">
              Enable automatic payouts when threshold reached
            </label>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default ReferralsSettings;