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
    <section className="relative min-h-screen flex items-center px-6 pt-28 pb-16 overflow-hidden">
      {/* Subtle depth so the background isn't a flat rectangle */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-24 w-[38rem] h-[38rem] rounded-full bg-yellow-500/10 blur-[120px]" />
        <div className="absolute -bottom-24 left-1/4 w-[30rem] h-[30rem] rounded-full bg-yellow-600/[0.06] blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left — the pitch, left-aligned and confident */}
          <div>
            {about.currently && (
              <p className="inline-flex items-center gap-2 border border-yellow-600/30 bg-yellow-500/5 text-slate-300 text-xs rounded-full px-4 py-1.5 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500" />
                </span>
                {about.currently}
              </p>
            )}

            <p className="text-yellow-500 text-sm uppercase tracking-[0.2em] mb-4">{about.title}</p>
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-[0.95] mb-6">
              {about.name}
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
              {about.one_liner}
            </p>

            <div className="flex flex-wrap items-center gap-4">
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
              <a
                href={about.contact.resume_pdf}
                download="Collin Brown Resume.pdf"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-yellow-500 text-sm transition-colors px-2 py-3"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Résumé
              </a>
            </div>
          </div>

          {/* Right — headshot, offset with a thin editorial frame */}
          <div className="order-first lg:order-last flex justify-center lg:justify-end">
            {about.headshot && !photoFailed && (
              <div className="relative">
                <div aria-hidden="true" className="absolute -inset-3 rounded-full border border-yellow-600/25" />
                <img
                  src={about.headshot}
                  alt={about.name}
                  onError={() => setPhotoFailed(true)}
                  className="relative w-56 h-56 md:w-72 md:h-72 rounded-full object-cover ring-4 ring-yellow-500/60 shadow-2xl shadow-black/50"
                />
              </div>
            )}
          </div>
        </div>

        {/* Stats pulled into the hero so there's substance above the fold */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 border-t border-yellow-600/20 pt-8">
          {about.stats.map(({ value, label }) => (
            <div key={label}>
              <p className="font-serif text-4xl font-bold text-yellow-500">{value}</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest mt-2 leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-yellow-600/50 animate-bounce">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
