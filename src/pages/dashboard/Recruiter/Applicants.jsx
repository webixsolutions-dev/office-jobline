import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader, DataState } from '../../../components/dashboard/common'
import { FiSearch, FiEye, FiDownload } from 'react-icons/fi'
import { useApplications } from '../../../hooks/recruiter/useApplications'
import { updateApplicationStatus } from '../../../lib/jobs'
import { useAuth } from '../../../hooks/useAuth'

const STATUS_OPTIONS = [
  'submitted',
  'viewed',
  'shortlisted',
  'interviewing',
  'offered',
  'hired',
  'rejected',
]

export default function Applicants() {
  const navigate = useNavigate()
  const { jobId } = useParams()
  const { token } = useAuth()
  const { applicants, isLoading, isError, refetch } = useApplications(jobId)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [updatingId, setUpdatingId] = useState(null)

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (applicant.headline || '').toLowerCase().includes(searchTerm.toLowerCase())
    const status = applicant.apiStatus || applicant.status
    const matchesStatus = statusFilter === 'all' || status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (applicantId, newStatus) => {
    if (!token) return
    setUpdatingId(applicantId)
    try {
      await updateApplicationStatus(applicantId, newStatus, token)
      await refetch()
    } catch (err) {
      console.error('Failed to update application status', err)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleRetry = () => {
    refetch()
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <>
      <PageHeader title="Applicants" subtitle="Manage all applicants for this job position">
        <button
          type="button"
          onClick={() => navigate('/recruiter/dashboard/jobs')}
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
        >
          Back to Jobs
        </button>
      </PageHeader>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or headline..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white min-w-[160px] text-sm"
        >
          <option value="all">All Status</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <DataState
        isLoading={isLoading}
        isError={isError}
        isEmpty={filteredApplicants.length === 0}
        onRetry={handleRetry}
        loadingVariant="table"
        loadingRows={4}
        empty={{
          title: 'No applicants yet',
          description: 'Start promoting your job to attract candidates.',
        }}
      >
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Headline
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Resume
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredApplicants.map((applicant) => {
                  const status = applicant.apiStatus || applicant.status
                  return (
                    <tr key={applicant.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-navy-950">{applicant.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">{applicant.headline || '—'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">
                          {formatDate(applicant.appliedDate)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={status}
                          disabled={updatingId === applicant.id}
                          onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                          className="px-2 py-1 text-xs font-medium rounded-md border border-slate-200 focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white"
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt.charAt(0).toUpperCase() + opt.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">
                          {applicant.resumeFilename || '—'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </DataState>
    </>
  )
}
