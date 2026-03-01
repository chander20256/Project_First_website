import Cursor from "./Cursor"
import Hero from "./HeroSection/Hero"
import { useMobileMenu } from "./Hooks/Usemobilemenu "
import { useScrollReveal } from "./Hooks/Usescrollreveal"
import MobileMenu from "./Mobilemenu/Mobliemenu"
import Navbar from "./Navbar/Navbar"
import './Styles/Global.css'


export default function GlobalCallingPage() {
  const { menuOpen, toggleMenu, closeMenu } = useMobileMenu()
  useScrollReveal()

  return (
    <>
      <Cursor />
      <Navbar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <MobileMenu menuOpen={menuOpen} closeMenu={closeMenu} />
      <main>
        <Hero />
      </main>
    </>
  )
}