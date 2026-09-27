import { useEffect, useRef, useState } from 'react'
import { about } from '../data/portfolio'

export default function About() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="py-28 md:py-40 border-t hairline">
      <div className="container-edit grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-4">
          <span className="type-label text-xs text-gold">About</span>
          <div
            className={`mt-8 aspect-[4/5] rounded-md border hairline overflow-hidden flex items-center justify-center bg-surface transition-all duration-700 ${
              visible ? 'opacity-100' : 'opacity-0 translate-y-4'
            }`}
          >
            {about.portraitSrc ? (
              <img
                src={about.portraitSrc}
                alt="Portrait of Yukesh Kumar R"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <span className="type-display text-7xl text-muted/40">YK</span>
            )}
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <p
            className={`type-display text-3xl md:text-5xl leading-tight text-ink transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {about.statement}
          </p>

          <div
            className={`mt-10 space-y-6 max-w-xl transition-all duration-700 delay-150 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-muted leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
