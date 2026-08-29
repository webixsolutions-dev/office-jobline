import JobCard from '../ui/JobCard'
import { MOCK_RECOMMENDED_JOBS } from '../../data/mockRecommendedJobs'
import { useDashboardData } from '../../lib/DashboardDataContext'

export default function RecommendedJobsSection() {
  const { isJobApplied, isJobSaved, applyToJob, toggleSaveJob } = useDashboardData()

  return (
    <section>
      <div className="mb-4">
        <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)]">Recommended Jobs</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">Jobs selected for you.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {MOCK_RECOMMENDED_JOBS.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            compact
            isApplied={isJobApplied(job.id)}
            isSaved={isJobSaved(job.id)}
            onApply={() => applyToJob(job)}
            onSaveToggle={() => toggleSaveJob(job)}
          />
        ))}
      </div>
    </section>
  )
}
