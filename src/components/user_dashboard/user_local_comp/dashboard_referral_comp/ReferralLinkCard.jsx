import { useEffect, useState } from "react";

const ReferralLinkCard = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/user/me")
      .then((res) => res.json())
      .then((data) => setUsername(data.username))
      .catch((err) => console.error(err));
  }, []);

  const referralLink = `https://reevadoo.com/ref/${username}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border flex items-center justify-between">
      <div>
        <h2 className="font-semibold text-lg">Your Referral Link</h2>
        <p className="text-gray-500 text-sm">
          {username ? referralLink : "Loading..."}
        </p>
      </div>
      <button
        onClick={copyLink}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Copy Link
      </button>
    </div>
  );
};

export default ReferralLinkCard;