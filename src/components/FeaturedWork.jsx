import { Link } from 'react-router-dom'
import projects from '../data/projects.json'
import ProjectCard from './ProjectCard'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const featured = ['bridge-hq-relocation', 'fintech-hq-build-out', 'klaviyo-office-redesign']
const featuredProjects = featured.map(id => projects.find(p => p.id === id)).filter(Boolean)

export default function FeaturedWork() {
  return (
    <section className="px-6 py-20 bg-[#111f2e]">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured Work"
          action={
            <Link
              to="/projects"
              className="group text-slate-400 hover:text-yellow-500 text-sm transition-colors whitespace-nowrap"
            >
              See all projects{' '}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 90} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
