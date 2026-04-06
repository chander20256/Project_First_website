const userData = [
  { date: "Mon", new: 45, active: 320 },
  { date: "Tue", new: 52, active: 340 },
  { date: "Wed", new: 48, active: 335 },
  { date: "Thu", new: 61, active: 360 },
  { date: "Fri", new: 55, active: 350 },
  { date: "Sat", new: 38, active: 290 },
  { date: "Sun", new: 42, active: 280 },
];

const UserReports = () => {
  // Simple bar chart representation using div heights
  const maxActive = Math.max(...userData.map(d => d.active));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">User Activity (Last 7 Days)</h2>
      <div className="flex items-end justify-between h-40 space-x-2">
        {userData.map((day) => (
          <div key={day.date} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-indigo-500 rounded-t"
              style={{ height: `${(day.active / maxActive) * 100}%` }}
            ></div>
            <span className="text-xs mt-2">{day.date}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>New Users: {userData.reduce((acc, d) => acc + d.new, 0)}</span>
        <span>Avg. Active: {Math.round(userData.reduce((acc, d) => acc + d.active, 0) / userData.length)}</span>
      </div>
    </div>
  );
};

export default UserReports;