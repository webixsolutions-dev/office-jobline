const STATUS_STYLES = {
  Active: {
    bg: 'var(--color-teal)',
    text: 'var(--color-white)',
  },
  Draft: {
    bg: 'var(--status-neutral-bg)',
    text: 'var(--status-neutral-text)',
  },
  Closed: {
    bg: 'transparent',
    text: 'var(--color-navy)',
    border: '1px solid var(--color-navy)',
  },
}

export default function JobPostingStatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Draft

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{
        backgroundColor: style.bg,
        color: style.text,
        border: style.border || 'none',
      }}
    >
      {status}
    </span>
  )
}
