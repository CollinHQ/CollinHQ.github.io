import about from '../data/about.json'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-yellow-500 text-xs uppercase tracking-widest mb-4">
        {about.title}
      </p>
      <h1 className="font-serif text-7xl md:text-8xl font-bold text-white mb-6">
        {about.name.split(' ')[0]}
      </h1>
      <p className="text-slate-300 text-lg md:text-xl max-w-lg leading-relaxed mb-10">
        {about.one_liner}
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {about.hero_tags.map((tag) => (
          <span
            key={tag}
            className="border border-yellow-600/40 text-yellow-500 bg-slate-800/50 rounded-full px-4 py-1.5 text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  )
}
