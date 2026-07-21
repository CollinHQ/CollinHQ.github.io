import Hero from '../components/Hero'
import CompaniesBar from '../components/CompaniesBar'
import StatsBar from '../components/StatsBar'
import About from '../components/About'
import FeaturedWork from '../components/FeaturedWork'
import HireCTA from '../components/HireCTA'
import WhatIBring from '../components/WhatIBring'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Reveal from '../components/Reveal'
import usePageTitle from '../hooks/usePageTitle'

export default function Home() {
  usePageTitle(null)

  return (
    <>
      <Hero />
      <Reveal><CompaniesBar /></Reveal>
      <Reveal><StatsBar /></Reveal>
      <Reveal><FeaturedWork /></Reveal>
      <Reveal><HireCTA /></Reveal>
      <Reveal><WhatIBring /></Reveal>
      <Reveal><About /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><Contact /></Reveal>
    </>
  )
}
