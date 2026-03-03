import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

const posts = [
  {
    id: 1, tag: 'EARN GUIDE', tagColor: '#FF6B00',
    title: 'How to Earn ₹500 Daily Playing Mini Games',
    desc: 'Discover the top-rated mini games that pay the most Creds per minute. We break down which games give the best return on your time.',
    author: 'Aryan Sharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    date: 'Feb 28, 2026', readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&h=400&fit=crop',
  },
  {
    id: 2, tag: 'DAILY TASKS', tagColor: '#3B82F6',
    title: '7 Daily Tasks Our Top Earners Never Skip',
    desc: 'The exact morning routine that the highest-earning EarnFlow users follow every day to stack Creds before noon.',
    author: 'Priya Mehta',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
    date: 'Feb 25, 2026', readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop',
  },
  {
    id: 3, tag: 'WATCH & EARN', tagColor: '#10B981',
    title: 'Watch Videos and Earn Real Rewards — The Complete Guide',
    desc: "EarnFlow's video earning feature lets you accumulate Creds while watching sponsored content and educational videos.",
    author: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    date: 'Feb 20, 2026', readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop',
  },
  {
    id: 4, tag: 'REWARDS', tagColor: '#8B5CF6',
    title: 'Turn Your Creds into Amazon Gift Cards & UPI Cash',
    desc: 'A full breakdown of every reward in our store — from ₹10 gift cards to ₹5000 UPI transfers.',
    author: 'Sneha Kapoor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    date: 'Feb 15, 2026', readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop',
  },
  {
    id: 5, tag: 'COMING SOON', tagColor: '#EF4444',
    title: 'Your Creds Are Becoming Stocks — The Future of EarnFlow',
    desc: "Soon your earned Creds will convert into real fractional stocks from NSE & BSE. Start earning now, invest later.",
    author: 'EarnFlow Team',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
    date: 'Mar 1, 2026', readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    comingSoon: true,
  },
  {
    id: 6, tag: 'COMING SOON', tagColor: '#F59E0B',
    title: 'EarnFlow Loans — Borrow Against Your Creds Balance',
    desc: 'Use your lifetime Creds as collateral for instant micro-loans. No credit score. Zero paperwork.',
    author: 'EarnFlow Team',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
    date: 'Mar 1, 2026', readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&h=400&fit=crop',
    comingSoon: true,
  },
]

const categories = ['ALL', 'EARN GUIDE', 'DAILY TASKS', 'WATCH & EARN', 'REWARDS', 'COMING SOON']

export default function Blog() {
  const [active, setActive] = useState('ALL')
  const [hovered, setHovered] = useState(null)

  const filtered = active === 'ALL' ? posts : posts.filter(p => p.tag === active)

  return (
    <div style={{ minHeight: '100vh', background: '#0C0C0C', fontFamily: "'DM Sans', sans-serif", paddingTop: '70px', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.6)} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(255,107,0,0.1)} 50%{box-shadow:0 0 40px rgba(255,107,0,0.25)} }
        .blog-card{transition:transform 0.4s cubic-bezier(0.16,1,0.3,1),box-shadow 0.4s ease}
        .blog-card:hover{transform:translateY(-8px);box-shadow:0 24px 60px rgba(0,0,0,0.6)!important}
        .blog-card img{transition:transform 0.6s cubic-bezier(0.16,1,0.3,1)}
        .blog-card:hover img{transform:scale(1.06)}
        .cat-pill{transition:all 0.2s ease}
        .cat-pill:hover{background:rgba(255,107,0,0.15)!important;color:#FF6B00!important;border-color:rgba(255,107,0,0.4)!important}
        .read-btn{transition:all 0.2s ease}
        .read-btn:hover{background:#FF6B00!important;color:#fff!important;border-color:#FF6B00!important}
        .coming-glow{animation:pulse-glow 3s ease-in-out infinite}
        .ticker-track{animation:marquee 28s linear infinite}
        .hero-a{animation:fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards}
        .hero-b{animation:fadeUp 0.9s 0.15s cubic-bezier(0.16,1,0.3,1) both}
        .hero-c{animation:fadeUp 0.9s 0.3s cubic-bezier(0.16,1,0.3,1) both}
        .hero-d{animation:fadeUp 0.9s 0.45s cubic-bezier(0.16,1,0.3,1) both}
        .shimmer-text{background:linear-gradient(90deg,#FF6B00 0%,#ffb347 40%,#FF6B00 60%,#ff8c00 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 3s linear infinite}
        @media(max-width:768px){.hide-mobile{display:none!important}.feat-grid{grid-template-columns:1fr!important}}
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position:'relative', minHeight:'88vh', display:'flex', alignItems:'center', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1800&fit=crop)', backgroundSize:'cover', backgroundPosition:'center', filter:'brightness(0.15) saturate(1.2)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(12,12,12,0.95) 0%,rgba(12,12,12,0.6) 60%,rgba(255,107,0,0.06) 100%)' }} />
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'linear-gradient(rgba(255,107,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,0,0.04) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'4px', background:'linear-gradient(180deg,transparent,#FF6B00,transparent)' }} />

        <div style={{ position:'relative', zIndex:2, maxWidth:'1280px', margin:'0 auto', padding:'80px 48px', width:'100%' }}>
          <div className="hero-a" style={{ display:'inline-flex', alignItems:'center', gap:'8px', border:'1px solid rgba(255,107,0,0.3)', borderRadius:'3px', padding:'7px 16px', marginBottom:'32px', background:'rgba(255,107,0,0.08)' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#FF6B00', display:'inline-block', animation:'pulse-dot 2s infinite' }} />
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.68rem', color:'#FF6B00', letterSpacing:'0.14em' }}>EARNFLOW BLOG — TIPS, STRATEGIES & FUTURE UPDATES</span>
          </div>

          <div className="hero-b" style={{ marginBottom:'28px' }}>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(3.5rem,9vw,7.5rem)', color:'#fff', lineHeight:0.92, fontWeight:900, letterSpacing:'-0.02em' }}>
              Play Games.<br />Do Tasks.<br /><em className="shimmer-text" style={{ fontStyle:'italic' }}>Get Paid.</em>
            </h1>
          </div>

          <p className="hero-c" style={{ fontSize:'1.1rem', color:'rgba(255,255,255,0.4)', lineHeight:1.75, maxWidth:'520px', marginBottom:'44px', fontWeight:300 }}>
            Guides, strategies, and news from the world's most rewarding earning platform. Turn your screen time into real money, gift cards, and soon — real stocks.
          </p>

          <div className="hero-d" style={{ display:'flex', gap:'14px', flexWrap:'wrap', alignItems:'center' }}>
            <Link to="/earn" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#FF6B00', color:'#fff', textDecoration:'none', padding:'14px 32px', borderRadius:'3px', fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:'0.9rem', letterSpacing:'0.06em', textTransform:'uppercase', boxShadow:'0 8px 32px rgba(255,107,0,0.4)' }}>
              Start Earning Free
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.7rem', color:'rgba(255,255,255,0.25)', letterSpacing:'0.1em' }}>2.4M+ ACTIVE EARNERS</span>
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="hide-mobile" style={{ position:'absolute', right:'6%', top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:'16px', zIndex:3 }}>
          {[{icon:'🎮',label:'MINI GAMES',val:'200+'},{icon:'✅',label:'DAILY TASKS',val:'50+'},{icon:'📺',label:'VIDEOS/DAY',val:'∞'},{icon:'💸',label:'AVG EARNING',val:'₹300'}].map(({icon,label,val},i)=>(
            <div key={label} style={{ background:'rgba(255,255,255,0.04)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'10px', padding:'14px 20px', display:'flex', alignItems:'center', gap:'12px', animation:`fadeUp 0.7s ${0.5+i*0.1}s both` }}>
              <span style={{ fontSize:'22px' }}>{icon}</span>
              <div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.4rem', color:'#FF6B00', lineHeight:1 }}>{val}</div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.6rem', color:'rgba(255,255,255,0.3)', letterSpacing:'0.08em', marginTop:'2px' }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ background:'#FF6B00', padding:'13px 0', overflow:'hidden' }}>
        <div className="ticker-track" style={{ display:'flex', whiteSpace:'nowrap' }}>
          {[...Array(2)].map((_,ri)=>(
            <div key={ri} style={{ display:'flex' }}>
              {['🎮 PLAY GAMES','✅ DAILY TASKS','📺 WATCH VIDEOS','🎁 EARN REWARDS','📈 COMING: INVEST IN STOCKS','🏦 COMING: CREDS LOANS','💸 REAL CASH PAYOUTS'].map((item,i)=>(
                <span key={i} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.72rem', letterSpacing:'0.12em', color:'#fff', padding:'0 40px', borderRight:'1px solid rgba(255,255,255,0.25)', fontWeight:500 }}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURED STORY ── */}
      <section style={{ maxWidth:'1280px', margin:'0 auto', padding:'80px 48px 0' }}>
        <div style={{ display:'flex', gap:'8px', alignItems:'center', marginBottom:'32px' }}>
          <div style={{ width:'32px', height:'2px', background:'#FF6B00' }} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.68rem', color:'#FF6B00', letterSpacing:'0.14em' }}>FEATURED STORY</span>
        </div>

        <div className="blog-card feat-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderRadius:'16px', overflow:'hidden', border:'1px solid rgba(255,255,255,0.07)', background:'#141414', minHeight:'460px' }}>
          <div style={{ position:'relative', overflow:'hidden', minHeight:'400px' }}>
            <img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=900&h=700&fit=crop" alt="Featured" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent 50%,#141414 100%)' }} />
            <div style={{ position:'absolute', bottom:'24px', left:'24px', fontFamily:"'JetBrains Mono',monospace", fontSize:'0.62rem', background:'#FF6B00', color:'#fff', padding:'5px 14px', borderRadius:'3px', letterSpacing:'0.12em' }}>EARN GUIDE</div>
          </div>
          <div style={{ padding:'52px 48px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.65rem', color:'rgba(255,255,255,0.3)', letterSpacing:'0.1em', marginBottom:'20px' }}>MAR 01, 2026 · 8 MIN READ</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.8rem,3vw,2.8rem)', color:'#fff', lineHeight:1.1, fontWeight:900, marginBottom:'20px', letterSpacing:'-0.01em' }}>
              How 1 Hour a Day on EarnFlow Can Replace Your Side Hustle
            </h2>
            <p style={{ color:'rgba(255,255,255,0.4)', lineHeight:1.8, fontSize:'0.93rem', marginBottom:'36px', fontWeight:300 }}>
              Real users. Real numbers. We analyzed 500 top earners and found the exact combination of tasks, games, and videos that yields the highest Creds per hour — and how to convert them into real money.
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:'20px' }}>
              <a href="#" className="read-btn" style={{ display:'inline-flex', alignItems:'center', gap:'8px', border:'1.5px solid rgba(255,255,255,0.2)', color:'#fff', textDecoration:'none', padding:'11px 24px', borderRadius:'3px', fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:'0.82rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>
                Read Article
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
              <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" style={{ width:'32px', height:'32px', borderRadius:'50%', objectFit:'cover' }} alt="author" />
                <span style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.35)' }}>Aryan Sharma</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER ── */}
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'56px 48px 32px' }}>
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', alignItems:'center' }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.65rem', color:'rgba(255,255,255,0.25)', letterSpacing:'0.1em', marginRight:'8px' }}>FILTER:</span>
          {categories.map(cat=>(
            <button key={cat} onClick={()=>setActive(cat)} className="cat-pill" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.65rem', letterSpacing:'0.1em', padding:'8px 18px', borderRadius:'3px', cursor:'pointer', border: active===cat ? '1px solid #FF6B00' : '1px solid rgba(255,255,255,0.1)', background: active===cat ? '#FF6B00' : 'transparent', color: active===cat ? '#fff' : 'rgba(255,255,255,0.45)', fontWeight:500 }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* ── POSTS GRID ── */}
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 48px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:'24px' }}>
          {filtered.map((post)=>(
            <article key={post.id} className="blog-card" onMouseEnter={()=>setHovered(post.id)} onMouseLeave={()=>setHovered(null)} style={{ background:'#141414', borderRadius:'12px', overflow:'hidden', border: post.comingSoon ? `1px dashed ${post.tagColor}50` : '1px solid rgba(255,255,255,0.07)', cursor:'pointer' }}>
              <div style={{ position:'relative', overflow:'hidden', height:'220px' }}>
                <img src={post.image} alt={post.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                <div style={{ position:'absolute', inset:0, background: hovered===post.id ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.3)', transition:'background 0.3s' }} />
                <div style={{ position:'absolute', top:'16px', left:'16px', fontFamily:"'JetBrains Mono',monospace", fontSize:'0.6rem', background:post.tagColor, color:'#fff', padding:'4px 12px', borderRadius:'3px', letterSpacing:'0.1em' }}>{post.tag}</div>
                {post.comingSoon && <div style={{ position:'absolute', top:'16px', right:'16px', background:'rgba(0,0,0,0.8)', border:`1px solid ${post.tagColor}60`, color:post.tagColor, fontFamily:"'JetBrains Mono',monospace", fontSize:'0.58rem', letterSpacing:'0.1em', padding:'4px 10px', borderRadius:'3px' }}>SOON</div>}
                <div style={{ position:'absolute', bottom:'14px', right:'14px', fontFamily:"'JetBrains Mono',monospace", fontSize:'0.6rem', background:'rgba(0,0,0,0.7)', color:'rgba(255,255,255,0.6)', padding:'4px 10px', borderRadius:'3px', letterSpacing:'0.06em' }}>{post.readTime} READ</div>
              </div>
              <div style={{ padding:'24px 24px 28px' }}>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.18rem', color:'#fff', lineHeight:1.3, fontWeight:700, marginBottom:'10px', letterSpacing:'-0.01em' }}>{post.title}</h3>
                <p style={{ fontSize:'0.83rem', color:'rgba(255,255,255,0.35)', lineHeight:1.7, marginBottom:'20px', fontWeight:300 }}>{post.desc}</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <img src={post.avatar} alt={post.author} style={{ width:'30px', height:'30px', borderRadius:'50%', objectFit:'cover', border:'1.5px solid rgba(255,255,255,0.1)' }} />
                    <div>
                      <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.6)', fontWeight:600 }}>{post.author}</div>
                      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.6rem', color:'rgba(255,255,255,0.25)', letterSpacing:'0.06em' }}>{post.date}</div>
                    </div>
                  </div>
                  <div style={{ width:'34px', height:'34px', borderRadius:'50%', border:`1.5px solid ${hovered===post.id ? post.tagColor : 'rgba(255,255,255,0.1)'}`, display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', background: hovered===post.id ? post.tagColor : 'transparent' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={hovered===post.id ? '#fff' : 'rgba(255,255,255,0.3)'} strokeWidth="2.5" style={{ transition:'stroke 0.2s' }}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── COMING SOON ── */}
      <section style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 48px 80px' }}>
        <div className="coming-glow" style={{ position:'relative', borderRadius:'20px', overflow:'hidden', background:'#0F0F0F', border:'1px solid rgba(255,107,0,0.15)' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&fit=crop)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.07 }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#0F0F0F 40%,rgba(255,107,0,0.04) 100%)' }} />
          <div style={{ position:'relative', zIndex:2, padding:'72px 64px' }}>
            <div style={{ display:'flex', gap:'8px', alignItems:'center', marginBottom:'32px' }}>
              <div style={{ width:'32px', height:'2px', background:'#FF6B00' }} />
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.68rem', color:'#FF6B00', letterSpacing:'0.14em' }}>COMING SOON — EARNFLOW 2.0</span>
            </div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.2rem,5vw,4.5rem)', color:'#fff', lineHeight:1, fontWeight:900, letterSpacing:'-0.02em', marginBottom:'20px' }}>
              Your Creds.<br /><em style={{ color:'#FF6B00', fontStyle:'italic' }}>Real Stocks.</em>
            </h2>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'1rem', lineHeight:1.8, maxWidth:'580px', marginBottom:'52px', fontWeight:300 }}>
              Soon your Creds will convert into fractional shares on NSE & BSE. And if you need instant cash, borrow against your balance with zero credit checks — no bank, no paperwork.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'20px', marginBottom:'48px' }}>
              {[
                { icon:'📈', color:'#EF4444', title:'Creds → Fractional Stocks', items:['Convert Creds to NSE/BSE shares','Start investing with ₹0','Real-time portfolio tracking','SEBI-registered broker backed'] },
                { icon:'🏦', color:'#F59E0B', title:'EarnFlow Instant Loans', items:['Borrow against Creds balance','No CIBIL score required','Instant disbursal to UPI','Repay via future earnings'] },
              ].map(({icon,color,title,items})=>(
                <div key={title} style={{ background:'rgba(255,255,255,0.03)', border:`1px dashed ${color}40`, borderRadius:'12px', padding:'32px 28px' }}>
                  <div style={{ fontSize:'40px', marginBottom:'16px' }}>{icon}</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.3rem', color:'#fff', fontWeight:700, marginBottom:'20px', lineHeight:1.2 }}>{title}</div>
                  {items.map(item=>(
                    <div key={item} style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}>
                      <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:color, flexShrink:0 }} />
                      <span style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.4)', fontWeight:300 }}>{item}</span>
                    </div>
                  ))}
                  <div style={{ marginTop:'20px', fontFamily:"'JetBrains Mono',monospace", fontSize:'0.62rem', color:color, background:`${color}12`, border:`1px solid ${color}30`, padding:'6px 14px', borderRadius:'3px', letterSpacing:'0.1em', display:'inline-block' }}>GET EARLY ACCESS →</div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:'0', maxWidth:'440px' }}>
              <input placeholder="your@email.com" style={{ flex:1, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRight:'none', outline:'none', padding:'14px 20px', color:'#fff', fontSize:'0.88rem', fontFamily:"'DM Sans',sans-serif", borderRadius:'3px 0 0 3px' }} />
              <button style={{ background:'#FF6B00', border:'none', padding:'14px 24px', color:'#fff', fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.06em', textTransform:'uppercase', cursor:'pointer', borderRadius:'0 3px 3px 0' }}>Notify Me</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 48px 100px' }}>
        <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden', background:'linear-gradient(135deg,#FF6B00 0%,#e85d00 100%)' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1400&fit=crop)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.1, mixBlendMode:'overlay' }} />
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' }} />
          <div style={{ position:'relative', zIndex:2, padding:'72px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'40px', flexWrap:'wrap' }}>
            <div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.68rem', color:'rgba(255,255,255,0.6)', letterSpacing:'0.14em', marginBottom:'16px' }}>FREE TO JOIN — NO CREDIT CARD</div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,4vw,3.5rem)', color:'#fff', lineHeight:1, fontWeight:900, letterSpacing:'-0.02em', marginBottom:'12px' }}>
                Start Earning<br /><em style={{ fontStyle:'italic' }}>Today.</em>
              </h2>
              <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'1rem', fontWeight:300 }}>Join 2.4M+ users already earning through games, tasks & videos.</p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'14px', minWidth:'220px' }}>
              <Link to="/earn" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', background:'#fff', color:'#FF6B00', textDecoration:'none', padding:'16px 36px', borderRadius:'3px', fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.92rem', letterSpacing:'0.04em', textTransform:'uppercase', boxShadow:'0 8px 24px rgba(0,0,0,0.2)' }}>🚀 Start Free</Link>
              <Link to="/blog" style={{ display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(255,255,255,0.15)', color:'#fff', textDecoration:'none', padding:'14px 36px', borderRadius:'3px', fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:'0.88rem', border:'1.5px solid rgba(255,255,255,0.3)' }}>Read More Articles →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}