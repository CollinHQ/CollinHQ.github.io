import { useState } from 'react'
import resume from '../data/resume.json'
import ResumeDrawer from './ResumeDrawer'

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export default function InteractiveResume() {
  const [activeBullet, setActiveBullet] = useState(null)

  return (
    <div>
      <div className="space-y-10">
        {resume.map((role) => (
          <div key={role.id} className="bg-[#1a2535] rounded-2xl p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
              <h3 className="font-serif text-xl font-bold text-white">{role.company}</h3>
              <span className="text-slate-500 text-sm">{role.start} — {role.end}</span>
            </div>
            <p className="text-yellow-500 text-sm mb-6">{role.title} · {role.location}</p>

            <ul className="space-y-4">
              {role.bullets.map((bullet) => (
                <li key={bullet.id} className="flex items-start gap-3 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0 mt-2" />
                  <span className="text-slate-300 text-sm leading-relaxed flex-1">
                    {bullet.short}
                  </span>
                  {bullet.has_detail && (
                    <button
                      onClick={() => setActiveBullet(bullet)}
                      title="Read more"
                      className="mt-0.5 text-yellow-500 hover:text-yellow-400 transition-colors opacity-60 group-hover:opacity-100"
                    >
                      <PlusIcon />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ResumeDrawer
        bullet={activeBullet}
        onClose={() => setActiveBullet(null)}
      />
    </div>
  )
}
