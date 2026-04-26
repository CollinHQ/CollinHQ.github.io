import { useState } from 'react'
import { Link } from 'react-router-dom'
import resume from '../data/resume.json'

function ChevronIcon({ open }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function InteractiveResume() {
  const [expandedId, setExpandedId] = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const toggle = (id) => setExpandedId(prev => prev === id ? null : id)

  const bulletIsHighlighted = (bullet) =>
    hoveredSkill && bullet.skills?.includes(hoveredSkill) && expandedId !== bullet.id

  return (
    <div className="space-y-8">
      {resume.map((role) => (
        <div key={role.id} className="bg-[#1a2535] rounded-2xl p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
            <h3 className="font-serif text-xl font-bold text-white">{role.company}</h3>
            <span className="text-slate-500 text-sm">{role.start} — {role.end}</span>
          </div>
          <p className="text-yellow-500 text-sm mb-6">{role.title} · {role.location}</p>

          <ul className="space-y-1">
            {role.bullets.map((bullet) => {
              const isOpen = expandedId === bullet.id
              const highlighted = bulletIsHighlighted(bullet)

              return (
                <li
                  key={bullet.id}
                  className={`rounded-lg transition-colors duration-200 ${
                    highlighted ? 'bg-yellow-500/5 ring-1 ring-yellow-600/30' : ''
                  }`}
                >
                  {/* Bullet row */}
                  <div className="flex items-start gap-3 px-3 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0 mt-2" />
                    <span className="text-slate-300 text-sm leading-relaxed flex-1">
                      {bullet.short}
                    </span>
                    {bullet.has_detail && (
                      <button
                        onClick={() => toggle(bullet.id)}
                        className="mt-0.5 text-yellow-500 hover:text-yellow-400 transition-colors flex-shrink-0"
                        title={isOpen ? 'Collapse' : 'Read more'}
                      >
                        <ChevronIcon open={isOpen} />
                      </button>
                    )}
                  </div>

                  {/* Inline dropdown */}
                  {isOpen && bullet.detail && (
                    <div className="mx-3 mb-3 pl-4 border-l border-yellow-600/30">
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        {bullet.detail}
                      </p>
                      {bullet.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {bullet.skills.map((skill) => (
                            <Link
                              key={skill}
                              to="/skills"
                              onMouseEnter={() => setHoveredSkill(skill)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              className="border border-yellow-600/40 text-yellow-500 bg-slate-800/50 hover:bg-yellow-500/10 rounded-full px-3 py-1 text-xs transition-colors duration-150"
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
  )
}
