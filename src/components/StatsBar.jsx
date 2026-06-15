import about from '../data/about.json'

export default function StatsBar() {
  return (
    <section className="px-6 pb-8">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-yellow-600/20 py-8">
        {about.stats.map(({ value, label, story }) => (
          <div
            key={label}
            tabIndex={story ? 0 : -1}
            className="relative group text-center cursor-default rounded-lg"
          >
            <p className="font-serif text-4xl font-bold text-yellow-500">{value}</p>
            <p className="text-slate-400 text-xs uppercase tracking-widest mt-2">{label}</p>

            {story && (
              <>
                {/* Inline receipt on mobile — always visible (touch has no hover) */}
                <p className="md:hidden text-slate-400 text-xs leading-relaxed mt-2">{story}</p>

                {/* Tooltip on md+ — reveals on hover or keyboard focus */}
                <div className="hidden md:block pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 max-w-[80vw] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 transition-all duration-200 z-20">
                  <div className="bg-[#1a2535] border border-yellow-600/30 rounded-lg p-3 shadow-xl text-left">
                    <p className="text-slate-300 text-xs leading-relaxed">{story}</p>
                  </div>
                  <div className="w-2 h-2 bg-[#1a2535] border-r border-b border-yellow-600/30 rotate-45 mx-auto -mt-1" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
