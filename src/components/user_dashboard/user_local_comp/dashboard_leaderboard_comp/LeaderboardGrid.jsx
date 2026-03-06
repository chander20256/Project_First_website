const LeaderboardGrid = () => {
  const players = [
    { rank: 1, username: "PlayerOne", points: 980, tasks: 15, surveys: 5 },
    { rank: 2, username: "GamerGirl", points: 870, tasks: 12, surveys: 7 },
    { rank: 3, username: "NoobMaster", points: 820, tasks: 10, surveys: 8 },
    { rank: 4, username: "ProPlayer", points: 750, tasks: 8, surveys: 6 },
    { rank: 5, username: "LuckyOne", points: 700, tasks: 9, surveys: 4 },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left">Rank</th>
            <th className="py-3 px-6 text-left">Username</th>
            <th className="py-3 px-6 text-left">Points</th>
            <th className="py-3 px-6 text-left">Tasks Completed</th>
            <th className="py-3 px-6 text-left">Surveys Completed</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.rank} className="border-b hover:bg-gray-50">
              <td className="py-3 px-6">{p.rank}</td>
              <td className="py-3 px-6 font-medium">{p.username}</td>
              <td className="py-3 px-6">{p.points}</td>
              <td className="py-3 px-6">{p.tasks}</td>
              <td className="py-3 px-6">{p.surveys}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardGrid;
