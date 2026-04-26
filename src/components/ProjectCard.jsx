export default function ProjectCard({ project }) {
  const { icon, project_name, narrative, tags } = project

  return (
    <div className="bg-[#1a2535] rounded-2xl p-6 flex flex-col gap-4 hover:scale-[1.02] hover:bg-[#1f2d40] transition-all duration-300 cursor-pointer">
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="font-serif text-xl font-bold text-white mb-1">
          {project_name}
        </h3>
        {narrative?.challenge && (
          <p className="text-slate-400 text-sm leading-relaxed">
            {narrative.challenge}
          </p>
        )}
      </div>
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
