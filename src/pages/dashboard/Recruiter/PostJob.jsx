import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../../../components/dashboard/common'
import { FiSave, FiX } from 'react-icons/fi'
import { useAuth } from '../../../hooks/useAuth'
import { getPublicCategories, createEmployerJob } from '../../../lib/jobs'
import {
  validateRecruiterJobForm,
  hasValidationErrors,
} from '../../../lib/validation'
import { getApiErrorMessage, getApiErrorCode, mapApiFieldErrors } from '../../../lib/apiErrors'

const EMPLOYMENT_TYPES = [
  { value: 'full_time', label: 'Full-time' },
  { value: 'part_time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'internship', label: 'Internship' },
  { value: 'seasonal', label: 'Seasonal' },
]

const PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
]

const SALARY_PERIODS = ['hourly', 'weekly', 'monthly', 'yearly']

function fieldInputClass(hasError) {
  return `w-full rounded-md border px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
    hasError ? 'border-red-400' : 'border-slate-200'
  }`
}

function FieldError({ message }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-700">{message}</p>
}

export default function PostJob() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id
  const { token } = useAuth()

  const [categories, setCategories] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    description: '',
    employment_type: '',
    location_province: '',
    location_city: '',
    is_remote: false,
    salary_min: '',
    salary_max: '',
    salary_period: 'yearly',
    skills: [],
  })

  const [skillInput, setSkillInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => {
    getPublicCategories()
      .then((data) => setCategories(data || []))
      .catch((err) => console.error('Error fetching categories:', err))
  }, [])

  const clearField = (name) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
    setFormError('')
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    clearField(name)
  }

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      if (formData.skills.length >= 50) {
        setFieldErrors((prev) => ({
          ...prev,
          skills: 'You can add at most 50 skills.',
        }))
        return
      }
      if (skillInput.trim().length > 80) {
        setFieldErrors((prev) => ({
          ...prev,
          skills: 'Each skill must be 80 characters or fewer.',
        }))
        return
      }
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput('')
      clearField('skills')
    }
  }

  const handleRemoveSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) {
      setFormError('You must be logged in to post a job.')
      return
    }

    const errors = validateRecruiterJobForm({
      title: formData.title,
      category_id: formData.category_id,
      employment_type: formData.employment_type,
      description: formData.description,
      location_province: formData.location_province,
      is_remote: formData.is_remote,
    })

    if (hasValidationErrors(errors)) {
      setFieldErrors(errors)
      setFormError('Fix the highlighted fields before posting.')
      return
    }

    setIsSubmitting(true)
    setFormError('')
    setFieldErrors({})

    try {
      const payload = {
        category_id: Number(formData.category_id),
        title: formData.title.trim(),
        description: formData.description.trim(),
        city: formData.location_city.trim() || null,
        province: formData.is_remote ? null : formData.location_province || null,
        is_remote: formData.is_remote,
        workplace_type: formData.is_remote ? 'remote' : 'onsite',
        employment_type: formData.employment_type,
        salary_currency: 'CAD',
        salary_min: formData.salary_min === '' ? null : Number(formData.salary_min),
        salary_max: formData.salary_max === '' ? null : Number(formData.salary_max),
        salary_period: formData.salary_period,
        skills: formData.skills,
      }

      await createEmployerJob(payload, token)
      navigate('/recruiter/jobs')
    } catch (error) {
      const code = getApiErrorCode(error)
      if (code === 'RECRUITER_COMPANY_NOT_BOUND') {
        setFormError('Set up your company profile before posting jobs.')
      } else if (code === 'SITE_CATEGORY_MISMATCH') {
        setFieldErrors({ category_id: 'This category is not available on Office Jobline.' })
        setFormError('')
      } else if (code === 'VALIDATION_ERROR') {
        const apiFields = mapApiFieldErrors(error)
        const mapped = {}
        if (apiFields.title) mapped.title = apiFields.title
        if (apiFields.description) mapped.description = apiFields.description
        if (apiFields.category_id) mapped.category_id = apiFields.category_id
        if (apiFields.employment_type) mapped.employment_type = apiFields.employment_type
        setFieldErrors(mapped)
        setFormError(Object.keys(mapped).length ? '' : getApiErrorMessage(error))
      } else {
        setFormError(getApiErrorMessage(error))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title={isEditing ? 'Edit Job' : 'Post a New Job'}
        subtitle={isEditing ? 'Update your job posting' : 'Fill in the details to post a new job'}
      >
        <button
          type="button"
          onClick={() => navigate('/recruiter/jobs')}
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
        >
          <FiX className="h-4 w-4" />
          Cancel
        </button>
      </PageHeader>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        {formError && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-sm">
            {formError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Job Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Administrative Assistant"
              className={fieldInputClass(fieldErrors.title)}
              aria-invalid={fieldErrors.title ? 'true' : undefined}
            />
            <FieldError message={fieldErrors.title} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className={fieldInputClass(fieldErrors.category_id)}
                aria-invalid={fieldErrors.category_id ? 'true' : undefined}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <FieldError message={fieldErrors.category_id} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Employment Type *
              </label>
              <select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                className={fieldInputClass(fieldErrors.employment_type)}
                aria-invalid={fieldErrors.employment_type ? 'true' : undefined}
              >
                <option value="">Select type</option>
                {EMPLOYMENT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <FieldError message={fieldErrors.employment_type} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Describe the job responsibilities, requirements, and benefits..."
              className={fieldInputClass(fieldErrors.description)}
              aria-invalid={fieldErrors.description ? 'true' : undefined}
            />
            <FieldError message={fieldErrors.description} />
          </div>

          <div className="flex items-center pt-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                name="is_remote"
                checked={formData.is_remote}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
              />
              Remote position
            </label>
          </div>

          {!formData.is_remote && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Province *</label>
                <select
                  name="location_province"
                  value={formData.location_province}
                  onChange={handleChange}
                  className={fieldInputClass(fieldErrors.location_province)}
                  aria-invalid={fieldErrors.location_province ? 'true' : undefined}
                >
                  <option value="">Select province</option>
                  {PROVINCES.map((province) => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
                <FieldError message={fieldErrors.location_province} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  name="location_city"
                  value={formData.location_city}
                  onChange={handleChange}
                  placeholder="e.g. Toronto"
                  className={fieldInputClass(false)}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Salary Range</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="number"
                name="salary_min"
                value={formData.salary_min}
                onChange={handleChange}
                placeholder="Min"
                min="0"
                className={fieldInputClass(false)}
              />
              <input
                type="number"
                name="salary_max"
                value={formData.salary_max}
                onChange={handleChange}
                placeholder="Max"
                min="0"
                className={fieldInputClass(false)}
              />
              <select
                name="salary_period"
                value={formData.salary_period}
                onChange={handleChange}
                className={fieldInputClass(false)}
              >
                {SALARY_PERIODS.map((period) => (
                  <option key={period} value={period}>
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Skills</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => {
                  setSkillInput(e.target.value)
                  clearField('skills')
                }}
                onKeyDown={handleKeyDown}
                placeholder="Add a skill and press Enter"
                className={`flex-1 ${fieldInputClass(fieldErrors.skills)}`}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="rounded-md bg-navy-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800"
              >
                Add
              </button>
            </div>
            <FieldError message={fieldErrors.skills} />
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-full bg-navy-100 px-3 py-1.5 text-sm font-medium text-navy-800"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-navy-400 hover:text-rose-600"
                  >
                    <FiX className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-md bg-navy-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSave className="h-4 w-4" />
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Job' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
