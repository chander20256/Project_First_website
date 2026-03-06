const TopReferrerHighlight = () => {
  const topReferrer = {
    name: "GamerQueen",
    referrals: 20,
    earnings: 800,
    avatar: "https://i.pravatar.cc/100?img=5",
  };

  return (
    <div className="bg-green-50 p-6 rounded-xl shadow flex items-center space-x-6">
      <img
        src={topReferrer.avatar}
        alt={topReferrer.name}
        className="w-20 h-20 rounded-full border-2 border-green-400"
      />
      <div>
        <h2 className="text-xl font-bold text-gray-800">{topReferrer.name}</h2>
        <p className="text-gray-600">Referrals: {topReferrer.referrals}</p>
        <p className="text-gray-600">Tokens Earned: {topReferrer.earnings}</p>
      </div>
    </div>
  );
};

export default TopReferrerHighlight;
