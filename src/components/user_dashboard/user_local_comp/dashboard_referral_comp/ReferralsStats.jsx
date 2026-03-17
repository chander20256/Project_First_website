import { useEffect, useState } from "react";

const ReferralsStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/referrals/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) {
    return <p className="text-center">Loading...</p>;
  }

  const statsData = [
    { title: "Friends Referred", value: stats.totalReferrals },
    { title: "Tokens Earned", value: stats.totalEarnings },
    { title: "Active Referrals", value: stats.activeReferrals },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statsData.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-xl shadow border flex flex-col items-center"
        >
          <span className="text-gray-500">{stat.title}</span>
          <span className="text-2xl font-bold text-gray-800">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ReferralsStats;