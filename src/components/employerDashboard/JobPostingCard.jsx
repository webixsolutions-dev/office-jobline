import { Link } from 'react-router-dom'
import { FiEdit2, FiUsers, FiXCircle, FiTrash2 } from 'react-icons/fi'
import JobPostingStatusBadge from './JobPostingStatusBadge'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function employmentLabel(value) {
  const labels = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    contract: 'Contract',
    temporary: 'Temporary',
    internship: 'Internship',
  }
  return labels[value] || value
}

export default function JobPostingCard({
  posting,
  onClose,
  onDelete,
  compact = false,
}) {
  return (
    <div
      className={`rounded-xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] ${
        compact ? 'p-4' : 'p-5'
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-bold text-[var(--color-text-primary)]">
              {posting.title}
            </h3>
            <JobPostingStatusBadge status={posting.status} />
          </div>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {posting.location} · {employmentLabel(posting.employmentType)}
          </p>
          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
            Posted {formatDate(posting.postedDate)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={`/employer-dashboard/job-postings/${posting.id}/applicants`}
            className="text-sm font-semibold text-[var(--color-teal)] hover:underline"
          >
            {posting.applicantCount} applicant{posting.applicantCount !== 1 ? 's' : ''}
          </Link>
        </div>
      </div>

      {!compact && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-4">
          <Link
            to={`/employer-dashboard/post-a-job?edit=${posting.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text-primary)]"
          >
            <FiEdit2 className="h-3.5 w-3.5" aria-hidden />
            Edit
          </Link>
          <Link
            to={`/employer-dashboard/job-postings/${posting.id}/applicants`}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text-primary)]"
          >
            <FiUsers className="h-3.5 w-3.5" aria-hidden />
            View Applicants
          </Link>
          {posting.status === 'Active' && (
            <button
              type="button"
              onClick={() => onClose?.(posting)}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text-primary)]"
            >
              <FiXCircle className="h-3.5 w-3.5" aria-hidden />
              Close
            </button>
          )}
          <button
            type="button"
            onClick={() => onDelete?.(posting)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--status-error)] transition-colors hover:bg-[var(--color-surface-alt)]"
          >
            <FiTrash2 className="h-3.5 w-3.5" aria-hidden />
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
