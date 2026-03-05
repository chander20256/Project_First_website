import React from 'react'
import Logo from '../../assets/logo.png'

export default function Footer() {

  const quickLinks  = ['Home', 'About Us', 'Blog', 'FAQ', 'Contact Us']
  const legalLinks  = ['Terms & Conditions', 'Privacy Policy', 'Responsible Gaming']
  const payouts     = ['Visa', 'Mastercard', 'PayPal', 'Bitcoin', 'Crypto']

  const socialIcons = [
    {
      label: 'X / Twitter',
      svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    },
    {
      label: 'Instagram',
      svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>,
    },
    {
      label: 'YouTube',
      svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800;900&display=swap');

        @keyframes ghostFloat {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50%       { transform: translateX(-50%) translateY(-8px); }
        }

        .footer-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: #FF6B00;
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .footer-link:hover::after { width: 100%; }

        .social-icon {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5);
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
          text-decoration: none;
        }
        .social-icon:hover {
          background: #FF6B00;
          color: #fff;
          border-color: #FF6B00;
          transform: translateY(-3px);
        }

        .payout-badge {
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          cursor: default;
        }
        .payout-badge:hover {
          background: #FF6B00 !important;
          border-color: #FF6B00 !important;
        }

        /* Map responsive height */
        .footer-map { height: 220px; }

        @media (max-width: 640px) {
          .footer-map { height: 160px; }
          .footer-wordmark { font-size: clamp(4rem, 22vw, 7rem) !important; }
          .footer-bottom-bar { text-align: center; }
          .footer-bottom-links { justify-content: center; }
        }

        @media (min-width: 641px) and (max-width: 1023px) {
          .footer-wordmark { font-size: clamp(5rem, 16vw, 10rem) !important; }
        }
      `}</style>

      <footer style={{
        background: '#0A0A0A',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Barlow Condensed', sans-serif",
      }}>

        {/* Orange grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage:
            'linear-gradient(rgba(255,107,0,0.04) 1px,transparent 1px),' +
            'linear-gradient(90deg,rgba(255,107,0,0.04) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }} />

        {/* Radial glow */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: 900, height: 500, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at bottom, rgba(255,107,0,0.1) 0%, transparent 65%)',
        }} />

        {/* Ghost wordmark */}
        <div
          className="footer-wordmark"
          style={{
            position: 'absolute',
            bottom: 60, left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(6rem, 18vw, 14rem)',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.04)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 0,
            userSelect: 'none',
            animation: 'ghostFloat 8s ease-in-out infinite',
          }}
        >
          REVADOO
        </div>

        {/* ══ ROW 1 — Google Map ══ */}
        <div className="max-w-[1380px] mx-auto px-6 md:px-12 pt-10" style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="footer-map w-full overflow-hidden"
            style={{
              borderRadius: 20,
              border: '1px solid rgba(255,107,0,0.2)',
              boxShadow: '0 0 40px rgba(255,107,0,0.06)',
            }}
          >
            <iframe
              title="Revadoo Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343004!2d-73.9851076845846!3d40.7588969793269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%" height="100%"
              style={{ border: 0, filter: 'grayscale(1) brightness(0.6) contrast(1.2)' }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* ══ ROW 2 — Main 4-col footer grid ══ */}
        <div
          className="max-w-[1380px] mx-auto px-6 md:px-12 py-14"
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Orange gradient divider */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, #FF6B00, rgba(255,107,0,0.1), transparent)', marginBottom: 52 }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* ── Col 1: Logo + About ── */}
            <div>
              <img
                src={Logo}
                alt="Revadoo — Task and Earn Rewards Platform"
                className="h-12 w-auto mb-6"
              />

              {/* Orange dash label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{ width: 24, height: 2, background: '#FF6B00', flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.25em', color: '#FF6B00', textTransform: 'uppercase' }}>
                  EARN. REDEEM. REPEAT.
                </span>
              </div>

              {/* Bigger body text */}
              <p style={{
                fontWeight: 400, fontSize: '1.05rem',
                color: 'rgba(255,255,255,0.5)', lineHeight: 1.7,
                letterSpacing: '0.01em', maxWidth: 230, marginBottom: 24,
              }}>
                Turning spare time into real cash and gift cards for thousands of earners every day.
              </p>

              <div style={{ display: 'flex', gap: 8 }}>
                {socialIcons.map((s) => (
                  <a key={s.label} href="#" aria-label={s.label} className="social-icon">
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* ── Col 2: Quick Links ── */}
            <div>
              {/* Bigger column heading */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <div style={{ width: 24, height: 2, background: '#FF6B00' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                  Quick Links
                </span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {quickLinks.map((item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase().replace(/\s+/g, '')}`}
                      className="footer-link"
                      style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.1rem', letterSpacing: '0.04em' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#FF6B00'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                    >
                      <span style={{ color: '#FF6B00', fontSize: '0.6rem', flexShrink: 0 }}>▶</span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Legal + Contact ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

              {/* Legal */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                  <div style={{ width: 24, height: 2, background: '#FF6B00' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                    Legal
                  </span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {legalLinks.map((item) => (
                    <li key={item}>
                      <a
                        href={`/${item.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`}
                        className="footer-link"
                        style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.1rem', letterSpacing: '0.04em' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#FF6B00'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                      >
                        <span style={{ color: '#FF6B00', fontSize: '0.6rem', flexShrink: 0 }}>▶</span>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                  <div style={{ width: 24, height: 2, background: '#FF6B00' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                    Contact Us
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    {
                      href: 'mailto:Support@revadoo.com',
                      text: 'Support@revadoo.com',
                      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>,
                    },
                    {
                      href: 'tel:+111256562548',
                      text: '+1 112 565 62548',
                      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.574 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                    },
                  ].map(({ href, text, icon }) => (
                    <a
                      key={href} href={href}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#FF6B00'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                    >
                      <span style={{
                        width: 32, height: 32, flexShrink: 0,
                        background: 'rgba(255,107,0,0.1)',
                        border: '1px solid rgba(255,107,0,0.2)',
                        borderRadius: 8,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {icon}
                      </span>
                      {/* Bigger contact text */}
                      <span style={{ fontWeight: 400, fontSize: '1rem', letterSpacing: '0.02em' }}>{text}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Col 4: Payout Methods ── */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <div style={{ width: 24, height: 2, background: '#FF6B00' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                  Payout Methods
                </span>
              </div>

              {/* Bigger description */}
              <p style={{ fontWeight: 400, fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, letterSpacing: '0.01em', marginBottom: 18 }}>
                Fast, secure payouts via all major providers. No minimum required.
              </p>

              {/* Bigger payout badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {payouts.map((p) => (
                  <span
                    key={p}
                    className="payout-badge"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      color: 'rgba(255,255,255,0.8)',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700, fontSize: '0.8rem',
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '7px 16px', borderRadius: 99,
                      border: '1px solid rgba(255,107,0,0.2)',
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>

              <a
                href="#rewards-section"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'transparent', color: '#FF6B00',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: '0.95rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '12px 26px', borderRadius: 8,
                  border: '1.5px solid rgba(255,107,0,0.4)',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#FF6B00'
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.borderColor = '#FF6B00'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#FF6B00'
                  e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)'
                }}
              >
                View All Rewards →
              </a>
            </div>

          </div>
        </div>

        {/* ══ BOTTOM BAR ══ */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 1 }}>
          <div className="max-w-[1380px] mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-3 footer-bottom-bar">
            <p style={{ fontWeight: 400, fontSize: '0.85rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>
              © 2026{' '}
              <span style={{ color: '#FF6B00', fontWeight: 700 }}>Revadoo</span>
              . All Rights Reserved.
            </p>
            <div className="flex gap-6 footer-bottom-links">
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  style={{
                    fontWeight: 400, fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.25)',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    textDecoration: 'none', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FF6B00'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

      </footer>
    </>
  )
}