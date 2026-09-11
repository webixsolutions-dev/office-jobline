import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner'
import StatCardRow from '../../components/dashboard/StatCardRow'
import ProfileCompletenessBar from '../../components/dashboard/ProfileCompletenessBar'
import RecommendedJobsSection from '../../components/dashboard/RecommendedJobsSection'
import { useDashboardData } from '../../lib/DashboardDataContext'

export default function OverviewPage() {
  const { profileCompleteness } = useDashboardData()

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Dashboard"
        subtitle="Your job search at a glance."
      />
      <StatCardRow />
      <ProfileCompletenessBar percent={profileCompleteness} />
      <RecommendedJobsSection />
    </>
  )
}
