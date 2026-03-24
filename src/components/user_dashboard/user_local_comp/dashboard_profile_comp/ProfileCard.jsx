import React, { useState, useEffect } from "react";

const ProfileCard = ({ onEditProfile }) => {
  const [username, setUsername] = useState("User");
  const [email, setEmail] = useState("user@gmail.com");
  const [avatar, setAvatar] = useState(null);
  const [initial, setInitial] = useState("U");
  const [level, setLevel] = useState(5);
  const [location, setLocation] = useState("India");

  useEffect(() => {
    if (!document.getElementById("profile-fonts")) {
      const link = document.createElement("link");
      link.id = "profile-fonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700;900&display=swap";
      document.head.appendChild(link);
    }

    const loadData = () => {
      try {
        const storedAvatar = localStorage.getItem("userAvatar");
        if (storedAvatar) setAvatar(storedAvatar);

        const stored = localStorage.getItem("user");
        if (stored) {
          const user = JSON.parse(stored);
          setUsername(user.username || "User");
          setEmail(user.email || "user@gmail.com");
          setLevel(user.level || 5);
          setLocation(user.location || "India");
          setInitial((user.username || "U").charAt(0).toUpperCase());
        }
      } catch (e) {}
    };

    loadData();

    const handleAvatarUpdate = (e) => {
      setAvatar(e.detail.avatar);
    };
    const handleProfileUpdate = (e) => {
      const { username: u, location: l } = e.detail || {};
      if (u) { setUsername(u); setInitial(u.charAt(0).toUpperCase()); }
      if (l) setLocation(l);
    };

    window.addEventListener("avatarUpdated", handleAvatarUpdate);
    window.addEventListener("profileUpdated", handleProfileUpdate);
    return () => {
      window.removeEventListener("avatarUpdated", handleAvatarUpdate);
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, []);

  const maskedEmail = email.length > 4
    ? email.charAt(0) + email.charAt(1) + email.charAt(2) + "****" + email.slice(email.indexOf("@"))
    : email;

  return (
    <>
      <style>{`
        .pc-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 32px 28px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          min-width: 220px;
        }
        .pc-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 90px;
          background: linear-gradient(135deg, rgba(255,107,0,0.08), rgba(255,140,0,0.04));
          border-radius: 20px 20px 60% 60%;
        }
        .pc-avatar-wrap {
          position: relative;
          width: 100px;
          height: 100px;
          margin-bottom: 16px;
        }
        .pc-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 3.5px solid #FF6B00;
          overflow: hidden;
          background: linear-gradient(135deg, #FF6B00, #FF8C00);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(255,107,0,0.22);
        }
        .pc-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .pc-avatar-initial {
          color: #fff;
          font-weight: 700;
          font-size: 2.2rem;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 2px;
        }
        .pc-edit-badge {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #FF6B00;
          border: 2.5px solid #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s;
          box-shadow: 0 2px 8px rgba(255,107,0,0.35);
        }
        .pc-edit-badge:hover { transform: scale(1.12); box-shadow: 0 4px 14px rgba(255,107,0,0.45); }
        .pc-username {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 0.06em;
          color: #0a0a0a;
          margin: 0 0 4px;
          line-height: 1;
        }
        .pc-level-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #fff8f0;
          border: 1.5px solid #ffd4a8;
          border-radius: 99px;
          padding: 4px 12px;
          margin-bottom: 20px;
        }
        .pc-level-text {
          font-size: 0.75rem;
          font-weight: 700;
          color: #FF6B00;
          letter-spacing: 0.04em;
        }
        .pc-edit-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: none;
          border: 1.8px solid #e8e8e8;
          border-radius: 10px;
          padding: 10px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem;
          font-weight: 700;
          color: #0a0a0a;
          cursor: pointer;
          transition: border-color 0.18s, background 0.18s, transform 0.15s;
          letter-spacing: 0.02em;
          margin-bottom: 20px;
        }
        .pc-edit-btn:hover {
          border-color: #FF6B00;
          background: #fff8f0;
          color: #FF6B00;
          transform: translateY(-1px);
        }
        .pc-divider {
          width: 100%;
          height: 1px;
          background: #f4f4f4;
          margin-bottom: 18px;
        }
        .pc-info-row {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .pc-info-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #f8f8f8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .pc-info-text {
          font-size: 0.82rem;
          color: #555;
          font-weight: 500;
        }
        .pc-watermark {
          position: absolute;
          bottom: -18px;
          right: -18px;
          opacity: 0.04;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 7rem;
          color: #FF6B00;
          pointer-events: none;
          line-height: 1;
          user-select: none;
        }
      `}</style>

      <div className="pc-card">
        <div className="pc-avatar-wrap">
          <div className="pc-avatar">
            {avatar
              ? <img src={avatar} alt="avatar" />
              : <span className="pc-avatar-initial">{initial}</span>
            }
          </div>
          <div className="pc-edit-badge" onClick={onEditProfile} title="Edit Avatar">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
        </div>

        <h2 className="pc-username">{username}</h2>

        <div className="pc-level-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#FF6B00">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="pc-level-text">Level {level}</span>
        </div>

        <button className="pc-edit-btn" onClick={onEditProfile}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit Profile
        </button>

        <div className="pc-divider" />

        <div className="pc-info-row">
          <div className="pc-info-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
          </div>
          <span className="pc-info-text">{maskedEmail}</span>
        </div>

        <div className="pc-info-row">
          <div className="pc-info-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <span className="pc-info-text">{location}</span>
        </div>

        <div className="pc-watermark">P</div>
      </div>
    </>
  );
};

export default ProfileCard;