import testimonials from '../data/testimonials.json'
import SectionHeading from './SectionHeading'

export default function Testimonials() {
  if (!testimonials.length) return null

  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <SectionHeading align="center" eyebrow="Social proof" title="Endorsements" />
        <p className="text-slate-400 text-sm text-center max-w-xl mx-auto -mt-4 mb-10">
          What managers and teammates have said about working with me.
        </p>

        <div className={`grid gap-6 ${testimonials.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl mx-auto'}`}>
          {testimonials.map(({ id, quote, name, title, company, relationship }) => (
            <figure key={id} className="bg-[#1a2535] rounded-2xl p-8 flex flex-col ring-1 ring-yellow-600/15">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className="text-yellow-500/40 mb-4">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
              </svg>
              <blockquote className="text-slate-300 text-base leading-relaxed flex-1">
                {quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-yellow-600/15">
                <p className="text-white font-semibold text-sm">{name}</p>
                <p className="text-slate-400 text-xs mt-0.5">{title} · {company}</p>
                {relationship && (
                  <p className="text-yellow-500/80 text-xs mt-1">{relationship}</p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
