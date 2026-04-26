import { useState } from 'react'

const companyDomains = {
  'Rho':            'rho.co',
  'Klaviyo':        'klaviyo.com',
  'BRIDGE Housing': 'bridgehousing.com',
  'Werqwise':       'werqwise.com',
  'Connections':    null,
}

function LogoCircle({ company }) {
  const [failed, setFailed] = useState(false)
  const domain = companyDomains[company]
  const initial = company.charAt(0).toUpperCase()

  if (!domain || failed) {
    return (
      <div className="w-14 h-14 rounded-full border-2 border-yellow-500 bg-[#1a2535] flex items-center justify-center flex-shrink-0">
        <span className="text-yellow-500 font-bold text-lg">{initial}</span>
      </div>
    )
  }

  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={company}
      onError={() => setFailed(true)}
      className="w-14 h-14 rounded-full border-2 border-yellow-500 object-cover bg-white flex-shrink-0"
    />
  )
}

export default function Timeline({ experience }) {
  return (
    <div className="space-y-0">
      {experience.map((role, idx) => {
        const isLast = idx === experience.length - 1
        return (
          <div key={role.id} className="flex gap-0">

            {/* Left column — logo + vertical line */}
            <div className="flex flex-col items-center" style={{ minWidth: '5rem' }}>
              <LogoCircle company={role.company} />
              <p className="text-slate-500 text-xs mt-1 text-center leading-tight whitespace-nowrap">
                {role.start}
              </p>
              {!isLast && (
                <div className="flex-1 w-px bg-yellow-600/20 mt-2 mb-0" style={{ minHeight: '2rem' }} />
              )}
            </div>

            {/* Horizontal connector */}
            <div className="flex items-start pt-7">
              <div className="w-6 border-t border-yellow-600/20 mt-0" />
            </div>

            {/* Right column — card */}
            <div className="flex-1 pb-8 pt-1">
              <div className="border border-yellow-600/20 rounded-lg p-5 bg-[#0d1b2a]">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                  <h3
                    className="text-yellow-500 font-bold tracking-wide"
                    style={{ fontSize: '1.05rem', letterSpacing: '0.05em' }}
                  >
                    {role.company}
                  </h3>
                  <span className="text-slate-500 text-xs">{role.start} – {role.end}</span>
                </div>
                <p className="text-slate-400 text-xs mb-3 uppercase tracking-wider">{role.title} · {role.location}</p>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{role.description}</p>
                <ul className="space-y-1.5">
                  {role.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                      <span className="w-1 h-1 rounded-full bg-yellow-500 flex-shrink-0 mt-2" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}
