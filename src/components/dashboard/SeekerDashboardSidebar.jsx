import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiX,
  FiHome,
  FiFileText,
  FiBookmark,
  FiBell,
  FiUser,
  FiLogOut,
} from 'react-icons/fi'
import logo from '../../assets/images/logo.png'
import { useAuth } from '../../hooks/useAuth'
import DashboardUserCard from './DashboardUserCard'
import SidebarNavItem from './SidebarNavItem'

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/dashboard/overview', icon: FiHome, end: true },
  { label: 'My Applications', to: '/dashboard/applications', icon: FiFileText },
  { label: 'Saved Jobs', to: '/dashboard/saved-jobs', icon: FiBookmark },
  { label: 'Notifications', to: '/dashboard/notifications', icon: FiBell },
  { label: 'Profile & Settings', to: '/dashboard/profile', icon: FiUser },
]

function SidebarContent({ userName, onClose, onSignOut }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b border-[var(--color-border)] px-5 py-4">
        <img src={logo} className="h-9 w-auto" alt="Office Jobline" />
      </div>

      <div className="border-b border-[var(--color-border)] px-4 py-4">
        <DashboardUserCard name={userName} roleLabel="Job Seeker" />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem key={item.to} {...item} onClick={onClose} />
          ))}
        </div>
      </nav>

      <div className="border-t border-[var(--color-border)] px-3 py-4 space-y-0.5">
        <button
          type="button"
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text-primary)]"
        >
          <FiLogOut className="h-4 w-4 shrink-0" aria-hidden />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default function SeekerDashboardSidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const userName = user?.full_name || user?.name || 'Job Seeker'

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-[var(--color-border)] lg:block">
        <div className="fixed h-screen w-64">
          <SidebarContent userName={userName} onSignOut={handleSignOut} />
        </div>
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-[var(--color-navy-overlay)] backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-[var(--color-border)] bg-white lg:hidden"
            >
              <div className="relative h-full">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="absolute right-3 top-3 z-10 rounded-md p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
                >
                  <FiX className="h-5 w-5" />
                </button>
                <SidebarContent userName={userName} onClose={onClose} onSignOut={handleSignOut} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
