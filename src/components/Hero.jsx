import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import about from '../data/about.json'

export default function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Subtle scroll parallax on the ambient glow (skipped for reduced-motion users).
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let raf = null
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        raf = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  const scrollToContact = (e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center px-6 pt-28 pb-16 overflow-hidden">
      {/* Subtle depth so the background isn't a flat rectangle: a slow-drifting
          "aurora" plus a gentle scroll parallax. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${scrollY * 0.18}px, 0)` }}
        >
          <div className="aurora-a absolute -top-40 -right-24 w-[38rem] h-[38rem] rounded-full bg-yellow-500/10 blur-[120px]" />
          <div className="aurora-b absolute -bottom-24 left-1/4 w-[30rem] h-[30rem] rounded-full bg-yellow-600/[0.06] blur-[120px]" />
        </div>
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

        {/* Stats pulled into the hero so there's substance above the fold.
            Hover/focus reveals the "receipt" behind each number (desktop). */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 border-t border-yellow-600/20 pt-8">
          {about.stats.map(({ value, label, story }) => (
            <div
              key={label}
              tabIndex={story ? 0 : -1}
              className="relative group rounded-lg cursor-default"
            >
              <p className="font-serif text-4xl font-bold text-yellow-500">{value}</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest mt-2 leading-snug">{label}</p>

              {story && (
                <div className="pointer-events-none absolute left-0 bottom-full mb-3 w-64 max-w-[80vw] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 transition-all duration-200 z-20">
                  <div className="bg-[#1a2535] border border-yellow-600/30 rounded-lg p-3 shadow-xl text-left">
                    <p className="text-slate-300 text-xs leading-relaxed">{story}</p>
                  </div>
                </div>
              )}
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
