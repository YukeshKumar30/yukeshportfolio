import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { hero, profile } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import HeroOrb from './HeroOrb'

export default function Hero() {
  const rootRef = useRef(null)
  const glowRef = useRef(null)
  const reduced = useReducedMotion()

  // One orchestrated load-in sequence: nav dot -> headline lines -> subcopy -> CTAs -> scroll cue.
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-reveal]', { opacity: 1, y: 0 })
        gsap.set('.reveal-mask > span', { y: 0 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to('.reveal-mask > span', {
        y: '0%',
        duration: 1,
        stagger: 0.08
      })
        .to('[data-reveal="sub"]', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .to('[data-reveal="meta"]', { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
        .to('[data-reveal="cta"]', { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
        .to('[data-reveal="scroll"]', { opacity: 1, duration: 0.6 }, '-=0.2')
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  // Subtle pointer-responsive glow — desktop only, never distracts from type.
  useEffect(() => {
    if (reduced) return
    const el = glowRef.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const handler = (e) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      el.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(198,167,106,0.06), transparent 60%)`
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [reduced])

  const lines = hero.headline.split(' — ').length > 1 ? hero.headline.split(' — ') : [hero.headline]

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative min-h-[100svh] flex flex-col justify-center pt-24 overflow-hidden"
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* ── Premium animated computer & orb — right-side visual area ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-full md:w-[50%] lg:w-[48%] h-full pointer-events-none overflow-hidden flex items-center justify-center md:justify-end pr-0 md:pr-4 lg:pr-8 z-0 opacity-25 md:opacity-100"
      >
        <HeroOrb />
      </div>

      <div className="container-edit relative z-10">
        <p
          data-reveal="meta"
          className="type-label text-xs text-gold opacity-0 translate-y-2 mb-6"
        >
          {profile.role}
        </p>

        <h1 className="type-display text-[13vw] leading-[0.95] md:text-[6.4vw] md:leading-[0.98] text-ink max-w-5xl">
          {lines.map((line, i) => (
            <span className="reveal-mask" key={i}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <p
          data-reveal="sub"
          className="opacity-0 translate-y-3 mt-8 max-w-xl text-base md:text-lg text-muted leading-relaxed"
        >
          {hero.subcopy}
        </p>

        <p data-reveal="meta" className="opacity-0 translate-y-2 mt-3 type-label text-xs text-muted">
          {profile.location.toUpperCase()}
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <a
            href="#work"
            data-reveal="cta"
            data-cursor="View"
            className="opacity-0 translate-y-3 inline-flex items-center gap-2 px-6 py-3 bg-ink text-bg rounded-full text-sm font-medium hover:bg-gold transition-colors"
          >
            Explore My Work
            <ArrowUpRight size={16} />
          </a>
          <a
            href={profile.resumeUrl}
            download="Yukesh_Kumar_Resume.pdf"
            data-reveal="cta"
            data-cursor="PDF"
            className="opacity-0 translate-y-3 inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full text-sm font-medium text-ink hover:border-gold transition-colors"
          >
            Download Resume
          </a>
        </div>
      </div>

      <div
        data-reveal="scroll"
        className="opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
        aria-hidden="true"
      >
        <span className="type-label text-[10px]">SCROLL</span>
        <ArrowDown size={14} className={reduced ? '' : 'animate-bounce'} />
      </div>
    </section>
  )
}
