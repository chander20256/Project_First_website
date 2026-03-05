import { useState } from "react";

const ORANGE = "#FF6B00";
const ORANGE_LIGHT = "#FF8C00";

const floatingParticles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: `${4 + Math.random() * 6}px`,
  delay: `${Math.random() * 4}s`,
  duration: `${3 + Math.random() * 4}s`,
}));

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [focused, setFocused] = useState(null);
  const [shake, setShake] = useState(false);
  const [successPulse, setSuccessPulse] = useState(false);

  const handleSubmit = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
    setSuccessPulse(true);
    setTimeout(() => setSuccessPulse(false), 800);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#faf8f5",
      fontFamily: "'Barlow Condensed', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Google Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes floatUp {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-60px) rotate(180deg); opacity: 0; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 0px 0px rgba(255,107,0,0.0); }
          50% { box-shadow: 0 0 18px 4px rgba(255,107,0,0.35); }
        }
        @keyframes lineExpand {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bgShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .particle {
          position: absolute;
          background: ${ORANGE};
          border-radius: 2px;
          animation: floatUp var(--dur) var(--delay) infinite ease-in-out;
          pointer-events: none;
        }

        .input-field {
          width: 100%;
          background: #fff;
          border: 2px solid #e8e0d8;
          border-radius: 10px;
          padding: 14px 18px;
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          color: #222;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-field:focus {
          border-color: ${ORANGE};
          box-shadow: 0 0 0 3px rgba(255,107,0,0.12);
        }
        .input-field::placeholder {
          color: #bbb;
        }

        .btn-primary {
          width: 100%;
          background: linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_LIGHT} 100%);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 16px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          position: relative;
          overflow: hidden;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255,107,0,0.45);
        }
        .btn-primary:active {
          transform: translateY(0px);
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .tab-btn {
          flex: 1;
          background: none;
          border: none;
          padding: 14px 0;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.2s;
          position: relative;
        }

        .success-pulse {
          animation: glow 0.8s ease-out;
        }
        .shake-anim {
          animation: shake 0.45s ease;
        }

        .card-animate {
          animation: slideIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .social-btn {
          flex: 1;
          background: #fff;
          border: 2px solid #e8e0d8;
          border-radius: 10px;
          padding: 11px 8px;
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #444;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: border-color 0.2s, background 0.2s;
        }
        .social-btn:hover {
          border-color: ${ORANGE};
          background: #fff8f3;
        }

        .geo-circle {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid rgba(255,107,0,0.12);
          pointer-events: none;
        }
      `}</style>

      {/* Background geometric circles */}
      <div className="geo-circle" style={{ width: 600, height: 600, top: -200, right: -200 }} />
      <div className="geo-circle" style={{ width: 400, height: 400, top: -100, right: -100 }} />
      <div className="geo-circle" style={{ width: 800, height: 800, bottom: -300, left: -300 }} />
      <div className="geo-circle" style={{ width: 500, height: 500, bottom: -150, left: -150 }} />

      {/* Floating particles */}
      {floatingParticles.map(p => (
        <div key={p.id} className="particle" style={{
          left: p.left, top: p.top,
          width: p.size, height: p.size,
          "--dur": p.duration,
          "--delay": p.delay,
        }} />
      ))}

      {/* Dot grid texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(255,107,0,0.12) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        pointerEvents: "none",
      }} />

      {/* Left branding panel (desktop) */}
      <div style={{
        display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "60px 52px",
        maxWidth: 420, flex: 1,
        position: "relative", zIndex: 2,
      }}>
        {/* Logo */}
        <div style={{ marginBottom: 40 }}>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900, fontSize: 36, letterSpacing: 2,
            color: "#111",
          }}>
            REVA<span style={{ color: ORANGE }}>DOO</span>
          </span>
        </div>

        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900, fontSize: 68, lineHeight: 1,
          color: "#111", letterSpacing: -1, marginBottom: 16,
        }}>
          <div style={{ color: ORANGE }}>GET PAID</div>
          <div>& GET</div>
          <div>REWARDED</div>
        </div>
        <div style={{
          width: 80, height: 4, borderRadius: 2,
          background: `linear-gradient(90deg, ${ORANGE}, transparent)`,
          marginBottom: 28,
        }} />
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 16, color: "#666", lineHeight: 1.6, marginBottom: 40,
        }}>
          REVADOO turns your everyday time into tangible gains. Browse hundreds of tasks across surveys, games, creative challenges, and more — then convert your Creds into real gift cards, cash, and premium rewards.
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 32 }}>
          {[
            { val: "2.4M+", label: "Active Users" },
            { val: "500+", label: "Daily Tasks" },
            { val: "$25", label: "Top Reward" },
          ].map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800, fontSize: 28, color: ORANGE,
              }}>{s.val}</div>
              <div style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 12, color: "#999", fontWeight: 500,
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Floating reward card */}
        <div style={{
          marginTop: 48, background: "#fff",
          borderRadius: 14, padding: "14px 20px",
          display: "flex", alignItems: "center", gap: 14,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          border: "1px solid #f0e8e0",
          maxWidth: 280,
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: 10,
            background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, flexShrink: 0,
          }}>⚡</div>
          <div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800, fontSize: 20, color: ORANGE,
            }}>+250 CREDS</div>
            <div style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 12, color: "#999",
            }}>Just Click & earned!</div>
          </div>
        </div>

        {/* Daily tasks widget */}
        <div style={{
          marginTop: 16, background: "#fff",
          borderRadius: 14, padding: "14px 20px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          border: "1px solid #f0e8e0",
          maxWidth: 280,
        }}>
          <div style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 10, fontWeight: 600, color: "#bbb",
            textTransform: "uppercase", letterSpacing: 2, marginBottom: 10,
          }}>Daily Tasks</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
            {[true, true, true, false, false, false, false].map((done, i) => (
              <div key={i} style={{
                width: 26, height: 26, borderRadius: 6,
                background: done ? ORANGE : "#f5f0ea",
                border: done ? "none" : "1px solid #e8e0d8",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: done ? "#fff" : "#ddd",
              }}>{done ? "✓" : ""}</div>
            ))}
          </div>
          <div style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 12, color: "#999",
          }}>7 Day Login Rewards</div>
        </div>
      </div>

      {/* Auth Card */}
      <div style={{
        width: "100%", maxWidth: 420, margin: "32px 24px",
        position: "relative", zIndex: 3,
      }}>
        <div
          className={`card-animate ${shake ? "shake-anim" : ""} ${successPulse ? "success-pulse" : ""}`}
          style={{
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,107,0,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Tab switcher */}
          <div style={{ display: "flex", borderBottom: "2px solid #f0e8e0" }}>
            {["login", "register"].map(tab => (
              <button
                key={tab}
                className="tab-btn"
                onClick={() => setMode(tab)}
                style={{ color: mode === tab ? ORANGE : "#bbb" }}
              >
                {tab === "login" ? "Sign In" : "Register"}
                {mode === tab && (
                  <div style={{
                    position: "absolute", bottom: -2, left: 0, right: 0,
                    height: 3, background: ORANGE, borderRadius: "2px 2px 0 0",
                    animation: "lineExpand 0.3s ease",
                  }} />
                )}
              </button>
            ))}
          </div>

          <div style={{ padding: "36px 36px 32px" }}>
            {/* Header */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: 32,
                color: "#111", letterSpacing: 0.5, marginBottom: 6,
              }}>
                {mode === "login" ? "Welcome Back" : "Start Earning Today"}
              </h2>
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 14, color: "#999",
              }}>
                {mode === "login"
                  ? "Sign in to your REVADOO account"
                  : "Create your free account and get 250 creds"}
              </p>
            </div>

            {/* Social buttons */}
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <button className="social-btn">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="social-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ flex: 1, height: 1, background: "#f0e8e0" }} />
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "#ccc" }}>
                or continue with email
              </span>
              <div style={{ flex: 1, height: 1, background: "#f0e8e0" }} />
            </div>

            {/* Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {mode === "register" && (
                <div>
                  <label style={{
                    display: "block", marginBottom: 6,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700, fontSize: 13, letterSpacing: 0.5,
                    color: "#888", textTransform: "uppercase",
                  }}>Username</label>
                  <input
                    className="input-field"
                    placeholder="Choose a username"
                    value={form.username}
                    onFocus={() => setFocused("username")}
                    onBlur={() => setFocused(null)}
                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  />
                </div>
              )}

              <div>
                <label style={{
                  display: "block", marginBottom: 6,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: 13, letterSpacing: 0.5,
                  color: "#888", textTransform: "uppercase",
                }}>Email</label>
                <input
                  className="input-field"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>

              <div>
                <label style={{
                  display: "block", marginBottom: 6,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: 13, letterSpacing: 0.5,
                  color: "#888", textTransform: "uppercase",
                }}>Password</label>
                <input
                  className="input-field"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                />
              </div>

              {mode === "register" && (
                <div>
                  <label style={{
                    display: "block", marginBottom: 6,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700, fontSize: 13, letterSpacing: 0.5,
                    color: "#888", textTransform: "uppercase",
                  }}>Confirm Password</label>
                  <input
                    className="input-field"
                    type="password"
                    placeholder="••••••••"
                    value={form.confirm}
                    onFocus={() => setFocused("confirm")}
                    onBlur={() => setFocused(null)}
                    onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                  />
                </div>
              )}

              {mode === "login" && (
                <div style={{ textAlign: "right", marginTop: -6 }}>
                  <a href="#" style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 13, color: ORANGE, textDecoration: "none", fontWeight: 600,
                  }}>Forgot password?</a>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <div style={{ marginTop: 24 }}>
              <button className="btn-primary" onClick={handleSubmit}>
                {mode === "login" ? " Sign In" : " Create Account & Earn"}
              </button>
            </div>

            {/* Bonus badge on register */}
            {mode === "register" && (
              <div style={{
                marginTop: 16, background: "#fff8f3",
                border: `1.5px dashed ${ORANGE}`,
                borderRadius: 10, padding: "10px 14px",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{ fontSize: 18 }}></span>
                <span style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 13, color: "#555",
                }}>
                  <strong style={{ color: ORANGE }}>+250 FREE CREDS</strong> added to your account on signup
                </span>
              </div>
            )}

            {/* Switch mode */}
            <p style={{
              marginTop: 22, textAlign: "center",
              fontFamily: "'Barlow', sans-serif",
              fontSize: 14, color: "#999",
            }}>
              {mode === "login" ? "New here? " : "Already have an account? "}
              <button
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                style={{
                  background: "none", border: "none",
                  color: ORANGE, fontWeight: 700, cursor: "pointer",
                  fontFamily: "'Barlow', sans-serif", fontSize: 14,
                  textDecoration: "underline",
                }}
              >
                {mode === "login" ? "Create account →" : "Sign in →"}
              </button>
            </p>
          </div>
        </div>

        {/* Footer trust line */}
        <p style={{
          textAlign: "center", marginTop: 18,
          fontFamily: "'Barlow', sans-serif",
          fontSize: 12, color: "#bbb",
        }}>
           Secure login · No spam · Cancel anytime
        </p>
      </div>
    </div>
  );
}
