import about from '../data/about.json'

export default function About() {
  return (
    <section id="about" className="px-6 pt-12 pb-16 max-w-4xl mx-auto scroll-mt-16">
      <p className="text-yellow-500 text-xs uppercase tracking-widest mb-3">About</p>
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-5">
        Workplace ops with receipts
      </h2>
      <p className="text-slate-300 text-lg leading-relaxed">
        {about.bio}
      </p>
    </section>
  )
}
