import { useEffect } from 'react'

export default function ResumeDrawer({ bullet, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!bullet) return null
  const { short, detail } = bullet

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#1a2535] z-50 shadow-2xl overflow-y-auto">
        <div className="p-8 pt-10">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-500 hover:text-yellow-500 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Resume bullet */}
          <p className="text-yellow-500 text-xs uppercase tracking-widest mb-4">In Depth</p>
          <p className="font-serif text-xl text-white leading-snug mb-8">{short}</p>

          {detail && (
            <div className="space-y-6">
              {detail.context && (
                <div>
                  <h4 className="text-slate-500 text-xs uppercase tracking-widest mb-2">Context</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{detail.context}</p>
                </div>
              )}
              {detail.challenge && (
                <div>
                  <h4 className="text-slate-500 text-xs uppercase tracking-widest mb-2">Challenge</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{detail.challenge}</p>
                </div>
              )}
              {detail.action && (
                <div>
                  <h4 className="text-slate-500 text-xs uppercase tracking-widest mb-2">Action</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{detail.action}</p>
                </div>
              )}
              {detail.result && (
                <div>
                  <h4 className="text-slate-500 text-xs uppercase tracking-widest mb-2">Result</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{detail.result}</p>
                </div>
              )}
              {detail.skills?.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-slate-500 text-xs uppercase tracking-widest mb-3">Skills Demonstrated</h4>
                  <div className="flex flex-wrap gap-2">
                    {detail.skills.map((s) => (
                      <span key={s} className="border border-yellow-600/40 text-yellow-500 bg-slate-800/50 rounded-full px-3 py-1 text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
