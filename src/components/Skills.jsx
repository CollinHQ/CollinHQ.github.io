import about from '../data/about.json'

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24 bg-[#111f2e]">
      <div className="max-w-5xl mx-auto">
        <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2">Capabilities</p>
        <h2 className="font-serif text-4xl font-bold text-white mb-12">Skills & Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-yellow-500 text-xs uppercase tracking-widest mb-5">Core Skills</h3>
            <ul className="space-y-3">
              {about.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-3 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-yellow-500 text-xs uppercase tracking-widest mb-5">Tools</h3>
            <div className="flex flex-wrap gap-3">
              {about.tools.map((tool) => (
                <span
                  key={tool}
                  className="border border-yellow-600/40 text-slate-300 bg-slate-800/50 rounded-full px-4 py-1.5 text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
