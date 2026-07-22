// Shared editorial section header: a gold rule + tracked eyebrow label, then a
// serif title. Left-aligned by default (optional right-side action); pass
// align="center" for closing sections like Contact.
export default function SectionHeading({ eyebrow, title, action, align = 'left' }) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'text-center mb-10' : 'flex items-end justify-between gap-4 flex-wrap mb-10'}>
      <div>
        {eyebrow && (
          <p className={`flex items-center gap-3 text-yellow-500 text-xs uppercase tracking-[0.2em] mb-3 ${centered ? 'justify-center' : ''}`}>
            <span className="h-px w-8 bg-yellow-600/50" aria-hidden="true" />
            {eyebrow}
            {centered && <span className="h-px w-8 bg-yellow-600/50" aria-hidden="true" />}
          </p>
        )}
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">{title}</h2>
      </div>
      {action && !centered && <div className="shrink-0 pb-1">{action}</div>}
    </div>
  )
}
