import { useState } from 'react'
import about from '../data/about.json'

export default function About() {
  const [photoFailed, setPhotoFailed] = useState(false)
  const hasPhoto = about.headshot && !photoFailed

  return (
    <section id="about" className="px-6 py-24 max-w-4xl mx-auto scroll-mt-16">
      <p className="text-yellow-500 text-xs uppercase tracking-widest mb-2">About</p>
      <h2 className="font-serif text-4xl font-bold text-white mb-8">Who I Am</h2>

      <div className={hasPhoto ? 'flex flex-col md:flex-row gap-10 items-start' : ''}>
        {hasPhoto && (
          <img
            src={about.headshot}
            alt={about.name}
            onError={() => setPhotoFailed(true)}
            className="w-48 h-48 rounded-2xl object-cover border-2 border-yellow-600/30 flex-shrink-0 mx-auto md:mx-0"
          />
        )}
        <div className="flex-1">
          <p className="text-slate-300 text-lg leading-relaxed">
            {about.bio}
          </p>

          {about.hospitality_line && (
            <blockquote className="border-l-2 border-yellow-500 pl-5 my-8">
              <p className="font-serif text-2xl text-white italic leading-snug">
                “{about.hospitality_line}”
              </p>
            </blockquote>
          )}

          {about.network_line && (
            <p className="text-slate-400 text-base leading-relaxed">
              {about.network_line}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
