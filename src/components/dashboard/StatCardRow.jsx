import { FiFileText, FiBookmark, FiCalendar, FiAward } from 'react-icons/fi'
import { useContext } from 'react'
import { DashboardDataContext } from '../../lib/DashboardDataContext'

const STAT_CONFIG = [
  { key: 'applications', label: 'Applications', icon: FiFileText, accent: 'teal' },
  { key: 'savedJobs', label: 'Saved Jobs', icon: FiBookmark, accent: 'gold' },
  { key: 'interviews', label: 'Interviews', icon: FiCalendar, accent: 'teal' },
  { key: 'offers', label: 'Offers', icon: FiAward, accent: 'green' },
]

const ACCENT_STYLES = {
  teal: 'bg-[var(--color-teal-light)] text-[var(--color-teal)]',
  gold: 'bg-[var(--color-gold-tint)] text-[var(--color-gold-dark)]',
  green: 'bg-[var(--status-success-bg)] text-[var(--status-success-text)]',
}

export default function StatCardRow({ config = STAT_CONFIG, stats: statsProp }) {
  const dashboardCtx = useContext(DashboardDataContext)
  const stats = statsProp ?? dashboardCtx?.stats ?? {}

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {config.map(({ key, label, icon: Icon, accent }) => (
        <div
          key={key}
          className="rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-card)] sm:p-5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--color-text-secondary)] sm:text-sm">{label}</span>
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${ACCENT_STYLES[accent]}`}>
              <Icon className="h-4 w-4" aria-hidden />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-[var(--color-text-primary)]">{stats[key] ?? 0}</p>
        </div>
      ))}
    </div>
  )
}
