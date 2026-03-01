import './Mobilemenu.css'  // match exact filename capitalization

export default function MobileMenu({ menuOpen, closeMenu }) {
  return (
    <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobile-menu">
      <a href="#how-it-works" onClick={closeMenu}>How It Works</a>
      <a href="#tasks-section" onClick={closeMenu}>Tasks</a>
      <a href="#rewards-section" onClick={closeMenu}>Rewards</a>
      <a href="#leaderboard-section" onClick={closeMenu}>Leaderboard</a>
      <a href="#pricing-section" onClick={closeMenu}>Pricing</a>
      <a href="#cta-section" onClick={closeMenu} style={{color:'var(--orange)'}}>Start Earning Free →</a>
    </nav>
  )
}