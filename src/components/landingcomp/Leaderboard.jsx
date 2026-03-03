import React from 'react'

const Leaderboard = () => {
      const players = [
    { rank:1, name:'Jordan K.', avatar:'#FF6B00', creds:'128,540', badge:'👑', streak:62 },
    { rank:2, name:'Maya R.',   avatar:'#3B82F6', creds:'112,200', badge:'🥈', streak:45 },
    { rank:3, name:'Ethan W.',  avatar:'#10B981', creds:'98,750',  badge:'🥉', streak:38 },
    { rank:4, name:'Sofia L.',  avatar:'#8B5CF6', creds:'87,320',  badge:'⭐', streak:29 },
    { rank:5, name:'Marcus T.', avatar:'#F59E0B', creds:'75,900',  badge:'⭐', streak:21 },
  ]
  const stats = [
    { num:'$2.3M+', label:'Total Paid Out', sub:'to real users' },
    { num:'2.4M+',  label:'Active Members', sub:'globally' },
    { num:'127K+',  label:'Tasks Live',     sub:'right now' },
    { num:'4.9★',   label:'App Rating',    sub:'50K+ reviews' },
  ]
  return (
     <section id="leaderboard" style={{ padding:'120px 48px', background:'#fff' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:72 }}>
          <div className="sec-label" style={{ justifyContent:'center' }}>COMMUNITY & STATS</div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(2.8rem,5vw,4.5rem)',
            letterSpacing:'0.04em', lineHeight:1, marginBottom:20 }}>
            WHO'S ON TOP THIS<br /><span style={{ color:'#FF6B00' }}>WEEK?</span>
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:60, alignItems:'start' }}>
          <div className="reveal">
            {players.map((p, i) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:20,
                padding:'18px 24px', borderRadius:18, marginBottom:12,
                background: i===0 ? 'linear-gradient(135deg,#FFF5EE,#FFE8CC)' : '#FAFAFA',
                border: i===0 ? '1.5px solid rgba(255,107,0,0.25)' : '1px solid rgba(0,0,0,0.06)',
                transition:'transform 0.2s', cursor:'default' }}
                onMouseEnter={e => e.currentTarget.style.transform='translateX(6px)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateX(0)'}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.8rem',
                  color: i===0?'#FF6B00':'rgba(0,0,0,0.2)', width:36, textAlign:'center' }}>{p.rank}</div>
                <div style={{ width:42, height:42, borderRadius:'50%', background:p.avatar,
                  color:'#fff', fontWeight:700, fontSize:15, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {p.name[0]}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:'0.95rem', color:'#0A0A0A' }}>{p.name}</div>
                  <div style={{ fontSize:'0.75rem', color:'#999' }}>🔥 {p.streak} day streak</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.15rem', color:'#FF6B00' }}>{p.creds}</div>
                  <div style={{ fontSize:'0.7rem', color:'#999', fontFamily:"'JetBrains Mono',monospace" }}>CREDS</div>
                </div>
                <div style={{ fontSize:20 }}>{p.badge}</div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
            {stats.map((s,i) => (
              <div key={i} style={{ background:'#FAFAFA', borderRadius:22, padding:'32px 24px',
                border:'1px solid rgba(0,0,0,0.06)', textAlign:'center',
                transition:'transform 0.3s, box-shadow 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 12px 36px rgba(255,107,0,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2.4rem', color:'#FF6B00', lineHeight:1, marginBottom:8 }}>{s.num}</div>
                <div style={{ fontWeight:700, fontSize:'0.85rem', color:'#0A0A0A', marginBottom:4 }}>{s.label}</div>
                <div style={{ fontSize:'0.75rem', color:'#999' }}>{s.sub}</div>
              </div>
            ))}

            <div style={{ gridColumn:'span 2', background:'#FAFAFA', borderRadius:22, padding:'28px 24px',
              border:'1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontWeight:700, fontSize:'0.85rem', color:'#0A0A0A', marginBottom:20 }}>Top Task Categories</div>
              {[['Surveys',72,'#FF6B00'],['Mini Games',58,'#3B82F6'],['Creative',41,'#10B981'],['Watch & Earn',88,'#F59E0B']].map(([lbl,pct,clr]) => (
                <div key={lbl} style={{ marginBottom:14 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                    <span style={{ fontSize:'0.8rem', color:'#555' }}>{lbl}</span>
                    <span style={{ fontSize:'0.8rem', fontWeight:700, color:clr }}>{pct}%</span>
                  </div>
                  <div style={{ background:'#e8e8e8', borderRadius:99, height:5, overflow:'hidden' }}>
                    <div style={{ height:'100%', borderRadius:99, background:clr, width:`${pct}%`,
                      transition:'width 1.4s cubic-bezier(0.16,1,0.3,1)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Leaderboard
