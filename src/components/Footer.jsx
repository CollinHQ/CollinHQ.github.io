import { Link } from 'react-router-dom'
import about from '../data/about.json'

export default function Footer() {
  return (
    <footer className="border-t border-yellow-600/10 px-6 py-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-400 text-xs">
          © {new Date().getFullYear()} Collin Brown · San Francisco, CA
        </p>
        <div className="flex items-center gap-5 text-xs">
          <Link to="/skills" className="link-underline text-slate-400 hover:text-yellow-500 transition-colors">Skills</Link>
          <Link to="/projects" className="link-underline text-slate-400 hover:text-yellow-500 transition-colors">Projects</Link>
          <Link to="/experience" className="link-underline text-slate-400 hover:text-yellow-500 transition-colors">Experience</Link>
          <a href={`mailto:${about.contact.email}`} className="link-underline text-slate-400 hover:text-yellow-500 transition-colors">Email</a>
          <a href={about.contact.linkedin} target="_blank" rel="noreferrer" className="link-underline text-slate-400 hover:text-yellow-500 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
