import { useEffect, useState } from "react";

const TopReferrerHighlight = () => {
  const [topReferrer, setTopReferrer] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/top-referrer")
      .then((res) => res.json())
      .then((data) => setTopReferrer(data))
      .catch((err) => console.error(err));
  }, []);

  if (!topReferrer) {
    return (
      <div className="bg-green-50 p-6 rounded-xl shadow text-center">
        No top referrer yet
      </div>
    );
  }

  return (
    <div className="bg-green-50 p-6 rounded-xl shadow flex items-center space-x-6">
      <img
        src={topReferrer.avatar}
        alt={topReferrer.name}
        className="w-20 h-20 rounded-full border-2 border-green-400"
      />
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          {topReferrer.name}
        </h2>
        <p className="text-gray-600">
          Referrals: {topReferrer.referrals}
        </p>
        <p className="text-gray-600">
          Tokens Earned: {topReferrer.earnings}
        </p>
      </div>
    </div>
  );
};

export default TopReferrerHighlight;