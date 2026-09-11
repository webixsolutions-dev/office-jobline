import { FiFileText, FiArrowRight, FiXCircle } from 'react-icons/fi'
import ApplicantStageBadge from './ApplicantStageBadge'
import { getNextEmployerStage } from '../../constants/pipelineStages'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function ApplicantListItem({
  applicant,
  jobTitle,
  onViewProfile,
  onAdvance,
  onReject,
}) {
  const canAdvance = applicant.stage !== 'Offer' && applicant.stage !== 'Rejected'
  const canReject = applicant.stage !== 'Rejected'

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onViewProfile?.(applicant)}
          className="font-display text-base font-bold text-[var(--color-text-primary)] hover:text-[var(--color-teal)] hover:underline"
        >
          {applicant.name}
        </button>
        {jobTitle && (
          <p className="text-sm text-[var(--color-text-secondary)]">{jobTitle}</p>
        )}
        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
          Applied {formatDate(applicant.appliedDate)}
        </p>
        {applicant.resumeFilename && (
          <p className="mt-1 flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
            <FiFileText className="h-3 w-3 shrink-0" aria-hidden />
            {applicant.resumeFilename}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <ApplicantStageBadge stage={applicant.stage} />
        {canAdvance && (
          <button
            type="button"
            onClick={() => onAdvance?.(applicant)}
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-teal)] hover:underline"
          >
            <FiArrowRight className="h-3.5 w-3.5" aria-hidden />
            Advance to {getNextEmployerStage(applicant.stage)}
          </button>
        )}
        {canReject && (
          <button
            type="button"
            onClick={() => onReject?.(applicant)}
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--status-error)] hover:underline"
          >
            <FiXCircle className="h-3.5 w-3.5" aria-hidden />
            Reject
          </button>
        )}
        <button
          type="button"
          onClick={() => onViewProfile?.(applicant)}
          className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:underline"
        >
          View Profile
        </button>
      </div>
    </div>
  )
}
