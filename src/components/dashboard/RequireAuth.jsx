import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

/**
 * Route guard for Job Seeker dashboard routes.
 * Redirects logged-out users to sign-in and employers to the recruiter dashboard.
 */
export default function RequireAuth({ children }) {
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

  if (role === 'recruiter' || role === 'employer') {
    return <Navigate to="/employer-dashboard/overview" replace />
  }

  return children
}
