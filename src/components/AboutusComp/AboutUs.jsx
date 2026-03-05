import React from 'react'


// ── Section label — identical to RewardsSection label ──
const Label = ({ text, center = false }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: center ? 'center' : 'flex-start',
    gap: 12,
    marginBottom: 24,
  }}>
    <div style={{ width: 32, height: 2, background: '#FF6B00', flexShrink: 0 }} />
    <span style={{
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 700,
      fontSize: '0.75rem',
      letterSpacing: '0.25em',
      color: '#FF6B00',
      textTransform: 'uppercase',
    }}>
      {text}
    </span>
  </div>
)

// ── Big heading — identical style to "REDEEM FOR WHAT" ──
const Heading = ({ children, light = false, center = false }) => (
  <h2 style={{
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: 'clamp(3rem, 7vw, 6rem)',
    letterSpacing: '-0.01em',
    lineHeight: 0.95,
    marginBottom: 28,
    color: light ? '#ffffff' : '#0A0A0A',
    textTransform: 'uppercase',
    textAlign: center ? 'center' : 'left',
  }}>
    {children}
  </h2>
)

// ── Body paragraph — identical to RewardsSection <p> ──
const Body = ({ children, light = false, center = false }) => (
  <p style={{
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 400,
    fontSize: '1.05rem',
    color: light ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
    lineHeight: 1.7,
    letterSpacing: '0.01em',
    textAlign: center ? 'center' : 'left',
  }}>
    {children}
  </p>
)

// ── Orange grid pattern background (same as all sections) ──
const gridBg = {
  backgroundImage:
    'linear-gradient(rgba(255,107,0,0.04) 1px,transparent 1px),' +
    'linear-gradient(90deg,rgba(255,107,0,0.04) 1px,transparent 1px)',
  backgroundSize: '64px 64px',
}

// ── Shared button style — matches btn-primary on site ──
const BtnPrimary = ({ children, href = '#' }) => (
  <a
    href={href}
    style={{
      display: 'inline-block',
      background: '#FF6B00',
      color: '#fff',
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 700,
      fontSize: '1rem',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      padding: '15px 40px',
      borderRadius: 8,
      textDecoration: 'none',
      transition: 'background 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.background = '#e55f00'}
    onMouseLeave={e => e.currentTarget.style.background = '#FF6B00'}
  >
    {children}
  </a>
)

const BtnOutline = ({ children, href = '#', light = false }) => (
  <a
    href={href}
    style={{
      display: 'inline-block',
      background: 'transparent',
      color: light ? '#fff' : '#0A0A0A',
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 700,
      fontSize: '1rem',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      padding: '14px 40px',
      borderRadius: 8,
      border: `2px solid ${light ? 'rgba(255,255,255,0.3)' : '#0A0A0A'}`,
      textDecoration: 'none',
      transition: 'all 0.2s',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = light ? '#fff' : '#0A0A0A'
      e.currentTarget.style.color = light ? '#0A0A0A' : '#fff'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'transparent'
      e.currentTarget.style.color = light ? '#fff' : '#0A0A0A'
    }}
  >
    {children}
  </a>
)

// ════════════════════════════════════════════════════
//  MAIN PAGE
// ════════════════════════════════════════════════════
const AboutUs = () => {

  // Why us pillars
  const pillars = [
    {
      icon: '⚡',
      title: 'Instant Rewards',
      desc: 'Complete tasks and get paid fast. No waiting periods, no minimums — your Creds are yours the moment you earn them.',
    },
    {
      icon: '🎯',
      title: 'Real Opportunities',
      desc: 'Every task on our platform is vetted and valued. We connect you with brands and surveys that respect your time.',
    },
    {
      icon: '🔒',
      title: 'Safe & Transparent',
      desc: 'No hidden fees. No data selling. Your earnings and personal information are always protected on our platform.',
    },
  ]

  // Stats
  const stats = [
    { number: '2M+', label: 'Active Earners' },
    { number: '100+', label: 'Reward Options' },
    { number: '$0', label: 'Minimum Payout' },
    { number: '4.9★', label: 'User Rating' },
  ]

  // Team
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
      {/* Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <main style={{ background: '#ffffff', fontFamily: "'Barlow Condensed', sans-serif" }}>

        {/* ════════════════════════════════
            1. HERO
        ════════════════════════════════ */}
        <section style={{ position: 'relative', height: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=600&fit=crop&q=80"
            alt="People earning rewards by completing tasks online"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Dark overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.78)' }} />
          {/* Grid pattern */}
          <div style={{ position: 'absolute', inset: 0, ...gridBg, pointerEvents: 'none' }} />
          {/* Radial glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 800, height: 500, pointerEvents: 'none',
            background: 'radial-gradient(ellipse,rgba(255,107,0,0.1) 0%,transparent 70%)',
          }} />

          {/* Hero text */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
            {/* Label centered */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 32, height: 2, background: '#FF6B00' }} />
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.25em', color: '#FF6B00', textTransform: 'uppercase' }}>
                ABOUT US
              </span>
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              letterSpacing: '-0.01em',
              lineHeight: 0.95,
              color: '#ffffff',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}>
              DO TASKS.<br />
              <span style={{ color: '#FF6B00' }}>EARN REWARDS.</span>
            </h1>

            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 400,
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: 480,
              margin: '0 auto',
              lineHeight: 1.7,
              letterSpacing: '0.01em',
            }}>
              We built the simplest way to turn your spare time into real cash, gift cards, and more.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════
            2. WHO WE ARE (white bg)
        ════════════════════════════════ */}
        <section style={{ padding: '120px 48px', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
          {/* Grid */}
          <div style={{ position: 'absolute', inset: 0, ...gridBg, pointerEvents: 'none' }} />
          {/* Glow */}
          <div style={{
            position: 'absolute', top: '50%', right: 0,
            width: 600, height: 600, pointerEvents: 'none',
            transform: 'translateY(-50%)',
            background: 'radial-gradient(ellipse,rgba(255,107,0,0.06) 0%,transparent 70%)',
          }} />

          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left — text */}
            <div>
              <Label text="Who We Are" />
              <Heading>
                WE MAKE EARNING<br />
                <span style={{ color: '#FF6B00' }}>EFFORTLESS</span>
              </Heading>
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
                style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 22, display: 'block' }}
              />
              {/* Orange corner accent */}
              <div style={{
                position: 'absolute', bottom: -16, left: -16,
                width: 80, height: 80, background: '#FF6B00',
                borderRadius: 16, zIndex: -1,
              }} />
              {/* Floating stat badge */}
              <div style={{
                position: 'absolute', top: 24, right: -24,
                background: '#0A0A0A', borderRadius: 16,
                padding: '16px 24px', border: '1px solid rgba(255,107,0,0.3)',
              }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: '2.5rem', color: '#FF6B00', lineHeight: 1 }}>$10M+</div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 400, fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>Paid Out</div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            3. STATS BAR (black bg)
        ════════════════════════════════ */}
        <section style={{ background: '#0A0A0A', padding: '60px 48px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, ...gridBg, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
            {[
              { number: '2M+', label: 'Active Earners' },
              { number: '100+', label: 'Reward Options' },
              { number: '$0', label: 'Minimum Payout' },
              { number: '4.9★', label: 'User Rating' },
            ].map((s, i) => (
              <div key={i} style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none', padding: '0 24px' }}>
                <div style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(2.5rem,4vw,4rem)',
                  color: '#FF6B00',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                }}>
                  {s.number}
                </div>
                <div style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 400,
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginTop: 8,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════
            4. WHY US (dark bg + image)
        ════════════════════════════════ */}
        <section style={{ position: 'relative', padding: '120px 48px', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=700&fit=crop&q=80"
            alt="Analytics and earning data on screen"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.85)' }} />
          <div style={{ position: 'absolute', inset: 0, ...gridBg, pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <Label text="Why Us?" center />
              <Heading light center>
                WHY MILLIONS<br />
                <span style={{ color: '#FF6B00' }}>TRUST OUR PLATFORM</span>
              </Heading>
              <div style={{ maxWidth: 520, margin: '0 auto' }}>
                <Body light center>
                  We built this platform around one principle: if you put in the work, you deserve to get paid — fast, fairly, and without hassle.
                </Body>
              </div>
            </div>

            {/* 3 pillar cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
              {pillars.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: 22,
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '36px 32px',
                    transition: 'border-color 0.3s, background 0.3s, transform 0.3s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)'
                    e.currentTarget.style.background = 'rgba(255,107,0,0.06)'
                    e.currentTarget.style.transform = 'translateY(-6px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
                  <div style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: '1.4rem',
                    color: '#fff',
                    letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}>
                    {p.title}
                  </div>
                  <Body light>{p.desc}</Body>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            5. TEAM (white bg)
        ════════════════════════════════ */}
        <section style={{ padding: '120px 48px', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, ...gridBg, pointerEvents: 'none' }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 800, height: 600, pointerEvents: 'none',
            background: 'radial-gradient(ellipse,rgba(255,107,0,0.06) 0%,transparent 70%)',
          }} />

          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 32 }}>
              <div>
                <Label text="Our Team" />
                <Heading>
                  THE PEOPLE WHO<br />
                  <span style={{ color: '#FF6B00' }}>MAKE IT HAPPEN</span>
                </Heading>
              </div>
              {/* Big number accent */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                <span style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(5rem,10vw,8rem)',
                  color: '#FF6B00',
                  lineHeight: 1,
                }}>
                  {team.length}
                </span>
                <span style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 400,
                  fontSize: '0.8rem',
                  color: 'rgba(0,0,0,0.4)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                  lineHeight: 1.6,
                }}>
                  CORE<br />TEAM<br />MEMBERS
                </span>
              </div>
            </div>

            {/* Team grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20 }}>
              {team.map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: '#000',
                    borderRadius: 22,
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s, border-color 0.3s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                  }}
                >
                  <img
                    src={m.img}
                    alt={`${m.name}, ${m.role} at our rewards platform`}
                    style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block', filter: 'grayscale(1)' }}
                  />
                  <div style={{ padding: '20px 20px 24px' }}>
                    <div style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 900,
                      fontSize: '1.1rem',
                      color: '#fff',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      marginBottom: 4,
                    }}>
                      {m.name}
                    </div>
                    <div style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 400,
                      fontSize: '0.75rem',
                      color: '#FF6B00',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                    }}>
                      {m.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            6. MISSION STRIP (black bg)
        ════════════════════════════════ */}
        <section style={{ background: '#0A0A0A', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, ...gridBg, pointerEvents: 'none' }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 800, height: 600, pointerEvents: 'none',
            background: 'radial-gradient(ellipse,rgba(255,107,0,0.08) 0%,transparent 70%)',
          }} />

          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Label text="Our Mission" center />
            <Heading light center>
              EARN MORE.<br />
              <span style={{ color: '#FF6B00' }}>WASTE LESS TIME.</span>
            </Heading>
            <div style={{ maxWidth: 560, margin: '0 auto 48px' }}>
              <Body light center>
                Our mission is to make passive income accessible to everyone — whether you've got 5 minutes or 5 hours. Complete tasks, watch your Creds grow, and redeem for exactly what you want.
              </Body>
            </div>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
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