import projects from '../data/projects.json'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24 max-w-5xl mx-auto">
      <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2">Work</p>
      <h2 className="font-serif text-4xl font-bold text-white mb-10">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
