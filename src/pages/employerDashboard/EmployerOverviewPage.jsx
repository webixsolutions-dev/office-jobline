import { Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner'
import EmployerStatCardRow from '../../components/employerDashboard/EmployerStatCardRow'
import ApplicantListItem from '../../components/employerDashboard/ApplicantListItem'
import JobPostingCard from '../../components/employerDashboard/JobPostingCard'
import ApplicantProfileDrawer from '../../components/employerDashboard/ApplicantProfileDrawer'
import ConfirmModal from '../../components/dashboard/common/ConfirmModal'
import Button from '../../components/ui/Button'
import { useEmployerData } from '../../lib/EmployerDataContext'

function getJobTitle(jobPostings, jobId) {
  return jobPostings.find((j) => j.id === jobId)?.title
}

export default function EmployerOverviewPage() {
  const {
    jobPostings,
    applicants,
    advanceApplicantStage,
    rejectApplicant,
    updateApplicantStage,
    updateApplicantNotes,
  } = useEmployerData()
  const [profileApplicant, setProfileApplicant] = useState(null)
  const [rejectTarget, setRejectTarget] = useState(null)

  const recentApplicants = useMemo(
    () =>
      [...applicants]
        .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
        .slice(0, 6),
    [applicants],
  )

  const activePostings = useMemo(
    () =>
      jobPostings
        .filter((j) => j.status === 'Active')
        .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
        .slice(0, 4),
    [jobPostings],
  )

  const hasPostings = jobPostings.length > 0

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Overview"
        subtitle="Your hiring activity at a glance."
      />

      {hasPostings ? (
        <>
          <EmployerStatCardRow />

          {recentApplicants.length > 0 && (
            <section className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-[var(--color-text-primary)]">
                  Recent Applicants
                </h2>
                <Link
                  to="/employer-dashboard/applicants"
                  className="text-sm font-semibold text-[var(--color-teal)] hover:underline"
                >
                  View All Applicants →
                </Link>
              </div>
              <div className="space-y-4">
                {recentApplicants.map((applicant) => (
                  <ApplicantListItem
                    key={applicant.id}
                    applicant={applicant}
                    jobTitle={getJobTitle(jobPostings, applicant.jobId)}
                    onViewProfile={setProfileApplicant}
                    onAdvance={(a) => advanceApplicantStage(a.id)}
                    onReject={setRejectTarget}
                  />
                ))}
              </div>
            </section>
          )}

          {activePostings.length > 0 && (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-[var(--color-text-primary)]">
                  Your Active Job Postings
                </h2>
                <Link
                  to="/employer-dashboard/job-postings"
                  className="text-sm font-semibold text-[var(--color-teal)] hover:underline"
                >
                  View All Postings →
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {activePostings.map((posting) => (
                  <JobPostingCard key={posting.id} posting={posting} compact />
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-10 text-center shadow-[var(--shadow-card)]">
          <h2 className="font-display text-lg font-bold text-[var(--color-text-primary)]">
            Welcome to your employer dashboard
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Post your first job to start receiving applications from qualified candidates.
          </p>
          <Button variant="gold" to="/employer-dashboard/post-a-job" className="mt-6">
            Post Your First Job →
          </Button>
        </div>
      )}

      <ApplicantProfileDrawer
        applicant={profileApplicant}
        jobTitle={profileApplicant ? getJobTitle(jobPostings, profileApplicant.jobId) : ''}
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
        onConfirm={() => {
          if (rejectTarget) {
            rejectApplicant(rejectTarget.id)
            setRejectTarget(null)
          }
        }}
        onClose={() => setRejectTarget(null)}
      />
    </>
  )
}
