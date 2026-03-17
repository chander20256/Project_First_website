const WelcomeSection = () => {
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null;
  const username = user?.username || "User";
  const initial = username.trim().charAt(0).toUpperCase() || "U";

  return (
    <div className="mb-8 flex items-center gap-3">
      <div className="h-14 w-14 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold">
        {initial}
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-1">Welcome, {username}!</h1>
        <p className="text-gray-500">Ready to Unlock Your Earning Potential?</p>
      </div>
    </div>
  );
};

export default WelcomeSection;
