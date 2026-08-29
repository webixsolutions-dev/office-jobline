const STATUS_STYLES = {
  Applied: {
    bg: 'var(--color-teal-light)',
    text: 'var(--color-teal)',
  },
  'In Review': {
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
  'Not Selected': {
    bg: 'var(--status-neutral-bg)',
    text: 'var(--status-neutral-text)',
  },
}

export default function ApplicationStatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Applied

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {status}
    </span>
  )
}
