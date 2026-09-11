import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner'
import JobPostingForm, { EMPTY_JOB_FORM } from '../../components/postJob/JobPostingForm'
import { useEmployerData } from '../../lib/EmployerDataContext'

function mapPostingToForm(posting) {
  return {
    jobTitle: posting.title || '',
    companyName: posting.companyName || '',
    location: posting.location || '',
    category: posting.category || '',
    employmentType: posting.employmentType || '',
    salaryRange: posting.salaryRange || '',
    description: posting.description || '',
  }
}

function mapFormToPosting(values) {
  return {
    title: values.jobTitle,
    companyName: values.companyName,
    location: values.location,
    category: values.category,
    employmentType: values.employmentType,
    salaryRange: values.salaryRange,
    description: values.description,
  }
}

export default function PostJobDashboardPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const { getJobPosting, createJobPosting, updateJobPosting } = useEmployerData()
  const [submitting, setSubmitting] = useState(false)

  const existingPosting = editId ? getJobPosting(editId) : null
  const isEdit = !!existingPosting
  const initialValues = isEdit ? mapPostingToForm(existingPosting) : EMPTY_JOB_FORM

  const handleSubmit = async (values, status) => {
    setSubmitting(true)
    const data = mapFormToPosting(values)

    window.setTimeout(() => {
      if (isEdit) {
        updateJobPosting(editId, { ...data, status })
      } else {
        createJobPosting(data, status)
      }
      setSubmitting(false)
      const message = status === 'Draft'
        ? 'Job posting saved as draft.'
        : isEdit
          ? 'Job posting updated successfully.'
          : 'Job posting published successfully.'
      navigate('/employer-dashboard/job-postings', { state: { success: message } })
    }, 400)
  }

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title={isEdit ? 'Edit Job Posting' : 'Post a New Job'}
        subtitle={
          isEdit
            ? 'Update your job listing details below.'
            : 'Fill in the details to publish a new job posting.'
        }
      />

      <div className="max-w-2xl rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
        <JobPostingForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </div>
    </>
  )
}
