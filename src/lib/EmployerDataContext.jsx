import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useAuth } from './auth'
import {
  createEmployerJob,
  createRecruiterCompany,
  getMyCompanies,
  getPublicCategories,
  getRecruiterApplications,
  getRecruiterDashboard,
  updateApplicationStatus,
  updateEmployerJob,
} from './jobs'
import {
  apiStatusFromEmployerStage,
  employmentTypeToApi,
  mapCompanyToForm,
  mapRecruiterApplicant,
  mapRecruiterJobPosting,
} from './mappers'
import { getNextEmployerStage } from '../constants/pipelineStages'

const EmployerDataContext = createContext(null)

export function EmployerDataProvider({ children }) {
  const { token, isAuthenticated } = useAuth()

  const [jobPostings, setJobPostings] = useState([])
  const [applicants, setApplicants] = useState([])
  const [companyProfile, setCompanyProfile] = useState(mapCompanyToForm(null))
  const [dashboardMetrics, setDashboardMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const notesRef = useRef({})

  const refreshEmployerData = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setJobPostings([])
      setApplicants([])
      setCompanyProfile(mapCompanyToForm(null))
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const [dashboard, appsResponse, companies, cats] = await Promise.all([
        getRecruiterDashboard(token),
        getRecruiterApplications(token, { pageSize: 100 }),
        getMyCompanies(token),
        getPublicCategories(),
      ])

      setCategories(cats)
      const jobs = (dashboard?.jobs || []).map(mapRecruiterJobPosting)
      setJobPostings(jobs)

      const appItems = appsResponse?.items || dashboard?.recentApplications || []
      setApplicants(
        appItems.map((row) => ({
          ...mapRecruiterApplicant(row),
          notes: notesRef.current[row.id] || '',
        })),
      )

      setDashboardMetrics(dashboard?.metrics || null)

      const company = companies?.[0] || null
      setCompanyProfile(mapCompanyToForm(company))
    } catch (err) {
      console.error('Employer data load failed', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token])

  useEffect(() => {
    refreshEmployerData()
  }, [refreshEmployerData])

  const resolveCategoryId = useCallback(
    (categorySlug) => {
      const cat = categories.find((c) => c.slug === categorySlug)
      return cat?.id
    },
    [categories],
  )

  const createJobPosting = useCallback(
    async (data, status = 'Active') => {
      if (!token) throw new Error('Not signed in')

      const numericCategory = Number(data.category_id ?? data.category)
      const categoryId =
        Number.isFinite(numericCategory) && numericCategory > 0
          ? numericCategory
          : resolveCategoryId(data.category)
      const [city, province] = String(data.location || '')
        .split(',')
        .map((s) => s.trim())

      const payload = {
        title: data.title || data.jobTitle,
        description: data.description,
        category_id: Number(categoryId),
        employment_type: employmentTypeToApi(data.employmentType || data.employment_type),
        city: city || data.city || null,
        province: province || data.province || null,
        is_remote: false,
        workplace_type: 'onsite',
      }

      if (!payload.category_id || Number.isNaN(payload.category_id)) {
        throw new Error(
          'Select a job category from the dropdown (marketing labels like “Receptionist” are not valid unless they appear in the list).',
        )
      }

      const result = await createEmployerJob(payload, token)
      const createdJob = result?.job ?? result
      if (status === 'Closed' || status === 'Draft') {
        await updateEmployerJob(createdJob.id, { status: 'closed' }, token)
      }
      await refreshEmployerData()
      return mapRecruiterJobPosting(createdJob)
    },
    [token, resolveCategoryId, refreshEmployerData],
  )

  const updateJobPosting = useCallback(
    async (id, data) => {
      if (!token) throw new Error('Not signed in')
      const patch = {}
      if (data.title || data.jobTitle) patch.title = data.title || data.jobTitle
      if (data.description) patch.description = data.description
      if (data.status === 'Closed') patch.status = 'closed'
      if (data.status === 'Active') patch.status = 'active'
      await updateEmployerJob(id, patch, token)
      await refreshEmployerData()
    },
    [token, refreshEmployerData],
  )

  const closeJobPosting = useCallback(
    async (id) => {
      if (!token) return
      await updateEmployerJob(id, { status: 'closed' }, token)
      await refreshEmployerData()
    },
    [token, refreshEmployerData],
  )

  const deleteJobPosting = useCallback(
    async (id) => {
      await closeJobPosting(id)
    },
    [closeJobPosting],
  )

  const patchApplicantStatus = useCallback(
    async (id, apiStatus) => {
      if (!token) return
      await updateApplicationStatus(id, apiStatus, token)
      await refreshEmployerData()
    },
    [token, refreshEmployerData],
  )

  const advanceApplicantStage = useCallback(
    async (id) => {
      const applicant = applicants.find((a) => a.id === id)
      if (!applicant) return
      const nextStage = getNextEmployerStage(applicant.stage)
      const apiStatus = apiStatusFromEmployerStage(nextStage)
      await patchApplicantStatus(id, apiStatus)
    },
    [applicants, patchApplicantStatus],
  )

  const rejectApplicant = useCallback(
    async (id) => {
      await patchApplicantStatus(id, 'rejected')
    },
    [patchApplicantStatus],
  )

  const updateApplicantStage = useCallback(
    async (id, stage) => {
      const apiStatus = apiStatusFromEmployerStage(stage)
      await patchApplicantStatus(id, apiStatus)
    },
    [patchApplicantStatus],
  )

  const updateApplicantNotes = useCallback((id, notes) => {
    notesRef.current = { ...notesRef.current, [id]: notes }
    setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, notes } : a)))
  }, [])

  const updateCompanyProfile = useCallback(
    async (data) => {
      if (!token) throw new Error('Not signed in')
      if (companyProfile.id) {
        setCompanyProfile((prev) => ({ ...prev, ...data }))
        return
      }
      const created = await createRecruiterCompany(
        {
          name: data.name,
          website: data.website,
          registration_number: data.registration_number || 'N/A',
          description: data.description || undefined,
        },
        token,
      )
      setCompanyProfile(mapCompanyToForm(created.company))
      await refreshEmployerData()
    },
    [token, companyProfile.id, refreshEmployerData],
  )

  const getJobPosting = useCallback(
    (id) => jobPostings.find((j) => j.id === String(id)),
    [jobPostings],
  )

  const getApplicantsForJob = useCallback(
    (jobId) => applicants.filter((a) => a.jobId === String(jobId)),
    [applicants],
  )

  const stats = useMemo(() => {
    if (dashboardMetrics) {
      return {
        activePostings: dashboardMetrics.activeJobs ?? 0,
        totalApplicants: dashboardMetrics.applications ?? applicants.length,
        interviewsScheduled: dashboardMetrics.pipeline?.interviewing ?? 0,
        positionsFilled: dashboardMetrics.pipeline?.hired ?? 0,
      }
    }
    const activePostings = jobPostings.filter((j) => j.status === 'Active').length
    const interviewsScheduled = applicants.filter((a) => a.stage === 'Interview').length
    const positionsFilled = applicants.filter((a) => a.stage === 'Offer').length
    return {
      activePostings,
      totalApplicants: applicants.length,
      interviewsScheduled,
      positionsFilled,
    }
  }, [dashboardMetrics, jobPostings, applicants])

  const jobPostingsWithCounts = useMemo(
    () =>
      jobPostings.map((job) => ({
        ...job,
        applicantCount:
          job.applicantCount ??
          applicants.filter((a) => a.jobId === job.id).length,
      })),
    [jobPostings, applicants],
  )

  const value = useMemo(
    () => ({
      jobPostings: jobPostingsWithCounts,
      applicants,
      companyProfile,
      stats,
      loading,
      error,
      categories,
      refreshEmployerData,
      createJobPosting,
      updateJobPosting,
      closeJobPosting,
      deleteJobPosting,
      advanceApplicantStage,
      rejectApplicant,
      updateApplicantStage,
      updateApplicantNotes,
      updateCompanyProfile,
      getJobPosting,
      getApplicantsForJob,
    }),
    [
      jobPostingsWithCounts,
      applicants,
      companyProfile,
      stats,
      loading,
      error,
      categories,
      refreshEmployerData,
      createJobPosting,
      updateJobPosting,
      closeJobPosting,
      deleteJobPosting,
      advanceApplicantStage,
      rejectApplicant,
      updateApplicantStage,
      updateApplicantNotes,
      updateCompanyProfile,
      getJobPosting,
      getApplicantsForJob,
    ],
  )

  return (
    <EmployerDataContext.Provider value={value}>{children}</EmployerDataContext.Provider>
  )
}

export function useEmployerData() {
  const ctx = useContext(EmployerDataContext)
  if (!ctx) {
    throw new Error('useEmployerData must be used within an EmployerDataProvider')
  }
  return ctx
}
