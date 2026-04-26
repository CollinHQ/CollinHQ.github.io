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

function buildSummary(skill, bullets) {
  if (!bullets.length) return null
  const companies = [...new Set(bullets.map(b => b.company))]
  const companyText = companies.length === 1
    ? companies[0]
    : companies.slice(0, -1).join(', ') + ' and ' + companies[companies.length - 1]
  return `${skill} shows up across ${bullets.length} resume bullet${bullets.length > 1 ? 's' : ''} at ${companyText}. Select any entry below to read the full context, or click "View in Resume" to see them highlighted alongside the rest of my experience.`
}

function DocumentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

export default function SkillsPage() {
  const [selectedSkill, setSelectedSkill] = useState(null)
  const matchingBullets = getMatchingBullets(selectedSkill)
  const summary = buildSummary(selectedSkill, matchingBullets)

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

        {selectedSkill && (
          <div className="border-t border-yellow-600/20 pt-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-yellow-500 text-xs uppercase tracking-widest mb-1">Showing experience for</p>
                <h2 className="font-serif text-2xl font-bold text-white">{selectedSkill}</h2>
              </div>
              <Link
                to={`/experience?skill=${encodeURIComponent(selectedSkill)}`}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-yellow-500 transition-colors border border-slate-700 hover:border-yellow-600/40 rounded-full px-4 py-2 whitespace-nowrap"
              >
                <DocumentIcon />
                View in Resume
              </Link>
            </div>

            {/* Dynamic summary */}
            {summary && (
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-2xl">{summary}</p>
            )}

            {matchingBullets.length > 0 ? (
              <div className="bg-[#1a2535] rounded-xl overflow-hidden">
                {matchingBullets.map((bullet, i) => (
                  <div
                    key={bullet.id}
                    className={`flex items-start gap-4 px-6 py-4 ${
                      i < matchingBullets.length - 1 ? 'border-b border-slate-700/50' : ''
                    }`}
                  >
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
