export default function ProjectCard({ project }) {
  const { icon, title, status, description, tags, numbers } = project

  const statEntries = Object.entries(numbers || {}).filter(
    ([, v]) => v !== null && v !== true && v !== false
  )

  return (
    <div className="bg-[#1a2535] rounded-2xl p-6 flex flex-col gap-4 hover:scale-[1.02] hover:bg-[#1f2d40] transition-all duration-300 cursor-pointer">
      <div className="flex items-start justify-between">
        <span className="text-3xl">{icon}</span>
        <span className={`text-xs px-2 py-1 rounded-full border ${
          status === 'In Progress'
            ? 'border-yellow-600/40 text-yellow-500'
            : status === 'Ongoing'
            ? 'border-teal-600/40 text-teal-400'
            : 'border-slate-600/40 text-slate-400'
        }`}>
          {status}
        </span>
      </div>

      <div>
        <h3 className="font-serif text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>

      {statEntries.length > 0 && (
        <div className="flex gap-4 flex-wrap">
          {statEntries.map(([key, val]) => (
            <div key={key} className="text-center">
              <div className="text-yellow-500 font-bold text-lg">{val}</div>
              <div className="text-slate-500 text-xs capitalize">
                {key.replace(/_/g, ' ')}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="border border-yellow-600/40 text-yellow-500 bg-slate-800/50 rounded-full px-3 py-1 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
