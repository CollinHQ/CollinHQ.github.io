import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import About from '../components/About'
import FeaturedWork from '../components/FeaturedWork'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Reveal from '../components/Reveal'
import usePageTitle from '../hooks/usePageTitle'

export default function Home() {
  usePageTitle(null)

  return (
    <>
      <Hero />
      <Reveal><StatsBar /></Reveal>
      <Reveal><About /></Reveal>
      <Reveal><FeaturedWork /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><Contact /></Reveal>
    </>
  )
}
