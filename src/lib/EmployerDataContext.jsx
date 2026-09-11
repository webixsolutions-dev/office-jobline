import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { MOCK_JOB_POSTINGS } from '../data/mockJobPostings'
import { MOCK_APPLICANTS } from '../data/mockApplicants'
import { getNextEmployerStage } from '../constants/pipelineStages'

const EmployerDataContext = createContext(null)

const INITIAL_COMPANY_PROFILE = {
  name: 'Maple Ridge Solutions',
  logoFilename: '',
  industry: 'administrative-assistant',
  size: '11-50',
  website: 'https://mapleridge.example.com',
  location: 'Toronto, ON',
  description:
    'A growing office services company supporting businesses across Ontario with administrative and customer service talent.',
}

function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function countApplicantsForJob(applicants, jobId) {
  return applicants.filter((a) => a.jobId === jobId).length
}

export function EmployerDataProvider({ children }) {
  const [jobPostings, setJobPostings] = useState(MOCK_JOB_POSTINGS)
  const [applicants, setApplicants] = useState(MOCK_APPLICANTS)
  const [companyProfile, setCompanyProfile] = useState(INITIAL_COMPANY_PROFILE)

  const createJobPosting = useCallback((data, status = 'Active') => {
    const id = generateId('emp-job')
    const posting = {
      id,
      ...data,
      status,
      postedDate: new Date().toISOString().slice(0, 10),
      applicantCount: 0,
    }
    setJobPostings((prev) => [posting, ...prev])
    return posting
  }, [])

  const updateJobPosting = useCallback((id, data) => {
    setJobPostings((prev) =>
      prev.map((job) => (job.id === id ? { ...job, ...data } : job)),
    )
  }, [])

  const closeJobPosting = useCallback((id) => {
    setJobPostings((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: 'Closed' } : job)),
    )
  }, [])

  const deleteJobPosting = useCallback((id) => {
    setJobPostings((prev) => prev.filter((job) => job.id !== id))
    setApplicants((prev) => prev.filter((a) => a.jobId !== id))
  }, [])

  const advanceApplicantStage = useCallback((id) => {
    setApplicants((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a
        return { ...a, stage: getNextEmployerStage(a.stage) }
      }),
    )
  }, [])

  const rejectApplicant = useCallback((id) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, stage: 'Rejected' } : a)),
    )
  }, [])

  const updateApplicantStage = useCallback((id, stage) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, stage } : a)),
    )
  }, [])

  const updateApplicantNotes = useCallback((id, notes) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, notes } : a)),
    )
  }, [])

  const updateCompanyProfile = useCallback((data) => {
    setCompanyProfile((prev) => ({ ...prev, ...data }))
  }, [])

  const getJobPosting = useCallback(
    (id) => jobPostings.find((j) => j.id === id),
    [jobPostings],
  )

  const getApplicantsForJob = useCallback(
    (jobId) => applicants.filter((a) => a.jobId === jobId),
    [applicants],
  )

  const stats = useMemo(() => {
    const activePostings = jobPostings.filter((j) => j.status === 'Active').length
    const interviewsScheduled = applicants.filter((a) => a.stage === 'Interview').length
    const positionsFilled = applicants.filter((a) => a.stage === 'Offer').length
    return {
      activePostings,
      totalApplicants: applicants.length,
      interviewsScheduled,
      positionsFilled,
    }
  }, [jobPostings, applicants])

  const jobPostingsWithCounts = useMemo(
    () =>
      jobPostings.map((job) => ({
        ...job,
        applicantCount: countApplicantsForJob(applicants, job.id),
      })),
    [jobPostings, applicants],
  )

  const value = useMemo(
    () => ({
      jobPostings: jobPostingsWithCounts,
      applicants,
      companyProfile,
      stats,
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
