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
        <p className="text-slate-300 text-lg leading-relaxed flex-1">
          {about.bio}
        </p>
      </div>
    </section>
  )
}
