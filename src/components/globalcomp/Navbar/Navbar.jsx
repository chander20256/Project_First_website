import { useEffect, useState } from 'react'
import './Navbar.css'

export default function Navbar({ menuOpen, toggleMenu }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">REWARD<span>QUEST</span></a>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li><a href="#careers">Careers</a></li>
        </ul>

        <div className="nav-right">
          <div className="xp-pill">
            <span>⚡</span>
            <span>0</span>
          </div>
          <a href="#cta-section" className="btn-primary">Start Earning</a>
          <a href="#login" className="nav-login">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Login</span>
          </a>
        </div>

        <button className="nav-toggle" id="nav-toggle" aria-label="Menu" onClick={toggleMenu}>
          <span style={menuOpen ? {transform:'rotate(45deg) translate(5px,5px)'} : {}}></span>
          <span style={menuOpen ? {opacity:0} : {}}></span>
          <span style={menuOpen ? {transform:'rotate(-45deg) translate(5px,-5px)'} : {}}></span>
        </button>
      </div>
      <div className="nav-accent-line"></div>
    </header>
  )
}