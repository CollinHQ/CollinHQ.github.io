import { Link } from 'react-router-dom'
import data from '../data/wins.json'

const TYPE_LABEL = {
  currently: 'Now',
  milestone: 'Milestone',
  highlight: 'Win',
}

function formatDate(iso) {
  if (!iso) return null
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function RecentWins({ limit = 5 }) {
  const wins = (data.wins || [])
    .slice()
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
    .slice(0, limit)

  if (!wins.length) return null

  return (
    <section className="px-6 py-16" aria-labelledby="recent-wins-heading">
      <div className="max-w-3xl mx-auto">
        <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2">Living log</p>
        <h2 id="recent-wins-heading" className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
          Recent wins
        </h2>
        <p className="text-slate-400 text-sm mb-8 max-w-xl leading-relaxed">
          Work accomplishments tracked as they happen — auto-synced from Notion when Publish is checked.
          Case studies stay curated; this feed stays current.
        </p>

        <ol className="space-y-0 border-l border-yellow-600/25 ml-2">
          {wins.map((item) => {
            const typeLabel = TYPE_LABEL[item.type] || 'Win'
            const when = formatDate(item.date)
            const body = (
              <>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
                  <span className="text-yellow-500 text-xs uppercase tracking-wider">{typeLabel}</span>
                  {when && <span className="text-slate-500 text-xs">{when}</span>}
                  {item.metric && (
                    <span className="text-slate-300 text-xs border border-yellow-600/25 rounded-full px-2 py-0.5">
                      {item.metric}
                    </span>
                  )}
                </div>
                <p className="text-slate-200 text-sm md:text-base leading-relaxed">{item.win}</p>
                {item.project_id && (
                  <p className="text-yellow-500/90 text-xs mt-2 font-semibold">
                    Related project →
                  </p>
                )}
              </>
            )

            return (
              <li key={item.id} className="relative pl-6 pb-8 last:pb-0">
                <span
                  className="absolute left-0 top-1.5 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-yellow-500 ring-4 ring-[#0d1b2a]"
                  aria-hidden="true"
                />
                {item.project_id ? (
                  <Link
                    to={`/projects/${item.project_id}`}
                    className="block rounded-lg -m-2 p-2 hover:bg-yellow-500/5 transition-colors"
                  >
                    {body}
                  </Link>
                ) : (
                  <div>{body}</div>
                )}
              </li>
            )
          })}
        </ol>

        {data.updated_at && (
          <p className="text-slate-600 text-xs mt-8">
            Last synced {data.updated_at}
            {data.source && data.source !== 'seed' ? ` · via ${data.source}` : ''}
          </p>
        )}
      </div>
    </section>
  )
}
