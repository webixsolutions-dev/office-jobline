import BrowseHero from '../components/browse/BrowseHero'
import BrowseSearch from '../components/browse/BrowseSearch'
import TrustStrip from '../components/browse/TrustStrip'
import JobListings from '../components/browse/JobListings'
import PopularCategories from '../components/browse/PopularCategories'
import FeaturedEmployers from '../components/browse/FeaturedEmployers'
import BrowseByCity from '../components/browse/BrowseByCity'
import JobAlertBanner from '../components/browse/JobAlertBanner'
import JobSeekerSupport from '../components/browse/JobSeekerSupport'
import ClosingCTA from '../components/browse/ClosingCTA'

export default function Browse() {
  return (
    <>
      <BrowseHero />
      <BrowseSearch />
      <TrustStrip />
      <JobListings />
      <PopularCategories />
      <FeaturedEmployers />
      <BrowseByCity />
      <JobAlertBanner />
      <JobSeekerSupport />
      <ClosingCTA />
    </>
  )
}
