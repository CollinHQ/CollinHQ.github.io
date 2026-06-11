import about from '../data/about.json'

export default function StatsBar() {
  return (
    <section className="px-6 pb-8">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-yellow-600/20 py-8">
        {about.stats.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="font-serif text-4xl font-bold text-yellow-500">{value}</p>
            <p className="text-slate-400 text-xs uppercase tracking-widest mt-2">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
