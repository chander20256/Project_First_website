const ReferralsGrid = () => {
  const referrals = [
    {
      id: 1,
      name: "FriendOne",
      joined: "2026-03-01",
      status: "Active",
      earnings: "50 tokens",
    },
    {
      id: 2,
      name: "GamerTwo",
      joined: "2026-03-02",
      status: "Active",
      earnings: "40 tokens",
    },
    {
      id: 3,
      name: "PlayerThree",
      joined: "2026-03-03",
      status: "Pending",
      earnings: "0 tokens",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Joined On</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Earnings</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-6 font-medium">{r.name}</td>
              <td className="py-3 px-6">{r.joined}</td>
              <td className="py-3 px-6">{r.status}</td>
              <td className="py-3 px-6">{r.earnings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReferralsGrid;
