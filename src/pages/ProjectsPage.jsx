import projects from '../data/projects.json'
import ProjectCard from '../components/ProjectCard'
import usePageTitle from '../hooks/usePageTitle'

const featured = ['fintech-hq-build-out', 'klaviyo-office-redesign', 'klaviyo-coi-tracker', 'bridge-hq-relocation', 'bridge-records-migration', 'bridge-amenity-program', 'optisign-werqwise', 'events-culture']
const featuredProjects = featured.map(id => projects.find(p => p.id === id)).filter(Boolean)

export default function ProjectsPage() {
  usePageTitle('Projects')

  return (
    <div className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2">Proof of work</p>
        <h1 className="font-serif text-5xl font-bold text-white mb-4">Projects</h1>
        <p className="text-slate-400 text-lg mb-14 max-w-2xl">
          Flagship workplace operations work across build-outs, HQ moves, compliance systems,
          amenities, and events — each with a named outcome and the operational story behind it.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
