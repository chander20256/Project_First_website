import { useEffect, useState } from 'react'
import './Hero.css'  // ✅ fine

const words = ['Complete Tasks','Play Mini Games','Level Up','Beat Challenges','Get Paid']

export default function Hero() {
  const [visible, setVisible] = useState({ badge:false, headline:false, sub:false, ctas:false, trust:false })
  const [wordIndex, setWordIndex] = useState(0)
  const [wordState, setWordState] = useState('visible-tw')

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
        requestAnimationFrame(() => requestAnimationFrame(() => setWordState('visible-tw')))
      }, 350)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Three.js Hero Background — wait for CDN to load
    const canvas = document.getElementById('three-canvas')
    if (!canvas) return

    const init = () => {
      if (!window.THREE) {
        setTimeout(init, 100)
        return
      }

    const THREE = window.THREE
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const pCount = 150
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pos[i*3]   = (Math.random()-0.5)*90
      pos[i*3+1] = (Math.random()-0.5)*70
      pos[i*3+2] = (Math.random()-0.5)*50
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({ color: 0xFF6B00, size: 0.22, transparent: true, opacity: 0.55 })
    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    const makeIco = (r, x, y, z, op) => {
      const m = new THREE.Mesh(
        new THREE.IcosahedronGeometry(r, 2),
        new THREE.MeshBasicMaterial({ color: 0xFF6B00, wireframe: true, transparent: true, opacity: op })
      )
      m.position.set(x, y, z)
      scene.add(m)
      return m
    }
    const ico1 = makeIco(14, 20, -4, -12, 0.055)
    const ico2 = makeIco(7, -22, 10, -5, 0.07)
    const ico3 = makeIco(4,  8,  16, -8, 0.09)

    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(18, 0.08, 6, 60),
      new THREE.MeshBasicMaterial({ color: 0xFF6B00, transparent: true, opacity: 0.04 })
    )
    ring3.rotation.x = Math.PI / 4
    scene.add(ring3)

    let mx = 0, my = 0
    const onMouseMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5)*2
      my = (e.clientY / window.innerHeight - 0.5)*2
    }
    window.addEventListener('mousemove', onMouseMove)

    const clock = new THREE.Clock()
    let animId
    function animate() {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      particles.rotation.y = t * 0.025
      particles.rotation.x = t * 0.008
      ico1.rotation.x = t * 0.07; ico1.rotation.y = t * 0.11
      ico2.rotation.x = -t*0.05; ico2.rotation.y = t*0.08
      ico3.rotation.y = t*0.14; ico3.rotation.z = t*0.05
      ring3.rotation.z = t * 0.03
      camera.position.x += (mx*4 - camera.position.x)*0.018
      camera.position.y += (-my*3 - camera.position.y)*0.018
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    }

    init()
  }, [])

  return (
    <section id="hero">
      <canvas id="three-canvas"></canvas>
      <div className="hero-grid-overlay"></div>
      <div className="hero-glow"></div>

      <div className="hero-content">
        <div className={`hero-badge ${visible.badge ? 'visible' : ''}`} id="hero-badge">
          <div className="badge-dot"></div>
          <span>2.4M+ USERS EARNING DAILY</span>
        </div>

        <h1 className={`hero-headline ${visible.headline ? 'visible' : ''}`} id="hero-headline">
          <span id="typewriter-word" className={wordState}>{words[wordIndex]}</span><br />
          &amp; Get <span className="word-rewarded">REWARDED
            <svg viewBox="0 0 240 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 8 Q60 2 120 6 Q180 10 238 3" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" fill="none"/>
            </svg>
          </span>
        </h1>

        <p className={`hero-sub ${visible.sub ? 'visible' : ''}`} id="hero-sub">
          REVADOO turns your everyday time into tangible gains. Browse hundreds of tasks across surveys, games, creative challenges, and more — then convert your Creds into real gift cards, cash, and premium rewards.
        </p>

        <div className={`hero-ctas ${visible.ctas ? 'visible' : ''}`} id="hero-ctas">
          <a href="#tasks-section" className="btn-primary" style={{fontSize:'1rem',padding:'15px 36px'}}>
            Start Earning Free &nbsp;→
          </a>
          <a href="#rewards-section" className="btn-outline" style={{fontSize:'1rem',padding:'15px 36px'}}>
            View Rewards
          </a>
        </div>

        <div className={`hero-trust ${visible.trust ? 'visible' : ''}`} id="hero-trust">
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div className="avatar-stack">
              <div className="av" style={{background:'#FF6B00'}}>A</div>
              <div className="av" style={{background:'#3B82F6'}}>B</div>
              <div className="av" style={{background:'#10B981'}}>C</div>
              <div className="av" style={{background:'#8B5CF6'}}>D</div>
              <div className="av" style={{background:'#EF4444'}}>E</div>
            </div>
            <span className="trust-text"><strong>2.4M+</strong> active earners</span>
          </div>
          <div className="trust-divider"></div>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <div className="stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            <span className="trust-text"><strong>4.9/5</strong> rating</span>
          </div>
          <div className="trust-divider"></div>
          <span className="mono" style={{fontSize:'0.72rem',color:'var(--gray-500)',letterSpacing:'0.08em'}}>· FREE TO JOIN</span>
        </div>
      </div>

      {/* Floating Cards */}
      <div className="float-card fc-1">
        <div className="fc-xp">
          <div className="fc-xp-icon">⚡</div>
          <div>
            <div className="fc-label">+250 Creds</div>
            <div className="fc-sub">Just Click & earned!</div>
          </div>
        </div>
      </div>

      <div className="float-card fc-2">
        <div className="mono" style={{fontSize:'0.7rem',color:'var(--gray-500)',marginBottom:'8px',letterSpacing:'0.08em'}}>DAILY TASKS </div>
        <div className="fc-streak-row">
          <div className="streak-dot" style={{background:'var(--orange)'}}>✓</div>
          <div className="streak-dot" style={{background:'var(--orange)'}}>✓</div>
          <div className="streak-dot" style={{background:'var(--orange)'}}>✓</div>
          <div className="streak-dot" style={{background:'#e0e0e0'}}></div>
          <div className="streak-dot" style={{background:'#e0e0e0'}}></div>
          <div className="streak-dot" style={{background:'#e0e0e0'}}></div>
          <div className="streak-dot" style={{background:'#e0e0e0'}}></div>
        </div>
        <div style={{fontSize:'0.78rem',color:'var(--gray-700)',marginTop:'7px'}}>7 Day Login Rewards</div>
      </div>

      <div className="float-card fc-3">
        <div className="fc-gift">
          <div className="fc-gift-icon">🎁</div>
          <div>
            <div className="fc-gift-name">Amazon Gift Card</div>
            <div className="fc-gift-tag">UNLOCKED — $25</div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="si-label">SCROLL</div>
        <div className="scroll-mouse"><div className="scroll-wheel"></div></div>
      </div>
    </section>
  )
}