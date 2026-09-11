import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { MOCK_APPLICATIONS } from '../data/mockApplications'
import { jobs } from '../constants/jobs'

const DashboardDataContext = createContext(null)

const INITIAL_PROFILE = {
  fullName: 'Sarah Khan',
  email: 'sarah@example.com',
  phone: '',
  location: 'Toronto, ON',
  skills: ['Customer Service', 'Microsoft Office'],
  experience: [
    {
      id: 'exp-1',
      title: 'Office Assistant',
      company: 'Community Centre',
      dates: '2023 – 2025',
      description: 'Helped with front desk and scheduling.',
    },
  ],
  education: [],
}

const INITIAL_SAVED = jobs.slice(2, 5)

function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function calculateProfileCompleteness(profile) {
  const fields = [
    profile.fullName?.trim(),
    profile.email?.trim(),
    profile.phone?.trim(),
    profile.location?.trim(),
    profile.skills?.length > 0,
  ]
  const filled = fields.filter(Boolean).length
  return Math.round((filled / fields.length) * 100)
}

export function DashboardDataProvider({ children }) {
  const [applications, setApplications] = useState(MOCK_APPLICATIONS)
  const [savedJobs, setSavedJobs] = useState(INITIAL_SAVED)
  const [profile, setProfile] = useState(INITIAL_PROFILE)

  const isJobApplied = useCallback(
    (jobId) => applications.some((app) => app.jobId === String(jobId)),
    [applications],
  )

  const isJobSaved = useCallback(
    (jobId) => savedJobs.some((job) => String(job.id) === String(jobId)),
    [savedJobs],
  )

  const applyToJob = useCallback((job) => {
    const jobId = String(job.id)
    setApplications((prev) => {
      if (prev.some((app) => app.jobId === jobId)) return prev
      return [
        {
          id: generateId('app'),
          jobId,
          title: job.title,
          company: job.company,
          location: job.location,
          status: 'Applied',
          dateApplied: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]
    })
  }, [])

  const withdrawApplication = useCallback((applicationId) => {
    setApplications((prev) => prev.filter((app) => app.id !== applicationId))
  }, [])

  const toggleSaveJob = useCallback((job) => {
    const jobId = String(job.id)
    setSavedJobs((prev) => {
      const exists = prev.some((j) => String(j.id) === jobId)
      if (exists) return prev.filter((j) => String(j.id) !== jobId)
      return [job, ...prev]
    })
  }, [])

  const removeSavedJob = useCallback((jobId) => {
    setSavedJobs((prev) => prev.filter((j) => String(j.id) !== String(jobId)))
  }, [])

  const updateProfile = useCallback((data) => {
    setProfile((prev) => ({ ...prev, ...data }))
  }, [])

  const stats = useMemo(() => {
    const interviews = applications.filter((a) => a.status === 'Interview').length
    const offers = applications.filter((a) => a.status === 'Offer').length
    return {
      applications: applications.length,
      savedJobs: savedJobs.length,
      interviews,
      offers,
    }
  }, [applications, savedJobs])

  const profileCompleteness = useMemo(() => calculateProfileCompleteness(profile), [profile])

  const value = useMemo(
    () => ({
      applications,
      savedJobs,
      profile,
      stats,
      profileCompleteness,
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
      profileCompleteness,
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
