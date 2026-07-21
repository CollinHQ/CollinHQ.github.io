import about from '../data/about.json'

const defaults = [
  { value: '7+', label: 'Years SF workplace ops' },
  { value: '13K', label: 'Sq ft build-out, no GC' },
  { value: '~300', label: 'People moved, 0 downtime' },
  { value: '8+', label: 'Offices on COI system' },
]

export default function ScopeStrip() {
  const items = about.scope_strip?.length ? about.scope_strip : defaults

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 mb-2">
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map(({ value, label }) => (
          <div key={label} className="text-center">
            <dt className="font-serif text-2xl md:text-3xl font-bold text-yellow-500 leading-none">
              {value}
            </dt>
            <dd className="text-slate-400 text-[11px] md:text-xs uppercase tracking-wider mt-2 leading-snug">
              {label}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
