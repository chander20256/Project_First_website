import { useEffect, useState, useRef } from 'react'
import TickerBar from './TickerBar'
import HowItWorks from './HowItWorks'
import TasksSection from './TasksSection'
import RewardsSection from './RewardsSection'
import Leaderboard from './Leaderboard'
import FAQ from './FAQ'
import Testimonials from './Testimonials'
import CTASECTION from './CTASECTION'
import React from 'react'


/* ─────────────────────── GLOBAL STYLES injected once ─────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;600&family=Manrope:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Manrope', sans-serif;
    background: #FAFAFA;
    color: #0A0A0A;
    overflow-x: hidden;
  }

  :root {
    --orange: #FF6B00;
    --orange-light: #FFF5EE;
    --orange-mid: rgba(255,107,0,0.12);
    --dark: #0A0A0A;
    --mid: #555555;
    --soft: #999999;
    --line: rgba(0,0,0,0.08);
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #f0f0f0; }
  ::-webkit-scrollbar-thumb { background: var(--orange); border-radius: 4px; }

  /* Keyframes */
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-12px); }
  }
  @keyframes floatX {
    0%,100% { transform: translate(0,0) rotate(0deg); }
    33%      { transform: translate(8px,-14px) rotate(6deg); }
    66%      { transform: translate(-6px,-8px) rotate(-4deg); }
  }
  @keyframes pulse-dot {
    0%,100% { box-shadow: 0 0 0 0 rgba(255,107,0,0.4); }
    50%      { box-shadow: 0 0 0 8px rgba(255,107,0,0); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes spin-rev {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  @keyframes orbit {
    from { transform: rotate(0deg) translateX(52px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(52px) rotate(-360deg); }
  }
  @keyframes orbit2 {
    from { transform: rotate(180deg) translateX(36px) rotate(-180deg); }
    to   { transform: rotate(540deg) translateX(36px) rotate(-540deg); }
  }
  @keyframes reveal-up {
    from { opacity:0; transform:translateY(40px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes bar-fill {
    from { width: 0%; }
    to   { width: var(--w); }
  }
  @keyframes count-up {
    from { opacity:0; transform: scale(0.7); }
    to   { opacity:1; transform: scale(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes card-hover-glow {
    0%,100% { box-shadow: 0 8px 32px rgba(255,107,0,0.08); }
    50%      { box-shadow: 0 16px 48px rgba(255,107,0,0.18); }
  }
  @keyframes ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes coinFlip {
    0%   { transform: rotateY(0deg) scale(1); }
    50%  { transform: rotateY(90deg) scale(1.1); }
    100% { transform: rotateY(180deg) scale(1); }
  }
  @keyframes levelPulse {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.06); }
  }
  @keyframes gradMove {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Buttons */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--orange);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
    box-shadow: 0 4px 20px rgba(255,107,0,0.35);
  }
  .btn-primary:hover {
    background: #e55f00;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(255,107,0,0.45);
  }
  .btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent;
    color: var(--dark);
    border: 1.5px solid rgba(0,0,0,0.14);
    border-radius: 12px;
    font-family: 'Manrope', sans-serif;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.2s, border-color 0.2s, background 0.2s;
  }
  .btn-outline:hover {
    border-color: var(--orange);
    color: var(--orange);
    transform: translateY(-2px);
  }

  /* Section label */
  .sec-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    color: var(--orange);
    text-transform: uppercase;
    margin-bottom: 16px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .sec-label::before {
    content: '';
    display: inline-block;
    width: 24px; height: 2px;
    background: var(--orange);
    border-radius: 2px;
  }

  /* Reveal animation helper */
  .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* Phone mockup slider */
  @keyframes phoneFloat {
    0%,100% { transform: translateY(0px) rotate(1.5deg); }
    50%      { transform: translateY(-20px) rotate(-1deg); }
  }
  @keyframes slideInRight {
    from { opacity:0; transform: translateX(32px); }
    to   { opacity:1; transform: translateX(0); }
  }
  @keyframes slideOutLeft {
    from { opacity:1; transform: translateX(0); }
    to   { opacity:0; transform: translateX(-32px); }
  }
  @keyframes dotPop {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.35); }
  }
  @keyframes screenGlow {
    0%,100% { box-shadow: 0 32px 80px rgba(255,107,0,0.18), 0 0 0 1px rgba(255,107,0,0.1); }
    50%      { box-shadow: 0 40px 100px rgba(255,107,0,0.28), 0 0 0 1px rgba(255,107,0,0.18); }
  }
  @keyframes notifSlide {
    0%   { opacity:0; transform: translateY(-12px); }
    15%  { opacity:1; transform: translateY(0); }
    80%  { opacity:1; transform: translateY(0); }
    100% { opacity:0; transform: translateY(-12px); }
  }
  @keyframes barGrow {
    from { width: 0%; }
    to   { width: var(--bw, 70%); }
  }

  /* ── Hero two-column layout ── */
  .hero-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 48px;
    width: 100%;
    max-width: 1380px;
    margin: 0 auto;
    padding: 80px 48px;
  }
  .hero-left  { flex: 1 1 0; min-width: 0; }
  .hero-right {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
  }

  @media (max-width: 900px) {
    .hero-right  { display: none !important; }
    .hero-inner  { padding: 60px 20px !important; }
  }
`


/* ════════════════════ AUTO-SLIDING PHONE MOCKUP ════════════════════════ */
const SCREENS = [
  {
    id: 0,
    accent: '#FF6B00',
    bg: 'linear-gradient(160deg,#FFF5EE 0%,#FFE8CC 100%)',
    label: 'DASHBOARD',
    title: 'Your Earnings',
    value: '$128.50',
    valueSub: 'This Month',
    items: [
      { icon:'📋', name:'Daily Survey', creds:'+320 CR', bar:72, color:'#FF6B00' },
      { icon:'🎮', name:'Mini Game',    creds:'+550 CR', bar:88, color:'#3B82F6' },
      { icon:'🎨', name:'Design Task',  creds:'+200 CR', bar:45, color:'#8B5CF6' },
    ],
    notif: '⚡ New task added — +450 Creds',
  },
  {
    id: 1,
    accent: '#3B82F6',
    bg: 'linear-gradient(160deg,#EFF6FF 0%,#DBEAFE 100%)',
    label: 'MINI GAMES',
    title: 'Play & Earn',
    value: '+1,240 CR',
    valueSub: 'Won Today',
    items: [
      { icon:'🏆', name:'Speed Quiz',   creds:'+480 CR', bar:90, color:'#F59E0B' },
      { icon:'🎯', name:'Target Drop',  creds:'+360 CR', bar:65, color:'#10B981' },
      { icon:'🧩', name:'Word Puzzle',  creds:'+400 CR', bar:78, color:'#3B82F6' },
    ],
    notif: '🏆 You beat 94% of players!',
  },
  {
    id: 2,
    accent: '#10B981',
    bg: 'linear-gradient(160deg,#ECFDF5 0%,#D1FAE5 100%)',
    label: 'REWARDS',
    title: 'Cash Out',
    value: '$50.00',
    valueSub: 'Ready to Redeem',
    items: [
      { icon:'💵', name:'PayPal Cash',  creds:'500 CR',  bar:100, color:'#10B981' },
      { icon:'₿',  name:'Bitcoin',      creds:'1,200 CR',bar:55, color:'#F59E0B' },
      { icon:'🎁', name:'Amazon Card',  creds:'1,000 CR',bar:80, color:'#EF4444' },
    ],
    notif: '✅ Payout sent to PayPal!',
  },
  {
    id: 3,
    accent: '#8B5CF6',
    bg: 'linear-gradient(160deg,#F5F3FF 0%,#EDE9FE 100%)',
    label: 'LEADERBOARD',
    title: 'Top Earners',
    value: '#4',
    valueSub: 'Your Rank',
    items: [
      { icon:'👑', name:'Jordan K.',  creds:'128,540 CR', bar:100, color:'#FF6B00' },
      { icon:'🥈', name:'Maya R.',    creds:'112,200 CR', bar:87,  color:'#3B82F6' },
      { icon:'🥉', name:'Ethan W.',   creds:'98,750 CR',  bar:77,  color:'#10B981' },
    ],
    notif: '🔥 You moved up 2 spots!',
  },
]

const PhoneMockup = () => {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setActive(a => (a + 1) % SCREENS.length)
        setAnimating(false)
      }, 380)
    }, 3200)
    return () => clearInterval(t)
  }, [active])

  const s = SCREENS[active]

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20 }}>
      {/* Phone frame */}
      <div style={{
        width: 270,
        height: 520,
        borderRadius: 40,
        background: '#111',
        padding: 10,
        position: 'relative',
        animation: 'phoneFloat 5s ease-in-out infinite',
        boxShadow: '0 40px 100px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.08)',
      }}>
        {/* Screen */}
        <div style={{
          width: '100%', height: '100%',
          borderRadius: 32,
          background: s.bg,
          overflow: 'hidden',
          position: 'relative',
          animation: 'screenGlow 4s ease-in-out infinite',
          transition: 'background 0.5s ease',
        }}>
          {/* Status bar */}
          <div style={{ padding:'12px 18px 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.58rem', color:'rgba(0,0,0,0.35)', letterSpacing:'0.06em' }}>9:41</span>
            <div style={{ width:60, height:14, borderRadius:99, background:'rgba(0,0,0,0.12)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:36, height:6, borderRadius:99, background:'rgba(0,0,0,0.2)' }} />
            </div>
            <div style={{ display:'flex', gap:4, alignItems:'center' }}>
              {[3,2.5,2].map((h,i)=><div key={i} style={{ width:3, height:h*3, borderRadius:1, background:'rgba(0,0,0,0.3)' }}/>)}
            </div>
          </div>

          {/* Screen content */}
          <div style={{
            padding: '10px 16px 16px',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateX(-20px)' : 'translateX(0)',
            transition: 'opacity 0.32s ease, transform 0.32s ease',
          }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.6rem', letterSpacing:'0.14em', color:s.accent, marginBottom:6 }}>{s.label}</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1rem', letterSpacing:'0.04em', color:'#0A0A0A', marginBottom:2 }}>{s.title}</div>
            <div style={{ display:'flex', alignItems:'baseline', gap:6, marginBottom:16 }}>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2rem', color:s.accent, lineHeight:1 }}>{s.value}</span>
              <span style={{ fontSize:'0.65rem', color:'rgba(0,0,0,0.4)', fontFamily:"'JetBrains Mono',monospace" }}>{s.valueSub}</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {s.items.map((item, i) => (
                <div key={i} style={{ background:'rgba(255,255,255,0.72)', borderRadius:14, padding:'9px 12px',
                  backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.6)' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                      <span style={{ fontSize:14 }}>{item.icon}</span>
                      <span style={{ fontWeight:700, fontSize:'0.72rem', color:'#0A0A0A' }}>{item.name}</span>
                    </div>
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.85rem', color:item.color }}>{item.creds}</span>
                  </div>
                  <div style={{ background:'rgba(0,0,0,0.07)', borderRadius:99, height:3, overflow:'hidden' }}>
                    <div style={{ height:'100%', borderRadius:99, width:`${item.bar}%`, background:item.color,
                      transition:'width 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification pop */}
          <div style={{
            position:'absolute', bottom:16, left:10, right:10,
            background:'rgba(10,10,10,0.88)', borderRadius:14, padding:'9px 12px',
            backdropFilter:'blur(12px)',
            fontFamily:"'Manrope',sans-serif", fontSize:'0.68rem', fontWeight:600, color:'#fff',
            animation:'notifSlide 3.2s ease-in-out infinite',
            letterSpacing:'0.01em',
          }}>{s.notif}</div>
        </div>

        {/* Notch */}
        <div style={{ position:'absolute', top:18, left:'50%', transform:'translateX(-50%)',
          width:70, height:20, background:'#111', borderRadius:99, zIndex:5 }} />
      </div>

      {/* Dot indicators */}
      <div style={{ display:'flex', gap:8, alignItems:'center' }}>
        {SCREENS.map((_, i) => (
          <div key={i} onClick={() => setActive(i)} style={{
            width: i===active ? 20 : 6,
            height: 6, borderRadius:99,
            background: i===active ? s.accent : 'rgba(0,0,0,0.15)',
            transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
            cursor:'pointer',
          }} />
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════ HERO ═══════════════════════════════════ */
const words = ['Complete Tasks','Play Mini Games','Level Up','Beat Challenges','Get Paid']

const Hero = () => {
  const [visible, setVisible] = useState({ badge:false, headline:false, sub:false, ctas:false, trust:false })
  const [wordIndex, setWordIndex] = useState(0)
  const [wordState, setWordState] = useState('visible')

  useEffect(() => {
    setTimeout(() => setVisible(v => ({...v, badge:true})), 300)
    setTimeout(() => setVisible(v => ({...v, headline:true})), 500)
    setTimeout(() => setVisible(v => ({...v, sub:true})), 700)
    setTimeout(() => setVisible(v => ({...v, ctas:true, trust:true})), 900)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordState('exit')
      setTimeout(() => {
        setWordIndex(i => (i + 1) % words.length)
        setWordState('enter')
        requestAnimationFrame(() => requestAnimationFrame(() => setWordState('visible')))
      }, 350)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = document.getElementById('three-canvas')
    if (!canvas) return
    const init = () => {
      if (!window.THREE) { setTimeout(init, 100); return }
      const THREE = window.THREE
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 30
      const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      const pCount = 150
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(pCount * 3)
      for (let i = 0; i < pCount; i++) {
        pos[i*3]   = (Math.random()-.5)*90
        pos[i*3+1] = (Math.random()-.5)*70
        pos[i*3+2] = (Math.random()-.5)*50
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mat = new THREE.PointsMaterial({ color:0xFF6B00, size:0.22, transparent:true, opacity:0.55 })
      const particles = new THREE.Points(geo, mat)
      scene.add(particles)
      const makeIco = (r,x,y,z,op) => {
        const m = new THREE.Mesh(
          new THREE.IcosahedronGeometry(r, 2),
          new THREE.MeshBasicMaterial({ color:0xFF6B00, wireframe:true, transparent:true, opacity:op })
        )
        m.position.set(x,y,z); scene.add(m); return m
      }
      const ico1 = makeIco(14, 20, -4,-12, 0.055)
      const ico2 = makeIco(7, -22, 10, -5, 0.07)
      const ico3 = makeIco(4,   8, 16, -8, 0.09)
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(18,.08,6,60),
        new THREE.MeshBasicMaterial({ color:0xFF6B00, transparent:true, opacity:0.04 })
      )
      ring.rotation.x = Math.PI/4; scene.add(ring)
      let mx=0, my=0
      const onMM = e => { mx=(e.clientX/window.innerWidth-.5)*2; my=(e.clientY/window.innerHeight-.5)*2 }
      window.addEventListener('mousemove', onMM)
      const clock = new THREE.Clock()
      const animate = () => {
        requestAnimationFrame(animate)
        const t = clock.getElapsedTime()
        particles.rotation.y = t*.025; particles.rotation.x = t*.008
        ico1.rotation.x=t*.07; ico1.rotation.y=t*.11
        ico2.rotation.x=-t*.05; ico2.rotation.y=t*.08
        ico3.rotation.y=t*.14; ico3.rotation.z=t*.05
        ring.rotation.z = t*.03
        camera.position.x += (mx*4-camera.position.x)*.018
        camera.position.y += (-my*3-camera.position.y)*.018
        camera.lookAt(scene.position)
        renderer.render(scene, camera)
      }
      animate()
      const onResize = () => {
        camera.aspect = window.innerWidth/window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', onResize)
    }
    init()
  }, [])

  const wordStyle = {
    exit:    { opacity:0, transform:'translateY(-18px)', transition:'all 0.3s' },
    enter:   { opacity:0, transform:'translateY(18px)',  transition:'all 0.3s' },
    visible: { opacity:1, transform:'translateY(0)',     transition:'all 0.3s' },
  }[wordState]

  return (
    <section id="hero" style={{ position:'relative', display:'flex', alignItems:'center', minHeight:'100vh', background:'#fff', overflow:'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <canvas id="three-canvas" style={{ position:'absolute', inset:0, zIndex:0 }} />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" async />

      {/* Grid */}
      <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)',
        backgroundSize:'64px 64px' }} />

      {/* Glow */}
      <div style={{ position:'absolute', zIndex:1, pointerEvents:'none', top:'50%', left:'50%',
        width:'900px', height:'700px', transform:'translate(-50%,-50%)',
        background:'radial-gradient(ellipse,rgba(255,107,0,0.07) 0%,transparent 65%)' }} />

      {/* ── Two-column flex layout ── */}
      <div className="hero-inner" style={{ position:'relative', zIndex:2 }}>

        {/* LEFT — copy */}
        <div className="hero-left">

          {/* Badge */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, borderRadius:999, background:'#FFF5EE',
            border:'1px solid rgba(255,107,0,0.3)', padding:'8px 20px', marginBottom:36,
            opacity: visible.badge?1:0, transform: visible.badge?'translateY(0)':'translateY(20px)',
            transition:'opacity 0.6s, transform 0.6s' }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'#FF6B00', animation:'pulse-dot 2s ease infinite' }} />
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.74rem', color:'#FF6B00', letterSpacing:'0.1em' }}>
              2.4M+ USERS EARNING DAILY
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(3.8rem,7vw,7.5rem)', lineHeight:0.92,
            letterSpacing:'0.03em', color:'#0A0A0A', marginBottom:32, maxWidth:720,
            opacity:visible.headline?1:0, transform:visible.headline?'translateY(0) skewY(0)':'translateY(60px) skewY(2deg)',
            transition:'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)' }}>
            <span style={{ color:'#FF6B00', display:'inline-block', ...wordStyle }}>{words[wordIndex]}</span>
            <br />
            &amp; Get{' '}
            <span style={{ position:'relative', display:'inline-block' }}>
              REWARDED
              <svg viewBox="0 0 240 10" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ position:'absolute', left:0, bottom:'-10px', width:'100%' }}>
                <path d="M2 8 Q60 2 120 6 Q180 10 238 3" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" fill="none"/>
              </svg>
            </span>
          </h1>

          {/* Sub */}
          <p style={{ fontSize:'clamp(1rem,1.5vw,1.15rem)', color:'#555', lineHeight:1.75, maxWidth:540, marginBottom:48,
            opacity:visible.sub?1:0, transform:visible.sub?'translateY(0)':'translateY(30px)',
            transition:'opacity 0.7s 0.3s cubic-bezier(0.16,1,0.3,1), transform 0.7s 0.3s' }}>
            REVADOO turns your everyday time into tangible gains. Browse hundreds of tasks across surveys, games, creative challenges, and more — then convert your Creds into real gift cards, cash, and premium rewards.
          </p>

          {/* CTAs */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:16, marginBottom:56,
            opacity:visible.ctas?1:0, transition:'opacity 0.6s 0.5s' }}>
            <a href="#tasks-section" className="btn-primary" style={{ fontSize:'1rem', padding:'15px 36px' }}>Start Earning Free &nbsp;→</a>
            <a href="#rewards-section" className="btn-outline" style={{ fontSize:'1rem', padding:'15px 36px' }}>View Rewards</a>
          </div>

          {/* Trust bar */}
          <div style={{ display:'flex', alignItems:'center', flexWrap:'wrap', gap:28,
            opacity:visible.trust?1:0, transition:'opacity 0.6s 0.65s' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ display:'flex' }}>
                {[{l:'A',bg:'#FF6B00'},{l:'B',bg:'#3B82F6'},{l:'C',bg:'#10B981'},{l:'D',bg:'#8B5CF6'},{l:'E',bg:'#EF4444'}].map((av,i) => (
                  <div key={i} style={{ width:34, height:34, borderRadius:'50%', background:av.bg, border:'2px solid #fff',
                    color:'#fff', fontWeight:700, fontSize:13, display:'flex', alignItems:'center', justifyContent:'center',
                    marginLeft: i===0?0:'-10px' }}>{av.l}</div>
                ))}
              </div>
              <span style={{ fontSize:'0.85rem', color:'#999' }}>
                <strong style={{ color:'#0A0A0A' }}>2.4M+</strong> active earners
              </span>
            </div>
            <div style={{ width:1, height:24, background:'#E0E0E0' }} />
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ color:'#FF6B00', fontSize:13 }}>★★★★★</span>
              <span style={{ fontSize:'0.85rem', color:'#999' }}><strong style={{ color:'#0A0A0A' }}>4.9/5</strong> rating</span>
            </div>
            <div style={{ width:1, height:24, background:'#E0E0E0' }} />
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.72rem', color:'#999', letterSpacing:'0.08em' }}>FREE TO JOIN</span>
          </div>
        </div>

        {/* RIGHT — phone mockup, centered in its column */}
        <div className="hero-right">
          <PhoneMockup />
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:'absolute', bottom:40, left:'50%', transform:'translateX(-50%)',
        zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', gap:8,
        animation:'float 2s ease-in-out infinite' }}>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.68rem', color:'#999', letterSpacing:'0.12em' }}>SCROLL</div>
        <div style={{ width:24, height:38, border:'2px solid rgba(0,0,0,0.12)', borderRadius:12, padding:5, display:'flex', justifyContent:'center' }}>
          <div style={{ width:4, height:9, borderRadius:2, background:'#FF6B00', animation:'float 1.6s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  )
}

export default Hero;