import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  const [imgFailed, setImgFailed] = useState(false)
  const {
    id,
    icon,
    title,
    status,
    company,
    description,
    tags = [],
    key_highlights = [],
    images,
    case_study_ready,
    outcome_headline,
    proof_line,
  } = project

  const heroImg = images?.hero
  const showImg = heroImg && !imgFailed
  const highlights = key_highlights.slice(0, 3)

  return (
    <article className="bg-[#1a2535] rounded-2xl overflow-hidden flex flex-col h-full min-h-[18rem] border border-transparent hover:border-yellow-600/25 transition-colors">
      {showImg && (
        <img
          src={heroImg}
          alt={title}
          onError={() => setImgFailed(true)}
          className="w-full h-36 object-cover"
        />
      )}

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            {!showImg && <span className="text-2xl flex-shrink-0" aria-hidden="true">{icon}</span>}
            {company && (
              <p className="text-slate-400 text-xs uppercase tracking-wider truncate">{company}</p>
            )}
          </div>
          {status && (
            <span className={`text-xs px-2 py-1 rounded-full border flex-shrink-0 ${
              status === 'In Progress' || status === 'Ongoing'
                ? 'border-yellow-600/40 text-yellow-500'
                : 'border-slate-600/40 text-slate-400'
            }`}>
              {status}
            </span>
          )}
        </div>

        {outcome_headline && (
          <div>
            <p className="font-serif text-3xl font-bold text-yellow-500 leading-none">
              {outcome_headline.value}
            </p>
            <p className="text-slate-400 text-xs uppercase tracking-widest mt-1.5">
              {outcome_headline.label}
            </p>
            {proof_line && (
              <p className="text-slate-300 text-xs mt-2 leading-snug">{proof_line}</p>
            )}
          </div>
        )}

        <div>
          <h3 className="font-serif text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{description}</p>
        </div>

        {highlights.length > 0 && (
          <ul className="space-y-1.5">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-slate-300 text-xs leading-relaxed">
                <span className="w-1 h-1 rounded-full bg-yellow-500 flex-shrink-0 mt-1.5" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-1">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="border border-yellow-600/30 text-yellow-500/90 rounded-full px-2.5 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {case_study_ready && (
          <Link
            to={`/projects/${id}`}
            className="text-yellow-500 hover:text-yellow-400 text-sm font-semibold transition-colors inline-flex items-center gap-1"
          >
            Read the full story →
          </Link>
        )}
      </div>
    </article>
  )
}
