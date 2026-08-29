import { useMemo, useState } from 'react'
import { FiSearch, FiUsers } from 'react-icons/fi'
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner'
import ApplicantListItem from '../../components/employerDashboard/ApplicantListItem'
import ApplicantProfileDrawer from '../../components/employerDashboard/ApplicantProfileDrawer'
import ConfirmModal from '../../components/dashboard/common/ConfirmModal'
import Input from '../../components/ui/Input'
import { EMPLOYER_STAGES } from '../../constants/pipelineStages'
import { useEmployerData } from '../../lib/EmployerDataContext'

export default function AllApplicantsPage() {
  const {
    jobPostings,
    applicants,
    advanceApplicantStage,
    rejectApplicant,
    updateApplicantStage,
    updateApplicantNotes,
  } = useEmployerData()

  const [jobFilter, setJobFilter] = useState('all')
  const [stageFilter, setStageFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [profileApplicant, setProfileApplicant] = useState(null)
  const [rejectTarget, setRejectTarget] = useState(null)

  const getJobTitle = (jobId) => jobPostings.find((j) => j.id === jobId)?.title

  const filtered = useMemo(() => {
    let list = [...applicants]
    if (jobFilter !== 'all') {
      list = list.filter((a) => a.jobId === jobFilter)
    }
    if (stageFilter !== 'all') {
      list = list.filter((a) => a.stage === stageFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      list = list.filter((a) => a.name.toLowerCase().includes(q))
    }
    return list.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
  }, [applicants, jobFilter, stageFilter, searchQuery])

  const handleConfirmReject = () => {
    if (rejectTarget) {
      rejectApplicant(rejectTarget.id)
      setRejectTarget(null)
      if (profileApplicant?.id === rejectTarget.id) {
        setProfileApplicant(null)
      }
    }
  }

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="All Applicants"
        subtitle="Review candidates across all your job postings."
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text-primary)]"
          aria-label="Filter by job posting"
        >
          <option value="all">All job postings</option>
          {jobPostings.map((job) => (
            <option key={job.id} value={job.id}>{job.title}</option>
          ))}
        </select>
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text-primary)]"
          aria-label="Filter by pipeline stage"
        >
          <option value="all">All stages</option>
          {EMPLOYER_STAGES.map((stage) => (
            <option key={stage} value={stage}>{stage}</option>
          ))}
        </select>
        <div className="flex-1">
          <Input
            name="search"
            icon={FiSearch}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by candidate name…"
            aria-label="Search applicants"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-10 text-center shadow-[var(--shadow-card)]">
          <FiUsers className="mx-auto h-10 w-10 text-[var(--color-text-secondary)]" aria-hidden />
          <h2 className="mt-4 font-display text-lg font-bold text-[var(--color-text-primary)]">
            {applicants.length === 0 ? 'No applicants yet' : 'No applicants match this filter'}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {applicants.length === 0
              ? 'Post a job to start receiving applications from candidates.'
              : 'Try adjusting your filters to see more results.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((applicant) => (
            <ApplicantListItem
              key={applicant.id}
              applicant={applicant}
              jobTitle={getJobTitle(applicant.jobId)}
              onViewProfile={setProfileApplicant}
              onAdvance={(a) => advanceApplicantStage(a.id)}
              onReject={setRejectTarget}
            />
          ))}
        </div>
      )}

      <ApplicantProfileDrawer
        applicant={profileApplicant}
        jobTitle={profileApplicant ? getJobTitle(profileApplicant.jobId) : ''}
        isOpen={!!profileApplicant}
        onClose={() => setProfileApplicant(null)}
        onStageChange={updateApplicantStage}
        onNotesChange={updateApplicantNotes}
      />

      <ConfirmModal
        isOpen={!!rejectTarget}
        title="Reject this candidate?"
        description="They will be marked as Rejected and removed from your active pipeline."
        confirmLabel="Yes, Reject"
        danger
        onConfirm={handleConfirmReject}
        onClose={() => setRejectTarget(null)}
      />
    </>
  )
}
