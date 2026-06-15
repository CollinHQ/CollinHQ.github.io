import about from '../data/about.json'

export default function About() {
  return (
    <section id="about" className="px-6 pt-12 pb-20 max-w-4xl mx-auto scroll-mt-16">
      <p className="text-slate-300 text-lg leading-relaxed">
        {about.bio}
      </p>
    </section>
  )
}
