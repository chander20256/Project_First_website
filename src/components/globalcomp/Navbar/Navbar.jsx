import { useEffect, useState } from 'react'

export default function Navbar({ menuOpen, toggleMenu }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      id="navbar"
      className={scrolled ? 'scrolled' : ''}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        transition: 'background 0.4s, box-shadow 0.4s, border-color 0.4s',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 2px 40px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      {/* Inner */}
      <div className="flex items-center justify-between mx-auto px-12 max-w-[1380px] h-[70px]">

        {/* Logo */}
        <a
          href="#hero"
          className="no-underline hover:opacity-80 transition-opacity duration-200"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.8rem',
            color: '#0A0A0A',
            letterSpacing: '0.06em',
            paddingLeft: 200,
          }}
        >
          REVA<span style={{ color: '#FF6B00' }}>DOO</span>
        </a>

        {/* Nav links - hidden on mobile */}
        <ul className="hidden lg:flex items-center gap-12 list-none">
          {[
            { href: '#home',    label: 'Home' },
            { href: '#about',   label: 'About' },
            { href: '#blog',    label: 'Blog' },
            { href: '#contact', label: 'Contact Us' },
            { href: '#careers', label: 'Careers' },
          ].map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="relative no-underline transition-colors duration-200 hover:text-[#FF6B00] group"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#0A0A0A',
                  padding: '4px 0',
                }}
              >
                {label}
                {/* underline */}
                <span
                  className="absolute left-0 right-0 bottom-[-2px] h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[250ms]"
                  style={{ background: '#FF6B00' }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Right side - hidden on mobile */}
        <div className="hidden lg:flex items-center gap-4">
          {/* XP pill */}
          <div
            className="flex items-center gap-1.5 rounded-full px-4 py-[7px] cursor-pointer hover:scale-105 transition-transform duration-200"
            style={{
              background: 'rgba(255,107,0,0.08)',
              border: '1px solid rgba(255,107,0,0.25)',
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#FF6B00', fontWeight: 500 }}>⚡</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#FF6B00', fontWeight: 500 }}>0</span>
          </div>

          {/* Start Earning */}
          <a
            href="#cta-section"
            className="btn-primary"
          >
            Start Earning
          </a>

          {/* Login */}
          <a
            href="#login"
            className="flex items-center gap-1.5 no-underline transition-all duration-200 hover:text-[#FF6B00] hover:border-[#FF6B00] hover:bg-[rgba(255,107,0,0.08)] group"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#555555',
              letterSpacing: '0.02em',
              padding: '8px 14px',
              borderRadius: '5px',
              border: '1.5px solid #E0E0E0',
            }}
          >
            <svg
              width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="flex-shrink-0 transition-all duration-200"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Login</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex lg:hidden flex-col gap-[5px] bg-transparent border-none p-2"
          style={{ cursor: 'none' }}
          id="nav-toggle"
          aria-label="Menu"
          onClick={toggleMenu}
        >
          <span style={{
            display: 'block', width: '24px', height: '2px',
            background: '#0A0A0A', borderRadius: '1px',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2px',
            background: '#0A0A0A', borderRadius: '1px',
            transition: 'all 0.3s',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2px',
            background: '#0A0A0A', borderRadius: '1px',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
          }} />
        </button>
      </div>

      {/* Accent line */}
      <div
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #FF6B00, transparent)',
          transform: scrolled ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'center',
          transition: 'transform 0.5s',
        }}
      />
    </header>
  )
}