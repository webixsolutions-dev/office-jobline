import { Link } from 'react-router-dom'
import { FiBookmark, FiBriefcase, FiCheck, FiHeart, FiMapPin } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import Button from './Button'
import { useSavedJobsContext } from '../../lib/SavedJobsContext'

/**
 * Single job listing card.
 * When dashboard props are provided (isApplied, isSaved, onApply, onSaveToggle),
 * uses dashboard state instead of public SavedJobsContext routing.
 */
export default function JobCard({
  job,
  compact = false,
  isApplied: isAppliedProp,
  isSaved: isSavedProp,
  onApply,
  onSaveToggle,
}) {
  const savedJobsCtx = useSavedJobsContext()
  const isDashboardMode = typeof isAppliedProp === 'boolean' || typeof onApply === 'function'

  const saved = isDashboardMode ? isSavedProp : savedJobsCtx.isSaved(job.id)
  const applied = isDashboardMode ? isAppliedProp : false

  const handleSaveToggle = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (onSaveToggle) {
      onSaveToggle()
    } else {
      savedJobsCtx.toggleSaved(job.id)
    }
  }

  const handleApply = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (onApply) {
      onApply()
    }
  }

  return (
    <article
      className={`flex h-full flex-col rounded-xl bg-white shadow-[var(--shadow-card)] ${
        compact ? 'p-4' : 'p-5 sm:p-6'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: job.logoColor }}
            aria-hidden
          >
            {job.initials}
          </span>
          <div>
            <h3 className={`font-display font-bold text-[var(--color-text-primary)] ${compact ? 'text-sm' : 'text-base'}`}>
              {job.title}
            </h3>
            <Link
              to={`/employers/${job.employerSlug}`}
              className="text-sm font-medium text-[var(--color-teal)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
            >
              {job.company}
            </Link>
          </div>
        </div>
        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? 'Unsave job' : 'Save job'}
          onClick={handleSaveToggle}
          className={`rounded-full p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)] ${
            saved ? 'text-[var(--color-teal)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-teal)]'
          }`}
        >
          <FiHeart className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-text-secondary)] sm:text-sm">
        <span className="inline-flex items-center gap-1">
          <FiMapPin className="h-3.5 w-3.5" aria-hidden />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <FiBriefcase className="h-3.5 w-3.5" aria-hidden />
          {job.type}
        </span>
        <span className="inline-flex items-center gap-1">
          <HiOutlineBuildingOffice2 className="h-3.5 w-3.5" aria-hidden />
          {job.mode}
        </span>
      </div>

      {!compact && (
        <>
          <p className="mt-3 font-display text-sm font-bold text-[var(--color-text-primary)]">{job.salaryLabel}</p>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {job.description}
          </p>
        </>
      )}

      <div className={`mt-5 flex flex-col gap-2 sm:flex-row ${compact ? 'mt-4' : ''}`}>
        {applied ? (
          <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[var(--color-teal-light)] px-4 py-2.5 text-sm font-semibold text-[var(--color-teal)]">
            <FiCheck className="h-4 w-4" aria-hidden />
            Applied
          </span>
        ) : isDashboardMode ? (
          <Button variant="teal" className="flex-1" onClick={handleApply}>
            Apply Now
          </Button>
        ) : (
          <Button variant="teal" to={`/browse/${job.id}/apply`} className="flex-1">
            Apply Now
          </Button>
        )}
        <Button
          variant="outline-teal"
          icon={FiBookmark}
          iconPosition="right"
          className="flex-1"
          onClick={handleSaveToggle}
          aria-pressed={saved}
        >
          {saved ? 'Saved' : 'Save Job'}
        </Button>
      </div>
    </article>
  )
}
