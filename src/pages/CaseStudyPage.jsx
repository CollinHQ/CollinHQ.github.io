import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import projects from '../data/projects.json'
import about from '../data/about.json'
import usePageTitle from '../hooks/usePageTitle'

function PhotoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M15 8h.01" />
      <path d="m3 16 5-5c.928-.893 2.072-.893 3 0l5 5" />
      <path d="m14 14 1-1c.928-.893 2.072-.893 3 0l3 3" />
    </svg>
  )
}

// Renders the image when the file exists; otherwise a dashed placeholder marking
// what to gather (graceful fallback via onError, like ProjectCard).
function Photo({ src, label, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className={`border-2 border-dashed border-yellow-600/50 bg-yellow-500/5 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-300 px-3 text-center ${className}`}>
        <PhotoIcon />
        <span className="text-xs">{label}</span>
      </div>
    )
  }
  return <img src={src} alt={label} onError={() => setFailed(true)} className={`object-cover rounded-xl ${className}`} />
}

const prettify = (k) => k.replace(/_/g, ' ').replace(/\b\w/, (c) => c.toUpperCase())

export default function CaseStudyPage() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)
  usePageTitle(project ? project.title : 'Project')

  if (!project) {
    return (
      <div className="min-h-screen pt-32 px-6 text-center">
        <p className="text-slate-400 mb-6">That project doesn't exist.</p>
        <Link to="/projects" className="text-yellow-500 hover:text-yellow-400 transition-colors">← Back to projects</Link>
      </div>
    )
  }

  const {
    title, status, location, role, description,
    tags = [], key_highlights = [], numbers = {}, images = {},
    milestones_completed = [], outcome_headline, testimonial,
  } = project

  const statEntries = Object.entries(numbers).filter(([, v]) => v !== null && v !== true && v !== false)

  return (
    <div className="min-h-screen pt-24 pb-24 px-6">
      <article className="max-w-4xl mx-auto">

        {/* Breadcrumb + meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs mb-5">
          <Link to="/projects" className="text-yellow-500 hover:text-yellow-400 flex items-center gap-1 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false"><polyline points="15 18 9 12 15 6" /></svg>
            Projects
          </Link>
          {status && <span className="border border-yellow-600/40 text-yellow-500 rounded-full px-3 py-0.5">{status}</span>}
          {location && <span className="text-slate-500">{location}</span>}
        </div>

        {/* Title */}
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-none mb-3">{title}</h1>
        {role && <p className="text-slate-400 text-base mb-8 max-w-2xl">{role}</p>}

        {/* Hero */}
        <Photo src={images.hero} label="Add hero photo — the finished space, or a striking in-progress shot" className="w-full h-64 md:h-80 mb-8" />

        {/* Metrics — headline leads, supporting numbers follow */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {outcome_headline ? (
            <div className="bg-[#1a2535] rounded-lg p-4 text-center ring-1 ring-yellow-600/40">
              <div className="font-serif text-3xl font-bold text-yellow-500">{outcome_headline.value}</div>
              <div className="text-slate-400 text-xs uppercase tracking-wider mt-1">{outcome_headline.label}</div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-yellow-600/50 bg-yellow-500/5 rounded-lg p-4 text-center flex flex-col items-center justify-center">
              <div className="text-yellow-500 text-lg leading-none">+</div>
              <div className="text-slate-300 text-xs mt-1 leading-tight">Headline result — add one</div>
            </div>
          )}
          {statEntries.map(([k, v]) => (
            <div key={k} className="bg-[#1a2535] rounded-lg p-4 text-center">
              <div className="font-serif text-3xl font-bold text-yellow-500">{v}</div>
              <div className="text-slate-400 text-xs uppercase tracking-wider mt-1">{prettify(k)}</div>
            </div>
          ))}
        </div>

        {/* The brief */}
        {description && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-white mb-3">The brief</h2>
            <p className="text-slate-300 leading-relaxed max-w-2xl">{description}</p>
          </section>
        )}

        {/* What I drove */}
        {key_highlights.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-white mb-4">What I drove</h2>
            <ul className="space-y-3 max-w-2xl">
              {key_highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0 mt-2.5" />
                  {h}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Before / after */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-white mb-4">Before / after</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Photo src={images.before} label="Before photo" className="w-full h-48" />
            <Photo src={images.after} label="After photo" className="w-full h-48" />
          </div>
        </section>

        {/* Milestones */}
        {milestones_completed.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-white mb-4">Milestones delivered</h2>
            <div className="bg-[#1a2535] rounded-xl p-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {milestones_completed.map((m, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm leading-snug">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5" aria-hidden="true" focusable="false"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Testimonial */}
        <section className="mb-12">
          {testimonial ? (
            <figure className="bg-[#1a2535] rounded-2xl p-8">
              <blockquote className="font-serif text-2xl text-slate-200 italic leading-relaxed">“{testimonial.quote}”</blockquote>
              <figcaption className="text-slate-400 text-sm mt-4">
                {testimonial.name}{testimonial.title ? ` · ${testimonial.title}` : ''}
              </figcaption>
            </figure>
          ) : (
            <div className="border-2 border-dashed border-yellow-600/50 bg-yellow-500/5 rounded-2xl p-8 flex items-start gap-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#eab308" className="flex-shrink-0 opacity-80" aria-hidden="true" focusable="false"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" /></svg>
              <div>
                <p className="font-serif text-xl text-slate-200 italic">“Add a quote from someone on the build…”</p>
                <p className="text-slate-400 text-sm mt-2">A CEO walkthrough, building management, or a key vendor — anyone who saw you run it.</p>
              </div>
            </div>
          )}
        </section>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {tags.map((tag) => (
              <Link key={tag} to="/skills" className="border border-yellow-600/40 text-yellow-500 bg-slate-800/50 hover:bg-yellow-500/10 rounded-full px-3 py-1 text-xs transition-colors">{tag}</Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-wrap gap-4 border-t border-yellow-600/15 pt-8">
          <a href={`mailto:${about.contact.email}`} className="bg-yellow-500 hover:bg-yellow-400 text-[#0d1b2a] font-semibold text-sm rounded-full px-6 py-3 transition-colors">Get in touch</a>
          <a href={about.contact.resume_pdf} download="Collin Brown Resume.pdf" className="border border-yellow-600/40 text-yellow-500 hover:bg-yellow-500/10 text-sm rounded-full px-6 py-3 transition-colors">Download Resume</a>
        </div>

      </article>
    </div>
  )
}
