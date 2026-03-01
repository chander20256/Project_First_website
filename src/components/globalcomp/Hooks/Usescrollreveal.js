import { useState } from 'react'

export function useMobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(prev => !prev)
  const closeMenu = () => setMenuOpen(false)

  return { menuOpen, toggleMenu, closeMenu }
}import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })

    const elements = document.querySelectorAll('.fade-up')
    elements.forEach(el => obs.observe(el))

    return () => obs.disconnect()
  }, [])
}