import { useState } from 'react'
import about from '../data/about.json'

export default function About() {
  const [photoFailed, setPhotoFailed] = useState(false)
  const hasPhoto = about.headshot && !photoFailed

  return (
    <section id="about" className="px-6 pt-12 pb-20 max-w-4xl mx-auto scroll-mt-16">
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

          {about.network_line && (
            <p className="text-slate-400 text-base leading-relaxed mt-6">
              {about.network_line}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
