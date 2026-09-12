import { useEffect, useState } from 'react'
import JobCard from '../ui/JobCard'
import { useDashboardData } from '../../lib/DashboardDataContext'
import { useAuth } from '../../hooks/useAuth'
import { getRecommendedJobs, getPublicCategories, normalizeJob } from '../../lib/jobs'

export default function RecommendedJobsSection() {
  const { isJobApplied, isJobSaved, applyToJob, toggleSaveJob, categories } = useDashboardData()
  const { token, isAuthenticated } = useAuth()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [applyError, setApplyError] = useState('')

  useEffect(() => {
    let active = true
    const load = async () => {
      if (!isAuthenticated || !token) {
        setJobs([])
        setLoading(false)
        return
      }
      setLoading(true)
      try {
        const [items, cats] = await Promise.all([
          getRecommendedJobs(token, 6),
          categories.length ? Promise.resolve(categories) : getPublicCategories(),
        ])
        if (active) {
          setJobs((items || []).map((j) => normalizeJob(j, cats)))
        }
      } catch (err) {
        console.error('Recommended jobs failed', err)
        if (active) setJobs([])
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [token, isAuthenticated, categories])

  const handleApply = async (job) => {
    setApplyError('')
    const result = await applyToJob(job)
    if (!result.success) setApplyError(result.error)
  }

  return (
    <section>
      <div className="mb-4">
        <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
          Recommended Jobs
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Based on your profile and activity.
        </p>
      </div>
      {applyError && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {applyError}
        </p>
      )}
      {loading ? (
        <p className="text-sm text-[var(--color-text-secondary)]">Loading recommendations…</p>
      ) : jobs.length === 0 ? (
        <p className="text-sm text-[var(--color-text-secondary)]">
          Complete your profile or browse jobs to see recommendations here.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              compact
              isApplied={isJobApplied(job.id)}
              isSaved={isJobSaved(job.id)}
              onApply={() => handleApply(job)}
              onSaveToggle={() => toggleSaveJob(job)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
