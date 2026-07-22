import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Analytics from './components/Analytics'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import CaseStudyPage from './pages/CaseStudyPage'
import SkillsPage from './pages/SkillsPage'
import ExperiencePage from './pages/ExperiencePage'

// Re-keys on each route so the page fades/slides in (page-enter animation).
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <div key={location.pathname} className="page-enter">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        {/* Hidden, unlinked case-study route — reachable only by direct URL for review */}
        <Route path="/projects/:id" element={<CaseStudyPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <ScrollProgress />
      {/* Faint film grain over the whole page for editorial depth */}
      <div aria-hidden="true" className="bg-grain pointer-events-none fixed inset-0 z-[1] opacity-[0.04]" />
      <div className="bg-[#0d1b2a] min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:left-3 focus:bg-yellow-500 focus:text-[#0d1b2a] focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
