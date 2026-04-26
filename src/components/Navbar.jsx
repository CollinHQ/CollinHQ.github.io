import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import about from '../data/about.json'

const links = [
  { label: 'About',      href: '/#about',    scroll: true },
  { label: 'Skills',     href: '/skills',    scroll: false },
  { label: 'Projects',   href: '/projects',  scroll: false },
  { label: 'Experience', href: '/experience',scroll: false },
]

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, link) => {
    if (!link.scroll) return
    e.preventDefault()
    if (location.pathname === '/') {
      document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }

  const isActive = (href) => {
    if (href === '/#about') return location.pathname === '/'
    return location.pathname === href
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0d1b2a]/95 backdrop-blur border-b border-yellow-600/20' : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
        <Link to="/" className="font-serif text-white text-base font-semibold tracking-wide hover:text-yellow-500 transition-colors">
          Collin Brown
        </Link>
        <div className="flex items-center gap-7">
          {links.map((link) => (
            link.scroll ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link)}
                className={`text-sm tracking-wide transition-colors duration-200 ${isActive(link.href) ? 'text-yellow-500' : 'text-slate-300 hover:text-yellow-500'}`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm tracking-wide transition-colors duration-200 ${isActive(link.href) ? 'text-yellow-500' : 'text-slate-300 hover:text-yellow-500'}`}
              >
                {link.label}
              </Link>
            )
          ))}
          <a
            href={about.contact.resume_pdf || '#'}
            download="Collin Brown Resume.pdf"
            className="text-slate-300 hover:text-yellow-500 transition-colors duration-200 flex items-center gap-1.5 text-sm"
          >
            <DownloadIcon />
            Resume
          </a>
        </div>
      </div>
    </nav>
  )
}
