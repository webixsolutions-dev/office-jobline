import HomeHero from '../components/home/HomeHero'
import HomeSearch from '../components/home/HomeSearch'
import HomeStatsStrip from '../components/home/HomeStatsStrip'
import WhyChooseUs from '../components/home/WhyChooseUs'
import PopularJobCategories from '../components/home/PopularJobCategories'
import HowItWorks from '../components/home/HowItWorks'
import ForEmployersHighlight from '../components/home/ForEmployersHighlight'
import HomeTestimonials from '../components/home/HomeTestimonials'
import PostAJobCTA from '../components/home/PostAJobCTA'
import CareerResources from '../components/home/CareerResources'
import HomeClosingCTA from '../components/home/HomeClosingCTA'

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeSearch />
      <HomeStatsStrip />
      <WhyChooseUs />
      <PopularJobCategories />
      <HowItWorks />
      <ForEmployersHighlight />
      <HomeTestimonials />
      <PostAJobCTA />
      <CareerResources />
      <HomeClosingCTA />
    </>
  )
}
