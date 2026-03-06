import { useState, useEffect } from "react";

// ─── Theme ───────────────────────────────────────────────────────────────────
const THEME = {
  bg: "#0A0A0A",
  white: "#FFFFFF",
  orange: "#FF6B00",
};

// ─── Circuit Lines ────────────────────────────────────────────────────────────
const CircuitLines = () => (
  <svg
    style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", opacity: 0.22, zIndex: 1,
    }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M 0 120 Q 60 120 80 140 L 240 140" stroke="#FF6B00" strokeWidth="1.3" fill="none" />
    <circle cx="240" cy="140" r="4.5" fill="#FF6B00" />
    <path d="M 0 190 L 110 190" stroke="#FF6B00" strokeWidth="1" fill="none" />
    <circle cx="116" cy="190" r="3.5" fill="none" stroke="#FF6B00" strokeWidth="1.2" />
    <path d="M 1200 100 L 1050 100 Q 1030 100 1020 118 L 1020 170" stroke="#FF6B00" strokeWidth="1.3" fill="none" />
    <circle cx="1020" cy="176" r="4.5" fill="#FF6B00" />
    <path d="M 1200 180 L 1110 180" stroke="#FF6B00" strokeWidth="1" fill="none" />
    <circle cx="1104" cy="180" r="3.5" fill="none" stroke="#FF6B00" strokeWidth="1.2" />
    <path d="M 40 700 L 40 780 Q 40 800 60 800 L 180 800" stroke="#FF6B00" strokeWidth="1" fill="none" />
    <circle cx="186" cy="800" r="3" fill="#FF6B00" />
    <path d="M 1200 720 L 1110 720 Q 1090 720 1080 705" stroke="#FF6B00" strokeWidth="1" fill="none" />
    <circle cx="1076" cy="701" r="3" fill="#FF6B00" />
  </svg>
);

// ─── Glow Background — starts from top: 0 ────────────────────────────────────
const GlowBackground = () => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
    {/* Primary burst from very top */}
    <div style={{
      position: "absolute",
      top: "-60px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "950px",
      height: "620px",
      background: "radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.60) 0%, rgba(255,107,0,0.25) 30%, rgba(255,107,0,0.07) 58%, transparent 78%)",
      filter: "blur(20px)",
    }} />
    {/* Wide soft halo */}
    <div style={{
      position: "absolute",
      top: "-100px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "1300px",
      height: "750px",
      background: "radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.22) 0%, transparent 58%)",
    }} />
    {/* Bottom-right accent */}
    <div style={{
      position: "absolute",
      bottom: "-80px", right: "8%",
      width: "420px", height: "420px",
      background: "radial-gradient(ellipse, rgba(255,107,0,0.16) 0%, transparent 65%)",
      filter: "blur(12px)",
    }} />
    {/* Left soft */}
    <div style={{
      position: "absolute",
      top: "35%", left: "-80px",
      width: "320px", height: "320px",
      background: "radial-gradient(ellipse, rgba(255,107,0,0.10) 0%, transparent 70%)",
    }} />
  </div>
);

// ─── Watermark — positioned at top 20%, high visibility ──────────────────────
const WatermarkText = () => (
  <div style={{
    position: "absolute",
    top: "20%",
    left: 0, right: 0,
    display: "flex",
    justifyContent: "center",
    pointerEvents: "none",
    userSelect: "none",
    zIndex: 0,
    overflow: "hidden",
  }}>
    <span style={{
      fontSize: "clamp(90px, 16vw, 195px)",
      fontFamily: "'Bebas Neue', 'Impact', sans-serif",
      letterSpacing: "0.1em",
      color: "transparent",
      WebkitTextStroke: "2.2px rgba(255,107,0,0.42)",
      textShadow: "0 0 90px rgba(255,107,0,0.15), 0 0 200px rgba(255,107,0,0.06)",
      whiteSpace: "nowrap",
    }}>
      CONTACT
    </span>
  </div>
);

// ─── Section Badge ────────────────────────────────────────────────────────────
const SectionBadge = ({ label }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
    <div style={{
      width: 32, height: 32, borderRadius: "50%",
      background: "rgba(255,107,0,0.15)",
      border: "1px solid rgba(255,107,0,0.48)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="#FF6B00" strokeWidth="2" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: THEME.white, letterSpacing: "0.06em" }}>
      {label}
    </span>
  </div>
);

// ─── Icons ────────────────────────────────────────────────────────────────────
const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="3" stroke="#FF6B00" strokeWidth="1.8" />
    <path d="M2 8l10 7 10-7" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M6.5 3h-2A1.5 1.5 0 003 4.5v1C3 13.508 10.492 21 18.5 21h1A1.5 1.5 0 0021 19.5v-2a1.5 1.5 0 00-1.5-1.5h-2.586a1.5 1.5 0 00-1.06.44l-1.122 1.12a11.066 11.066 0 01-4.292-4.292l1.12-1.121A1.5 1.5 0 0012 10.586V8A1.5 1.5 0 0010.5 6.5H8A1.5 1.5 0 006.5 5V4.5"
      stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" stroke="#FF6B00" strokeWidth="1.8" />
    <circle cx="12" cy="9" r="2.5" stroke="#FF6B00" strokeWidth="1.8" />
  </svg>
);

// ─── Contact Card ─────────────────────────────────────────────────────────────
const ContactCard = ({ icon, title, value, delay = 0 }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,107,0,0.07)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(255,107,0,0.5)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 14, padding: "16px 18px",
        display: "flex", alignItems: "center", gap: 14,
        cursor: "pointer",
        transition: "all 0.3s ease",
        animation: `fadeSlideUp 0.6s ease ${delay}s both`,
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
        background: hovered ? "#FF6B00" : "transparent",
        borderRadius: "14px 0 0 14px", transition: "background 0.3s ease",
      }} />
      <div style={{
        width: 42, height: 42, borderRadius: 10, flexShrink: 0,
        background: hovered ? "rgba(255,107,0,0.18)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${hovered ? "rgba(255,107,0,0.5)" : "rgba(255,255,255,0.08)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.3s ease",
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, marginBottom: 2, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: THEME.white }}>{title}</p>
        <p style={{ margin: 0, fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>{value}</p>
      </div>
      <div style={{
        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
        background: hovered ? "rgba(255,107,0,0.2)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${hovered ? "rgba(255,107,0,0.5)" : "rgba(255,255,255,0.08)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.3s ease",
      }}>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2 10L10 2M10 2H4M10 2V8" stroke={hovered ? "#FF6B00" : "rgba(255,255,255,0.5)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

// ─── Left Panel ───────────────────────────────────────────────────────────────
const LeftPanel = () => (
  <div style={{ flex: "0 0 46%", paddingRight: "36px" }}>
    <SectionBadge label="Contact" />
    <h1 style={{
      fontFamily: "'Bebas Neue', 'Impact', sans-serif",
      fontSize: "clamp(38px, 4.5vw, 58px)",
      color: THEME.white, letterSpacing: "0.02em",
      lineHeight: 1.05, margin: "0 0 12px",
      animation: "fadeSlideUp 0.5s ease 0.1s both",
    }}>
      Get in touch
    </h1>
    <p style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
      color: "rgba(255,255,255,0.45)", lineHeight: 1.7,
      margin: "0 0 32px", maxWidth: 290,
      animation: "fadeSlideUp 0.5s ease 0.2s both",
    }}>
      Have Questions or Any support ContactUs....
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
      <ContactCard icon={<EmailIcon />} title="Email us" value="Revadoo@gmail.com" delay={0.3} />
      <ContactCard icon={<PhoneIcon />} title="Call us" value="950112xxxx" delay={0.4} />
      <ContactCard icon={<LocationIcon />} title="Our location" value="Punjab,INDIA" delay={0.5} />
    </div>
  </div>
);

// ─── Form Field ───────────────────────────────────────────────────────────────
const FormField = ({ type = "text", placeholder, value, onChange, multiline = false, delay = 0 }) => {
  const [focused, setFocused] = useState(false);
  const shared = {
    width: "100%", boxSizing: "border-box",
    background: focused ? "rgba(255,107,0,0.05)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused ? "rgba(255,107,0,0.62)" : "rgba(255,255,255,0.09)"}`,
    borderRadius: 12,
    padding: multiline ? "14px 16px" : "13px 16px",
    color: THEME.white,
    fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
    outline: "none", resize: "none",
    transition: "all 0.3s ease",
    animation: `fadeSlideUp 0.5s ease ${delay}s both`,
    boxShadow: focused ? "0 0 0 3px rgba(255,107,0,0.12), inset 0 0 20px rgba(255,107,0,0.04)" : "none",
    display: "block",
  };
  return multiline
    ? <textarea placeholder={placeholder} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} rows={6} style={shared} />
    : <input type={type} placeholder={placeholder} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={shared} />;
};

// ─── Submit Button ────────────────────────────────────────────────────────────
const SubmitButton = ({ loading }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="submit" disabled={loading}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%", padding: "15px", borderRadius: 12,
        background: hovered && !loading ? "#FF6B00" : THEME.white,
        color: hovered && !loading ? THEME.white : "#0A0A0A",
        border: "none",
        fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "15px", letterSpacing: "0.04em",
        cursor: loading ? "not-allowed" : "pointer",
        transition: "all 0.3s ease",
        opacity: loading ? 0.7 : 1,
        animation: "fadeSlideUp 0.5s ease 0.7s both",
        boxShadow: hovered && !loading ? "0 6px 30px rgba(255,107,0,0.55)" : "none",
      }}
    >
      {loading
        ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="10" />
            </svg>
            Sending...
          </span>
        : "Submit"
      }
    </button>
  );
};

// ─── Contact Form ─────────────────────────────────────────────────────────────
const ContactForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    onSuccess();
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <div style={{
      flex: "0 0 48%",
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 20, padding: "26px",
      backdropFilter: "blur(20px)",
      animation: "fadeSlideUp 0.6s ease 0.15s both",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -50, right: -50, width: 200, height: 200,
        background: "radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        <FormField placeholder="Name" value={form.name} onChange={handleChange("name")} delay={0.3} />
        <FormField type="email" placeholder="Email" value={form.email} onChange={handleChange("email")} delay={0.4} />
        <FormField placeholder="Message" value={form.message} onChange={handleChange("message")} multiline delay={0.5} />
        <SubmitButton loading={loading} />
      </form>
    </div>
  );
};

// ─── Map Section ──────────────────────────────────────────────────────────────
const MapSection = () => {
  const [mapHovered, setMapHovered] = useState(false);
  const lat = 40.7233;
  const lon = -73.9971;
  const zoom = 16;

  return (
    <div style={{
      width: "100%", maxWidth: 1080,
      margin: "44px auto 0",
      animation: "fadeSlideUp 0.7s ease 0.65s both",
      position: "relative", zIndex: 10,
    }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "rgba(255,107,0,0.15)",
            border: "1px solid rgba(255,107,0,0.48)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" stroke="#FF6B00" strokeWidth="1.8" />
              <circle cx="12" cy="9" r="2.5" stroke="#FF6B00" strokeWidth="1.8" />
            </svg>
          </div>
          <div>
            <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "15px", color: THEME.white }}>
              Our Location
            </p>
            <p style={{ margin: 0, fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "rgba(255,107,0,0.8)", letterSpacing: "0.04em" }}>
              Crosby Street, SoHo · New York, US
            </p>
          </div>
        </div>

        {/* Live badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ position: "relative", width: 10, height: 10 }}>
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "#FF6B00", animation: "ping 1.6s ease-in-out infinite",
            }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#FF6B00" }} />
          </div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "rgba(255,255,255,0.38)", letterSpacing: "0.07em" }}>
            LIVE LOCATION
          </span>
        </div>
      </div>

      {/* Map card */}
      <div
        onMouseEnter={() => setMapHovered(true)}
        onMouseLeave={() => setMapHovered(false)}
        style={{
          position: "relative", borderRadius: 20, overflow: "hidden",
          border: `1px solid ${mapHovered ? "rgba(255,107,0,0.52)" : "rgba(255,255,255,0.08)"}`,
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: mapHovered
            ? "0 0 0 1px rgba(255,107,0,0.15), 0 20px 60px rgba(0,0,0,0.5)"
            : "0 10px 40px rgba(0,0,0,0.35)",
          height: 280,
        }}
      >
        {/* Map iframe — OpenStreetMap with dark/orange filter */}
        <iframe
          title="Location Map"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.009},${lat - 0.005},${lon + 0.009},${lat + 0.005}&layer=mapnik&marker=${lat},${lon}`}
          style={{
            width: "100%", height: "100%", border: "none", display: "block",
            filter: "invert(93%) hue-rotate(175deg) saturate(0.55) brightness(0.72)",
          }}
          loading="lazy"
        />

        {/* Orange overlay tint */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(135deg, rgba(255,107,0,0.07) 0%, transparent 55%)",
        }} />

        {/* Top-left coords chip */}
        <div style={{
          position: "absolute", top: 14, left: 14,
          background: "rgba(10,10,10,0.88)",
          border: "1px solid rgba(255,107,0,0.38)",
          borderRadius: 8, padding: "5px 11px",
          backdropFilter: "blur(12px)",
        }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "rgba(255,107,0,0.95)", letterSpacing: "0.06em" }}>
            40.7233° N · 73.9971° W
          </span>
        </div>

        {/* Top-right: distance chip */}
        <div style={{
          position: "absolute", top: 14, right: 14,
          background: "rgba(10,10,10,0.88)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 8, padding: "5px 11px",
          backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6B00", flexShrink: 0, animation: "ping 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.05em" }}>
            SoHo, Manhattan
          </span>
        </div>

        {/* Bottom-right: open maps link */}
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${zoom}/${lat}/${lon}`}
          target="_blank"
          rel="noreferrer"
          style={{
            position: "absolute", bottom: 14, right: 14,
            background: "rgba(10,10,10,0.88)",
            border: "1px solid rgba(255,107,0,0.38)",
            borderRadius: 8, padding: "7px 14px",
            backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", gap: 7,
            textDecoration: "none", cursor: "pointer",
          }}
        >
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
            Open in Maps
          </span>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="#FF6B00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* Bottom-left: address pill */}
        <div style={{
          position: "absolute", bottom: 14, left: 14,
          background: "rgba(10,10,10,0.88)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 8, padding: "6px 12px",
          backdropFilter: "blur(12px)",
        }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.55)" }}>
            📍 Crosby St, New York, NY 10012
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── Success Toast ────────────────────────────────────────────────────────────
const SuccessToast = ({ show }) => (
  <div style={{
    position: "fixed", bottom: 32, right: 32,
    background: "rgba(18,18,18,0.97)",
    border: "1px solid rgba(255,107,0,0.55)",
    borderRadius: 14, padding: "14px 22px",
    display: "flex", alignItems: "center", gap: 12,
    boxShadow: "0 8px 40px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,107,0,0.08)",
    transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
    transform: show ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
    opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none",
    zIndex: 9999,
  }}>
    <div style={{
      width: 34, height: 34, borderRadius: "50%",
      background: "rgba(255,107,0,0.2)",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M5 12l5 5L19 7" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div>
      <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "13px", color: "#fff" }}>Message sent!</p>
      <p style={{ margin: 0, fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>We'll get back to you soon.</p>
    </div>
  </div>
);

// ─── Root Page ────────────────────────────────────────────────────────────────
export default function Contactus() {
  const [mounted, setMounted] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0A0A; }
        ::placeholder { color: rgba(255,255,255,0.22); font-family: 'DM Sans', sans-serif; font-size: 14px; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes ping {
          0%   { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: rgba(255,107,0,0.35); border-radius: 2px; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: THEME.bg,
        position: "relative",
        padding: "60px 40px 80px",
        overflow: "hidden",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}>
        {/* BG layers — glow starts from top */}
        <GlowBackground />
        <CircuitLines />
        {/* Watermark at 20% from top */}
        <WatermarkText />

        {/* ── Contact hero row ── */}
        <div style={{
          position: "relative", zIndex: 10,
          width: "100%", maxWidth: 1080,
          margin: "0 auto",
          display: "flex", gap: "56px", alignItems: "flex-start",
        }}>
          <LeftPanel />
          <ContactForm onSuccess={handleSuccess} />
        </div>

        {/* ── Map below ── */}
        <MapSection />

        <SuccessToast show={success} />
      </div>
    </>
  );
}