import { useState, useEffect } from "react";
import axios from "axios";

const FF = "'Arial Black','Helvetica Neue',Arial,sans-serif";
const ORANGE = "#FF6B00";

const TxRow = ({ t, isLast }) => {
  const [hov, setHov] = useState(false);
  const isCredit = t.type === "credit";
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 22px", borderBottom: isLast ? "none" : "1px solid #f0f0f0", background: hov ? "#fff8f3" : "transparent", transition: "background .15s", cursor: "default" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "34px", height: "34px", background: isCredit ? "#000" : ORANGE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontSize: "15px", fontWeight: 900, fontFamily: FF }}>{isCredit ? "↑" : "↓"}</span>
        </div>
        <div>
          <p style={{ margin: 0, color: "#000", fontSize: "12px", fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", fontFamily: FF }}>{t.description}</p>
          <p style={{ margin: "3px 0 0", color: "#bbb", fontSize: "10px", letterSpacing: ".08em", fontFamily: FF }}>{new Date(t.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <span style={{ color: isCredit ? "#000" : ORANGE, fontSize: "17px", fontWeight: 900, letterSpacing: "-.02em", fontFamily: FF }}>
        {isCredit ? "+" : "-"}${t.amount}
      </span>
    </div>
  );
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/wallet/transactions/${user.id}`
      );
      setTransactions(res.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    const updateHandler = () => {
      fetchTransactions();
    };
    window.addEventListener("walletUpdated", updateHandler);
    return () => {
      window.removeEventListener("walletUpdated", updateHandler);
    };
  }, []);

  return (
    <div style={{ background: "#fff", border: "3px solid #000", overflow: "hidden" }}>
      <div style={{ background: "#000", padding: "14px 22px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "9px", height: "9px", background: ORANGE, borderRadius: "50%", flexShrink: 0 }} />
        <span style={{ color: "#fff", fontSize: "12px", fontWeight: 900, letterSpacing: ".2em", textTransform: "uppercase", fontFamily: FF }}>TRANSACTION HISTORY</span>
      </div>

      {transactions.length === 0
        ? <div style={{ padding: "40px", textAlign: "center", color: "#ccc", fontSize: "11px", letterSpacing: ".15em", textTransform: "uppercase", fontFamily: FF }}>NO TRANSACTIONS YET</div>
        : transactions.map((t, i) => <TxRow key={t._id} t={t} isLast={i === transactions.length - 1} />)
      }

      <div style={{ background: ORANGE, height: "4px" }} />
    </div>
  );
};

export default TransactionHistory;