import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import experience from '../data/experience.json'
import InteractiveResume from '../components/InteractiveResume'

const subNav = [
  { label: 'Timeline', href: '#timeline' },
  { label: 'Interactive Resume', href: '#interactive-resume' },
  { label: 'Case Studies', href: '#case-studies' },
]

function scrollTo(e, href) {
  e.preventDefault()
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function ExperiencePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [pinnedSkill, setPinnedSkill] = useState(
    () => searchParams.get('skill') || null
  )

  const clearPin = () => {
    setPinnedSkill(null)
    setSearchParams({})
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2">Background</p>
        <h1 className="font-serif text-5xl font-bold text-white mb-10">Experience</h1>

        {/* Sub-nav */}
        <div className="flex justify-center gap-8 mb-20 border-b border-yellow-600/20 pb-6">
          {subNav.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => scrollTo(e, href)}
              className="text-slate-400 hover:text-yellow-500 text-sm uppercase tracking-widest transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Timeline */}
        <section id="timeline" className="mb-28 scroll-mt-24">
          <h2 className="font-serif text-3xl font-bold text-white mb-8">Timeline</h2>
          <div className="space-y-4">
            {experience.map((role) => (
              <div key={role.id} className="flex gap-8">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                  <div className="w-px flex-1 bg-yellow-600/20 mt-2" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                    <h3 className="font-serif text-2xl font-bold text-white">{role.title}</h3>
                    <span className="text-slate-500 text-sm">{role.start} — {role.end}</span>
                  </div>
                  <p className="text-yellow-500 text-sm mb-4">
                    {role.company} · {role.location}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {role.description}
                  </p>
                  <ul className="space-y-2">
                    {role.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0 mt-1.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Resume */}
        <section id="interactive-resume" className="mb-28 scroll-mt-24">
          <h2 className="font-serif text-3xl font-bold text-white mb-2 text-center">Interactive Resume</h2>
          <p className="text-slate-400 text-sm mb-8 text-center">
            Click <span className="text-yellow-500">⌄</span> on any bullet to expand. Skill tags link to the Skills page.
          </p>
          <InteractiveResume pinnedSkill={pinnedSkill} onClearPin={clearPin} />
        </section>

        {/* Case Studies */}
        <section id="case-studies" className="scroll-mt-24">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Case Studies</h2>
          <p className="text-slate-500 text-sm mb-10">
            Deep-dives into key projects — challenges, decisions, and outcomes.
          </p>
          <div className="bg-[#1a2535] rounded-2xl p-8 flex items-center justify-center min-h-48">
            <p className="text-slate-500 text-sm italic">Case studies — coming soon</p>
          </div>
        </section>

      </div>
    </div>
  )
}
