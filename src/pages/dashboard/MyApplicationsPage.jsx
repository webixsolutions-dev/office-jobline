import { useMemo, useState } from 'react'
import { FiBriefcase } from 'react-icons/fi'
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner'
import ApplicationListItem from '../../components/dashboard/ApplicationListItem'
import ConfirmModal from '../../components/dashboard/common/ConfirmModal'
import Button from '../../components/ui/Button'
import { useDashboardData } from '../../lib/DashboardDataContext'

const STATUS_OPTIONS = ['All', 'Applied', 'In Review', 'Interview', 'Offer', 'Not Selected']
const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc', label: 'Oldest first' },
]

export default function MyApplicationsPage() {
  const { applications, withdrawApplication } = useDashboardData()
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('date-desc')
  const [withdrawTarget, setWithdrawTarget] = useState(null)

  const filtered = useMemo(() => {
    let list = [...applications]
    if (statusFilter !== 'All') {
      list = list.filter((app) => app.status === statusFilter)
    }
    list.sort((a, b) => {
      const da = new Date(a.dateApplied).getTime()
      const db = new Date(b.dateApplied).getTime()
      return sortBy === 'date-desc' ? db - da : da - db
    })
    return list
  }, [applications, statusFilter, sortBy])

  const handleConfirmWithdraw = () => {
    if (withdrawTarget) {
      withdrawApplication(withdrawTarget.id)
      setWithdrawTarget(null)
    }
  }

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="My Applications"
        subtitle="Track the status of every job you've applied to."
      />

      {applications.length > 0 && (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text-primary)]"
            aria-label="Filter by status"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'All' ? 'All statuses' : opt}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text-primary)]"
            aria-label="Sort applications"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-10 text-center shadow-[var(--shadow-card)]">
          <FiBriefcase className="mx-auto h-10 w-10 text-[var(--color-text-secondary)]" aria-hidden />
          <h2 className="mt-4 font-display text-lg font-bold text-[var(--color-text-primary)]">
            {applications.length === 0 ? "You haven't applied to any jobs yet" : 'No applications match this filter'}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Browse jobs and start applying — your applications will show up here.
          </p>
          <Button variant="teal" to="/dashboard/find-jobs" className="mt-6">
            Browse Jobs
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => (
            <ApplicationListItem key={app.id} application={app} onWithdraw={setWithdrawTarget} />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!withdrawTarget}
        title="Withdraw application?"
        description="This will remove the application from your list. You can always apply again later."
        confirmLabel="Yes, Withdraw"
        danger
        onConfirm={handleConfirmWithdraw}
        onClose={() => setWithdrawTarget(null)}
      />
    </>
  )
}
