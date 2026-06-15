import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import experience from '../data/experience.json'
import InteractiveResume from '../components/InteractiveResume'
import Timeline from '../components/Timeline'
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
    <div className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2">Background</p>
        <h1 className="font-serif text-5xl font-bold text-white mb-10">Experience</h1>

        {/* Timeline */}
        <section className="mb-24">
          <h2 className="font-serif text-3xl font-bold text-white mb-8">Timeline</h2>
          <Timeline experience={experience} />
        </section>

        {/* Interactive Resume */}
        <section id="interactive-resume" ref={resumeRef} className="scroll-mt-16">
          <h2 className="font-serif text-3xl font-bold text-white mb-1 text-center">Interactive Resume</h2>
          <p className="text-slate-400 text-sm mb-4 text-center">
            Click <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" focusable="false" className="inline-block align-middle text-yellow-500"><polyline points="6 9 12 15 18 9" /></svg> on any bullet to expand. Skill tags link to the Skills page.
          </p>
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
