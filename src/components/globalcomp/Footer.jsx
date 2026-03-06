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

        /* ── FOOTER GRID — pure CSS, no Tailwind conflicts ── */
        #footer-container {
          max-width: 1380px;
          margin: 0 auto;
          padding: 56px 48px;
          position: relative;
          zIndex: 1;
        }

        #footer-cols {
          display: grid;
          grid-template-columns: 1.1fr 1fr 1fr 1fr;
          gap: 40px;
        }

        #footer-bottom-inner {
          max-width: 1380px;
          margin: 0 auto;
          padding: 20px 48px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        /* Ghost wordmark */
        .footer-wordmark {
          font-size: clamp(6rem, 18vw, 14rem);
        }

        /* ── TABLET (≤ 1024px): 2-col grid ── */
        @media (max-width: 1024px) {
          #footer-cols {
            grid-template-columns: 1fr 1fr;
            gap: 40px 32px;
          }
          .footer-wordmark {
            font-size: clamp(5rem, 16vw, 10rem) !important;
          }
        }

        /* ── MOBILE (≤ 640px): single column ── */
        @media (max-width: 640px) {
          #footer-container {
            padding: 40px 20px;
          }
          #footer-cols {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          #footer-bottom-inner {
            padding: 16px 20px;
            flex-direction: column;
            text-align: center;
          }
          .footer-wordmark {
            font-size: clamp(4rem, 22vw, 7rem) !important;
          }
          .footer-bottom-links {
            justify-content: center;
          }
          .footer-rewards-btn {
            display: flex !important;
            width: 100%;
            justify-content: center;
          }
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

        {/* ══ ROW 1 — Google Map (commented out) ══ */}
        {/* <div style={{ maxWidth:1380, margin:'0 auto', padding:'40px 48px 0', position:'relative', zIndex:1 }}>
          ...map iframe...
        </div> */}

        {/* ══ MAIN GRID ══ */}
        <div id="footer-container" style={{ position: 'relative', zIndex: 1 }}>

          {/* Orange gradient divider */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, #FF6B00, rgba(255,107,0,0.1), transparent)', marginBottom: 52 }} />

          <div id="footer-cols">

            {/* ── Col 1: Logo + About ── */}
            <div>
              <img
                src={Logo}
                alt="Revadoo"
                style={{ height: 48, width: 'auto', marginBottom: 24 }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{ width: 24, height: 2, background: '#FF6B00', flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.25em', color: '#FF6B00', textTransform: 'uppercase' }}>
                  EARN. REDEEM. REPEAT.
                </span>
              </div>
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
              <p style={{ fontWeight: 400, fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, letterSpacing: '0.01em', marginBottom: 18 }}>
                Fast, secure payouts via all major providers. No minimum required.
              </p>
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
                className="footer-rewards-btn"
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
          <div id="footer-bottom-inner">
            <p style={{ fontWeight: 400, fontSize: '0.85rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em', margin: 0 }}>
              © 2026{' '}
              <span style={{ color: '#FF6B00', fontWeight: 700 }}>Revadoo</span>
              . All Rights Reserved.
            </p>
            <div className="footer-bottom-links" style={{ display: 'flex', gap: 24 }}>
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