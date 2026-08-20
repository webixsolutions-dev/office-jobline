import AboutHero from '../components/about/AboutHero'
import WhoWeAre from '../components/about/WhoWeAre'
import OurMission from '../components/about/OurMission'
import OurValues from '../components/about/OurValues'
import StatsStrip from '../components/about/StatsStrip'
import HowWeHelp from '../components/about/HowWeHelp'
import FeatureHighlights from '../components/about/FeatureHighlights'
import Testimonials from '../components/about/Testimonials'
import AboutCTA from '../components/about/AboutCTA'
import ContactCards from '../components/about/ContactCard'

export default function AboutUs() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <OurMission />
      <OurValues />
      <StatsStrip />
      <HowWeHelp />
      <FeatureHighlights />
      <Testimonials />
      <AboutCTA />
      <ContactCards />
    </>
  )
}
