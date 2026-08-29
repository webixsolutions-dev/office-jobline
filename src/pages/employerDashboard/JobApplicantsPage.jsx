import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiUsers } from 'react-icons/fi'
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner'
import ApplicantListItem from '../../components/employerDashboard/ApplicantListItem'
import ApplicantProfileDrawer from '../../components/employerDashboard/ApplicantProfileDrawer'
import ConfirmModal from '../../components/dashboard/common/ConfirmModal'
import Button from '../../components/ui/Button'
import { useEmployerData } from '../../lib/EmployerDataContext'

export default function JobApplicantsPage() {
  const { jobId } = useParams()
  const {
    getJobPosting,
    getApplicantsForJob,
    advanceApplicantStage,
    rejectApplicant,
    updateApplicantStage,
    updateApplicantNotes,
  } = useEmployerData()

  const posting = getJobPosting(jobId)
  const applicants = getApplicantsForJob(jobId)
  const [profileApplicant, setProfileApplicant] = useState(null)
  const [rejectTarget, setRejectTarget] = useState(null)

  const handleReject = (applicant) => {
    setRejectTarget(applicant)
  }

  const handleConfirmReject = () => {
    if (rejectTarget) {
      rejectApplicant(rejectTarget.id)
      setRejectTarget(null)
      if (profileApplicant?.id === rejectTarget.id) {
        setProfileApplicant(null)
      }
    }
  }

  if (!posting) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-10 text-center shadow-[var(--shadow-card)]">
        <h2 className="font-display text-lg font-bold text-[var(--color-text-primary)]">
          Job posting not found
        </h2>
        <Button variant="teal" to="/employer-dashboard/job-postings" className="mt-6">
          Back to Job Postings
        </Button>
      </div>
    )
  }

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title={`${posting.title} — Applicants`}
        subtitle={`${applicants.length} candidate${applicants.length !== 1 ? 's' : ''} applied to this posting.`}
      />

      <Link
        to="/employer-dashboard/job-postings"
        className="mb-6 inline-block text-sm font-semibold text-[var(--color-teal)] hover:underline"
      >
        ← Back to Job Postings
      </Link>

      {applicants.length === 0 ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-10 text-center shadow-[var(--shadow-card)]">
          <FiUsers className="mx-auto h-10 w-10 text-[var(--color-text-secondary)]" aria-hidden />
          <h2 className="mt-4 font-display text-lg font-bold text-[var(--color-text-primary)]">
            No applicants yet
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Candidates who apply to this posting will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applicants.map((applicant) => (
            <ApplicantListItem
              key={applicant.id}
              applicant={applicant}
              onViewProfile={setProfileApplicant}
              onAdvance={(a) => advanceApplicantStage(a.id)}
              onReject={handleReject}
            />
          ))}
        </div>
      )}

      <ApplicantProfileDrawer
        applicant={profileApplicant}
        jobTitle={posting.title}
        isOpen={!!profileApplicant}
        onClose={() => setProfileApplicant(null)}
        onStageChange={updateApplicantStage}
        onNotesChange={updateApplicantNotes}
      />

      <ConfirmModal
        isOpen={!!rejectTarget}
        title="Reject this candidate?"
        description="They will be marked as Rejected and removed from your active pipeline for this posting."
        confirmLabel="Yes, Reject"
        danger
        onConfirm={handleConfirmReject}
        onClose={() => setRejectTarget(null)}
      />
    </>
  )
}
