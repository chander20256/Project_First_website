const ReferralLinkCard = () => {
  const referralLink = "https://reevadoo.com/ref/YourUsername";

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border flex items-center justify-between">
      <div>
        <h2 className="font-semibold text-lg">Your Referral Link</h2>
        <p className="text-gray-500 text-sm">{referralLink}</p>
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
