import about from '../data/about.json'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-16">
      <h1 className="font-serif text-7xl md:text-8xl font-bold text-white mb-3">
        {about.name}
      </h1>
      <p className="text-yellow-500 text-sm uppercase tracking-widest mb-8">
        {about.title}
      </p>
      <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed">
        {about.one_liner}
      </p>
    </section>
  )
}
