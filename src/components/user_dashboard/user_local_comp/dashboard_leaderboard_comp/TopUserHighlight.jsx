const TopUserHighlight = () => {
  const topUser = {
    username: "PlayerOne",
    points: 980,
    tasks: 15,
    surveys: 5,
    avatar: "https://i.pravatar.cc/100?img=1",
  };

  return (
    <div className="bg-yellow-50 p-6 rounded-xl shadow flex items-center space-x-6">
      <img
        src={topUser.avatar}
        alt={topUser.username}
        className="w-20 h-20 rounded-full border-2 border-yellow-400"
      />
      <div>
        <h2 className="text-xl font-bold text-gray-800">{topUser.username}</h2>
        <p className="text-gray-600">Points: {topUser.points}</p>
        <p className="text-gray-600">
          Tasks: {topUser.tasks} | Surveys: {topUser.surveys}
        </p>
      </div>
    </div>
  );
};

export default TopUserHighlight;
