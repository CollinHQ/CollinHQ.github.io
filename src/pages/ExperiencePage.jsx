import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import resume from '../data/resume.json'
import InteractiveResume from '../components/InteractiveResume'
import Testimonials from '../components/Testimonials'
import usePageTitle from '../hooks/usePageTitle'

export default function ExperiencePage() {
  usePageTitle('Experience')
  const [searchParams, setSearchParams] = useSearchParams()
  const [pinnedSkill, setPinnedSkill] = useState(() => searchParams.get('skill') || null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const resumeRef = useRef(null)

  // Auto-scroll to interactive resume when arriving with a skill param
  useEffect(() => {
    if (searchParams.get('skill')) {
      setTimeout(() => {
        document.querySelector('#interactive-resume')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [])

  // Show scroll-to-top widget when interactive resume section is in view
  useEffect(() => {
    const el = resumeRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowScrollTop(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const clearPin = () => {
    setPinnedSkill(null)
    setSearchParams({})
  }

  return (
    <div className="relative min-h-screen pt-24 pb-24 px-6 overflow-hidden">
      {/* Subtle depth to match the hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-0 w-[34rem] h-[34rem] max-w-full rounded-full bg-yellow-500/[0.06] blur-[130px]" />
      </div>
      <div className="max-w-4xl mx-auto">

        <p className="flex items-center gap-3 text-yellow-500 text-xs uppercase tracking-[0.2em] mb-3">
          <span className="h-px w-8 bg-yellow-600/50" aria-hidden="true" />
          Background
        </p>
        <h1 className="font-serif text-5xl font-bold text-white mb-3">Experience</h1>
        <p className="text-slate-300 text-base mb-2 max-w-2xl leading-relaxed">
          From hospitality and coworking through nonprofit and tech: office build-outs, relocations, vendor ops, and the day-to-day that makes a workplace run.
        </p>
        <p className="text-slate-400 text-sm mb-8 max-w-2xl">
          Scan the path below, then open any role for the full story. Click <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" focusable="false" className="inline-block align-middle text-yellow-500"><polyline points="6 9 12 15 18 9" /></svg> on a bullet to expand detail. Skill tags jump to the Skills page.
        </p>

        {/* At-a-glance career path — scannable index into the full résumé below (no content removed). */}
        <nav aria-label="Career path at a glance" className="mb-10 rounded-2xl border border-yellow-600/20 bg-[#1a2535]/60 p-5">
          <p className="text-yellow-500 text-xs uppercase tracking-[0.2em] mb-4">At a glance</p>
          <ol className="space-y-2.5">
            {resume.map((role) => (
              <li key={role.id}>
                <a
                  href={`#role-${role.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(`role-${role.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4 rounded-lg px-2 py-1.5 -mx-2 hover:bg-yellow-500/5 transition-colors"
                >
                  <span className="text-sm text-slate-200 group-hover:text-yellow-500 transition-colors">
                    <span className="font-semibold">{role.company}</span>
                    <span className="text-slate-400"> — {role.title}</span>
                  </span>
                  <span className="text-slate-500 text-xs whitespace-nowrap">{role.start} – {role.end}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Interactive Resume — full detail preserved */}
        <section id="interactive-resume" ref={resumeRef} className="scroll-mt-16">
          <InteractiveResume pinnedSkill={pinnedSkill} onClearPin={clearPin} />
        </section>

        {/* Endorsements */}
        <Testimonials />

      </div>

      {/* Scroll-to-top widget */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 flex items-center gap-2 bg-[#1a2535] border border-yellow-600/30 text-slate-400 hover:text-yellow-500 hover:border-yellow-500 text-xs px-4 py-2 rounded-full shadow-lg transition-all duration-200"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" focusable="false">
            <polyline points="18 15 12 9 6 15" />
          </svg>
          Back to top
        </button>
      )}
    </div>
  )
}
