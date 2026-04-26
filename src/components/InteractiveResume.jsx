import { useState } from 'react'
import { Link } from 'react-router-dom'
import resume from '../data/resume.json'
import about from '../data/about.json'

// Pre-compute skill occurrence counts across all bullets
const skillCounts = {}
resume.forEach(role => role.bullets.forEach(bullet =>
  (bullet.skills || []).forEach(s => { skillCounts[s] = (skillCounts[s] || 0) + 1 })
))

const toolSet = new Set(about.tools.map(t => t.toLowerCase()))
const isToolTag = (tag) => toolSet.has(tag.toLowerCase())

function ChevronIcon({ open }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
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
  const bulletIsHighlighted = (bullet) => activeSkill && bullet.skills?.includes(activeSkill)

  const handleSkillEnter = (skill) => {
    if (pinnedSkill) onClearPin()
    setHoveredSkill(skill)
  }

  return (
    <div className="bg-white border border-gray-200 rounded shadow-md overflow-hidden">

      {/* Header */}
      <div className="px-8 pt-5 pb-3 border-b border-gray-100 text-center">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{about.name}</h2>
        <p className="text-gray-600 text-sm mt-0.5">Workplace Generalist</p>
        <p className="text-gray-400 text-xs mt-1">
          {about.location} •{' '}
          <a href={`mailto:${about.contact.email}`} className="hover:text-amber-500 transition-colors">{about.contact.email}</a>
          {' '}•{' '}
          <a href={about.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-amber-500 transition-colors">LinkedIn</a>
        </p>
        <p className="text-gray-500 text-xs mt-2 leading-relaxed max-w-xl mx-auto">{about.one_liner}</p>
      </div>

      {resume.map((role, roleIdx) => (
        <div key={role.id}>
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

          <ul className={`px-8 ${roleIdx === resume.length - 1 ? 'pb-5' : 'pb-1'}`}>
            {role.bullets.map((bullet) => {
              const isOpen = expandedId === bullet.id
              const highlighted = bulletIsHighlighted(bullet)

              // Split tags into skills vs tools, only include if count > 1
              const skillTags = (bullet.skills || []).filter(s => !isToolTag(s) && skillCounts[s] > 1)
              const toolTags  = (bullet.skills || []).filter(s =>  isToolTag(s) && skillCounts[s] > 1)
              const hasAnyTag = skillTags.length > 0 || toolTags.length > 0

              return (
                <li
                  key={bullet.id}
                  className={`rounded transition-colors duration-150 -mx-2 ${highlighted ? 'bg-amber-50 ring-1 ring-amber-200' : ''}`}
                >
                  <div className="flex items-start gap-2 px-2 py-0.5">
                    <span className="text-gray-400 mt-1.5 text-xs flex-shrink-0">•</span>
                    <span className="text-gray-700 text-sm leading-relaxed flex-1">{bullet.short}</span>
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

                  {isOpen && bullet.detail && (
                    <div className="mx-2 mb-1.5 ml-5 pl-3 border-l-2 border-amber-300">
                      <p className="text-gray-500 text-xs leading-relaxed mb-2">{bullet.detail}</p>

                      {hasAnyTag && (
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-1">
                          {skillTags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-gray-400 text-xs mr-0.5">Skills</span>
                              {skillTags.map(skill => (
                                <Link
                                  key={skill}
                                  to="/skills"
                                  onMouseEnter={() => handleSkillEnter(skill)}
                                  onMouseLeave={() => setHoveredSkill(null)}
                                  className="border border-amber-300 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-full px-2.5 py-0.5 text-xs transition-colors"
                                >
                                  {skill}
                                </Link>
                              ))}
                            </div>
                          )}
                          {toolTags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-gray-400 text-xs mr-0.5">Tools</span>
                              {toolTags.map(tool => (
                                <Link
                                  key={tool}
                                  to="/skills"
                                  onMouseEnter={() => handleSkillEnter(tool)}
                                  onMouseLeave={() => setHoveredSkill(null)}
                                  className="border border-slate-300 text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-full px-2.5 py-0.5 text-xs transition-colors"
                                >
                                  {tool}
                                </Link>
                              ))}
                            </div>
                          )}
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
