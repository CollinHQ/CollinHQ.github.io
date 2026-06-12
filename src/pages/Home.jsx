import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import WhatIBring from '../components/WhatIBring'
import About from '../components/About'
import FeaturedWork from '../components/FeaturedWork'
import Contact from '../components/Contact'
import usePageTitle from '../hooks/usePageTitle'

export default function Home() {
  usePageTitle(null)

  return (
    <>
      <Hero />
      <StatsBar />
      <WhatIBring />
      <About />
      <FeaturedWork />
      <Contact />
    </>
  )
}
