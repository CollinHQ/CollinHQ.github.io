import about from '../data/about.json'

export default function SkillsPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2">Capabilities</p>
        <h1 className="font-serif text-5xl font-bold text-white mb-4">Skills & Tools</h1>
        <p className="text-slate-400 text-lg mb-14 max-w-2xl">
          Operational expertise built across workplace environments, vendor ecosystems, and cross-functional teams.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Core Skills — pill/tag style */}
          <div>
            <h2 className="text-yellow-500 text-xs uppercase tracking-widest mb-6">Core Skills</h2>
            <div className="flex flex-wrap gap-3">
              {about.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-yellow-600/40 text-yellow-500 bg-slate-800/50 rounded-full px-4 py-1.5 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools — bullet list style */}
          <div>
            <h2 className="text-yellow-500 text-xs uppercase tracking-widest mb-6">Tools</h2>
            <ul className="space-y-3">
              {about.tools.map((tool) => (
                <li key={tool} className="flex items-center gap-3 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                  <span className="text-base">{tool}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}
