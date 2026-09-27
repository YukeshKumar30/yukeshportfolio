import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { contact, profile } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Contact() {
  const linkRef = useRef(null)
  const reduced = useReducedMotion()

  const handleMove = (e) => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return
    const el = linkRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`
  }

  const handleLeave = () => {
    if (linkRef.current) linkRef.current.style.transform = 'translate(0, 0)'
  }

  return (
    <section id="contact" className="py-28 md:py-44 border-t hairline">
      <div className="container-edit">
        <span className="type-label text-xs text-gold">Contact</span>
        <h2 className="type-display text-5xl md:text-8xl text-ink mt-6 max-w-3xl leading-[1.02]">
          {contact.headline}
        </h2>
        <p className="text-muted text-lg mt-6 max-w-md">{contact.subcopy}</p>

        <div
          className="mt-14 md:mt-20"
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <a
            ref={linkRef}
            href={`mailto:${profile.email}`}
            data-cursor="Say hi"
            className="inline-flex items-center gap-3 type-display text-3xl md:text-6xl text-ink hover:text-gold transition-colors duration-300"
            style={{ transition: 'transform 200ms ease-out, color 300ms' }}
          >
            {profile.email}
            <ArrowUpRight size={32} className="shrink-0" />
          </a>
        </div>

        <div className="flex flex-wrap gap-x-10 gap-y-4 mt-16 text-sm">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink transition-colors">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink transition-colors">
            GitHub
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="text-muted hover:text-ink transition-colors">
            {profile.phone}
          </a>
          <a href={profile.resumeUrl} download="Yukesh_Kumar_Resume.pdf" className="text-muted hover:text-ink transition-colors">
            Download Resume
          </a>
        </div>
      </div>
    </section>
  )
}
