import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi'
import AuthLayout from '../../components/auth/AuthLayout'
import RoleToggle from '../../components/ui/RoleToggle'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { images } from '../../constants/images'
import { useAuth } from '../../hooks/useAuth'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const next = {}
    if (!email.trim()) next.email = 'Enter your email address.'
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Enter your password.'
    return next
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    try {
      // Map 'employer' role toggle to 'recruiter' backend role value if necessary
      const apiRole = role === 'employer' ? 'recruiter' : role
      await signIn(email.trim(), password)
      navigate(apiRole === 'recruiter' ? '/recruiter' : '/dashboard')
    } catch (err) {
      setErrors({ form: err.message || 'Login failed. Please try again.' })
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
        {errors.form && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
            {errors.form}
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
            setErrors((prev) => ({ ...prev, email: undefined, form: undefined }))
          }}
          placeholder="you@example.com"
          required
          autoComplete="email"
          error={errors.email}
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
            setErrors((prev) => ({ ...prev, password: undefined, form: undefined }))
          }}
          placeholder="Enter your password"
          required
          autoComplete="current-password"
          error={errors.password}
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
          Log In
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

