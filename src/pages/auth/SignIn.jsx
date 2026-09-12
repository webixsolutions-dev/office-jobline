import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi'
import AuthLayout from '../../components/auth/AuthLayout'
import RoleToggle from '../../components/ui/RoleToggle'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { images } from '../../constants/images'
import { useAuth } from '../../hooks/useAuth'
import { validateSignInFields, hasValidationErrors } from '../../lib/validation'
import { getApiErrorMessage, mapApiFieldErrors, getApiErrorCode } from '../../lib/apiErrors'

const signInTestimonial = {
  quote:
    'Office Jobline made it simple to manage our administrative hiring. We filled a receptionist role in days, not weeks.',
  name: 'Priya S.',
  location: 'Office Manager, Harbourview Partners',
  avatar: { type: 'initials', initials: 'PS', color: 'teal' },
  showRating: true,
}

export default function SignIn() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [role, setRole] = useState('job_seeker')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState('')

  const clearField = (name) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
    setFormError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const errors = validateSignInFields({ email, password })
    if (hasValidationErrors(errors)) {
      setFieldErrors(errors)
      setFormError('')
      return
    }

    setSubmitting(true)
    setFieldErrors({})
    setFormError('')

    try {
      await signIn(email.trim(), password)
      const apiRole = role === 'employer' ? 'recruiter' : 'job_seeker'
      navigate(apiRole === 'recruiter' ? '/employer-dashboard/overview' : '/dashboard/overview')
    } catch (err) {
      if (getApiErrorCode(err) === 'VALIDATION_ERROR') {
        const mapped = mapApiFieldErrors(err)
        setFieldErrors({
          email: mapped.email,
          password: mapped.password,
        })
        setFormError('')
      } else if (getApiErrorCode(err) === 'ACCOUNT_INACTIVE') {
        setFormError('Your account is inactive. Contact support for help.')
      } else if (getApiErrorCode(err) === 'SIGN_IN_FAILED') {
        setFormError('Incorrect email or password. Please try again.')
      } else {
        setFormError(getApiErrorMessage(err))
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      backgroundImage={images.signInHero}
      heading="Welcome back to"
      headingAccent="Office Jobline."
      subtitle="Log in to manage your applications, saved jobs, or job postings — all in one place."
      testimonial={signInTestimonial}
    >
      <RoleToggle value={role} onChange={setRole} />

      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        {formError && (
          <div
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            {formError}
          </div>
        )}

        <Input
          label="Email address"
          name="email"
          type="email"
          icon={FiMail}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            clearField('email')
          }}
          placeholder="you@example.com"
          autoComplete="email"
          error={fieldErrors.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          icon={FiLock}
          showToggle
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            clearField('password')
          }}
          placeholder="Enter your password"
          autoComplete="current-password"
          error={fieldErrors.password}
        />

        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="inline-flex items-center gap-2 text-muted">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-border text-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="font-semibold text-gold hover:text-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="gold"
          icon={FiArrowRight}
          iconPosition="right"
          disabled={submitting}
          className="w-full"
        >
          {submitting ? 'Signing in…' : 'Log In'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Don&apos;t have an account?{' '}
        <Link
          to="/sign-up"
          className="font-semibold text-gold hover:text-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  )
}
