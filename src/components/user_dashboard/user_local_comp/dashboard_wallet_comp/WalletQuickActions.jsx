import { useState } from "react";

const actions = [
  { icon: "📊", label: "Earnings Report",  desc: "View full report"    },
  { icon: "📧", label: "Payment Settings", desc: "Manage payouts"      },
  { icon: "📱", label: "Mobile Money",     desc: "Link mobile wallet"  },
  { icon: "⚙️", label: "Support",          desc: "Get help"            },
];

const ActionCard = ({ icon, label, desc }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#FFF0E6" : "#fff",
        border: `1.5px solid ${hov ? "#FF6B00" : "#eee"}`,
        borderRadius: "12px", padding: "16px",
        display: "flex", flexDirection: "column",
        alignItems: "flex-start", gap: "8px",
        cursor: "pointer", transition: "all 0.15s",
        fontFamily: "'DM Sans', sans-serif",
        textAlign: "left", outline: "none",
        width: "100%",
      }}
    >
      <span style={{ fontSize: "22px" }}>{icon}</span>
      <div>
        <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: hov ? "#FF6B00" : "#000", transition: "color 0.15s" }}>
          {label}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#aaa" }}>
          {desc}
        </p>
      </div>
    </button>
  );
};

const WalletQuickActions = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .wallet-actions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        @media (max-width: 640px) {
          .wallet-actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
      <div style={{ fontFamily: "'DM Sans', sans-serif", marginTop: "16px" }}>
        <h3 style={{ margin: "0 0 12px", fontSize: "15px", fontWeight: 700, color: "#000" }}>
          Quick Actions
        </h3>
        <div className="wallet-actions-grid">
          {actions.map((a, i) => (
            <ActionCard key={i} icon={a.icon} label={a.label} desc={a.desc} />
          ))}
        </div>
      </div>
    </>
  );
};

export default WalletQuickActions;