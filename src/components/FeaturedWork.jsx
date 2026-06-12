import { Link } from 'react-router-dom'
import projects from '../data/projects.json'
import ProjectCard from './ProjectCard'

const featured = ['rho-office-redesign', 'klaviyo-office-redesign', 'bridge-office-relocation']
const featuredProjects = featured.map(id => projects.find(p => p.id === id)).filter(Boolean)

export default function FeaturedWork() {
  return (
    <section className="px-6 py-20 bg-[#111f2e]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2">Portfolio</p>
            <h2 className="font-serif text-4xl font-bold text-white">Featured Work</h2>
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
