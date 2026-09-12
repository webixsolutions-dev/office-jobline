import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner'
import JobPostingForm, { EMPTY_JOB_FORM } from '../../components/postJob/JobPostingForm'
import { useEmployerData } from '../../lib/EmployerDataContext'

function mapPostingToForm(posting) {
  const categoryId =
    posting.raw?.category_id != null
      ? String(posting.raw.category_id)
      : posting.categoryId != null
        ? String(posting.categoryId)
        : ''
  return {
    jobTitle: posting.title || '',
    companyName: posting.companyName || '',
    location: posting.location || '',
    category: categoryId,
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
    category_id: Number(values.category),
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

  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (values, status) => {
    setSubmitting(true)
    setSubmitError('')
    const data = mapFormToPosting(values)

    try {
      if (isEdit) {
        await updateJobPosting(editId, { ...data, status })
      } else {
        await createJobPosting(data, status)
      }
      const message =
        status === 'Draft'
          ? 'Job posting saved as draft.'
          : isEdit
            ? 'Job posting updated successfully.'
            : 'Job posting published successfully.'
      navigate('/employer-dashboard/job-postings', { state: { success: message } })
    } catch (err) {
      setSubmitError(err.message || 'Could not save the job posting. Please try again.')
    } finally {
      setSubmitting(false)
    }
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
        {submitError && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {submitError}
          </p>
        )}
        <JobPostingForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </div>
    </>
  )
}
