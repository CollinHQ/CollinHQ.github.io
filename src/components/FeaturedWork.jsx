import { Link } from 'react-router-dom'
import projects from '../data/projects.json'
import ProjectCard from './ProjectCard'

const featured = ['bridge-hq-relocation', 'rho-hq-build-out', 'klaviyo-coi-tracker']
const featuredProjects = featured.map(id => projects.find(p => p.id === id)).filter(Boolean)

export default function FeaturedWork() {
  return (
    <section className="px-6 py-20 bg-[#111f2e]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2">Selected work</p>
            <h2 className="font-serif text-4xl font-bold text-white mb-2">Featured Work</h2>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              A few I&apos;m proud of: an HQ move, a ground-up build-out at Rho, and a system that
              kept working after I left.
            </p>
          </div>
          <Link
            to="/projects"
            className="text-slate-400 hover:text-yellow-500 text-sm transition-colors whitespace-nowrap"
          >
            See all projects →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
