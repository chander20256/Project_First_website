import { useEffect } from 'react'
import Hero from '../components/landingcomp/Hero'
import TickerBar from '../components/landingcomp/TickerBar'
import HowItWorks from '../components/landingcomp/HowItWorks'
import TasksSection from '../components/landingcomp/TasksSection'
import RewardsSection from '../components/landingcomp/RewardsSection'
import Leaderboard from '../components/landingcomp/Leaderboard'
import FAQ from '../components/landingcomp/FAQ'
import Testimonials from '../components/landingcomp/Testimonials'
import CTASECTION from '../components/landingcomp/CTASECTION'
import GLOBAL_CSS from '../components/landingcomp/StyleHero/GLOBAL_CSS'

/* ── Wires up .reveal scroll animations page-wide ── */
const useScrollReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const LandingPage = () => {
  useScrollReveal()

  return (
    <>
      {/* Global styles injected once for the whole page */}
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* Three.js must load before Hero renders */}
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

export default LandingPage