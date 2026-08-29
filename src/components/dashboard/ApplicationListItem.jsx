import ApplicationStatusBadge from './ApplicationStatusBadge'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function ApplicationListItem({ application, onWithdraw }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="min-w-0 flex-1">
        <p className="font-display text-base font-bold text-[var(--color-text-primary)]">{application.title}</p>
        <p className="text-sm text-[var(--color-text-secondary)]">{application.company}</p>
        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
          {application.location} · Applied {formatDate(application.dateApplied)}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <ApplicationStatusBadge status={application.status} />
        <button
          type="button"
          onClick={() => onWithdraw(application)}
          className="text-sm font-medium text-[var(--status-error)] hover:underline"
        >
          Withdraw Application
        </button>
      </div>
    </div>
  )
}
