const AVATAR_COLORS = [
  'var(--color-teal)',
  'var(--color-navy)',
  'var(--color-gold)',
  'var(--color-green)',
]

function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function DashboardUserCard({ name, roleLabel = 'Job Seeker' }) {
  const initials = getInitials(name)
  const colorIndex = (name?.charCodeAt(0) || 0) % AVATAR_COLORS.length

  return (
    <div className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-3">
      <span
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: AVATAR_COLORS[colorIndex] }}
        aria-hidden
      >
        {initials}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-[var(--color-text-primary)]">{name || 'Job Seeker'}</p>
        <p className="text-xs text-[var(--color-text-secondary)]">{roleLabel}</p>
      </div>
    </div>
  )
}

export { getInitials }
