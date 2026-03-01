export default function MobileMenu({ menuOpen, closeMenu }) {
  const links = [
    { href: '#how-it-works',       label: 'How It Works' },
    { href: '#tasks-section',      label: 'Tasks' },
    { href: '#rewards-section',    label: 'Rewards' },
    { href: '#leaderboard-section',label: 'Leaderboard' },
    { href: '#pricing-section',    label: 'Pricing' },
  ]

  return (
    <nav
      id="mobile-menu"
      style={{
        position: 'fixed',
        top: '70px', left: 0, right: 0, bottom: 0,
        background: 'white',
        zIndex: 999,
        padding: '48px 32px',
        borderTop: '2px solid #FF6B00',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          onClick={closeMenu}
          className="block no-underline transition-colors duration-200 hover:text-[#FF6B00]"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '2.8rem',
            color: '#0A0A0A',
            padding: '16px 0',
            borderBottom: '1px solid #F0F0F0',
            letterSpacing: '0.04em',
          }}
        >
          {label}
        </a>
      ))}
      <a
        href="#cta-section"
        onClick={closeMenu}
        className="block no-underline transition-colors duration-200"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '2.8rem',
          color: '#FF6B00',
          padding: '16px 0',
          borderBottom: '1px solid #F0F0F0',
          letterSpacing: '0.04em',
        }}
      >
        Start Earning Free →
      </a>
    </nav>
  )
}