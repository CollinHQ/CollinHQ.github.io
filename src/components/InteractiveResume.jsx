import { useState } from 'react'
import { Link } from 'react-router-dom'
import resume from '../data/resume.json'
import about from '../data/about.json'

function ChevronIcon({ open }) {
  return (
    <svg
      width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function InteractiveResume({ pinnedSkill, onClearPin }) {
  const [expandedId, setExpandedId] = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const activeSkill = hoveredSkill || pinnedSkill
  const toggle = (id) => setExpandedId(prev => prev === id ? null : id)

  const bulletIsHighlighted = (bullet) =>
    activeSkill && bullet.skills?.includes(activeSkill)

  return (
    <div>
      {pinnedSkill && (
        <div className="flex items-center justify-between bg-yellow-500/10 border border-yellow-600/30 rounded-xl px-5 py-3 mb-6">
          <p className="text-yellow-500 text-sm">
            Highlighting bullets tagged with <span className="font-semibold">{pinnedSkill}</span>
          </p>
          <button onClick={onClearPin} className="text-slate-400 hover:text-yellow-500 text-xs transition-colors">
            Clear ✕
          </button>
        </div>
      )}

      {/* Resume document */}
      <div className="bg-white border border-gray-200 rounded shadow-md overflow-hidden">

        {/* Resume header */}
        <div className="px-8 pt-5 pb-3 border-b border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{about.name}</h2>
          <p className="text-gray-600 text-sm mt-0.5">Workplace Generalist</p>
          <p className="text-gray-400 text-xs mt-1">
            {about.location} • <a href={`mailto:${about.contact.email}`} className="hover:text-amber-500 transition-colors">{about.contact.email}</a> • <a href={about.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-amber-500 transition-colors">LinkedIn</a>
          </p>
          <p className="text-gray-500 text-xs mt-2 leading-relaxed max-w-xl mx-auto">
            {about.one_liner}
          </p>
        </div>

        {resume.map((role, roleIdx) => (
          <div key={role.id}>
            {/* Position header */}
            <div className={`px-8 ${roleIdx > 0 ? 'pt-1.5' : 'pt-3'} pb-0`}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <span className="font-bold text-gray-900 text-sm">{role.company}</span>
                  <span className="text-gray-500 text-sm"> — {role.title}</span>
                </div>
                <span className="text-gray-400 text-xs whitespace-nowrap">{role.start} – {role.end}</span>
              </div>
              <p className="text-gray-400 text-xs">{role.location}</p>
            </div>

            {/* Bullets */}
            <ul className={`px-8 ${roleIdx === resume.length - 1 ? 'pb-5' : 'pb-1'}`}>
              {role.bullets.map((bullet) => {
                const isOpen = expandedId === bullet.id
                const highlighted = bulletIsHighlighted(bullet)

                return (
                  <li
                    key={bullet.id}
                    className={`rounded transition-colors duration-150 -mx-2 ${
                      highlighted ? 'bg-amber-50 ring-1 ring-amber-200' : ''
                    }`}
                  >
                    {/* Bullet row */}
                    <div className="flex items-start gap-2 px-2 py-0.5">
                      <span className="text-gray-400 mt-1.5 text-xs flex-shrink-0">•</span>
                      <span className="text-gray-700 text-sm leading-relaxed flex-1">
                        {bullet.short}
                      </span>
                      {bullet.has_detail && (
                        <button
                          onClick={() => toggle(bullet.id)}
                          className="mt-1 text-amber-500 hover:text-amber-600 transition-colors flex-shrink-0"
                          title={isOpen ? 'Collapse' : 'Read more'}
                        >
                          <ChevronIcon open={isOpen} />
                        </button>
                      )}
                    </div>

                    {/* Inline dropdown */}
                    {isOpen && bullet.detail && (
                      <div className="mx-2 mb-1.5 ml-5 pl-3 border-l-2 border-amber-300">
                        <p className="text-gray-500 text-xs leading-relaxed mb-2">
                          {bullet.detail}
                        </p>
                        {bullet.skills?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-1">
                            {bullet.skills.map((skill) => (
                              <Link
                                key={skill}
                                to="/skills"
                                onMouseEnter={() => setHoveredSkill(skill)}
                                onMouseLeave={() => setHoveredSkill(null)}
                                className="border border-amber-300 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-full px-2.5 py-0.5 text-xs transition-colors duration-150"
                              >
                                {skill}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
