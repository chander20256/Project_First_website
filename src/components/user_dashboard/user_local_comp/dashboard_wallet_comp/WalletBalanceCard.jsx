import { useState, useEffect } from "react";
import axios from "axios";

const FF = "'Arial Black','Helvetica Neue',Arial,sans-serif";
const ORANGE = "#FF6B00";

const Btn = ({ children, variant = "orange", onClick, style = {}, type = "button" }) => {
  const [hovered, setHovered] = useState(false);
  const base = {
    cursor: "pointer", fontFamily: FF, fontWeight: 900,
    letterSpacing: ".18em", textTransform: "uppercase",
    fontSize: "11px", outline: "none", transition: "all .15s",
    padding: "13px 28px", border: "3px solid",
  };
  const variants = {
    orange: { background: hovered ? "#000" : ORANGE, color: "#fff", borderColor: hovered ? "#000" : ORANGE },
    outline: { background: hovered ? "#000" : "transparent", color: hovered ? "#fff" : "#000", borderColor: "#000" },
  };
  return (
    <button type={type} onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {children}
    </button>
  );
};

const WalletBalanceCard = () => {
  const [balance, setBalance] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      fetchBalance();
    }
  }, []);

  const fetchBalance = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/wallet/balance/${user.id}`
      );
      setBalance(res.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const addMoney = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/wallet/add", {
        userId: user.id,
        amount: 100,
      });
      setBalance(res.data.balance);
      window.dispatchEvent(new Event("walletUpdated"));
    } catch (error) {
      console.error("Add money error:", error.response?.data || error);
    }
  };

  const withdrawMoney = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/wallet/withdraw", {
        userId: user.id,
        amount: 50,
      });
      setBalance(res.data.balance);
      window.dispatchEvent(new Event("walletUpdated"));
    } catch (error) {
      alert(error.response?.data?.message || "Withdraw failed");
    }
  };

  return (
    <div style={{ background: "#fff", border: "3px solid #000", position: "relative", overflow: "hidden", marginBottom: "4px" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "200px", height: "200px", background: ORANGE, clipPath: "polygon(100% 0,0 0,100% 100%)", opacity: .07 }} />
      <div style={{ background: ORANGE, height: "5px" }} />
      <div style={{ padding: "32px 36px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
        <div>
          <p style={{ margin: "0 0 8px", color: ORANGE, fontSize: "10px", fontWeight: 900, letterSpacing: ".25em", textTransform: "uppercase", fontFamily: FF }}>◆ AVAILABLE BALANCE</p>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "4px" }}>
            <span style={{ color: "#000", fontSize: "20px", fontWeight: 900, marginTop: "12px", fontFamily: FF }}>$</span>
            <span style={{ color: "#000", fontSize: "72px", fontWeight: 900, lineHeight: 1, letterSpacing: "-.04em", fontFamily: FF }}>{balance.toFixed(2)}</span>
          </div>
          <div style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "6px", background: "#f5f5f5", border: "1px solid #ddd", padding: "6px 14px" }}>
            <span style={{ color: ORANGE, fontSize: "10px" }}>≈</span>
            <span style={{ color: "#888", fontSize: "11px", fontWeight: 700, letterSpacing: ".1em", fontFamily: FF }}>{(balance * 82).toLocaleString()} INR</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Btn variant="orange" onClick={addMoney}>+ ADD MONEY</Btn>
          <Btn variant="outline" onClick={withdrawMoney}>WITHDRAW</Btn>
        </div>
      </div>
    </div>
  );
};

export default WalletBalanceCard;