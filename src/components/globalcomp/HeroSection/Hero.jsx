import { useEffect, useState } from 'react'

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
    const canvas = document.getElementById('three-canvas')
    if (!canvas) return
    const init = () => {
      if (!window.THREE) { setTimeout(init, 100); return }
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
        m.position.set(x, y, z); scene.add(m); return m
      }
      const ico1 = makeIco(14, 20, -4, -12, 0.055)
      const ico2 = makeIco(7, -22, 10, -5, 0.07)
      const ico3 = makeIco(4, 8, 16, -8, 0.09)
      const ring3 = new THREE.Mesh(
        new THREE.TorusGeometry(18, 0.08, 6, 60),
        new THREE.MeshBasicMaterial({ color: 0xFF6B00, transparent: true, opacity: 0.04 })
      )
      ring3.rotation.x = Math.PI / 4; scene.add(ring3)
      let mx = 0, my = 0
      const onMouseMove = (e) => {
        mx = (e.clientX / window.innerWidth - 0.5)*2
        my = (e.clientY / window.innerHeight - 0.5)*2
      }
      window.addEventListener('mousemove', onMouseMove)
      const clock = new THREE.Clock()
      function animate() {
        requestAnimationFrame(animate)
        const t = clock.getElapsedTime()
        particles.rotation.y = t * 0.025; particles.rotation.x = t * 0.008
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

  const wordStyles = {
    'exit':       { opacity: 0, transform: 'translateY(-20px)', transition: 'opacity 0.3s, transform 0.3s' },
    'enter':      { opacity: 0, transform: 'translateY(20px)',  transition: 'opacity 0.3s, transform 0.3s' },
    'visible-tw': { opacity: 1, transform: 'translateY(0)',     transition: 'opacity 0.3s, transform 0.3s' },
  }

  return (
    <section
      id="hero"
      className="relative flex items-center min-h-screen bg-white overflow-hidden"
      style={{ paddingTop: '70px' }}
    >
      {/* Three.js canvas */}
      <canvas id="three-canvas" className="absolute inset-0 z-0" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Glow */}
      <div
        className="absolute z-[1] pointer-events-none"
        style={{
          top: '50%', left: '40%',
          width: '900px', height: '700px',
          background: 'radial-gradient(ellipse at center, rgba(255,107,0,0.06) 0%, transparent 65%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-[2] w-full mx-auto"
        style={{ maxWidth: '1380px', padding: '80px 48px' }}
      >
        {/* Badge */}
        <div
          id="hero-badge"
          className="inline-flex items-center gap-2 rounded-full mb-9"
          style={{
            background: '#FFF5EE',
            border: '1px solid rgba(255,107,0,0.3)',
            padding: '8px 20px',
            opacity: visible.badge ? 1 : 0,
            transform: visible.badge ? 'translateY(0)' : 'translateY(20px)',
            animation: visible.badge ? 'flip-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards' : 'none',
          }}
        >
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#FF6B00',
            animation: 'pulse-dot 2s ease infinite',
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem', color: '#FF6B00', letterSpacing: '0.1em',
          }}>
            2.4M+ USERS EARNING DAILY
          </span>
        </div>

        {/* Headline */}
        <h1
          id="hero-headline"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(3.8rem, 9vw, 8rem)',
            lineHeight: 0.92,
            letterSpacing: '0.03em',
            color: '#0A0A0A',
            marginBottom: '32px',
            maxWidth: '820px',
            opacity: visible.headline ? 1 : 0,
            transform: visible.headline ? 'translateY(0) skewY(0)' : 'translateY(60px) skewY(2deg)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <span id="typewriter-word" style={{ color: '#FF6B00', display: 'inline-block', ...wordStyles[wordState] }}>
            {words[wordIndex]}
          </span>
          <br />
          &amp; Get{' '}
          <span className="relative inline-block">
            REWARDED
            <svg
              viewBox="0 0 240 10" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="absolute left-0 w-full"
              style={{ bottom: '-10px' }}
            >
              <path d="M2 8 Q60 2 120 6 Q180 10 238 3" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" fill="none"/>
            </svg>
          </span>
        </h1>

        {/* Sub */}
        <p
          id="hero-sub"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: '#555555',
            lineHeight: 1.75,
            maxWidth: '580px',
            marginBottom: '48px',
            opacity: visible.sub ? 1 : 0,
            transform: visible.sub ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s 0.3s cubic-bezier(0.16,1,0.3,1), transform 0.7s 0.3s',
          }}
        >
          REVADOO turns your everyday time into tangible gains. Browse hundreds of tasks across surveys, games, creative challenges, and more — then convert your Creds into real gift cards, cash, and premium rewards.
        </p>

        {/* CTAs */}
        <div
          id="hero-ctas"
          className="flex flex-wrap gap-4"
          style={{
            marginBottom: '56px',
            opacity: visible.ctas ? 1 : 0,
            transition: 'opacity 0.6s 0.5s',
          }}
        >
          <a href="#tasks-section" className="btn-primary" style={{ fontSize: '1rem', padding: '15px 36px' }}>
            Start Earning Free &nbsp;→
          </a>
          <a href="#rewards-section" className="btn-outline" style={{ fontSize: '1rem', padding: '15px 36px' }}>
            View Rewards
          </a>
        </div>

        {/* Trust */}
        <div
          id="hero-trust"
          className="flex items-center flex-wrap"
          style={{
            gap: '28px',
            opacity: visible.trust ? 1 : 0,
            transition: 'opacity 0.6s 0.65s',
          }}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex">
              {[
                { l:'A', bg:'#FF6B00' }, { l:'B', bg:'#3B82F6' },
                { l:'C', bg:'#10B981' }, { l:'D', bg:'#8B5CF6' },
                { l:'E', bg:'#EF4444' },
              ].map((av, i) => (
                <div key={i} className="flex items-center justify-center rounded-full border-2 border-white text-white font-bold"
                  style={{ width:'34px', height:'34px', background: av.bg, fontSize:'13px', marginLeft: i===0 ? 0 : '-10px' }}>
                  {av.l}
                </div>
              ))}
            </div>
            <span style={{ fontSize:'0.85rem', color:'#999999' }}>
              <strong style={{ color:'#0A0A0A' }}>2.4M+</strong> active earners
            </span>
          </div>

          <div style={{ width:'1px', height:'24px', background:'#E0E0E0' }} />

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {['★','★','★','★','★'].map((s,i) => (
                <span key={i} style={{ color:'#FF6B00', fontSize:'13px' }}>{s}</span>
              ))}
            </div>
            <span style={{ fontSize:'0.85rem', color:'#999999' }}>
              <strong style={{ color:'#0A0A0A' }}>4.9/5</strong> rating
            </span>
          </div>

          <div style={{ width:'1px', height:'24px', background:'#E0E0E0' }} />

          <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:'0.72rem', color:'#999999', letterSpacing:'0.08em' }}>
            · FREE TO JOIN
          </span>
        </div>
      </div>

      {/* Floating Cards — hidden on mobile */}
      <div className="hidden md:block absolute z-[3] bg-white rounded-2xl"
        style={{
          right:'7%', top:'22%', padding:'16px 20px',
          border:'1px solid rgba(0,0,0,0.08)',
          boxShadow:'0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,107,0,0.06)',
          animation:'float 3.8s ease-in-out infinite',
        }}>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center rounded-[10px] text-xl"
            style={{ width:'42px', height:'42px', background:'#FFF5EE' }}>⚡</div>
          <div>
            <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:'1.5rem', color:'#FF6B00', lineHeight:1 }}>+250 Creds</div>
            <div style={{ fontSize:'0.75rem', color:'#999999' }}>Just Click &amp; earned!</div>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute z-[3] bg-white rounded-2xl"
        style={{
          right:'11%', top:'52%', padding:'16px 20px',
          border:'1px solid rgba(0,0,0,0.08)',
          boxShadow:'0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,107,0,0.06)',
          animation:'float 4.5s ease-in-out infinite', animationDelay:'0.8s',
        }}>
        <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:'0.7rem', color:'#999999', marginBottom:'8px', letterSpacing:'0.08em' }}>
          DAILY TASKS
        </div>
        <div className="flex gap-1 mt-1.5">
          {[true,true,true,false,false,false,false].map((filled,i) => (
            <div key={i} className="flex items-center justify-center text-white rounded-[5px]"
              style={{ width:'22px', height:'22px', fontSize:'9px', background: filled ? '#FF6B00' : '#e0e0e0' }}>
              {filled ? '✓' : ''}
            </div>
          ))}
        </div>
        <div style={{ fontSize:'0.78rem', color:'#555555', marginTop:'7px' }}>7 Day Login Rewards</div>
      </div>

      <div className="hidden md:block absolute z-[3] bg-white rounded-2xl"
        style={{
          right:'3%', top:'74%', padding:'16px 20px',
          border:'1px solid rgba(0,0,0,0.08)',
          boxShadow:'0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,107,0,0.06)',
          animation:'float 3.2s ease-in-out infinite', animationDelay:'0.4s',
        }}>
        <div className="flex items-center gap-2.5">
          <div style={{ fontSize:'26px' }}>🎁</div>
          <div>
            <div className="font-bold" style={{ fontSize:'0.88rem', color:'#0A0A0A' }}>Amazon Gift Card</div>
            <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:'0.7rem', color:'#FF6B00' }}>UNLOCKED — $25</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute left-1/2 z-[2] flex flex-col items-center gap-2"
        style={{ bottom:'40px', transform:'translateX(-50%)', animation:'float 2s ease-in-out infinite' }}>
        <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:'0.68rem', color:'#999999', letterSpacing:'0.12em' }}>
          SCROLL
        </div>
        <div className="flex items-start justify-center"
          style={{ width:'24px', height:'38px', border:'2px solid rgba(0,0,0,0.12)', borderRadius:'12px', padding:'5px' }}>
          <div style={{ width:'4px', height:'9px', borderRadius:'2px', background:'#FF6B00', animation:'float 1.6s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  )
}