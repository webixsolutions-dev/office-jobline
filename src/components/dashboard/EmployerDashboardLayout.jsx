import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import EmployerDashboardSidebar from './EmployerDashboardSidebar'
import { EmployerDataProvider } from '../../lib/EmployerDataContext'

export default function EmployerDashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <EmployerDataProvider>
      <div className="min-h-screen bg-[var(--color-bg-page)]">
        <EmployerDashboardSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

        <div className="flex min-h-screen flex-col lg:pl-64">
          <header className="site-gutter sticky top-0 z-30 flex items-center border-b border-[var(--color-border)] bg-white/90 py-3 backdrop-blur lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
            >
              <FiMenu className="h-5 w-5" />
            </button>
          </header>

          <main className="site-container flex-1 py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </EmployerDataProvider>
  )
}
