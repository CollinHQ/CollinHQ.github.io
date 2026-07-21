import about from '../data/about.json'

export default function HireCTA() {
  const roles = about.target_roles || []

  return (
    <section className="px-6 py-14">
      <div className="max-w-3xl mx-auto text-center border border-yellow-600/25 bg-yellow-500/5 rounded-2xl px-6 py-10">
        <p className="text-yellow-500 text-xs uppercase tracking-widest mb-3">Open to roles</p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
          Looking for someone to own the workplace?
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xl mx-auto">
          I&apos;m open to Workplace Experience Manager, Workplace Manager, Workplace Coordinator,
          Office Manager, and Office Coordinator roles — especially where the job is taking care
          of the space and the people in it.
        </p>
        {roles.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-2 mb-7">
            {roles.map((role) => (
              <li
                key={role}
                className="border border-yellow-600/30 text-slate-300 text-xs rounded-full px-3 py-1"
              >
                {role}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${about.contact.email}?subject=Workplace%20/%20Office%20role`}
            className="bg-yellow-500 hover:bg-yellow-400 text-[#0d1b2a] font-semibold text-sm rounded-full px-6 py-3 transition-colors"
          >
            Email me
          </a>
          <a
            href={about.contact.resume_pdf}
            download="Collin Brown Resume.pdf"
            className="border border-yellow-600/40 text-yellow-500 hover:bg-yellow-500/10 text-sm rounded-full px-6 py-3 transition-colors"
          >
            Download resume
          </a>
        </div>
      </div>
    </section>
  )
}
