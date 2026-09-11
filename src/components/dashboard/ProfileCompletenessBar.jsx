import { Link } from 'react-router-dom'

export default function ProfileCompletenessBar({ percent, showLink = true }) {
  const clamped = Math.min(100, Math.max(0, percent))

  return (
    <div className="mb-6 rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-card)] sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">Profile completeness</p>
          <p className="text-xs text-[var(--color-text-secondary)]">
            {clamped === 100 ? 'Your profile is complete!' : 'Complete your profile to help employers find you.'}
          </p>
        </div>
        <p className="font-display text-lg font-bold text-[var(--color-teal)]">{clamped}%</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--color-surface-alt)]">
        <div
          className="h-full rounded-full bg-[var(--color-teal)] transition-all duration-500"
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLink && clamped < 100 && (
        <Link
          to="/dashboard/profile"
          className="mt-3 inline-block text-sm font-semibold text-[var(--color-teal)] hover:underline"
        >
          Complete your profile →
        </Link>
      )}
    </div>
  )
}
