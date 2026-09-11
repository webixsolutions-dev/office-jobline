import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

/**
 * Route guard for Employer dashboard routes.
 * Redirects logged-out users to sign-in and job seekers to their dashboard.
 */
export default function RequireEmployerAuth({ children }) {
  const { isAuthenticated, role, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-page)]">
        <p className="font-semibold text-[var(--color-text-primary)]">Loading session...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />
  }

  if (role !== 'recruiter' && role !== 'employer') {
    return <Navigate to="/dashboard/overview" replace />
  }

  return children
}
