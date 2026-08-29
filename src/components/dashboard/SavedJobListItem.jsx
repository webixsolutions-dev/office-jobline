import { FiCheck } from 'react-icons/fi'
import Button from '../ui/Button'
import { useDashboardData } from '../../lib/DashboardDataContext'

export default function SavedJobListItem({ job }) {
  const { isJobApplied, applyToJob, removeSavedJob } = useDashboardData()
  const applied = isJobApplied(job.id)

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex items-start gap-3 min-w-0">
        <span
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: job.logoColor }}
          aria-hidden
        >
          {job.initials}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-base font-bold text-[var(--color-text-primary)]">{job.title}</h3>
          <p className="text-sm text-[var(--color-teal)]">{job.company}</p>
          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{job.location} · {job.type}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {applied ? (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-teal-light)] px-4 py-2 text-sm font-semibold text-[var(--color-teal)]">
            <FiCheck className="h-4 w-4" aria-hidden />
            Applied
          </span>
        ) : (
          <Button variant="teal" onClick={() => applyToJob(job)}>
            Apply Now
          </Button>
        )}
        <Button variant="outline-teal" onClick={() => removeSavedJob(job.id)}>
          Remove from Saved
        </Button>
      </div>
    </article>
  )
}
