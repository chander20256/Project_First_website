import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeRight = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "User",
    initial: "U",
    avatar: null,
    memberSince: "",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      const avatar = localStorage.getItem("userAvatar") || null;
      if (stored) {
        const user = JSON.parse(stored);
        setUserData({
          username: user.username || "User",
          initial: (user.username || "U").charAt(0).toUpperCase(),
          avatar,
          memberSince: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : "N/A",
        });
      }
    } catch (e) {}

    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.user) {
          const avatar =
            data.user.avatar || localStorage.getItem("userAvatar") || null;
          setUserData({
            username: data.user.username || "User",
            initial: (data.user.username || "U").charAt(0).toUpperCase(),
            avatar,
            memberSince: data.user.createdAt
              ? new Date(data.user.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : "N/A",
          });
          localStorage.setItem("user", JSON.stringify(data.user));
          if (data.user.avatar) {
            localStorage.setItem("userAvatar", data.user.avatar);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchMe();

    const handleAvatarUpdate = (e) => {
      setUserData((prev) => ({ ...prev, avatar: e.detail.avatar }));
    };
    window.addEventListener("avatarUpdated", handleAvatarUpdate);
    return () => window.removeEventListener("avatarUpdated", handleAvatarUpdate);
  }, []);

  return (
    <div
      className="flex flex-col sm:flex-row md:flex-row items-center gap-6 md:gap-10 w-full text-center md:text-left"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Avatar Section */}
      <div className="relative flex-shrink-0">
        <div
          className="flex items-center justify-center rounded-full overflow-hidden"
          style={{
            width: "clamp(120px, 15vw, 180px)",
            height: "clamp(120px, 15vw, 180px)",
            border: "4px solid #FF6B00",
            boxShadow: "0 8px 32px rgba(255,107,0,0.15)",
            background: userData.avatar
              ? "transparent"
              : "linear-gradient(135deg, #FF6B00, #FF8C00)",
          }}
        >
          {userData.avatar ? (
            <img
              src={userData.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span 
              style={{ 
                color: "#fff", 
                fontSize: "clamp(3rem, 6vw, 4.5rem)", 
                fontWeight: 800 
              }}
            >
              {userData.initial}
            </span>
          )}
        </div>

        {/* Online Status Signal */}
        <div
          className="absolute bottom-1 right-1 md:bottom-2 md:right-2 rounded-full ring-4 ring-white"
          style={{
            width: "clamp(16px, 2.5vw, 22px)",
            height: "clamp(16px, 2.5vw, 22px)",
            background: "#22c55e",
          }}
        />
      </div>

      {/* User Info & Actions */}
      <div className="flex flex-col gap-1 items-center md:items-start">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af] hidden md:block">
          Your Profile
        </h4>
        <h3
          className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight"
          style={{ color: "#0a0a0a" }}
        >
          {userData.username}
        </h3>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-100">
            Active Now
          </span>
          <p className="text-xs text-[#9ca3af]">
            Joined {userData.memberSince}
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/profile")}
          className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300"
          style={{
            background: "rgba(255,107,0,0.06)",
            border: "1px solid rgba(255,107,0,0.15)",
            color: "#FF6B00",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FF6B00";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,107,0,0.06)";
            e.currentTarget.style.color = "#FF6B00";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Account Settings
        </button>
      </div>
    </div>


  );
};

export default WelcomeRight;