import { useEffect, useRef, useState } from 'react'
import { experience, schoolEducation } from '../data/portfolio'
import { School, MapPin, Calendar, Award, GraduationCap } from 'lucide-react'

function TimelineRow({ item, index }) {
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
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-12 gap-4 md:gap-10 py-10 border-t hairline transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="md:col-span-2">
        <span className="type-label text-sm text-gold">{item.year}</span>
      </div>
      <div className="md:col-span-4">
        <h3 className="text-lg text-ink font-medium">{item.title}</h3>
        <p className="text-sm text-muted mt-1">
          {item.org} · {item.period}
        </p>
      </div>
      <div className="md:col-span-6">
        <p className="text-muted leading-relaxed">{item.description}</p>
      </div>
    </div>
  )
}

function SchoolEducationCard({ item, index }) {
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
      className={`bg-surface/80 border hairline rounded-lg p-6 md:p-8 hover:border-gold/40 transition-all duration-700 flex flex-col justify-between group ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div>
        {/* Header: Title and Badge */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold shrink-0">
              <GraduationCap size={18} />
            </span>
            <div>
              <h4 className="text-base md:text-lg font-medium text-ink group-hover:text-gold transition-colors">
                {item.title}
              </h4>
              <span className="text-xs text-muted">Standard: {item.standard}</span>
            </div>
          </div>
          <span className="type-label text-xs px-3 py-1 rounded-full border border-gold/30 text-gold bg-gold/5 font-medium shrink-0">
            {item.standard}
          </span>
        </div>

        {/* School Name */}
        <div className="pt-4 border-t hairline">
          <div className="flex items-start gap-3">
            <School size={16} className="text-gold shrink-0 mt-1" />
            <div>
              <span className="text-[11px] text-muted uppercase tracking-wider block">School Name</span>
              <span className="text-sm md:text-base font-medium text-ink">{item.school}</span>
            </div>
          </div>
        </div>

        {/* Location, Passed Year & Percentage */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 mt-4 border-t hairline">
          <div className="flex items-start gap-2.5">
            <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] text-muted uppercase tracking-wider block">Location</span>
              <span className="text-sm font-medium text-ink">{item.location}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Calendar size={15} className="text-gold shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] text-muted uppercase tracking-wider block">Passed Year</span>
              <span className="text-sm font-medium text-ink">{item.year}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Award size={15} className="text-gold shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] text-muted uppercase tracking-wider block">Percentage</span>
              <span className="text-sm font-semibold text-gold">{item.percentage}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 md:py-40 border-t hairline">
      <div className="container-edit">
        <span className="type-label text-xs text-gold">Experience & Education</span>
        <h2 className="type-display text-4xl md:text-6xl text-ink mt-4 mb-4">Professional journey.</h2>

        {/* Existing UG/PG Education and Internship Timeline */}
        <div className="mt-10">
          {experience.map((item, i) => (
            <TimelineRow item={item} index={i} key={`${item.title}-${item.year}`} />
          ))}
        </div>

        {/* School Education Section */}
        <div id="school-education" className="mt-20 md:mt-28 pt-12 border-t hairline">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
            <div>
              <span className="type-label text-xs text-gold">School Education</span>
              <h3 className="type-display text-3xl md:text-5xl text-ink mt-2">
                Foundational schooling.
              </h3>
            </div>
            <span className="type-label text-xs text-muted">AKT Academy Matric Higher Secondary School</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {schoolEducation.map((item, i) => (
              <SchoolEducationCard item={item} index={i} key={item.standard} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
