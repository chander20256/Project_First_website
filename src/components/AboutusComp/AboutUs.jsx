import React from 'react';
import TeamSection from './TeamSection'; 
import HeroSection from './HeroSection';
import WhyUsSection from './WhyUsSection'; // <-- Naya Why Us component import kiya

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
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .about-who-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        @media (max-width: 900px) { .about-who-grid { grid-template-columns: 1fr; gap: 48px; } }

        .about-stat-badge { position: absolute; top: 24px; right: -24px; background: #0A0A0A; border-radius: 16px; padding: 16px 24px; border: 1px solid rgba(255,107,0,0.3); }
        @media (max-width: 900px) { .about-stat-badge { top: 16px; right: 16px; } }

        .about-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center; }
        @media (max-width: 768px) {
          .about-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 0; }
          .about-stats-grid .stat-item { border-left: none !important; border-top: 1px solid rgba(255,255,255,0.08); padding: 24px 16px !important; }
          .about-stats-grid .stat-item:nth-child(2) { border-left: 1px solid rgba(255,255,255,0.08) !important; }
          .about-stats-grid .stat-item:nth-child(3) { border-left: none !important; }
          .about-stats-grid .stat-item:nth-child(4) { border-left: 1px solid rgba(255,255,255,0.08) !important; }
          .about-stats-grid .stat-item:first-child, .about-stats-grid .stat-item:nth-child(2) { border-top: none; }
        }
        @media (max-width: 400px) {
          .about-stats-grid { grid-template-columns: 1fr; }
          .about-stats-grid .stat-item { border-left: none !important; border-top: 1px solid rgba(255,255,255,0.08) !important; }
          .about-stats-grid .stat-item:first-child { border-top: none !important; }
        }

        .about-btn-row { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 480px) { .about-btn-row a { width: 100%; text-align: center; } }

        .about-section-pad { padding: clamp(60px, 10vw, 120px) clamp(20px, 5vw, 48px); }
        .about-section-pad-sm { padding: clamp(36px, 6vw, 60px) clamp(20px, 5vw, 48px); }

        .about-who-img { width: 100%; height: clamp(260px, 40vw, 400px); object-fit: cover; border-radius: 22px; display: block; }

        .about-corner-accent { position: absolute; bottom: -16px; left: -16px; width: 80px; height: 80px; background: #FF6B00; border-radius: 16px; z-index: -1; }
        @media (max-width: 900px) { .about-corner-accent { display: none; } }
      `}</style>

      <main style={{ background: '#ffffff', fontFamily: "'Barlow Condensed', sans-serif" }}>

        {/* ════ 1. HERO (Imported Component) ════ */}
        <HeroSection gridBg={gridBg} />

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

        {/* ════ 4. WHY US (Imported Component) ════ */}
        <WhyUsSection gridBg={gridBg} Label={Label} Heading={Heading} Body={Body} />

        {/* ════ 5. TEAM (Imported Component) ════ */}
        <TeamSection gridBg={gridBg} Label={Label} Heading={Heading} />

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