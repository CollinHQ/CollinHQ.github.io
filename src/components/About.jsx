import about from '../data/about.json'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" className="px-6 pt-20 pb-20 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="About" title="Why this work" />

        <div className="grid md:grid-cols-[1.9fr_1fr] gap-10 md:gap-16 items-start">
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
            {about.bio}
          </p>

          <div className="md:border-l md:border-yellow-600/20 md:pl-8">
            <p className="text-yellow-500 text-xs uppercase tracking-[0.2em] mb-4">What I do</p>
            <ul className="flex flex-wrap gap-2">
              {about.skills.slice(0, 8).map((skill) => (
                <li
                  key={skill}
                  className="border border-slate-700 text-slate-300 bg-slate-800/40 rounded-full px-3 py-1 text-xs"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
