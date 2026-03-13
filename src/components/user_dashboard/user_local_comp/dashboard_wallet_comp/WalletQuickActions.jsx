import { useState } from "react";

const FF = "'Arial Black','Helvetica Neue',Arial,sans-serif";
const ORANGE = "#FF6B00";

const QuickActionBtn = ({ icon, label, bar }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      style={{ background: hov ? ORANGE : "#fff", border: `2px solid ${hov ? ORANGE : "#000"}`, padding: "20px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer", transition: "all .15s", fontFamily: FF, outline: "none", position: "relative", overflow: "hidden" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: bar }} />
      <span style={{ fontSize: "22px" }}>{icon}</span>
      <span style={{ color: hov ? "#fff" : "#000", fontSize: "9px", fontWeight: 900, letterSpacing: ".12em", textAlign: "center", transition: "color .15s", fontFamily: FF }}>{label}</span>
    </button>
  );
};

const WalletQuickActions = () => {
  const actions = [
    { icon: "📊", label: "EARNINGS REPORT",  bar: ORANGE },
    { icon: "📧", label: "PAYMENT SETTINGS", bar: "#000" },
    { icon: "📱", label: "MOBILE MONEY",     bar: ORANGE },
    { icon: "⚙️", label: "SUPPORT",          bar: "#000" },
  ];

  return (
    <div style={{ marginTop: "4px" }}>
      <p style={{ margin: "0 0 12px", color: "#bbb", fontSize: "10px", fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", fontFamily: FF }}>— QUICK ACTIONS</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "3px" }}>
        {actions.map((a, i) => (
          <QuickActionBtn key={i} icon={a.icon} label={a.label} bar={a.bar} />
        ))}
      </div>
    </div>
  );
};

export default WalletQuickActions;