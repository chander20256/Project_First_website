import { useEffect, useState } from "react";
import axios from "axios";

const FF = "'Arial Black','Helvetica Neue',Arial,sans-serif";
const ORANGE = "#FF6B00";

const StatCard = ({ title, amount, color, bar, symbol }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{ background: "#fff", border: `2px solid ${hov ? ORANGE : "#000"}`, padding: "22px 18px", position: "relative", overflow: "hidden", transition: "border-color .15s", cursor: "default" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: bar }} />
      <div style={{ position: "absolute", top: "14px", right: "14px", color: ORANGE, fontSize: "10px", opacity: .6, fontFamily: FF }}>{symbol}</div>
      <p style={{ margin: "0 0 8px", color: "#aaa", fontSize: "9px", fontWeight: 900, letterSpacing: ".22em", textTransform: "uppercase", fontFamily: FF }}>{title}</p>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "2px" }}>
        <span style={{ color, fontSize: "13px", fontWeight: 900, marginTop: "5px", fontFamily: FF }}>$</span>
        <span style={{ color, fontSize: "34px", fontWeight: 900, lineHeight: 1, letterSpacing: "-.03em", fontFamily: FF }}>{amount.toFixed(2)}</span>
      </div>
    </div>
  );
};

const WalletStats = () => {
  const [stats, setStats] = useState({ earned: 0, withdrawn: 0, pending: 0 });

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/wallet/transactions"
      );
      const transactions = res.data;

      let earned = 0;
      let withdrawn = 0;
      let pending = 0;

      transactions.forEach((t) => {
        if (t.type === "credit") {
          earned += t.amount;
        }
        if (t.type === "debit" && t.status === "completed") {
          withdrawn += t.amount;
        }
        if (t.type === "debit" && t.status === "pending") {
          pending += t.amount;
        }
      });

      setStats({ earned, withdrawn, pending });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchStats();
    const updateHandler = () => {
      fetchStats();
    };
    window.addEventListener("walletUpdated", updateHandler);
    return () => {
      window.removeEventListener("walletUpdated", updateHandler);
    };
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "3px", marginBottom: "4px" }}>
      <StatCard title="TOTAL EARNED"    amount={stats.earned}    color="#000"   bar="#000"   symbol="▲" />
      <StatCard title="TOTAL WITHDRAWN" amount={stats.withdrawn} color={ORANGE} bar={ORANGE} symbol="▼" />
      <StatCard title="PENDING"         amount={stats.pending}   color="#000"   bar="#000"   symbol="◆" />
    </div>
  );
};

export default WalletStats;