
import React from 'react'

const CTASECTION = () => {
  return (
    <section style={{ padding:'120px 48px', background:'#0A0A0A', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        width:700, height:500, pointerEvents:'none',
        background:'radial-gradient(ellipse,rgba(255,107,0,0.14) 0%,transparent 70%)' }} />
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(255,107,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,0,0.04) 1px,transparent 1px)',
        backgroundSize:'64px 64px' }} />

      <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
        <div className="sec-label" style={{ justifyContent:'center', marginBottom:24 }}>GET STARTED TODAY</div>

        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(3rem,6vw,5.5rem)',
          letterSpacing:'0.04em', lineHeight:0.95, marginBottom:28, color:'#fff' }}>
          YOUR TIME HAS<br /><span style={{ color:'#FF6B00' }}>VALUE.</span><br />START CLAIMING IT.
        </h2>

        <p style={{ fontSize:'1.05rem', color:'rgba(255,255,255,0.5)', lineHeight:1.75, marginBottom:48, maxWidth:480, margin:'0 auto 48px' }}>
          Join 2.4 million earners who are already turning spare minutes into real money. Free forever. No catch.
        </p>

        <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
          <a href="#tasks-section" className="btn-primary" style={{ fontSize:'1.05rem', padding:'16px 44px' }}>
            Create Free Account &nbsp;→
          </a>
          <a href="#how-it-works" className="btn-outline" style={{ fontSize:'1.05rem', padding:'16px 44px',
            color:'rgba(255,255,255,0.7)', borderColor:'rgba(255,255,255,0.15)' }}>
            Learn More
          </a>
        </div>

        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:32, marginTop:48, flexWrap:'wrap' }}>
          {['✓ Free Forever','✓ Instant Payouts','✓ No Hidden Fees','✓ 100+ Reward Options'].map(t => (
            <span key={t} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.72rem',
              color:'rgba(255,255,255,0.35)', letterSpacing:'0.08em' }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CTASECTION