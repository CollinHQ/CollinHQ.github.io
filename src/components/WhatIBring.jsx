import about from '../data/about.json'

export default function WhatIBring() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2 text-center">Value</p>
        <h2 className="font-serif text-4xl font-bold text-white mb-12 text-center">What I Bring</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {about.value_props.map(({ icon, title, text }) => (
            <div key={title} className="bg-[#1a2535] rounded-2xl p-6 border border-transparent hover:border-yellow-600/30 transition-colors">
              <span className="text-2xl">{icon}</span>
              <h3 className="font-serif text-lg font-bold text-white mt-3 mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
