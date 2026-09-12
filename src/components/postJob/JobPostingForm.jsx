import { useEffect, useState } from 'react'
import { FiMapPin, FiDollarSign, FiLock } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { getPublicCategories } from '../../lib/jobs'
import { jobTypeOptions, salaryRangeOptions } from '../../constants/postJobContent'
import {
  validateDashboardJobPostingForm,
  hasValidationErrors,
} from '../../lib/validation'

export const EMPTY_JOB_FORM = {
  jobTitle: '',
  companyName: '',
  location: '',
  category: '',
  employmentType: '',
  salaryRange: '',
  description: '',
}

/**
 * Reusable job posting form — used on the public Post a Job page and employer dashboard.
 */
export default function JobPostingForm({
  initialValues = EMPTY_JOB_FORM,
  onSubmit,
  submitting = false,
}) {
  const [values, setValues] = useState({ ...EMPTY_JOB_FORM, ...initialValues })
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [categoryOptions, setCategoryOptions] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [categoriesError, setCategoriesError] = useState('')

  useEffect(() => {
    let active = true
    setCategoriesLoading(true)
    getPublicCategories()
      .then((items) => {
        if (!active) return
        setCategoryOptions(
          (items || []).map((c) => ({
            value: String(c.id),
            label: c.name,
          })),
        )
        setCategoriesError(items?.length ? '' : 'No categories are configured for this site yet.')
      })
      .catch((err) => {
        if (active) {
          setCategoryOptions([])
          setCategoriesError(err.message || 'Could not load job categories.')
        }
      })
      .finally(() => {
        if (active) setCategoriesLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const setField = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
    setFormError('')
  }

  const validateAndSubmit = (status) => {
    if (categoriesLoading) {
      setFormError('Job categories are still loading. Please wait a moment.')
      return
    }
    if (!categoryOptions.length) {
      setFormError(categoriesError || 'No job categories available for Office Jobline.')
      return
    }
    const errors = validateDashboardJobPostingForm(values)
    if (hasValidationErrors(errors)) {
      setFieldErrors(errors)
      setFormError('Fix the highlighted fields before continuing.')
      return
    }
    setFieldErrors({})
    setFormError('')
    onSubmit?.({ ...values }, status)
  }

  const handleDraft = (event) => {
    event.preventDefault()
    validateAndSubmit('Draft')
  }

  const handlePublish = (event) => {
    event.preventDefault()
    validateAndSubmit('Active')
  }

  return (
    <form className="space-y-4" onSubmit={handlePublish} noValidate>
      {formError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {formError}
        </div>
      )}

      <Input
        label="Job Title"
        name="jobTitle"
        value={values.jobTitle}
        onChange={setField('jobTitle')}
        placeholder="e.g. Office Manager"
        error={fieldErrors.jobTitle}
      />
      <Input
        label="Company Name"
        name="companyName"
        icon={HiOutlineBuildingOffice2}
        value={values.companyName}
        onChange={setField('companyName')}
        placeholder="Your company name"
        error={fieldErrors.companyName}
      />
      <Input
        label="Location"
        name="location"
        icon={FiMapPin}
        value={values.location}
        onChange={setField('location')}
        placeholder="City, Province (e.g. Toronto, Ontario)"
        error={fieldErrors.location}
        autoComplete="off"
      />
      <Select
        label="Job Category"
        name="category"
        value={values.category}
        onChange={setField('category')}
        options={categoryOptions}
        placeholder={categoriesLoading ? 'Loading categories…' : 'Select job category'}
        error={fieldErrors.category || categoriesError}
        required
      />
      {!categoriesLoading && categoryOptions.length > 0 && (
        <p className="text-xs text-[var(--color-text-secondary)]">
          Categories are loaded from Office Jobline ({categoryOptions.length} available).
        </p>
      )}
      <Select
        label="Employment Type"
        name="employmentType"
        value={values.employmentType}
        onChange={setField('employmentType')}
        options={jobTypeOptions}
        placeholder="Select employment type"
        error={fieldErrors.employmentType}
      />
      <Select
        label="Salary Range"
        name="salaryRange"
        icon={FiDollarSign}
        value={values.salaryRange}
        onChange={setField('salaryRange')}
        options={salaryRangeOptions}
        placeholder="Select salary range"
      />
      <div>
        <label
          htmlFor="job-description"
          className={`mb-1.5 block text-sm font-semibold ${
            fieldErrors.description ? 'text-red-800' : 'text-[var(--color-text-primary)]'
          }`}
        >
          Job Description
        </label>
        <textarea
          id="job-description"
          name="description"
          rows={5}
          value={values.description}
          onChange={setField('description')}
          placeholder="Describe the role, responsibilities, and requirements..."
          aria-invalid={fieldErrors.description ? 'true' : undefined}
          className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 ${
            fieldErrors.description
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
              : 'border-[var(--color-border)] focus:border-[var(--color-teal)] focus:ring-[var(--color-teal)]/20'
          }`}
        />
        {fieldErrors.description && (
          <p className="mt-1.5 text-xs text-red-700">{fieldErrors.description}</p>
        )}
      </div>

      <p className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
        <FiLock className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Your information is secure and will not be shared.
      </p>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button
          type="button"
          variant="outline-teal"
          onClick={handleDraft}
          disabled={submitting}
        >
          Save as Draft
        </Button>
        <Button type="submit" variant="gold" disabled={submitting}>
          {submitting ? 'Publishing…' : 'Publish Job'}
        </Button>
      </div>
    </form>
  )
}
