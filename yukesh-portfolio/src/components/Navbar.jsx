import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { nav, profile } from '../data/portfolio'

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = nav.map((n) => document.querySelector(n.href)).filter(Boolean)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? 'bg-bg/80 backdrop-blur-md border-b hairline' : 'bg-transparent'
        }`}
      >
        <nav className="container-edit flex items-center justify-between h-20" aria-label="Primary">
          <a
            href="#home"
            className="type-label text-sm text-ink border border-border rounded-full w-10 h-10 flex items-center justify-center hover:border-gold transition-colors"
            aria-label={`${profile.name} — home`}
          >
            YK.
          </a>

          <ul className="hidden md:flex items-center gap-10">
            {nav.map((item) => {
              const id = item.href.replace('#', '')
              const isActive = active === id
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative text-sm text-muted hover:text-ink transition-colors py-2"
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-px bg-gold transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          <button
            className="md:hidden text-ink"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[60] bg-bg md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="container-edit flex items-center justify-between h-20">
          <span className="type-label text-sm text-ink">YK.</span>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-ink">
            <X size={22} />
          </button>
        </div>
        <ul className="container-edit flex flex-col gap-2 mt-8">
          {nav.map((item, i) => (
            <li key={item.href} className="border-b hairline py-4">
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="type-display text-4xl text-ink"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
