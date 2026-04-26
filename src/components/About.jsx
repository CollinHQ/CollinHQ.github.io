import about from '../data/about.json'

export default function About() {
  return (
    <section id="about" className="px-6 py-24 max-w-4xl mx-auto">
      <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2">About</p>
      <h2 className="font-serif text-4xl font-bold text-white mb-8">Who I Am</h2>
      <p className="text-slate-300 text-lg leading-relaxed">
        {about.bio}
      </p>
    </section>
  )
}
