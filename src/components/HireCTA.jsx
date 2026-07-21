import about from '../data/about.json'

export default function HireCTA() {
  return (
    <section className="px-6 py-14">
      <div className="max-w-3xl mx-auto text-center border border-yellow-600/25 bg-yellow-500/5 rounded-2xl px-6 py-10">
        <p className="text-yellow-500 text-xs uppercase tracking-widest mb-3">Open to roles</p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
          Hiring for Workplace Experience, Facilities, or a move / build-out lead?
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-7 max-w-xl mx-auto">
          I own the blend hiring managers actually want: vendor &amp; budget ops, space delivery,
          and employee experience with measurable outcomes — not just hospitality polish.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${about.contact.email}?subject=Workplace%20ops%20role`}
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
