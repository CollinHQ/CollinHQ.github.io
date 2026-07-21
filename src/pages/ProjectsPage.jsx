import projects from '../data/projects.json'
import ProjectCard from '../components/ProjectCard'
import usePageTitle from '../hooks/usePageTitle'

const groups = [
  {
    id: 'build-move',
    title: 'Build-outs & moves',
    blurb: 'Space delivery with budgets, vendors, and hard return-to-office dates.',
    ids: ['bridge-hq-relocation', 'rho-hq-build-out', 'klaviyo-office-redesign'],
  },
  {
    id: 'systems',
    title: 'Systems, vendors & budget',
    blurb: 'Compliance, automation, and spend control that scale past one site.',
    ids: ['klaviyo-coi-tracker', 'bridge-records-migration', 'optisign-werqwise'],
  },
  {
    id: 'experience',
    title: 'Experience & culture',
    blurb: 'Programs that change how people feel about coming in.',
    ids: ['bridge-amenity-program', 'events-culture'],
  },
]

export default function ProjectsPage() {
  usePageTitle('Projects')

  return (
    <div className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2">Portfolio</p>
        <h1 className="font-serif text-5xl font-bold text-white mb-4">Projects</h1>
        <p className="text-slate-400 text-lg mb-14 max-w-2xl">
          Build-outs, HQ moves, vendor systems, amenities, and events — the work behind how
          an office actually runs day to day.
        </p>

        <div className="space-y-16">
          {groups.map((group) => {
            const items = group.ids.map((id) => projects.find((p) => p.id === id)).filter(Boolean)
            if (!items.length) return null
            return (
              <section key={group.id} aria-labelledby={`group-${group.id}`}>
                <h2 id={`group-${group.id}`} className="font-serif text-2xl font-bold text-white mb-1">
                  {group.title}
                </h2>
                <p className="text-slate-400 text-sm mb-6 max-w-2xl">{group.blurb}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
