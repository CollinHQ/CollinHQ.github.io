import { Link } from 'react-router-dom'
import about from '../data/about.json'

export default function Hero() {
  const scrollToContact = (e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-16 relative">
      {about.currently && (
        <p className="flex items-center gap-2 border border-yellow-600/30 bg-yellow-500/5 text-slate-300 text-xs rounded-full px-4 py-1.5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500" />
          </span>
          {about.currently}
        </p>
      )}

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

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-yellow-600/50 animate-bounce">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
