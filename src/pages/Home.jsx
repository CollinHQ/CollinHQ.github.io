import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import About from '../components/About'
import Contact from '../components/Contact'
import usePageTitle from '../hooks/usePageTitle'

export default function Home() {
  usePageTitle(null)

  return (
    <>
      <Hero />
      <StatsBar />
      <About />
      <Contact />
    </>
  )
}
