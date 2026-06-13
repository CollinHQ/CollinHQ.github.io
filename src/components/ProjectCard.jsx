import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  const [flipped, setFlipped] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const { icon, title, status, description, tags, numbers, key_highlights, images } = project

  const heroImg = images?.hero
  const showImg = heroImg && !imgFailed

  const statEntries = Object.entries(numbers || {}).filter(
    ([, v]) => v !== null && v !== true && v !== false
  )

  const frontHighlights = (key_highlights || []).slice(0, 2)

  return (
    <div
      className="cursor-pointer h-full min-h-[18rem]"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className="relative w-full h-full grid grid-cols-1 grid-rows-1 transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="col-start-1 row-start-1 bg-[#1a2535] rounded-2xl overflow-hidden flex flex-col"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Hero photo — renders only when the file exists */}
          {showImg && (
            <img
              src={heroImg}
              alt={title}
              onError={() => setImgFailed(true)}
              className="w-full h-36 object-cover"
            />
          )}

          <div className="p-6 flex flex-col gap-3 flex-1">
            <div className="flex items-start justify-between">
              {!showImg && <span className="text-3xl">{icon}</span>}
              <span className={`text-xs px-2 py-1 rounded-full border ${showImg ? '' : 'ml-auto'} ${
                status === 'In Progress'
                  ? 'border-yellow-600/40 text-yellow-500'
                  : status === 'Ongoing'
                  ? 'border-teal-600/40 text-teal-400'
                  : 'border-slate-600/40 text-slate-400'
              }`}>
                {status}
              </span>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>

            {frontHighlights.length > 0 && (
              <ul className="space-y-1.5">
                {frontHighlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300 text-xs leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-yellow-500 flex-shrink-0 mt-1.5" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {statEntries.length > 0 && (
              <div className="flex gap-4 flex-wrap">
                {statEntries.map(([key, val]) => (
                  <div key={key} className="text-center">
                    <div className="text-yellow-500 font-bold text-lg">{val}</div>
                    <div className="text-slate-500 text-xs capitalize">
                      {key.replace(/_/g, ' ')}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-slate-600 text-xs mt-auto">Click for more →</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="col-start-1 row-start-1 bg-[#1f2d40] rounded-2xl p-6 flex flex-col gap-4"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="font-serif text-lg font-bold text-white">{title}</h3>

          <ul className="space-y-2 flex-1">
            {(key_highlights || []).slice(0, 4).map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-xs leading-relaxed">
                <span className="w-1 h-1 rounded-full bg-yellow-500 flex-shrink-0 mt-1.5" />
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                to="/skills"
                onClick={e => e.stopPropagation()}
                className="border border-yellow-600/40 text-yellow-500 bg-slate-800/50 hover:bg-yellow-500/10 rounded-full px-3 py-1 text-xs transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          <p className="text-slate-600 text-xs">Click to flip back</p>
        </div>
      </div>
    </div>
  )
}
