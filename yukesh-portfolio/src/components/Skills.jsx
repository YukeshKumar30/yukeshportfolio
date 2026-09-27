import { useEffect, useRef, useState } from 'react'
import { skills } from '../data/portfolio'

function SkillGroup({ title, items, index }) {
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
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <h3 className="type-label text-xs text-muted uppercase mb-5">{title}</h3>
      <ul className="space-y-3">
        {items.map((skill) => (
          <li
            key={skill}
            className="text-lg text-ink pb-3 border-b hairline hover:text-gold hover:pl-2 transition-all duration-200"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 md:py-40 border-t hairline">
      <div className="container-edit">
        <span className="type-label text-xs text-gold">Skills</span>
        <h2 className="type-display text-4xl md:text-6xl text-ink mt-4 mb-14 max-w-2xl">
          Tools I build with.
        </h2>

        <div className="grid md:grid-cols-4 gap-12">
          {Object.entries(skills).map(([title, items], i) => (
            <SkillGroup title={title} items={items} index={i} key={title} />
          ))}
        </div>
      </div>
    </section>
  )
}
