import { useState } from "react";

const LeaderboardSettings = () => {
  const [autoResetDaily, setAutoResetDaily] = useState(true);
  const [autoResetWeekly, setAutoResetWeekly] = useState(true);
  const [autoResetMonthly, setAutoResetMonthly] = useState(true);
  const [dailyReward, setDailyReward] = useState(10);
  const [weeklyReward, setWeeklyReward] = useState(50);
  const [monthlyReward, setMonthlyReward] = useState(200);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Leaderboard Settings</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2">Auto Reset</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={autoResetDaily}
                onChange={(e) => setAutoResetDaily(e.target.checked)}
                className="rounded text-indigo-600"
              />
              <span className="ml-2 text-sm">Reset daily leaderboard every day at 00:00</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={autoResetWeekly}
                onChange={(e) => setAutoResetWeekly(e.target.checked)}
                className="rounded text-indigo-600"
              />
              <span className="ml-2 text-sm">Reset weekly leaderboard every Monday</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={autoResetMonthly}
                onChange={(e) => setAutoResetMonthly(e.target.checked)}
                className="rounded text-indigo-600"
              />
              <span className="ml-2 text-sm">Reset monthly leaderboard on 1st of month</span>
            </label>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2">Leader Rewards ($)</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm">Daily Leader</label>
              <input
                type="number"
                value={dailyReward}
                onChange={(e) => setDailyReward(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm">Weekly Leader</label>
              <input
                type="number"
                value={weeklyReward}
                onChange={(e) => setWeeklyReward(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm">Monthly Leader</label>
              <input
                type="number"
                value={monthlyReward}
                onChange={(e) => setMonthlyReward(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg"
                step="0.1"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default LeaderboardSettings;