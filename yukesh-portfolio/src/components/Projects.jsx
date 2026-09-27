import { projects } from '../data/portfolio'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="work" className="py-28 md:py-40">
      <div className="container-edit">
        <div className="flex items-end justify-between mb-4">
          <h2 className="type-display text-5xl md:text-7xl text-ink">Selected Work.</h2>
          <span className="type-label text-xs text-muted hidden md:block">
            {String(projects.length).padStart(2, '0')} PROJECTS
          </span>
        </div>

        <div>
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
