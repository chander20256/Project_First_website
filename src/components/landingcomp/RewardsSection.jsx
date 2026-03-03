import React from 'react'

const RewardsSection = () => {
  const rewards = [
    { icon:'💵', name:'PayPal Cash', val:'$5 – $500', creds:'500 CR', hot:true },
    { icon:'🎁', name:'Amazon Gift Card', val:'$10 – $200', creds:'1,000 CR', hot:false },
    { icon:'₿', name:'Bitcoin', val:'$10+', creds:'1,200 CR', hot:true },
    { icon:'🎮', name:'Steam Wallet', val:'$5 – $100', creds:'600 CR', hot:false },
    { icon:'🍎', name:'Apple Gift Card', val:'$10 – $100', creds:'1,100 CR', hot:false },
    { icon:'🛍️', name:'Visa Prepaid', val:'$25 – $250', creds:'2,500 CR', hot:true },
    { icon:'🎬', name:'Netflix Credit', val:'$15/mo', creds:'1,500 CR', hot:false },
    { icon:'🎵', name:'Spotify Premium', val:'1–12 months', creds:'800 CR', hot:false },
  ]

  return (
    <>
      {/* Load Barlow Condensed to match the screenshot's bold condensed style */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&display=swap');
      `}</style>

      <section id="rewards-section" style={{ padding:'120px 48px', background:'#ffffff', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:'linear-gradient(rgba(255,107,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,0,0.04) 1px,transparent 1px)',
          backgroundSize:'64px 64px' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          width:800, height:600, pointerEvents:'none',
          background:'radial-gradient(ellipse,rgba(255,107,0,0.08) 0%,transparent 70%)' }} />

        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center', marginBottom:72 }}>

            {/* Label — thin orange line + spaced mono text like screenshot */}
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'center',
              gap:12, marginBottom:24,
            }}>
              <div style={{ width:32, height:2, background:'#FF6B00' }} />
              <span style={{
                fontFamily:"'Barlow Condensed',sans-serif",
                fontWeight:700,
                fontSize:'0.75rem',
                letterSpacing:'0.25em',
                color:'#FF6B00',
                textTransform:'uppercase',
              }}>REWARDS CATALOG</span>
            </div>

            {/* H2 — matches screenshot: ultra-bold condensed, tight, no letter-spacing */}
            <h2 style={{
              fontFamily:"'Barlow Condensed',sans-serif",
              fontWeight:900,
              fontSize:'clamp(3rem,7vw,6rem)',
              letterSpacing:'-0.01em',
              lineHeight:0.95,
              marginBottom:28,
              color:'#0A0A0A',
              textTransform:'uppercase',
            }}>
              REDEEM FOR WHAT<br />
              <span style={{ color:'#FF6B00' }}>YOU ACTUALLY WANT</span>
            </h2>

            {/* Paragraph — matches screenshot: light weight, muted, centered */}
            <p style={{
              fontFamily:"'Barlow Condensed',sans-serif",
              fontWeight:400,
              fontSize:'1.15rem',
              color:'rgba(0,0,0,0.45)',
              maxWidth:520,
              margin:'0 auto',
              lineHeight:1.7,
              letterSpacing:'0.01em',
            }}>
              Over 100 reward options. No minimum payout. No expiry on your Creds.
            </p>
          </div>

          {/* Cards — unchanged from original */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:20 }}>
            {rewards.map((r, i) => (
              <div key={i} className="reveal" style={{
                background:'#000000', borderRadius:22,
                border:'1px solid rgba(0,0,0,0.15)',
                padding:'28px 24px', position:'relative', overflow:'hidden',
                transition:'transform 0.3s, border-color 0.3s, background 0.3s',
                cursor:'pointer', transitionDelay:`${i*0.06}s` }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.borderColor='rgba(255,107,0,0.4)'; e.currentTarget.style.background='rgba(255,107,0,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='rgba(0,0,0,0.15)'; e.currentTarget.style.background='#000000' }}>
                {r.hot && (
                  <div style={{ position:'absolute', top:14, right:14, background:'#FF6B00',
                    borderRadius:99, padding:'3px 10px', fontSize:'0.6rem',
                    fontFamily:"'JetBrains Mono',monospace", color:'#fff', letterSpacing:'0.08em' }}>HOT</div>
                )}
                <div style={{ fontSize:36, marginBottom:16 }}>{r.icon}</div>
                <div style={{ fontWeight:700, fontSize:'0.95rem', color:'#ffffff', marginBottom:4 }}>{r.name}</div>
                <div style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.45)', marginBottom:16 }}>{r.val}</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:'1.3rem', color:'#FF6B00', letterSpacing:'0.02em' }}>{r.creds}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign:'center', marginTop:56 }}>
            <a href="#tasks-section" className="btn-primary" style={{ fontSize:'1rem', padding:'15px 40px' }}>Start Earning Creds →</a>
          </div>
        </div>
      </section>
    </>
  )
}

export default RewardsSection