import experience from '../data/experience.json'

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24 bg-[#111f2e]">
      <div className="max-w-4xl mx-auto">
        <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2">Background</p>
        <h2 className="font-serif text-4xl font-bold text-white mb-12">Experience</h2>
        <div className="space-y-12">
          {experience.map((role) => (
            <div key={role.id} className="flex gap-8">
              <div className="hidden md:flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                <div className="w-px flex-1 bg-yellow-600/20 mt-2" />
              </div>
              <div className="flex-1 pb-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                  <h3 className="font-serif text-2xl font-bold text-white">{role.title}</h3>
                  <span className="text-slate-500 text-sm">{role.start} — {role.end}</span>
                </div>
                <p className="text-yellow-500 text-sm mb-4">
                  {role.company} · {role.location}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {role.description}
                </p>
                <ul className="space-y-2">
                  {role.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0 mt-1.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
