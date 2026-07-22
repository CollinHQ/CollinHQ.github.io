import projects from '../data/projects.json'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import usePageTitle from '../hooks/usePageTitle'

const featured = ['fintech-hq-build-out', 'klaviyo-office-redesign', 'klaviyo-coi-tracker', 'bridge-hq-relocation', 'bridge-records-migration', 'bridge-amenity-program', 'optisign-werqwise', 'events-culture']
const featuredProjects = featured.map(id => projects.find(p => p.id === id)).filter(Boolean)

export default function ProjectsPage() {
  usePageTitle('Projects')

  return (
    <div className="relative min-h-screen pt-24 pb-24 px-6 overflow-hidden">
      {/* Subtle depth to match the hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-0 w-[34rem] h-[34rem] max-w-full rounded-full bg-yellow-500/[0.06] blur-[130px]" />
      </div>
      <div className="max-w-5xl mx-auto">
        <p className="flex items-center gap-3 text-yellow-500 text-xs uppercase tracking-[0.2em] mb-3">
          <span className="h-px w-8 bg-yellow-600/50" aria-hidden="true" />
          Portfolio
        </p>
        <h1 className="font-serif text-5xl font-bold text-white mb-4">Projects</h1>
        <p className="text-slate-400 text-lg mb-14 max-w-2xl">
          A selection of workplace operations work: office build-outs, redesigns, relocations, and the everyday systems and programs that keep a workplace running, driven from planning through completion.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 80} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
