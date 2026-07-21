import { Link } from 'react-router-dom'
import about from '../data/about.json'

const projectLinks = {
  "I'm on the floor for the build": '/projects/rho-hq-build-out',
  'Moves that land Monday-ready': '/projects/bridge-hq-relocation',
  'Systems that keep running without me': '/projects/klaviyo-coi-tracker',
  'Culture people can feel': '/projects/bridge-amenity-program',
}

export default function WhatIBring() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2 text-center">How I show up</p>
        <h2 className="font-serif text-4xl font-bold text-white mb-3 text-center">What I Bring</h2>
        <p className="text-slate-400 text-sm text-center mb-12 max-w-2xl mx-auto">
          The parts of the job I care about most — keeping the space working, the vendors honest,
          and the office somewhere people want to be.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {about.value_props.map(({ icon, title, text }) => {
            const href = projectLinks[title]
            return (
              <div key={title} className="bg-[#1a2535] rounded-2xl p-6 border border-transparent hover:border-yellow-600/30 transition-colors">
                <span className="text-2xl" aria-hidden="true">{icon}</span>
                <h3 className="font-serif text-lg font-bold text-white mt-3 mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
                {href && (
                  <Link
                    to={href}
                    className="inline-block mt-4 text-yellow-500 hover:text-yellow-400 text-xs font-semibold transition-colors"
                  >
                    See the story →
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
