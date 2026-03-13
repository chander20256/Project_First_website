const FF = "'Arial Black','Helvetica Neue',Arial,sans-serif";
const ORANGE = "#FF6B00";

const WalletHeader = ({ userName = "Alex Johnson" }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
    <div style={{ paddingLeft: "20px", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: "4px", bottom: "4px", width: "6px", background: ORANGE }} />
      <h1 style={{ margin: 0, color: "#000", fontSize: "42px", fontWeight: 900, letterSpacing: "-.03em", lineHeight: 1, textTransform: "uppercase", fontFamily: FF }}>
        MY <span style={{ color: ORANGE }}>WALLET</span>
      </h1>
      <p style={{ margin: "6px 0 0", color: "#aaa", fontSize: "10px", fontWeight: 900, letterSpacing: ".22em", textTransform: "uppercase", fontFamily: FF }}>
        MANAGE YOUR EARNINGS &amp; WITHDRAWALS
      </p>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ textAlign: "right" }}>
        <p style={{ margin: 0, color: "#000", fontSize: "13px", fontWeight: 900, letterSpacing: ".05em", textTransform: "uppercase", fontFamily: FF }}>{userName}</p>
        <p style={{ margin: "2px 0 0", color: "#aaa", fontSize: "10px", letterSpacing: ".1em", fontFamily: FF }}>PREMIUM MEMBER</p>
      </div>
      <div style={{ width: "44px", height: "44px", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ color: ORANGE, fontFamily: FF, fontWeight: 900, fontSize: "16px" }}>
          {userName.split(" ").map(n => n[0]).join("")}
        </span>
      </div>
    </div>
  </div>
);

export default WalletHeader;