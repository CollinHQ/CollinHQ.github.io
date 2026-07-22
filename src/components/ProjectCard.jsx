import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  const [flipped, setFlipped] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const imgRef = useRef(null)
  const { id, icon, title, status, description, tags, numbers, key_highlights, images, case_study_ready } = project

  const heroImg = images?.hero
  const showImg = heroImg && !imgFailed

  useEffect(() => {
    if (imgRef.current?.complete) setImgLoaded(true)
  }, [])

  const statEntries = Object.entries(numbers || {}).filter(
    ([, v]) => v !== null && v !== true && v !== false
  )

  const frontHighlights = (key_highlights || []).slice(0, 2)

  return (
    <div
      className="group cursor-pointer h-full min-h-[18rem] transition-transform duration-300 hover:-translate-y-1.5"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped(f => !f)}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${title} — ${flipped ? 'show summary' : 'show details'}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped(f => !f)
        }
      }}
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
          className="col-start-1 row-start-1 bg-[#1a2535] rounded-2xl overflow-hidden flex flex-col ring-1 ring-transparent transition-shadow duration-300 group-hover:ring-yellow-600/40 group-hover:shadow-xl group-hover:shadow-black/40"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Hero photo — renders only when the file exists */}
          {showImg && (
            <img
              ref={imgRef}
              src={heroImg}
              alt={title}
              onError={() => setImgFailed(true)}
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-36 object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          )}

          <div className="p-6 flex flex-col gap-3 flex-1">
            <div className="flex items-start justify-between">
              {!showImg && <span className="text-3xl">{icon}</span>}
              <span className={`text-xs px-2 py-1 rounded-full border ${showImg ? '' : 'ml-auto'} ${
                status === 'In Progress'
                  ? 'border-yellow-600/40 text-yellow-500'
                  : status === 'Ongoing'
                  ? 'border-yellow-600/40 text-yellow-500/80'
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

            {case_study_ready ? (
              <div className="mt-auto flex items-center justify-between gap-2">
                <Link
                  to={`/projects/${id}`}
                  onClick={e => e.stopPropagation()}
                  tabIndex={flipped ? -1 : 0}
                  className="text-yellow-500 hover:text-yellow-400 text-xs font-semibold transition-colors"
                >
                  View case study →
                </Link>
                <span className="text-slate-500 text-xs">Flip for details</span>
              </div>
            ) : (
              <p className="text-slate-400 text-xs mt-auto">Click for more →</p>
            )}
          </div>
        </div>

        {/* Back */}
        <div
          className="col-start-1 row-start-1 bg-[#1f2d40] rounded-2xl p-6 flex flex-col gap-4"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="font-serif text-xl font-bold text-white">{title}</h3>

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
                tabIndex={flipped ? 0 : -1}
                className="border border-yellow-600/40 text-yellow-500 bg-slate-800/50 hover:bg-yellow-500/10 rounded-full px-3 py-1 text-xs transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-slate-400 text-xs">Click to flip back</p>
            {case_study_ready && (
              <Link
                to={`/projects/${id}`}
                onClick={e => e.stopPropagation()}
                tabIndex={flipped ? 0 : -1}
                className="text-yellow-500 hover:text-yellow-400 text-xs font-semibold transition-colors"
              >
                View case study →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
