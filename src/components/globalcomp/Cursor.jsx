import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    let mx = -100, my = -100, rx = -100, ry = -100

    const onMouseMove = (e) => {
      mx = e.clientX; my = e.clientY
      cur.style.left = mx + 'px'; cur.style.top = my + 'px'
    }
    document.addEventListener('mousemove', onMouseMove)

    let rafId
    function animRing() {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
      rafId = requestAnimationFrame(animRing)
    }
    animRing()

    const interactives = document.querySelectorAll('a, button, .filter-pill, .rew-tab, .task-card, .reward-card')
    const onEnter = () => {
      cur.style.width = '20px'; cur.style.height = '20px'
      ring.style.width = '60px'; ring.style.height = '60px'
    }
    const onLeave = () => {
      cur.style.width = '12px'; cur.style.height = '12px'
      ring.style.width = '40px'; ring.style.height = '40px'
    }
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div id="cursor"></div>
      <div id="cursor-ring"></div>
    </>
  )
}