import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'

export default function ProjectCard({ project }) {
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
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={ref}
      className={`group border-t hairline py-14 md:py-20 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="md:col-span-2 flex md:flex-col justify-between md:justify-start items-baseline md:items-start gap-2">
          <span className="type-display text-5xl md:text-6xl text-gold/70">{project.number}</span>
          <span className="type-label text-[10px] text-muted uppercase tracking-wide">
            {project.badge}
          </span>
        </div>

        <div className="md:col-span-5">
          <h3 className="type-display text-3xl md:text-4xl text-ink mb-2">{project.name}</h3>
          <p className="text-sm text-gold mb-5">{project.category}</p>
          <p className="text-muted leading-relaxed mb-4">{project.description}</p>
          <p className="text-muted leading-relaxed text-sm mb-6">{project.approach}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="type-label text-[10px] px-3 py-1 border border-border rounded-full text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          {(project.liveUrl || project.repoUrl) && (
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Visit"
                  className="inline-flex items-center gap-1.5 text-sm text-ink hover:text-gold transition-colors"
                >
                  View Live Site <ArrowUpRight size={14} />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Code"
                  className="inline-flex items-center gap-1.5 text-sm text-ink hover:text-gold transition-colors"
                >
                  <Github size={14} /> Repository
                </a>
              )}
            </div>
          )}
        </div>

        <div className="md:col-span-5">
          <div className="aspect-[16/10] rounded-md border hairline bg-surface overflow-hidden flex items-center justify-center relative">
            {project.previewSrc ? (
              <img
                src={project.previewSrc}
                alt={`Preview of ${project.name}`}
                loading="lazy"
                className="w-full h-full object-cover object-left-top transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted/50 px-6 text-center">
                <span className="type-label text-[10px]">PREVIEW PENDING</span>
                <span className="text-xs">Add a screenshot at data.projects[{project.number}].previewSrc</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
