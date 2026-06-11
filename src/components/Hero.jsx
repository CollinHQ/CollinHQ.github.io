import { Link } from 'react-router-dom'
import about from '../data/about.json'

export default function Hero() {
  const scrollToContact = (e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-16">
      <h1 className="font-serif text-7xl md:text-8xl font-bold text-white mb-3">
        {about.name}
      </h1>
      <p className="text-yellow-500 text-sm uppercase tracking-widest mb-8">
        {about.title}
      </p>
      <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
        {about.one_liner}
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/projects"
          className="bg-yellow-500 hover:bg-yellow-400 text-[#0d1b2a] font-semibold text-sm rounded-full px-7 py-3 transition-colors"
        >
          View My Work →
        </Link>
        <a
          href="#contact"
          onClick={scrollToContact}
          className="border border-yellow-600/40 text-yellow-500 hover:bg-yellow-500/10 text-sm rounded-full px-7 py-3 transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </section>
  )
}
