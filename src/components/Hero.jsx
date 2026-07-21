import { useState } from 'react'
import { Link } from 'react-router-dom'
import about from '../data/about.json'
import ScopeStrip from './ScopeStrip'

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
          className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover ring-4 ring-yellow-500/60 shadow-xl shadow-black/40 mb-6"
        />
      )}

      {about.currently && (
        <p className="flex items-center gap-2 border border-yellow-600/30 bg-yellow-500/5 text-slate-300 text-xs rounded-full px-4 py-1.5 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500" />
          </span>
          {about.currently}
        </p>
      )}

      <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-3">
        {about.name}
      </h1>
      <p className="text-yellow-500 text-sm uppercase tracking-widest mb-2">
        {about.title}
      </p>
      <p className="text-slate-400 text-xs md:text-sm tracking-wide mb-4">
        {about.title_line || 'Workplace Manager · Workplace Coordinator · Office Coordinator'}
      </p>

      {about.hero_tags?.length > 0 && (
        <ul className="flex flex-wrap justify-center gap-2 mb-6">
          {about.hero_tags.map((tag) => (
            <li
              key={tag}
              className="border border-yellow-600/30 text-slate-300 text-xs tracking-wide rounded-full px-3 py-1"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed mb-2">
        {about.one_liner}
      </p>

      <ScopeStrip />

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Link
          to="/projects/bridge-hq-relocation"
          className="bg-yellow-500 hover:bg-yellow-400 text-[#0d1b2a] font-semibold text-sm rounded-full px-6 py-3 transition-colors"
        >
          See a project I&apos;m proud of →
        </Link>
        <a
          href="#contact"
          onClick={scrollToContact}
          className="border border-yellow-600/40 text-yellow-500 hover:bg-yellow-500/10 text-sm rounded-full px-6 py-3 transition-colors"
        >
          Say hello
        </a>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-yellow-600/50 animate-bounce">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
