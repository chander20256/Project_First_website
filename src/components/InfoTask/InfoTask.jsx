import { useState, useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    icon: "⚡",
    title: "Sign Up Free",
    short: "Create your account in 30 seconds",
    desc: "No credit card. No hidden fees. Just your email and you're inside the earning ecosystem instantly.",
    perks: ["Email or Google sign-in", "Zero upfront cost", "Instant dashboard access"],
  },
  {
    num: "02",
    icon: "🎯",
    title: "Browse Tasks",
    short: "Pick tasks that match your skills",
    desc: "Hundreds of micro-tasks updated daily — surveys, app testing, content reviews, referrals, and more.",
    perks: ["Filter by time & reward", "Rewards shown upfront", "New tasks every day"],
  },
  {
    num: "03",
    icon: "🔥",
    title: "Do The Work",
    short: "Complete tasks at your own pace",
    desc: "Work from anywhere, anytime. Submit your task and our AI engine verifies it in seconds — no waiting around.",
    perks: ["Work on mobile or desktop", "AI-powered verification", "No deadline pressure"],
  },
  {
    num: "04",
    icon: "💰",
    title: "Collect Rewards",
    short: "Cash out your way, same day",
    desc: "PayPal, crypto, gift cards, bank transfer — your rewards, your rules. No minimums, no delays.",
    perks: ["10+ payout methods", "No minimum threshold", "Same-day transfers"],
  },
];

const stats = [
  { value: "2.4M+", label: "Active Earners" },
  { value: "$18M+", label: "Paid Out" },
  { value: "98%", label: "Satisfaction" },
  { value: "4s", label: "Avg Verification" },
];

const payouts = ["PayPal", "Bitcoin", "Gift Cards", "Bank Wire", "USDT", "Ethereum"];

const testimonials = [
  { name: "Amara K.", role: "Student", earn: "$340/mo", quote: "I do tasks during lunch breaks. The payouts hit the same day every time." },
  { name: "Dev R.", role: "Freelancer", earn: "$890/mo", quote: "Best side income I've found. The task variety keeps it fresh and the rewards are real." },
  { name: "Suki L.", role: "Stay-at-home parent", earn: "$220/mo", quote: "So simple. Sign up, pick a task, get paid. No catch. I've referred 12 friends." },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow:ital,wght@0,400;0,600;1,400&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{--black:#0a0a0a;--white:#f5f0eb;--orange:#ff5c00;--orangeB:#ff7a2e;--gray:#1a1a1a;--gray2:#0e0e0e;--gt:#888;}
body{background:var(--black);}
.root{font-family:'Barlow',sans-serif;background:var(--black);color:var(--white);min-height:100vh;overflow-x:hidden;}

/* NAV */
.nav{display:flex;align-items:center;justify-content:space-between;padding:22px 48px;border-bottom:1px solid #1a1a1a;position:sticky;top:0;z-index:100;background:rgba(10,10,10,0.94);backdrop-filter:blur(14px);}
.logo{font-family:'Anton',sans-serif;font-size:26px;letter-spacing:2px;color:var(--white);}
.logo span{color:var(--orange);}
.nav-links{display:flex;gap:32px;}
.nav-link{color:var(--gt);text-decoration:none;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;transition:color .2s;}
.nav-link:hover{color:var(--orange);}
.nav-cta{background:var(--orange);color:#000;padding:10px 22px;border-radius:4px;font-weight:700;font-size:13px;letter-spacing:.5px;text-transform:uppercase;border:none;cursor:pointer;transition:all .2s;}
.nav-cta:hover{background:var(--orangeB);transform:translateY(-1px);}

/* HERO */
.hero{padding:110px 48px 80px;max-width:1200px;margin:0 auto;position:relative;}
.eyebrow{display:inline-flex;align-items:center;gap:8px;background:#111;border:1px solid #252525;border-left:3px solid var(--orange);padding:6px 16px;border-radius:2px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--orange);margin-bottom:28px;}
.hero-title{font-family:'Anton',sans-serif;font-size:clamp(60px,9vw,116px);line-height:.92;letter-spacing:-1px;text-transform:uppercase;margin-bottom:28px;}
.hero-title .or{color:var(--orange);}
.hero-title .out{-webkit-text-stroke:2px var(--white);color:transparent;}
.hero-sub{font-size:19px;line-height:1.65;color:#999;max-width:500px;margin-bottom:44px;}
.hero-btns{display:flex;gap:14px;align-items:center;flex-wrap:wrap;}
.btn-p{background:var(--orange);color:#000;padding:15px 34px;border-radius:4px;font-weight:700;font-size:14px;letter-spacing:.5px;border:none;cursor:pointer;transition:all .2s;text-transform:uppercase;}
.btn-p:hover{background:var(--orangeB);transform:translateY(-2px);box-shadow:0 12px 36px rgba(255,92,0,.32);}
.btn-g{background:transparent;color:var(--white);padding:15px 34px;border-radius:4px;font-weight:600;font-size:14px;border:1px solid #2a2a2a;cursor:pointer;transition:all .2s;text-transform:uppercase;}
.btn-g:hover{border-color:var(--orange);color:var(--orange);}
.live-badge{font-size:13px;color:#555;display:flex;align-items:center;gap:6px;}
.live-badge span{color:var(--orange);font-weight:700;}

/* TICKER */
.ticker-wrap{background:var(--orange);padding:11px 0;overflow:hidden;transform:rotate(-1.1deg) scaleX(1.04);margin:52px 0;}
.ticker-inner{display:flex;gap:60px;white-space:nowrap;animation:tick 22s linear infinite;color:#000;font-family:'Anton',sans-serif;font-size:15px;letter-spacing:3px;}
@keyframes tick{from{transform:translateX(0);}to{transform:translateX(-50%);}}

/* STATS */
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#1a1a1a;max-width:1200px;margin:0 auto 96px;border-radius:8px;overflow:hidden;border:1px solid #1a1a1a;}
.stat-cell{background:var(--gray2);padding:40px 28px;text-align:center;transition:background .2s;}
.stat-cell:hover{background:#111;}
.stat-val{font-family:'Anton',sans-serif;font-size:50px;color:var(--orange);line-height:1;margin-bottom:8px;}
.stat-lbl{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#555;}

/* SECTION */
.sec-lbl{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--orange);margin-bottom:14px;display:flex;align-items:center;gap:10px;}
.sec-lbl::after{content:'';flex:1;height:1px;background:#1e1e1e;max-width:56px;}

/* STEPS */
.steps-sec{max-width:1200px;margin:0 auto;padding:0 48px 112px;}
.steps-hdr{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:56px;flex-wrap:wrap;gap:20px;}
.sec-title{font-family:'Anton',sans-serif;font-size:clamp(40px,5vw,70px);line-height:1;text-transform:uppercase;}
.sec-title .or{color:var(--orange);}
.steps-sub{max-width:320px;font-size:15px;line-height:1.7;color:#666;}
.tabs{display:flex;gap:2px;border-bottom:1px solid #1a1a1a;}
.tab{padding:15px 22px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;cursor:pointer;color:#555;border-bottom:3px solid transparent;margin-bottom:-1px;transition:all .2s;background:none;border-top:none;border-left:none;border-right:none;}
.tab:hover{color:var(--white);}
.tab.on{color:var(--orange);border-bottom-color:var(--orange);}
.detail{display:grid;grid-template-columns:1fr 1fr;background:var(--gray2);border:1px solid #1a1a1a;border-radius:8px;overflow:hidden;min-height:360px;}
.dleft{padding:52px 44px;border-right:1px solid #1a1a1a;position:relative;overflow:hidden;}
.dleft::before{content:attr(data-num);font-family:'Anton',sans-serif;font-size:220px;color:#111;position:absolute;right:-14px;bottom:-36px;line-height:1;pointer-events:none;user-select:none;}
.d-icon{font-size:44px;margin-bottom:20px;display:block;position:relative;z-index:1;}
.d-tag{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--orange);margin-bottom:10px;position:relative;z-index:1;}
.d-title{font-family:'Anton',sans-serif;font-size:44px;line-height:1;text-transform:uppercase;margin-bottom:18px;position:relative;z-index:1;}
.d-desc{font-size:15px;line-height:1.7;color:#888;position:relative;z-index:1;max-width:320px;}
.dright{padding:52px 44px;display:flex;flex-direction:column;justify-content:space-between;}
.perks{display:flex;flex-direction:column;gap:14px;}
.perk{display:flex;align-items:center;gap:14px;padding:15px 18px;background:#141414;border:1px solid #1f1f1f;border-radius:6px;font-size:14px;font-weight:600;color:#bbb;transition:all .2s;cursor:default;}
.perk:hover{border-color:var(--orange);color:var(--white);transform:translateX(4px);}
.dot{width:7px;height:7px;background:var(--orange);border-radius:50%;flex-shrink:0;box-shadow:0 0 7px var(--orange);}
.d-foot{margin-top:28px;display:flex;align-items:center;gap:16px;}
.progress{display:flex;gap:5px;align-items:center;}
.pd{width:6px;height:6px;border-radius:50%;background:#2a2a2a;transition:all .3s;cursor:pointer;}
.pd.on{background:var(--orange);width:22px;border-radius:3px;box-shadow:0 0 8px rgba(255,92,0,.5);}

/* DIVIDER */
.divider{height:1px;background:linear-gradient(90deg,transparent,var(--orange),transparent);margin:0 auto 80px;max-width:1200px;}

/* PAYOUTS */
.payout-sec{max-width:1200px;margin:0 auto;padding:0 48px 112px;}
.chips{display:flex;gap:10px;flex-wrap:wrap;margin-top:36px;}
.chip{padding:13px 26px;background:#0e0e0e;border:1px solid #1f1f1f;border-radius:40px;font-size:14px;font-weight:700;color:#bbb;cursor:pointer;transition:all .25s;letter-spacing:.5px;}
.chip:hover{background:var(--orange);color:#000;border-color:var(--orange);transform:translateY(-3px);box-shadow:0 10px 28px rgba(255,92,0,.22);}

/* TESTIMONIALS */
.testi-sec{max-width:1200px;margin:0 auto;padding:0 48px 112px;}
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:44px;}
.tcard{background:var(--gray2);border:1px solid #1a1a1a;border-radius:8px;padding:32px 28px;transition:all .3s;position:relative;overflow:hidden;}
.tcard::before{content:'"';font-family:'Anton',sans-serif;font-size:100px;color:#161616;position:absolute;top:-10px;right:14px;line-height:1;}
.tcard:hover{border-color:var(--orange);transform:translateY(-4px);box-shadow:0 20px 50px rgba(255,92,0,.09);}
.t-earn{font-family:'Anton',sans-serif;font-size:26px;color:var(--orange);margin-bottom:14px;}
.t-quote{font-size:14px;line-height:1.7;color:#888;margin-bottom:24px;font-style:italic;position:relative;z-index:1;}
.t-author{display:flex;align-items:center;gap:11px;}
.t-av{width:38px;height:38px;background:var(--orange);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Anton',sans-serif;font-size:15px;color:#000;flex-shrink:0;}
.t-name{font-weight:700;font-size:13px;color:var(--white);}
.t-role{font-size:12px;color:#444;letter-spacing:.5px;}

/* CTA */
.cta-wrap{max-width:1104px;margin:0 auto 80px;padding:0 48px;}
.cta-box{background:var(--gray2);border:1px solid #1a1a1a;border-radius:12px;padding:90px 72px;text-align:center;position:relative;overflow:hidden;}
.cta-box::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:500px;height:1px;background:linear-gradient(90deg,transparent,var(--orange),transparent);}
.cta-glow{position:absolute;top:-80px;left:50%;transform:translateX(-50%);width:480px;height:280px;background:radial-gradient(ellipse,rgba(255,92,0,.11) 0%,transparent 70%);pointer-events:none;}
.cta-title{font-family:'Anton',sans-serif;font-size:clamp(44px,6vw,84px);line-height:.95;text-transform:uppercase;margin-bottom:20px;position:relative;z-index:1;}
.cta-title .or{color:var(--orange);}
.cta-sub{font-size:17px;color:#666;margin-bottom:44px;position:relative;z-index:1;}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1;}
.btn-xl{padding:18px 44px;font-size:15px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;border-radius:6px;cursor:pointer;transition:all .25s;}
.btn-xl-p{background:var(--orange);color:#000;border:none;}
.btn-xl-p:hover{background:var(--orangeB);transform:translateY(-3px);box-shadow:0 14px 44px rgba(255,92,0,.38);}
.btn-xl-g{background:transparent;color:var(--white);border:1px solid #2a2a2a;}
.btn-xl-g:hover{border-color:var(--orange);color:var(--orange);}

/* FOOTER */
.footer{border-top:1px solid #141414;padding:36px 48px;display:flex;align-items:center;justify-content:space-between;max-width:1200px;margin:0 auto;flex-wrap:wrap;gap:14px;}
.f-logo{font-family:'Anton',sans-serif;font-size:20px;letter-spacing:2px;}
.f-logo span{color:var(--orange);}
.f-copy{font-size:12px;color:#333;}
.f-links{display:flex;gap:22px;}
.f-link{font-size:12px;color:#444;text-decoration:none;transition:color .2s;}
.f-link:hover{color:var(--orange);}

/* FADE-UP */
.fu{opacity:0;transform:translateY(28px);transition:opacity .6s ease,transform .6s ease;}
.fu.vis{opacity:1;transform:translateY(0);}
.d1{transition-delay:.1s;}.d2{transition-delay:.2s;}.d3{transition-delay:.3s;}

@media(max-width:900px){
  .nav{padding:16px 20px;}.nav-links{display:none;}
  .hero{padding:72px 20px 56px;}
  .stats-row{grid-template-columns:repeat(2,1fr);}
  .detail{grid-template-columns:1fr;}
  .dleft{border-right:none;border-bottom:1px solid #1a1a1a;}
  .testi-grid{grid-template-columns:1fr;}
  .steps-sec,.payout-sec,.testi-sec{padding-left:20px;padding-right:20px;}
  .cta-wrap{padding:0 20px;}
  .cta-box{padding:56px 28px;}
  .footer{padding:28px 20px;}
  .tabs{overflow-x:auto;}.tab{white-space:nowrap;}
}
`;

export default function InfoTask() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState({});
  const refs = useRef({});

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible((v) => ({ ...v, [e.target.dataset.id]: true }))),
      { threshold: 0.12 }
    );
    Object.values(refs.current).forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  const reg = (id, delay = "") => ({
    ref: (el) => { refs.current[id] = el; },
    "data-id": id,
    className: `fu ${delay} ${visible[id] ? "vis" : ""}`,
  });

  const tickItems = ["EARN REAL MONEY", "DO TASKS", "GET PAID TODAY", "500+ TASKS DAILY", "ZERO FEES", "INSTANT PAYOUTS"];
  const ticks = [...tickItems, ...tickItems];
  const s = steps[active];

  return (
    <div className="root">
      {/* HERO */}
      <section className="hero">
        <div className="eyebrow"><span>●</span> How It Works</div>
        <h1 className="hero-title">
          <span className="or">DO</span> TASKS<br />
          <span className="out">EARN</span><br />
          REWARDS
        </h1>
        <p className="hero-sub">
          The simplest way to turn spare time into real money. No skills required — just pick a task, do it, and get paid.
        </p>
        <div className="hero-btns">
          <button className="btn-p">Start Earning Free →</button>
          <button className="btn-g">Watch Demo</button>
          <div className="live-badge"><span>●</span> 2.4M earners active right now</div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {ticks.map((t, i) => <span key={i}>{t}&nbsp;/&nbsp;</span>)}
        </div>
      </div>

      {/* STATS */}
      <div className="stats-row" {...reg("stats")}>
        {stats.map((s, i) => (
          <div className="stat-cell" key={i}>
            <div className="stat-val">{s.value}</div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>

      {/* STEPS */}
      <section className="steps-sec">
        <div {...reg("shdr")}>
          <div className="steps-hdr">
            <div>
              <div className="sec-lbl">The Process</div>
              <h2 className="sec-title">4 STEPS TO<br /><span className="or">GETTING PAID</span></h2>
            </div>
            <p className="steps-sub">We stripped out all the complexity. Four clean steps from sign-up to payout.</p>
          </div>
        </div>

        <div className="tabs">
          {steps.map((st, i) => (
            <button key={i} className={`tab ${active === i ? "on" : ""}`} onClick={() => setActive(i)}>
              {st.num} {st.short}
            </button>
          ))}
        </div>

        <div className="detail" {...reg("detail")}>
          <div className="dleft" data-num={s.num}>
            <span className="d-icon">{s.icon}</span>
            <div className="d-tag">Step {s.num}</div>
            <div className="d-title">{s.title}</div>
            <p className="d-desc">{s.desc}</p>
          </div>
          <div className="dright">
            <div className="perks">
              {s.perks.map((p, i) => (
                <div className="perk" key={i}><span className="dot" />{p}</div>
              ))}
            </div>
            <div className="d-foot">
              <button className="btn-p" style={{ fontSize: 13, padding: "11px 22px" }}
                onClick={() => setActive((a) => (a + 1) % steps.length)}>
                {active < 3 ? "Next Step →" : "Start Now →"}
              </button>
              <div className="progress">
                {steps.map((_, i) => (
                  <div key={i} className={`pd ${i === active ? "on" : ""}`} onClick={() => setActive(i)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* PAYOUTS */}
      <section className="payout-sec" {...reg("pay")}>
        <div className="sec-lbl">Payout Methods</div>
        <h2 className="sec-title">CASH OUT<br /><span className="or">YOUR WAY</span></h2>
        <p style={{ color: "#666", fontSize: 15, maxWidth: 460, lineHeight: 1.7, marginTop: 14 }}>
          No minimums. No waiting. Choose how and when you get your earnings.
        </p>
        <div className="chips">
          {payouts.map((p, i) => <div key={i} className="chip">{p}</div>)}
          <div className="chip" style={{ borderStyle: "dashed" }}>+ More Coming</div>
        </div>
      </section>

      <div className="divider" />

      {/* TESTIMONIALS */}
      <section className="testi-sec">
        <div className="sec-lbl">Real Earners</div>
        <h2 className="sec-title">THEY EARN.<br /><span className="or">YOU CAN TOO.</span></h2>
        <div className="testi-grid" {...reg("testi")}>
          {testimonials.map((t, i) => (
            <div className="tcard" key={i}>
              <div className="t-earn">{t.earn}</div>
              <p className="t-quote">{t.quote}</p>
              <div className="t-author">
                <div className="t-av">{t.name[0]}</div>
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-wrap" {...reg("cta")}>
        <div className="cta-box">
          <div className="cta-glow" />
          <h2 className="cta-title">READY TO<br /><span className="or">START EARNING?</span></h2>
          <p className="cta-sub">Join 2.4 million people turning spare time into real income. Free forever.</p>
          <div className="cta-btns">
            <button className="btn-xl btn-xl-p">Create Free Account →</button>
            <button className="btn-xl btn-xl-g">Browse Tasks</button>
          </div>
        </div>
      </div>
    </div>
  );
}