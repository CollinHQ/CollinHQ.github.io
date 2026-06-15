import about from '../data/about.json'

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24 scroll-mt-16">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2">Contact</p>
        <h2 className="font-serif text-4xl font-bold text-white mb-4">Get in Touch</h2>
        <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-xl mx-auto">
          Open to conversations about workplace operations roles, office build-outs,
          and how I can help your team. The fastest way to reach me is email.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${about.contact.email}`}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-[#0d1b2a] font-semibold text-sm rounded-full px-6 py-3 transition-colors"
          >
            <MailIcon />
            {about.contact.email}
          </a>
          <a
            href={about.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-yellow-600/40 text-yellow-500 hover:bg-yellow-500/10 text-sm rounded-full px-6 py-3 transition-colors"
          >
            <LinkedInIcon />
            LinkedIn
          </a>
          <a
            href={about.contact.resume_pdf}
            download="Collin Brown Resume.pdf"
            className="flex items-center gap-2 border border-yellow-600/40 text-yellow-500 hover:bg-yellow-500/10 text-sm rounded-full px-6 py-3 transition-colors"
          >
            <DownloadIcon />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  )
}
