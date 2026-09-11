import { FiArrowRight, FiBell } from 'react-icons/fi'
import Banner from '../ui/Banner'
import { scrollToJobListings } from '../../lib/jobFilters'

export default function ClosingCTA() {
  return (
    <Banner
      theme="teal"
      icon={FiBell}
      title="Ready to Find Your Next Office Opportunity?"
      subtitle="Browse more office and administrative jobs across Canada or set up job alerts and never miss a new opportunity."
      primary={{
        label: 'Browse More Jobs →',
        onClick: scrollToJobListings,
        icon: FiArrowRight,
        variant: 'gold',
      }}
      secondary={{
        label: 'Set Job Alerts',
        to: '/job-alerts',
        icon: FiBell,
      }}
    />
  )
}
