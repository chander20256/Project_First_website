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
      className="flex items-center gap-10 w-full h-full"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div
          className="flex items-center justify-center rounded-full overflow-hidden"
          style={{
            width: 220,
            height: 220,
            border: "5px solid #FF6B00",
            boxShadow:
              "0 0 0 10px rgba(255,107,0,0.08), 0 16px 48px rgba(255,107,0,0.25)",
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
            <span style={{ color: "#fff", fontSize: "5.5rem", fontWeight: 700 }}>
              {userData.initial}
            </span>
          )}
        </div>

        {/* Online dot */}
        <div
          className="absolute bottom-3 right-3 rounded-full"
          style={{
            width: 28,
            height: 28,
            background: "#22c55e",
            border: "4px solid #ffffff",
          }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4 flex-1">

        {/* Name */}
        <h3
          style={{
            fontSize: "3rem",
            fontWeight: 800,
            color: "#0a0a0a",
            lineHeight: 1.1,
          }}
        >
          {userData.username}
        </h3>

        {/* Member since */}
        <p style={{ fontSize: "1.25rem", color: "#9ca3af" }}>
          🗓 Member since {userData.memberSince}
        </p>

        {/* Edit profile button */}
        <button
          onClick={() => navigate("/dashboard/profile")}
          className="flex items-center gap-2 w-fit mt-2 rounded-xl font-semibold transition-all duration-200"
          style={{
            padding: "14px 32px",
            fontSize: "1rem",
            background: "rgba(255,107,0,0.08)",
            border: "1px solid rgba(255,107,0,0.25)",
            color: "#FF6B00",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FF6B00";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,107,0,0.08)";
            e.currentTarget.style.color = "#FF6B00";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default WelcomeRight;