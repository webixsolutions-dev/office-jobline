import { useEffect, useId, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiSend } from 'react-icons/fi'
import { HiOutlineEnvelope } from 'react-icons/hi2'
import IconCircle from './IconCircle'
import Button from './Button'
import { contactSubjects } from '../../constants/contactInfo'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emptyForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

/**
 * Client-side contact form. Submission is simulated — no backend yet.
 * Reads `?subject=` to pre-select a subject (used by Specific Help CTAs).
 */
export default function ContactForm() {
  const formId = useId()
  const [searchParams] = useSearchParams()
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const fromQuery = searchParams.get('subject')
    if (fromQuery) {
      const match = contactSubjects.find((s) => s.value === fromQuery)
      if (match) {
        setValues((prev) => ({ ...prev, subject: match.value }))
      }
    }
    if (window.location.hash === '#contact-form') {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [searchParams])

  const setField = (field) => (event) => {
    const value = event.target.value
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Enter your full name.'
    if (!values.email.trim()) next.email = 'Enter your email address.'
    else if (!EMAIL_PATTERN.test(values.email.trim())) next.email = 'Enter a valid email address.'
    if (!values.subject) next.subject = 'Select a subject.'
    if (!values.message.trim()) next.message = 'Enter a message.'
    else if (values.message.trim().length < 10) next.message = 'Please share a little more detail (at least 10 characters).'
    return next
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('sending')
    window.setTimeout(() => {
      setStatus('success')
      setValues(emptyForm)
    }, 700)
  }

  const fieldClass =
    'w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-navy placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'

  return (
    <article id="contact-form" className="scroll-mt-24 rounded-xl bg-white p-6 shadow-card sm:p-7">
      <div className="flex items-start gap-3">
        <IconCircle icon={HiOutlineEnvelope} color="navy" size="sm" />
        <div>
          <h2 className="font-display text-lg font-semibold text-navy">Send us a message</h2>
          <p className="mt-0.5 text-sm text-muted">Fill out the form below and we&apos;ll get back to you shortly.</p>
        </div>
      </div>

      <div className="mt-4 min-h-[1.5rem]" aria-live="polite">
        {status === 'success' && (
          <p className="rounded-lg bg-teal-light px-3 py-2 text-sm text-teal">
            Thanks — your message is ready on our side. We&apos;ll reply within one business day.
          </p>
        )}
        {Object.keys(errors).length > 0 && status !== 'success' && (
          <p className="text-sm text-red-700">Please fix the highlighted fields and try again.</p>
        )}
      </div>

      <form className="mt-2 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor={`${formId}-name`} className="mb-1 block text-sm font-semibold text-navy">
            Full Name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={setField('name')}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            className={fieldClass}
          />
          {errors.name && (
            <p id={`${formId}-name-error`} className="mt-1 text-xs text-red-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className="mb-1 block text-sm font-semibold text-navy">
            Email Address
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={setField('email')}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            className={fieldClass}
          />
          {errors.email && (
            <p id={`${formId}-email-error`} className="mt-1 text-xs text-red-700">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-subject`} className="mb-1 block text-sm font-semibold text-navy">
            Subject
          </label>
          <select
            id={`${formId}-subject`}
            name="subject"
            value={values.subject}
            onChange={setField('subject')}
            aria-required="true"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? `${formId}-subject-error` : undefined}
            className={`${fieldClass} ${values.subject ? 'text-navy' : 'text-muted'}`}
          >
            <option value="">Select or type a subject</option>
            {contactSubjects.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p id={`${formId}-subject-error`} className="mt-1 text-xs text-red-700">
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-message`} className="mb-1 block text-sm font-semibold text-navy">
            Message
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={4}
            value={values.message}
            onChange={setField('message')}
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${formId}-message-error` : undefined}
            className={`${fieldClass} resize-y`}
          />
          {errors.message && (
            <p id={`${formId}-message-error`} className="mt-1 text-xs text-red-700">
              {errors.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="navy"
          icon={FiSend}
          disabled={status === 'sending'}
          className="w-full [&_svg]:text-gold"
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </Button>
      </form>
    </article>
  )
}
