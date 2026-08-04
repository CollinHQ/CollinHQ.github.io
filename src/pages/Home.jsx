import Hero from '../components/Hero'
import About from '../components/About'
import FeaturedWork from '../components/FeaturedWork'
import RecentWins from '../components/RecentWins'
import Contact from '../components/Contact'
import Reveal from '../components/Reveal'
import usePageTitle from '../hooks/usePageTitle'

export default function Home() {
  usePageTitle(null)

  return (
    <>
      <Hero />
      <Reveal><About /></Reveal>
      <Reveal><FeaturedWork /></Reveal>
      <Reveal><RecentWins /></Reveal>
      <Reveal><Contact /></Reveal>
    </>
  )
}
