import { useState } from 'react'

const companies = [
  { name: 'Cushman & Wakefield', logo: null },
  { name: 'Klaviyo', logo: '/assets/images/logos/klaviyo.png' },
  { name: 'BRIDGE Housing', logo: '/assets/images/logos/bridge.png' },
  { name: 'Werqwise', logo: '/assets/images/logos/werqwise.png' },
  { name: 'ConnectionsSF', logo: '/assets/images/logos/connectionssf.png' },
]

function CompanyMark({ name, logo }) {
  const [failed, setFailed] = useState(false)

  if (!logo || failed) {
    return (
      <span className="font-serif text-sm md:text-base text-slate-300 tracking-wide">
        {name}
      </span>
    )
  }

  return (
    <img
      src={logo}
      alt={name}
      title={name}
      onError={() => setFailed(true)}
      className="h-8 md:h-9 w-auto max-w-[7.5rem] object-contain opacity-90"
    />
  )
}

export default function CompaniesBar() {
  return (
    <section className="px-6 pb-4" aria-label="Companies I've supported">
      <div className="max-w-5xl mx-auto border-y border-yellow-600/20 py-8">
        <p className="text-center text-slate-500 text-xs uppercase tracking-widest mb-6">
          Workplaces I&apos;ve run and supported
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {companies.map((company) => (
            <li key={company.name} className="flex items-center justify-center min-h-9">
              <CompanyMark name={company.name} logo={company.logo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
