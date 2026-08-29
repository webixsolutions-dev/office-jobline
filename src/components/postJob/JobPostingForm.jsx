import { useState } from 'react'
import { FiMapPin, FiDollarSign, FiLock } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { categories } from '../../constants/categories'
import { jobTypeOptions, salaryRangeOptions } from '../../constants/postJobContent'

const categoryOptions = categories.map((c) => ({ value: c.slug, label: c.title }))

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

  const setField = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleDraft = (event) => {
    event.preventDefault()
    onSubmit?.({ ...values }, 'Draft')
  }

  const handlePublish = (event) => {
    event.preventDefault()
    onSubmit?.({ ...values }, 'Active')
  }

  return (
    <form className="space-y-4" onSubmit={handlePublish} noValidate>
      <Input
        label="Job Title"
        name="jobTitle"
        value={values.jobTitle}
        onChange={setField('jobTitle')}
        placeholder="e.g. Office Manager"
        required
      />
      <Input
        label="Company Name"
        name="companyName"
        icon={HiOutlineBuildingOffice2}
        value={values.companyName}
        onChange={setField('companyName')}
        placeholder="Your company name"
        required
      />
      <Input
        label="Location"
        name="location"
        icon={FiMapPin}
        value={values.location}
        onChange={setField('location')}
        placeholder="City, province or region"
        required
      />
      <Select
        label="Job Category"
        name="category"
        value={values.category}
        onChange={setField('category')}
        options={categoryOptions}
        placeholder="Select job category"
      />
      <Select
        label="Employment Type"
        name="employmentType"
        value={values.employmentType}
        onChange={setField('employmentType')}
        options={jobTypeOptions}
        placeholder="Select employment type"
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
          className="mb-1.5 block text-sm font-semibold text-[var(--color-text-primary)]"
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
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-teal)] focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/20"
        />
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
