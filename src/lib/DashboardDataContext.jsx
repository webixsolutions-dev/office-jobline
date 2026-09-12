import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useAuth } from './auth'
import { useSavedJobsContext } from './SavedJobsContext'
import {
  applyToJob as applyToJobApi,
  getPublicCategories,
  getSeekerDashboard,
  resolveSavedJobsFromDashboard,
} from './jobs'
import { auth } from './auth'
import {
  mapDashboardProfile,
  mapSeekerApplication,
} from './mappers'
const DashboardDataContext = createContext(null)

const EMPTY_PROFILE = {
  fullName: '',
  email: '',
  phone: '',
  headline: '',
  location: '',
  location_city: '',
  location_province: '',
  skills: [],
  experience: [],
  education: [],
  default_resume_path: null,
  defaultResumePath: null,
}

export function calculateProfileCompleteness(profile) {
  const hasResume = Boolean(
    profile.default_resume_path?.trim() || profile.defaultResumePath?.trim(),
  )
  const fields = [
    profile.fullName?.trim(),
    profile.email?.trim(),
    profile.phone?.trim(),
    profile.location?.trim(),
    profile.skills?.length > 0,
    hasResume,
  ]
  const filled = fields.filter(Boolean).length
  return Math.round((filled / fields.length) * 100)
}

export function DashboardDataProvider({ children }) {
  const { token, isAuthenticated, user, loadProfile } = useAuth()
  const { isSaved, toggleSaved, refreshSaved } = useSavedJobsContext()

  const [applications, setApplications] = useState([])
  const [savedJobs, setSavedJobs] = useState([])
  const [profile, setProfile] = useState(EMPTY_PROFILE)
  const [metrics, setMetrics] = useState({
    applications: 0,
    savedJobs: 0,
    interviews: 0,
    shortlisted: 0,
    offers: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])

  const refreshDashboard = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setApplications([])
      setSavedJobs([])
      setProfile(EMPTY_PROFILE)
      setMetrics({
        applications: 0,
        savedJobs: 0,
        interviews: 0,
        shortlisted: 0,
        offers: 0,
      })
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const [dashboard, cats] = await Promise.all([
        getSeekerDashboard(token),
        getPublicCategories(),
      ])
      setCategories(cats)

      const apps = (dashboard?.applications || []).map((row) =>
        mapSeekerApplication(row, cats),
      )
      setApplications(apps)

      const saved = await resolveSavedJobsFromDashboard(dashboard, token, cats)
      setSavedJobs(saved)

      const apiProfile = dashboard?.profile || user
      setProfile(mapDashboardProfile(apiProfile, user))

      setMetrics({
        applications: dashboard?.metrics?.applications ?? apps.length,
        savedJobs: dashboard?.metrics?.savedJobs ?? saved.length,
        interviews: dashboard?.metrics?.interviews ?? 0,
        shortlisted: dashboard?.metrics?.shortlisted ?? 0,
        offers: dashboard?.metrics?.offers ?? 0,
      })

      await refreshSaved()
    } catch (err) {
      console.error('Seeker dashboard load failed', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token, user, refreshSaved])

  useEffect(() => {
    refreshDashboard()
  }, [refreshDashboard])

  const isJobApplied = useCallback(
    (jobId) => applications.some((app) => app.jobId === String(jobId)),
    [applications],
  )

  const isJobSaved = useCallback((jobId) => isSaved(jobId), [isSaved])

  const applyToJob = useCallback(
    async (job) => {
      if (!token) {
        return { success: false, error: 'Sign in to apply for jobs.' }
      }
      const jobId = String(job.id)
      if (isJobApplied(jobId)) {
        return { success: false, error: 'You have already applied to this job.' }
      }
      try {
        await applyToJobApi(jobId, token, {})
        await refreshDashboard()
        return { success: true }
      } catch (err) {
        const code = err?.data?.error?.code
        let message = err.message
        if (code === 'RESUME_REQUIRED') {
          message = 'Upload a resume in Profile & Settings before applying.'
        } else if (code === 'ALREADY_APPLIED') {
          message = 'You have already applied to this job.'
        } else if (code === 'JOB_NOT_FOUND' || code === 'JOB_EXPIRED') {
          message = 'This job is no longer available.'
        }
        return { success: false, error: message }
      }
    },
    [token, isJobApplied, refreshDashboard],
  )

  const withdrawApplication = useCallback(async () => {
    return {
      success: false,
      error: 'Withdrawing applications is not supported yet. Contact the employer if needed.',
    }
  }, [])

  const toggleSaveJob = useCallback(
    async (job) => {
      const result = await toggleSaved(job.id)
      if (result.success) {
        await refreshDashboard()
      }
      return result
    },
    [toggleSaved, refreshDashboard],
  )

  const removeSavedJob = useCallback(
    async (jobId) => {
      if (isSaved(jobId)) {
        const result = await toggleSaved(jobId)
        if (result.success) await refreshDashboard()
        return result
      }
      return { success: true }
    },
    [isSaved, toggleSaved, refreshDashboard],
  )

  const updateProfile = useCallback(
    async (data) => {
      if (!token) throw new Error('Not signed in')
      const patch = {
        full_name: data.fullName ?? data.full_name,
        phone: data.phone || null,
        headline: data.headline || null,
        location_city: data.location_city || null,
        location_province: data.location_province || null,
        skills: data.skills || [],
        experience: data.experience || [],
        education: data.education || [],
      }
      if (data.location && !patch.location_city && !patch.location_province) {
        const parts = String(data.location).split(',').map((s) => s.trim())
        if (parts.length >= 2) {
          patch.location_city = parts[0]
          patch.location_province = parts.slice(1).join(', ')
        } else if (parts[0]) {
          patch.location_city = parts[0]
        }
      }
      const res = await auth.updateProfile(patch, token)
      await loadProfile?.()
      await refreshDashboard()
      return res
    },
    [token, loadProfile, refreshDashboard],
  )

  const stats = useMemo(
    () => ({
      applications: metrics.applications,
      savedJobs: metrics.savedJobs,
      interviews: metrics.interviews,
      offers: metrics.offers,
    }),
    [metrics],
  )

  const profileCompleteness = useMemo(() => calculateProfileCompleteness(profile), [profile])

  const value = useMemo(
    () => ({
      applications,
      savedJobs,
      profile,
      stats,
      metrics,
      profileCompleteness,
      loading,
      error,
      categories,
      refreshDashboard,
      isJobApplied,
      isJobSaved,
      applyToJob,
      withdrawApplication,
      toggleSaveJob,
      removeSavedJob,
      updateProfile,
    }),
    [
      applications,
      savedJobs,
      profile,
      stats,
      metrics,
      profileCompleteness,
      loading,
      error,
      categories,
      refreshDashboard,
      isJobApplied,
      isJobSaved,
      applyToJob,
      withdrawApplication,
      toggleSaveJob,
      removeSavedJob,
      updateProfile,
    ],
  )

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>
}

export { DashboardDataContext }

export function useDashboardData() {
  const ctx = useContext(DashboardDataContext)
  if (!ctx) {
    throw new Error('useDashboardData must be used within a DashboardDataProvider')
  }
  return ctx
}
