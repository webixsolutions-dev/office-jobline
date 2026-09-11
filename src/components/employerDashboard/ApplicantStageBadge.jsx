import { EMPLOYER_STAGES } from '../../constants/pipelineStages'

const STAGE_STYLES = {
  New: {
    bg: 'var(--color-teal-light)',
    text: 'var(--color-teal)',
  },
  Reviewed: {
    bg: 'var(--status-warning-bg)',
    text: 'var(--status-warning-text)',
  },
  Shortlisted: {
    bg: 'var(--status-warning-bg)',
    text: 'var(--status-warning-text)',
  },
  Interview: {
    bg: 'var(--color-teal)',
    text: 'var(--color-white)',
  },
  Offer: {
    bg: 'var(--status-success-bg)',
    text: 'var(--status-success-text)',
  },
  Rejected: {
    bg: 'var(--status-neutral-bg)',
    text: 'var(--status-neutral-text)',
  },
}

export default function ApplicantStageBadge({ stage }) {
  const style = STAGE_STYLES[stage] || STAGE_STYLES.New

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {stage}
    </span>
  )
}

export { EMPLOYER_STAGES as APPLICANT_STAGE_OPTIONS }
