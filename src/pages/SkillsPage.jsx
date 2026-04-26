import { useState } from 'react'
import { Link } from 'react-router-dom'
import about from '../data/about.json'
import resume from '../data/resume.json'

function getMatchingBullets(skill) {
  if (!skill) return []
  const matches = []
  resume.forEach((role) => {
    role.bullets.forEach((bullet) => {
      if (bullet.skills?.includes(skill)) {
        matches.push({ ...bullet, company: role.company, roleTitle: role.title })
      }
    })
  })
  return matches
}

export default function SkillsPage() {
  const [selectedSkill, setSelectedSkill] = useState(null)
  const matchingBullets = getMatchingBullets(selectedSkill)

  const handleSkillClick = (skill) => {
    setSelectedSkill(prev => prev === skill ? null : skill)
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2">Capabilities</p>
        <h1 className="font-serif text-5xl font-bold text-white mb-4">Skills & Tools</h1>
        <p className="text-slate-400 text-lg mb-14 max-w-2xl">
          Operational expertise built across workplace environments, vendor ecosystems, and cross-functional teams.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-14">
          {/* Core Skills — pill/tag style, clickable */}
          <div>
            <h2 className="text-yellow-500 text-xs uppercase tracking-widest mb-2">Core Skills</h2>
            <p className="text-slate-500 text-xs mb-5">Click any skill to see where it shows up in my experience.</p>
            <div className="flex flex-wrap gap-3">
              {about.skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillClick(skill)}
                  className={`border rounded-full px-4 py-1.5 text-sm transition-all duration-200 ${
                    selectedSkill === skill
                      ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10'
                      : 'border-yellow-600/40 text-yellow-500 bg-slate-800/50 hover:bg-yellow-500/10'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Tools — bullet list */}
          <div>
            <h2 className="text-yellow-500 text-xs uppercase tracking-widest mb-6">Tools</h2>
            <ul className="space-y-3">
              {about.tools.map((tool) => (
                <li key={tool} className="flex items-center gap-3 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                  <span className="text-base">{tool}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Matching bullets panel */}
        {selectedSkill && (
          <div className="border-t border-yellow-600/20 pt-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-yellow-500 text-xs uppercase tracking-widest mb-1">
                  Showing experience for
                </p>
                <h2 className="font-serif text-2xl font-bold text-white">{selectedSkill}</h2>
              </div>
              <Link
                to={`/experience?skill=${encodeURIComponent(selectedSkill)}`}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-yellow-500 transition-colors border border-slate-700 hover:border-yellow-600/40 rounded-full px-4 py-2"
              >
                View in resume
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            {matchingBullets.length > 0 ? (
              <div className="space-y-3">
                {matchingBullets.map((bullet) => (
                  <div key={bullet.id} className="bg-[#1a2535] rounded-xl px-6 py-4 flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0 mt-2" />
                    <div className="flex-1">
                      <p className="text-slate-300 text-sm leading-relaxed">{bullet.short}</p>
                      <p className="text-slate-500 text-xs mt-1">{bullet.company} — {bullet.roleTitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm italic">No resume bullets tagged with this skill yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
