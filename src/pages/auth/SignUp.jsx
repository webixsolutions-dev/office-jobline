import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUserCheck,
  FiBriefcase,
  FiUserPlus,
  FiLink,
  FiHash,
} from 'react-icons/fi'
import {
  validateSignUpFields,
  hasValidationErrors,
} from '../../lib/validation'
import {
  getApiErrorMessage,
  getApiErrorCode,
  mapApiFieldErrors,
  resolveSubmitError,
} from '../../lib/apiErrors'

const fieldClass = (hasError) =>
  `w-full rounded-lg border px-4 py-2.5 text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-100 ${
    hasError
      ? 'border-red-400 focus:border-red-500'
      : 'border-slate-200 focus:border-amber-400'
  }`

function FieldError({ message }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-700">{message}</p>
}

export default function SignUp() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [needsEmailConfirm, setNeedsEmailConfirm] = useState(false)
  const [role, setRole] = useState('job_seeker')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companyName: '',
    companyWebsite: '',
    companyRegistrationNumber: '',
    agreeTerms: false,
  })

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = validateSignUpFields({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role,
      companyName: formData.companyName,
      companyWebsite: formData.companyWebsite,
      companyRegistrationNumber: formData.companyRegistrationNumber,
      agreeTerms: formData.agreeTerms,
    })

    if (hasValidationErrors(errors)) {
      setFieldErrors(errors)
      setFormError('')
      return
    }

    setIsLoading(true)
    setFormError('')
    setFieldErrors({})

    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`

    try {
      const result = await signUp({
        name: fullName,
        email: formData.email.trim(),
        password: formData.password,
        role,
        company_name: role === 'recruiter' ? formData.companyName.trim() : undefined,
        company_website: role === 'recruiter' ? formData.companyWebsite.trim() : undefined,
        company_registration_number:
          role === 'recruiter' ? formData.companyRegistrationNumber.trim() : undefined,
      })

      if (result?.confirmationRequired || !result?.session) {
        setNeedsEmailConfirm(true)
        setSuccess(true)
        return
      }

      navigate(role === 'recruiter' ? '/employer-dashboard/overview' : '/dashboard/overview')
    } catch (error) {
      const code = getApiErrorCode(error)
      if (code === 'COMPANY_NAME_TAKEN') {
        setFieldErrors({ companyName: 'This company name is already registered.' })
        setFormError('')
      } else if (code === 'VALIDATION_ERROR') {
        const apiFields = mapApiFieldErrors(error)
        const mapped = {}
        if (apiFields.email) mapped.email = apiFields.email
        if (apiFields.password) mapped.password = apiFields.password
        if (apiFields.name) mapped.name = apiFields.name
        if (apiFields.company_name) mapped.companyName = apiFields.company_name
        if (apiFields.company_website) mapped.companyWebsite = apiFields.company_website
        if (apiFields.company_registration_number) {
          mapped.companyRegistrationNumber = apiFields.company_registration_number
        }
        setFieldErrors(mapped)
        const { formError: fb } = resolveSubmitError(error, '')
        setFormError(fb || '')
      } else {
        setFormError(getApiErrorMessage(error))
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8 text-center border border-slate-200">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <FiUserCheck className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-navy-950">
            {needsEmailConfirm ? 'Check Your Email' : 'Account Created'}
          </h2>
          <p className="mt-2 text-slate-600">
            {needsEmailConfirm ? (
              <>
                We sent a confirmation link to <strong>{formData.email}</strong>
              </>
            ) : (
              'Your account is ready. You can sign in now.'
            )}
          </p>
          <button
            type="button"
            onClick={() => navigate('/sign-in')}
            className="mt-6 w-full rounded-lg bg-navy-950 py-3 text-sm font-semibold text-white transition hover:bg-navy-800"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-navy-950">Create Your Account</h1>
          <p className="mt-2 text-sm text-slate-600">
            One Jooblie account works across all our partner sites
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="mb-6">
            <span className="block text-sm font-semibold text-slate-700 mb-2">I am a...</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setRole('job_seeker')
                  setFieldErrors({})
                }}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition ${
                  role === 'job_seeker'
                    ? 'border-amber-500 bg-amber-50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <FiUserCheck
                  className={`h-6 w-6 ${role === 'job_seeker' ? 'text-amber-600' : 'text-slate-400'}`}
                />
                <span
                  className={`text-sm font-semibold ${role === 'job_seeker' ? 'text-navy-950' : 'text-slate-600'}`}
                >
                  Job Seeker
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('recruiter')
                  setFieldErrors({})
                }}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition ${
                  role === 'recruiter'
                    ? 'border-amber-500 bg-amber-50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <FiBriefcase
                  className={`h-6 w-6 ${role === 'recruiter' ? 'text-amber-600' : 'text-slate-400'}`}
                />
                <span
                  className={`text-sm font-semibold ${role === 'recruiter' ? 'text-navy-950' : 'text-slate-600'}`}
                >
                  Recruiter
                </span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {formError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-sm">
                {formError}
              </div>
            )}
            {fieldErrors.name && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-sm">
                {fieldErrors.name}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jane"
                  className={fieldClass(fieldErrors.firstName)}
                  aria-invalid={fieldErrors.firstName ? 'true' : undefined}
                />
                <FieldError message={fieldErrors.firstName} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={fieldClass(fieldErrors.lastName)}
                  aria-invalid={fieldErrors.lastName ? 'true' : undefined}
                />
                <FieldError message={fieldErrors.lastName} />
              </div>
            </div>

            {role === 'recruiter' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Company Name
                  </label>
                  <div
                    className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 ${
                      fieldErrors.companyName ? 'border-red-400' : 'border-slate-200'
                    }`}
                  >
                    <FiBriefcase className="text-slate-400 shrink-0" />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Your company name"
                      className="w-full text-sm text-slate-700 outline-none"
                    />
                  </div>
                  <FieldError message={fieldErrors.companyName} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Company Website
                  </label>
                  <div
                    className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 ${
                      fieldErrors.companyWebsite ? 'border-red-400' : 'border-slate-200'
                    }`}
                  >
                    <FiLink className="text-slate-400 shrink-0" />
                    <input
                      type="url"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      placeholder="https://yourcompany.com"
                      className="w-full text-sm text-slate-700 outline-none"
                    />
                  </div>
                  <FieldError message={fieldErrors.companyWebsite} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Company Registration Number
                  </label>
                  <div
                    className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 ${
                      fieldErrors.companyRegistrationNumber ? 'border-red-400' : 'border-slate-200'
                    }`}
                  >
                    <FiHash className="text-slate-400 shrink-0" />
                    <input
                      type="text"
                      name="companyRegistrationNumber"
                      value={formData.companyRegistrationNumber}
                      onChange={handleChange}
                      placeholder="Business / registration ID"
                      className="w-full text-sm text-slate-700 outline-none"
                    />
                  </div>
                  <FieldError message={fieldErrors.companyRegistrationNumber} />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
              <div
                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 ${
                  fieldErrors.email ? 'border-red-400' : 'border-slate-200'
                }`}
              >
                <FiMail className="text-slate-400 shrink-0" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full text-sm text-slate-700 outline-none"
                />
              </div>
              <FieldError message={fieldErrors.email} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
              <div
                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 ${
                  fieldErrors.password ? 'border-red-400' : 'border-slate-200'
                }`}
              >
                <FiLock className="text-slate-400 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full text-sm text-slate-700 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <FieldError message={fieldErrors.password} />
              <p className="mt-1 text-xs text-slate-400">Must be at least 8 characters.</p>
            </div>

            <div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                  aria-invalid={fieldErrors.agreeTerms ? 'true' : undefined}
                />
                <label className="text-sm text-slate-600">
                  I agree to the Terms of Service and Privacy Policy.
                </label>
              </div>
              <FieldError message={fieldErrors.agreeTerms} />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy-950 py-3 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FiUserPlus className="h-4 w-4" />
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/sign-in" className="font-semibold text-amber-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
