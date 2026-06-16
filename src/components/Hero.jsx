import { useState } from 'react'
import { Link } from 'react-router-dom'
import about from '../data/about.json'

export default function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false)

  const scrollToContact = (e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 pb-16 relative">
      {about.headshot && !photoFailed && (
        <img
          src={about.headshot}
          alt={about.name}
          onError={() => setPhotoFailed(true)}
          className="w-44 h-44 md:w-56 md:h-56 rounded-full object-cover ring-4 ring-yellow-500/60 shadow-xl shadow-black/40 mb-8"
        />
      )}

      {about.currently && (
        <p className="flex items-center gap-2 border border-yellow-600/30 bg-yellow-500/5 text-slate-300 text-xs rounded-full px-4 py-1.5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500" />
          </span>
          {about.currently}
        </p>
      )}

      <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-3">
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
          className="bg-yellow-500 hover:bg-yellow-400 text-[#0d1b2a] font-semibold text-sm rounded-full px-6 py-3 transition-colors"
        >
          View My Work →
        </Link>
        <a
          href="#contact"
          onClick={scrollToContact}
          className="border border-yellow-600/40 text-yellow-500 hover:bg-yellow-500/10 text-sm rounded-full px-6 py-3 transition-colors"
        >
          Get in Touch
        </a>
      </div>

      <a
        href={about.contact.resume_pdf}
        download="Collin Brown Resume.pdf"
        className="mt-5 inline-flex items-center gap-1.5 text-slate-400 hover:text-yellow-500 text-sm transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download Resume
      </a>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-yellow-600/50 animate-bounce">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
