import React from 'react'

const Label = ({ text, center = false }) => (
  <div style={{
    display: 'flex', alignItems: 'center',
    justifyContent: center ? 'center' : 'flex-start',
    gap: 12, marginBottom: 24,
  }}>
    <div style={{ width: 32, height: 2, background: '#FF6B00', flexShrink: 0 }} />
    <span style={{
      fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
      fontSize: '0.75rem', letterSpacing: '0.25em', color: '#FF6B00', textTransform: 'uppercase',
    }}>{text}</span>
  </div>
)

const Heading = ({ children, light = false, center = false }) => (
  <h2 style={{
    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
    fontSize: 'clamp(2.2rem, 6vw, 6rem)', letterSpacing: '-0.01em',
    lineHeight: 0.95, marginBottom: 28,
    color: light ? '#ffffff' : '#0A0A0A',
    textTransform: 'uppercase', textAlign: center ? 'center' : 'left',
  }}>{children}</h2>
)

const Body = ({ children, light = false, center = false }) => (
  <p style={{
    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 400,
    fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
    color: light ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
    lineHeight: 1.7, letterSpacing: '0.01em',
    textAlign: center ? 'center' : 'left',
  }}>{children}</p>
)

const gridBg = {
  backgroundImage:
    'linear-gradient(rgba(255,107,0,0.04) 1px,transparent 1px),' +
    'linear-gradient(90deg,rgba(255,107,0,0.04) 1px,transparent 1px)',
  backgroundSize: '64px 64px',
}

const BtnPrimary = ({ children, href = '#' }) => (
  <a href={href} style={{
    display: 'inline-block', background: '#FF6B00', color: '#fff',
    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
    fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase',
    padding: '15px 40px', borderRadius: 8, textDecoration: 'none', transition: 'background 0.2s',
  }}
    onMouseEnter={e => e.currentTarget.style.background = '#e55f00'}
    onMouseLeave={e => e.currentTarget.style.background = '#FF6B00'}
  >{children}</a>
)

const BtnOutline = ({ children, href = '#', light = false }) => (
  <a href={href} style={{
    display: 'inline-block', background: 'transparent',
    color: light ? '#fff' : '#0A0A0A',
    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
    fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase',
    padding: '14px 40px', borderRadius: 8,
    border: `2px solid ${light ? 'rgba(255,255,255,0.3)' : '#0A0A0A'}`,
    textDecoration: 'none', transition: 'all 0.2s',
  }}
    onMouseEnter={e => { e.currentTarget.style.background = light ? '#fff' : '#0A0A0A'; e.currentTarget.style.color = light ? '#0A0A0A' : '#fff' }}
    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = light ? '#fff' : '#0A0A0A' }}
  >{children}</a>
)

const AboutUs = () => {
  const pillars = [
    { icon: '⚡', title: 'Instant Rewards', desc: 'Complete tasks and get paid fast. No waiting periods, no minimums — your Creds are yours the moment you earn them.' },
    { icon: '🎯', title: 'Real Opportunities', desc: 'Every task on our platform is vetted and valued. We connect you with brands and surveys that respect your time.' },
    { icon: '🔒', title: 'Safe & Transparent', desc: 'No hidden fees. No data selling. Your earnings and personal information are always protected on our platform.' },
  ]

  const team = [
    { name: 'Chandar Prakash', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80' },
    { name: 'Divya Gupta', role: 'AI&ML Developer', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80' },
    { name: 'Anmol', role: 'Lead App Developer', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80' },
    { name: 'Suraj', role: 'Lead Developer', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80' },
    { name: 'Kapil', role: 'Lead Developer', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80' },
    { name: 'Hardeep Saini', role: 'Developer', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80' },
    { name: 'Chirag', role: 'Developer', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80' },
    { name: 'Shagun', role: 'UX Designer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80' },
    { name: 'Sahil', role: 'UX Designer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Who We Are: 2-col grid ── */
        .about-who-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .about-who-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        /* ── Floating stat badge ── */
        .about-stat-badge {
          position: absolute;
          top: 24px;
          right: -24px;
          background: #0A0A0A;
          border-radius: 16px;
          padding: 16px 24px;
          border: 1px solid rgba(255,107,0,0.3);
        }
        @media (max-width: 900px) {
          .about-stat-badge {
            top: 16px;
            right: 16px;
          }
        }

        /* ── Stats bar: 4-col → 2-col → 1-col ── */
        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          text-align: center;
        }
        @media (max-width: 768px) {
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0;
          }
          .about-stats-grid .stat-item {
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.08);
            padding: 24px 16px !important;
          }
          .about-stats-grid .stat-item:nth-child(2) {
            border-left: 1px solid rgba(255,255,255,0.08) !important;
          }
          .about-stats-grid .stat-item:nth-child(3) {
            border-left: none !important;
          }
          .about-stats-grid .stat-item:nth-child(4) {
            border-left: 1px solid rgba(255,255,255,0.08) !important;
          }
          .about-stats-grid .stat-item:first-child,
          .about-stats-grid .stat-item:nth-child(2) {
            border-top: none;
          }
        }
        @media (max-width: 400px) {
          .about-stats-grid {
            grid-template-columns: 1fr;
          }
          .about-stats-grid .stat-item {
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.08) !important;
          }
          .about-stats-grid .stat-item:first-child {
            border-top: none !important;
          }
        }

        /* ── Team header: flex row → column ── */
        .about-team-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 64px;
          flex-wrap: wrap;
          gap: 32px;
        }
        @media (max-width: 600px) {
          .about-team-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        /* ── Buttons row ── */
        .about-btn-row {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        @media (max-width: 480px) {
          .about-btn-row a {
            width: 100%;
            text-align: center;
          }
        }

        /* ── Section paddings ── */
        .about-section-pad {
          padding: clamp(60px, 10vw, 120px) clamp(20px, 5vw, 48px);
        }
        .about-section-pad-sm {
          padding: clamp(36px, 6vw, 60px) clamp(20px, 5vw, 48px);
        }

        /* ── Image height ── */
        .about-who-img {
          width: 100%;
          height: clamp(260px, 40vw, 400px);
          object-fit: cover;
          border-radius: 22px;
          display: block;
        }

        /* ── Hero height ── */
        .about-hero {
          position: relative;
          min-height: clamp(300px, 50vw, 440px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* ── Team grid ── */
        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 20px;
        }
        @media (max-width: 480px) {
          .about-team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        /* ── Orange corner accent ── */
        .about-corner-accent {
          position: absolute;
          bottom: -16px;
          left: -16px;
          width: 80px;
          height: 80px;
          background: #FF6B00;
          border-radius: 16px;
          z-index: -1;
        }
        @media (max-width: 900px) {
          .about-corner-accent {
            display: none;
          }
        }
      `}</style>

      <main style={{ background: '#ffffff', fontFamily: "'Barlow Condensed', sans-serif" }}>

        {/* ════ 1. HERO ════ */}
        <section className="about-hero">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=600&fit=crop&q=80"
            alt="People earning rewards by completing tasks online"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.78)' }} />
          <div style={{ position: 'absolute', inset: 0, ...gridBg, pointerEvents: 'none' }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 'min(800px,90vw)', height: 500, pointerEvents: 'none',
            background: 'radial-gradient(ellipse,rgba(255,107,0,0.1) 0%,transparent 70%)',
          }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 clamp(16px,5vw,24px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 32, height: 2, background: '#FF6B00' }} />
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.25em', color: '#FF6B00', textTransform: 'uppercase' }}>
                ABOUT US
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
              fontSize: 'clamp(2.5rem, 8vw, 7rem)', letterSpacing: '-0.01em',
              lineHeight: 0.95, color: '#ffffff', textTransform: 'uppercase', marginBottom: 24,
            }}>
              DO TASKS.<br />
              <span style={{ color: '#FF6B00' }}>EARN REWARDS.</span>
            </h1>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 400,
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '0 auto',
              lineHeight: 1.7, letterSpacing: '0.01em',
            }}>
              We built the simplest way to turn your spare time into real cash, gift cards, and more.
            </p>
          </div>
        </section>

        {/* ════ 2. WHO WE ARE ════ */}
        <section className="about-section-pad" style={{ background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, ...gridBg, pointerEvents: 'none' }} />
          <div style={{
            position: 'absolute', top: '50%', right: 0, width: 600, height: 600, pointerEvents: 'none',
            transform: 'translateY(-50%)',
            background: 'radial-gradient(ellipse,rgba(255,107,0,0.06) 0%,transparent 70%)',
          }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="about-who-grid">
              {/* Left — text */}
              <div>
                <Label text="Who We Are" />
                <Heading>WE MAKE EARNING<br /><span style={{ color: '#FF6B00' }}>EFFORTLESS</span></Heading>
                <Body>
                  We're a team obsessed with one idea: your time has value. Our platform connects millions of users with brands, surveys, and micro-tasks — and pays them instantly in the rewards they actually want.
                </Body>
                <br />
                <Body>
                  Since day one we've paid out over $10 million in rewards to users in 50+ countries. No games, no tricks — just complete tasks and get paid.
                </Body>
                <div style={{ marginTop: 36 }}>
                  <BtnPrimary href="#tasks-section">Start Earning →</BtnPrimary>
                </div>
              </div>
              {/* Right — image */}
              <div style={{ position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop&q=80"
                  alt="Dashboard showing tasks and earnings on a rewards platform"
                  className="about-who-img"
                />
                <div className="about-corner-accent" />
                <div className="about-stat-badge">
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.5rem)', color: '#FF6B00', lineHeight: 1 }}>$10M+</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 400, fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>Paid Out</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════ 3. STATS BAR ════ */}
        <section className="about-section-pad-sm" style={{ background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, ...gridBg, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="about-stats-grid">
              {[
                { number: '2M+', label: 'Active Earners' },
                { number: '100+', label: 'Reward Options' },
                { number: '$0', label: 'Minimum Payout' },
                { number: '4.9★', label: 'User Rating' },
              ].map((s, i) => (
                <div key={i} className="stat-item" style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none', padding: '0 24px' }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900,
                    fontSize: 'clamp(2rem, 4vw, 4rem)', color: '#FF6B00',
                    letterSpacing: '-0.01em', lineHeight: 1,
                  }}>{s.number}</div>
                  <div style={{
                    fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 400,
                    fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)',
                    letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 8,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════ 4. WHY US ════ */}
        <section className="about-section-pad" style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=700&fit=crop&q=80"
            alt="Analytics and earning data on screen"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.85)' }} />
          <div style={{ position: 'absolute', inset: 0, ...gridBg, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,72px)' }}>
              <Label text="Why Us?" center />
              <Heading light center>WHY MILLIONS<br /><span style={{ color: '#FF6B00' }}>TRUST OUR PLATFORM</span></Heading>
              <div style={{ maxWidth: 520, margin: '0 auto' }}>
                <Body light center>
                  We built this platform around one principle: if you put in the work, you deserve to get paid — fast, fairly, and without hassle.
                </Body>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24 }}>
              {pillars.map((p, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.04)', borderRadius: 22,
                  border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(24px,4vw,36px) clamp(20px,3vw,32px)',
                  transition: 'border-color 0.3s, background 0.3s, transform 0.3s', cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)'; e.currentTarget.style.background = 'rgba(255,107,0,0.06)'; e.currentTarget.style.transform = 'translateY(-6px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: '1.4rem', color: '#fff', letterSpacing: '-0.01em', textTransform: 'uppercase', marginBottom: 12 }}>{p.title}</div>
                  <Body light>{p.desc}</Body>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════ 5. TEAM ════ */}
        <section className="about-section-pad" style={{ background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, ...gridBg, pointerEvents: 'none' }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 'min(800px,90vw)', height: 600, pointerEvents: 'none',
            background: 'radial-gradient(ellipse,rgba(255,107,0,0.06) 0%,transparent 70%)',
          }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="about-team-header">
              <div>
                <Label text="Our Team" />
                <Heading>THE PEOPLE WHO<br /><span style={{ color: '#FF6B00' }}>MAKE IT HAPPEN</span></Heading>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(4rem, 10vw, 8rem)', color: '#FF6B00', lineHeight: 1 }}>
                  {team.length}
                </span>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 400, fontSize: '0.8rem', color: 'rgba(0,0,0,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12, lineHeight: 1.6 }}>
                  CORE<br />TEAM<br />MEMBERS
                </span>
              </div>
            </div>
            <div className="about-team-grid">
              {team.map((m, i) => (
                <div key={i} style={{ background: '#000', borderRadius: 22, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', transition: 'transform 0.3s, border-color 0.3s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)' }}
                >
                  <img
                    src={m.img}
                    alt={`${m.name}, ${m.role} at our rewards platform`}
                    style={{ width: '100%', height: 'clamp(150px,25vw,200px)', objectFit: 'cover', display: 'block', filter: 'grayscale(1)' }}
                  />
                  <div style={{ padding: 'clamp(14px,2vw,20px)' }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(0.9rem,1.5vw,1.1rem)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 4 }}>
                      {m.name}
                    </div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 400, fontSize: '0.75rem', color: '#FF6B00', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                      {m.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════ 6. MISSION STRIP ════ */}
        <section className="about-section-pad" style={{ background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, ...gridBg, pointerEvents: 'none' }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 'min(800px,90vw)', height: 600, pointerEvents: 'none',
            background: 'radial-gradient(ellipse,rgba(255,107,0,0.08) 0%,transparent 70%)',
          }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Label text="Our Mission" center />
            <Heading light center>EARN MORE.<br /><span style={{ color: '#FF6B00' }}>WASTE LESS TIME.</span></Heading>
            <div style={{ maxWidth: 560, margin: '0 auto 48px' }}>
              <Body light center>
                Our mission is to make passive income accessible to everyone — whether you've got 5 minutes or 5 hours. Complete tasks, watch your Creds grow, and redeem for exactly what you want.
              </Body>
            </div>
            <div className="about-btn-row">
              <BtnPrimary href="#tasks-section">Start Earning Creds →</BtnPrimary>
              <BtnOutline href="#rewards-section" light>View Rewards</BtnOutline>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

export default AboutUs