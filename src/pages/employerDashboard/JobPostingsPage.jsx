import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FiBriefcase } from 'react-icons/fi'
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner'
import JobPostingsFilterBar from '../../components/employerDashboard/JobPostingsFilterBar'
import JobPostingCard from '../../components/employerDashboard/JobPostingCard'
import ConfirmModal from '../../components/dashboard/common/ConfirmModal'
import Button from '../../components/ui/Button'
import { useEmployerData } from '../../lib/EmployerDataContext'

export default function JobPostingsPage() {
  const location = useLocation()
  const { jobPostings, closeJobPosting, deleteJobPosting } = useEmployerData()
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [closeTarget, setCloseTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const successMessage = location.state?.success

  const filtered = useMemo(() => {
    let list = [...jobPostings]
    if (statusFilter !== 'All') {
      list = list.filter((j) => j.status === statusFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      list = list.filter((j) => j.title.toLowerCase().includes(q))
    }
    return list.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
  }, [jobPostings, statusFilter, searchQuery])

  const handleConfirmClose = () => {
    if (closeTarget) {
      closeJobPosting(closeTarget.id)
      setCloseTarget(null)
    }
  }

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteJobPosting(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0">
          <DashboardTopBanner
            eyebrow="Newcomer Jobline Dashboard"
            title="Job Postings"
            subtitle="Manage and track all your job listings."
          />
        </div>
        <Button variant="gold" to="/employer-dashboard/post-a-job" className="shrink-0 self-start sm:self-center">
          Post a Job
        </Button>
      </div>

      {successMessage && (
        <p
          className="mb-4 rounded-lg bg-[var(--color-teal-light)] px-4 py-3 text-sm font-medium text-[var(--color-teal)]"
          role="status"
        >
          {successMessage}
        </p>
      )}

      <JobPostingsFilterBar
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-10 text-center shadow-[var(--shadow-card)]">
          <FiBriefcase className="mx-auto h-10 w-10 text-[var(--color-text-secondary)]" aria-hidden />
          <h2 className="mt-4 font-display text-lg font-bold text-[var(--color-text-primary)]">
            {jobPostings.length === 0 ? 'No job postings yet' : 'No postings match this filter'}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Create a posting to start attracting candidates to your open roles.
          </p>
          <Button variant="gold" to="/employer-dashboard/post-a-job" className="mt-6">
            Post a Job
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((posting) => (
            <JobPostingCard
              key={posting.id}
              posting={posting}
              onClose={setCloseTarget}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!closeTarget}
        title="Close this posting?"
        description="Closed postings stop accepting new applicants. You can still review existing applications."
        confirmLabel="Yes, Close Posting"
        onConfirm={handleConfirmClose}
        onClose={() => setCloseTarget(null)}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete this posting?"
        description="This will permanently remove the posting and its applicant list. This action cannot be undone."
        confirmLabel="Yes, Delete"
        danger
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </>
  )
}
