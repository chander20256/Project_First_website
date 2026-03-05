import { useEffect } from 'react'
import Hero from './Hero'
import TickerBar from './TickerBar'
import HowItWorks from './HowItWorks'
import TasksSection from './TasksSection'
import RewardsSection from './RewardsSection'
import Leaderboard from './Leaderboard'
import FAQ from './FAQ'
import Testimonials from './Testimonials'
import CTASECTION from './CTASECTION'

/* ─── Global CSS lives here so it's injected once for the whole page ─── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;600&family=Manrope:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Manrope', sans-serif;
    background: #FAFAFA;
    color: #0A0A0A;
    overflow-x: hidden;
  }
  :root {
    --orange: #FF6B00;
    --orange-light: #FFF5EE;
    --orange-mid: rgba(255,107,0,0.12);
    --dark: #0A0A0A;
    --mid: #555555;
    --soft: #999999;
    --line: rgba(0,0,0,0.08);
  }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #f0f0f0; }
  ::-webkit-scrollbar-thumb { background: var(--orange); border-radius: 4px; }

  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-12px); }
  }
  @keyframes floatX {
    0%,100% { transform: translate(0,0) rotate(0deg); }
    33%      { transform: translate(8px,-14px) rotate(6deg); }
    66%      { transform: translate(-6px,-8px) rotate(-4deg); }
  }
  @keyframes pulse-dot {
    0%,100% { box-shadow: 0 0 0 0 rgba(255,107,0,0.4); }
    50%      { box-shadow: 0 0 0 8px rgba(255,107,0,0); }
  }
  @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes spin-rev  { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
  @keyframes orbit {
    from { transform: rotate(0deg) translateX(52px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(52px) rotate(-360deg); }
  }
  @keyframes orbit2 {
    from { transform: rotate(180deg) translateX(36px) rotate(-180deg); }
    to   { transform: rotate(540deg) translateX(36px) rotate(-540deg); }
  }
  @keyframes reveal-up {
    from { opacity:0; transform:translateY(40px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes bar-fill { from { width: 0%; } to { width: var(--w); } }
  @keyframes count-up {
    from { opacity:0; transform: scale(0.7); }
    to   { opacity:1; transform: scale(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes card-hover-glow {
    0%,100% { box-shadow: 0 8px 32px rgba(255,107,0,0.08); }
    50%      { box-shadow: 0 16px 48px rgba(255,107,0,0.18); }
  }
  @keyframes ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes coinFlip {
    0%   { transform: rotateY(0deg) scale(1); }
    50%  { transform: rotateY(90deg) scale(1.1); }
    100% { transform: rotateY(180deg) scale(1); }
  }
  @keyframes levelPulse {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.06); }
  }
  @keyframes gradMove {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes phoneFloat {
    0%,100% { transform: translateY(0px) rotate(1.5deg); }
    50%      { transform: translateY(-20px) rotate(-1deg); }
  }
  @keyframes screenGlow {
    0%,100% { box-shadow: 0 32px 80px rgba(255,107,0,0.18), 0 0 0 1px rgba(255,107,0,0.1); }
    50%      { box-shadow: 0 40px 100px rgba(255,107,0,0.28), 0 0 0 1px rgba(255,107,0,0.18); }
  }
  @keyframes notifSlide {
    0%   { opacity:0; transform: translateY(-12px); }
    15%  { opacity:1; transform: translateY(0); }
    80%  { opacity:1; transform: translateY(0); }
    100% { opacity:0; transform: translateY(-12px); }
  }
  @keyframes barGrow { from { width: 0%; } to { width: var(--bw, 70%); } }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--orange); color: #fff; border: none;
    border-radius: 12px; font-family: 'Manrope', sans-serif;
    font-weight: 700; cursor: pointer; text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
    box-shadow: 0 4px 20px rgba(255,107,0,0.35);
  }
  .btn-primary:hover {
    background: #e55f00; transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(255,107,0,0.45);
  }
  .btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: var(--dark);
    border: 1.5px solid rgba(0,0,0,0.14); border-radius: 12px;
    font-family: 'Manrope', sans-serif; font-weight: 600;
    cursor: pointer; text-decoration: none;
    transition: transform 0.2s, border-color 0.2s, background 0.2s;
  }
  .btn-outline:hover { border-color: var(--orange); color: var(--orange); transform: translateY(-2px); }

  .sec-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem; letter-spacing: 0.14em;
    color: var(--orange); text-transform: uppercase;
    margin-bottom: 16px; display: inline-flex; align-items: center; gap: 8px;
  }
  .sec-label::before {
    content: ''; display: inline-block;
    width: 24px; height: 2px;
    background: var(--orange); border-radius: 2px;
  }

  .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  .hero-inner {
    display: flex; align-items: center; justify-content: space-between;
    gap: 48px; width: 100%; max-width: 1380px; margin: 0 auto; padding: 80px 48px;
  }
  .hero-left { flex: 1 1 0; min-width: 0; }
  .hero-right { flex: 0 0 auto; display: flex; align-items: center; justify-content: center; padding: 40px 0; }

  @media (max-width: 900px) {
    .hero-right  { display: none !important; }
    .hero-inner  { padding: 60px 20px !important; }
  }
`

/* ── Scroll-reveal wires up .reveal elements page-wide ── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function LandingPage() {
  useScrollReveal()

  return (
    <>
      {/* Global styles injected once here */}
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      {/* Three.js for Hero background — must load before Hero renders */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" />

      <main>
        <Hero />
        <TickerBar />
        <HowItWorks />
        <TasksSection />
        <RewardsSection />
        <Leaderboard />
        <FAQ />
        <Testimonials />
        <CTASECTION />
      </main>
    </>
  )
}