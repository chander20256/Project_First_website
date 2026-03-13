import { useState } from "react";

const FF = "'Arial Black','Helvetica Neue',Arial,sans-serif";
const ORANGE = "#FF6B00";

const WithdrawForm = () => {
  const [balance, setBalance] = useState(245.75);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [focused, setFocused] = useState(false);
  const [hovSubmit, setHovSubmit] = useState(false);
  const [method, setMethod] = useState("PayPal");

  const handleWithdraw = (e) => {
    e.preventDefault();

    const amount = parseFloat(withdrawAmount);

    if (amount > 0 && amount <= balance) {
      setBalance(balance - amount);
      alert(`Withdrawal of $${amount} requested`);
      setWithdrawAmount("");
    } else {
      alert("Invalid amount");
    }
  };

  const methods = ["PayPal", "Bank Transfer", "Crypto"];

  return (
    <div style={{ background: "#fff", border: "3px solid #000", overflow: "hidden" }}>
      {/* Header */}
      <div style={{
        background: "#000", padding: "14px 22px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          color: "#fff", fontSize: "12px", fontWeight: 900,
          letterSpacing: ".2em", textTransform: "uppercase", fontFamily: FF,
        }}>
          WITHDRAW FUNDS
        </span>
        <span style={{
          background: ORANGE, color: "#fff", fontSize: "9px",
          fontWeight: 900, padding: "3px 8px", letterSpacing: ".1em", fontFamily: FF,
        }}>
          MIN $10
        </span>
      </div>

      <form onSubmit={handleWithdraw} style={{ padding: "22px" }}>
        {/* Amount */}
        <label style={{
          display: "block", color: "#aaa", fontSize: "9px", fontWeight: 900,
          letterSpacing: ".22em", textTransform: "uppercase", marginBottom: "7px", fontFamily: FF,
        }}>
          AMOUNT (USD)
        </label>
        <div style={{
          display: "flex", alignItems: "center",
          border: `2px solid ${focused ? ORANGE : "#000"}`,
          marginBottom: "14px", transition: "border-color .15s",
        }}>
          <span style={{
            padding: "0 12px", color: ORANGE, fontSize: "17px",
            fontWeight: 900, borderRight: "2px solid #000", fontFamily: FF,
          }}>
            $
          </span>
          <input
            type="number"
            placeholder="0.00"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required
            style={{
              flex: 1, border: "none", outline: "none", fontFamily: FF,
              fontSize: "18px", fontWeight: 900, padding: "12px 10px",
              color: "#000", background: "transparent", letterSpacing: "-.02em",
            }}
          />
        </div>

        {/* Method */}
        <label style={{
          display: "block", color: "#aaa", fontSize: "9px", fontWeight: 900,
          letterSpacing: ".22em", textTransform: "uppercase", marginBottom: "7px", fontFamily: FF,
        }}>
          PAYMENT METHOD
        </label>
        <div style={{ display: "flex", gap: "4px", marginBottom: "14px" }}>
          {methods.map((m) => {
            const sel = method === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                style={{
                  flex: 1, padding: "9px 4px",
                  background: sel ? ORANGE : "#fff",
                  color: sel ? "#fff" : "#000",
                  border: `2px solid ${sel ? ORANGE : "#000"}`,
                  fontSize: "8px", fontWeight: 900, letterSpacing: ".1em",
                  textTransform: "uppercase", cursor: "pointer",
                  fontFamily: FF, transition: "all .15s", outline: "none",
                }}
              >
                {m}
              </button>
            );
          })}
        </div>

        {/* Available balance row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "#f5f5f5", border: "1px solid #ddd",
          padding: "9px 12px", marginBottom: "14px",
        }}>
          <span style={{
            color: "#aaa", fontSize: "9px", fontWeight: 700,
            letterSpacing: ".15em", textTransform: "uppercase", fontFamily: FF,
          }}>
            AVAILABLE
          </span>
          <span style={{ color: "#000", fontSize: "13px", fontWeight: 900, letterSpacing: "-.02em", fontFamily: FF }}>
            ${balance.toFixed(2)}
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          style={{
            width: "100%", cursor: "pointer", fontFamily: FF, fontWeight: 900,
            letterSpacing: ".18em", textTransform: "uppercase",
            fontSize: "11px", outline: "none", transition: "all .15s",
            padding: "15px", border: `3px solid ${ORANGE}`,
            background: hovSubmit ? "#000" : ORANGE,
            color: "#fff",
            borderColor: hovSubmit ? "#000" : ORANGE,
          }}
          onMouseEnter={() => setHovSubmit(true)}
          onMouseLeave={() => setHovSubmit(false)}
        >
          REQUEST WITHDRAWAL →
        </button>
      </form>
    </div>
  );
};

export default WithdrawForm;