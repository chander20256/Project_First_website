import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// 👇 Add any dark-background page paths here
const DARK_PAGES = ['/blog']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isDarkPage  = DARK_PAGES.some(p => location.pathname.startsWith(p))
  const textColor   = scrolled ? '#0A0A0A' : (isDarkPage ? '#FFFFFF'               : '#0A0A0A')
  const subColor    = scrolled ? '#555555' : (isDarkPage ? 'rgba(255,255,255,0.8)' : '#555555')
  const borderColor = scrolled ? '#E0E0E0' : (isDarkPage ? 'rgba(255,255,255,0.2)' : '#E0E0E0')
  const burgerColor = scrolled ? '#0A0A0A' : (isDarkPage ? '#FFFFFF'               : '#0A0A0A')

  useEffect(() => {
    if (!document.getElementById('navbar-fonts')) {
      const link = document.createElement('link')
      link.id = 'navbar-fonts'
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap'
      document.head.appendChild(link)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const navLinks = [
    { to: '/',        label: 'Home' },
    { to: '/about',   label: 'About' },
    { to: '/blog',    label: 'Blog' },
    { to: '/contact', label: 'Contact Us' },
  ]

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <>
      <style>{`
        .nav-link {
          position: relative; text-decoration: none;
          display: inline-block; transition: color 0.2s;
        }
        .nav-link::after {
          content: ''; position: absolute;
          left: 0; right: 0; bottom: -2px;
          height: 2px; background: #FF6B00;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.25s ease;
        }
        .nav-link:hover { color: #FF6B00 !important; }
        .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
        .login-btn { transition: color 0.4s, border-color 0.4s, background 0.2s !important; }
        .login-btn:hover { color: #FF6B00 !important; border-color: #FF6B00 !important; background: rgba(255,107,0,0.08) !important; }
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'background 0.4s, box-shadow 0.4s, border-color 0.4s',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 2px 40px rgba(0,0,0,0.06)' : 'none',
      }}>
        <div className="flex items-center justify-between mx-auto px-6 lg:px-12 max-w-[1380px] h-[70px]">

          {/* Logo */}
          <Link to="/" style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem',
            letterSpacing: '0.06em', textDecoration: 'none',
            color: textColor, transition: 'color 0.4s',
          }}>
            EARN<span style={{ color: '#FF6B00' }}>FLOW</span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-10 list-none m-0 p-0">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`nav-link${isActive(to) ? ' active' : ''}`}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.88rem', fontWeight: 500,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: isActive(to) ? '#FF6B00' : textColor,
                    padding: '4px 0', transition: 'color 0.4s',
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Buttons */}
          <div className="hidden lg:flex items-center gap-3">

            {/* XP Pill */}
            <div className="flex items-center gap-1.5 rounded-full px-4 py-[7px] cursor-pointer hover:scale-105 transition-transform duration-200"
              style={{ background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.3)' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#FF6B00', fontWeight: 500 }}>⚡ 0 XP</span>
            </div>

            {/* Start Earning */}
            <Link to="/earn"
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 700,
                color: '#fff', letterSpacing: '0.04em', padding: '9px 20px', borderRadius: '6px',
                background: 'linear-gradient(135deg, #FF6B00 0%, #ff8c00 100%)',
                boxShadow: '0 4px 14px rgba(255,107,0,0.35)', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '6px',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
              Start Earning
            </Link>

            {/* Login */}
            <Link to="/AuthPage" className="login-btn flex items-center gap-2 no-underline"
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600,
                color: subColor, letterSpacing: '0.02em', padding: '8px 16px',
                borderRadius: '6px', border: `1.5px solid ${borderColor}`,
                textDecoration: 'none', transition: 'color 0.4s, border-color 0.4s',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Login / Sign Up
            </Link>
          </div>

          {/* Hamburger */}
          <button className="flex lg:hidden flex-col gap-[5px] bg-transparent border-none p-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ display:'block', width:'24px', height:'2px', background: burgerColor, borderRadius:'1px', transition:'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ display:'block', width:'24px', height:'2px', background: burgerColor, borderRadius:'1px', transition:'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display:'block', width:'24px', height:'2px', background: burgerColor, borderRadius:'1px', transition:'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>

        {/* Scroll accent line */}
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #FF6B00, transparent)',
          transform: scrolled ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'center', transition: 'transform 0.5s',
        }} />
      </header>

      {/* Mobile Drawer */}
      <div className="lg:hidden fixed inset-0 z-[999]" style={{ pointerEvents: menuOpen ? 'all' : 'none' }}>
        <div onClick={() => setMenuOpen(false)} style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
          opacity: menuOpen ? 1 : 0, transition: 'opacity 0.3s',
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '280px', height: '100%',
          background: '#fff', boxShadow: '-8px 0 40px rgba(0,0,0,0.2)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex', flexDirection: 'column', padding: '80px 24px 32px',
        }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.5rem', color:'#0A0A0A', letterSpacing:'0.06em', marginBottom:'20px' }}>
            EARN<span style={{ color:'#FF6B00' }}>FLOW</span>
          </div>
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:'1rem', fontWeight:500,
              letterSpacing:'0.06em', textTransform:'uppercase',
              color: isActive(to) ? '#FF6B00' : '#0A0A0A',
              padding:'14px 0', borderBottom:'1px solid rgba(0,0,0,0.06)', textDecoration:'none',
            }}>{label}</Link>
          ))}
          <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginTop:'28px' }}>
            <Link to="/earn" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.9rem', fontWeight:700, color:'#fff', padding:'13px 20px', borderRadius:'6px', textAlign:'center', textDecoration:'none', background:'linear-gradient(135deg,#FF6B00,#ff8c00)', boxShadow:'0 4px 14px rgba(255,107,0,0.3)' }}>⚡ Start Earning</Link>
            <Link to="/auth" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.9rem', fontWeight:600, color:'#555', padding:'12px 20px', borderRadius:'6px', border:'1.5px solid #E0E0E0', textDecoration:'none', textAlign:'center' }}>Login / Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  )
}