import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import StatItem from '../ui/StatItem'
import TrustCard from '../ui/TrustCard'
import PromoBanner from '../ui/PromoBanner'
import { homeStats } from '../../constants/homeContent'

export default function HomeStatsStrip() {
  return (
    <section className="bg-offwhite" aria-label="Office Jobline at a glance">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeStats.map((stat) => (
            <div key={stat.value} className="rounded-xl bg-white p-6 shadow-card">
              <StatItem {...stat} />
            </div>
          ))}
          <TrustCard />
        </div>

        <PromoBanner
          className="mt-6"
          theme="teal"
          icon={HiOutlineBuildingOffice2}
          heading="Employers: Hire Office Talent That Drives Success"
          subtitle="Post your jobs, reach qualified office professionals, and grow your team with ease."
          ctaLabel="Learn More for Employers"
          ctaTo="/employers"
        />
      </div>
    </section>
  )
}
