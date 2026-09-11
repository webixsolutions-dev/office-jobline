import { FiBookmark } from 'react-icons/fi'
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner'
import SavedJobListItem from '../../components/dashboard/SavedJobListItem'
import Button from '../../components/ui/Button'
import { useDashboardData } from '../../lib/DashboardDataContext'

export default function SavedJobsPage() {
  const { savedJobs } = useDashboardData()

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Saved Jobs"
        subtitle="Jobs you've bookmarked to review or apply to later."
      />

      {savedJobs.length === 0 ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-10 text-center shadow-[var(--shadow-card)]">
          <FiBookmark className="mx-auto h-10 w-10 text-[var(--color-text-secondary)]" aria-hidden />
          <h2 className="mt-4 font-display text-lg font-bold text-[var(--color-text-primary)]">No saved jobs yet</h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            When you find a job you like, tap the bookmark icon to save it here.
          </p>
          <Button variant="teal" to="/dashboard/find-jobs" className="mt-6">
            Find Jobs
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <SavedJobListItem key={job.id} job={job} />
          ))}
        </div>
      )}
    </>
  )
}
