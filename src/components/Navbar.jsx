import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import about from '../data/about.json'

const links = [
  { label: 'About',      href: '/#about',     scroll: true },
  { label: 'Skills',     href: '/skills',     scroll: false },
  { label: 'Projects',   href: '/projects',   scroll: false },
  { label: 'Experience', href: '/experience', scroll: false },
]

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
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

function HamburgerIcon({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6"  x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleAboutClick = (e) => {
    e.preventDefault()
    setMenuOpen(false)
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

  const renderLink = (link, mobile = false) => {
    const underline = 'relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-yellow-500 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100'
    const baseClass = mobile
      ? `block py-3 text-base tracking-wide transition-colors duration-200 ${isActive(link.href) ? 'text-yellow-500' : 'text-slate-200 hover:text-yellow-500'}`
      : `${underline} text-sm tracking-wide transition-colors duration-200 ${isActive(link.href) ? 'text-yellow-500 after:scale-x-100' : 'text-slate-300 hover:text-yellow-500 after:scale-x-0'}`

    return link.scroll ? (
      <a key={link.href} href={link.href} onClick={handleAboutClick} className={baseClass}>
        {link.label}
      </a>
    ) : (
      <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)} className={baseClass}>
        {link.label}
      </Link>
    )
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || menuOpen ? 'bg-[#0d1b2a]/95 backdrop-blur border-b border-yellow-600/20' : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
        <Link to="/" className="font-serif text-white text-base font-semibold tracking-wide hover:text-yellow-500 transition-colors">
          Collin Brown
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(link => renderLink(link, false))}

          <a
            href={about.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-slate-300 hover:text-yellow-500 transition-colors duration-200"
          >
            <LinkedInIcon />
          </a>

          <a
            href={about.contact.resume_pdf || '#'}
            download="Collin Brown Resume.pdf"
            className="border border-yellow-600/40 text-yellow-500 hover:bg-yellow-500/10 transition-colors duration-200 flex items-center gap-1.5 text-sm rounded-full px-3 py-1"
          >
            <DownloadIcon />
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="md:hidden p-2 -mr-2 text-slate-200 hover:text-yellow-500 transition-colors"
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden border-t border-yellow-600/10 bg-[#0d1b2a]/95 backdrop-blur">
          <div className="max-w-5xl mx-auto px-6 py-2">
            {links.map(link => renderLink(link, true))}

            <div className="flex items-center gap-6 pt-3 pb-2 border-t border-yellow-600/10 mt-2">
              <a
                href={about.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-yellow-500 transition-colors duration-200 flex items-center gap-2 text-sm"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
              <a
                href={about.contact.resume_pdf || '#'}
                download="Collin Brown Resume.pdf"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-yellow-500 transition-colors duration-200 flex items-center gap-2 text-sm"
              >
                <DownloadIcon />
                Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
