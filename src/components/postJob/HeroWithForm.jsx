import { useState } from 'react'
import {
  FiSend,
  FiFileText,
  FiMapPin,
  FiDollarSign,
  FiLock,
} from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import Button from '../ui/Button'
import IconCircle from '../ui/IconCircle'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { images } from '../../constants/images'
import {
  jobTypeOptions,
  salaryRangeOptions,
  postJobTrustBadges,
} from '../../constants/postJobContent'

const emptyForm = {
  jobTitle: '',
  location: '',
  jobType: '',
  salaryRange: '',
  companyName: '',
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * Full-bleed photo hero with floating job-posting form.
 */
export default function HeroWithForm() {
  const [values, setValues] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  const setField = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitting(true)
    console.log('Post a Job draft (placeholder submit)', values)
    window.setTimeout(() => setSubmitting(false), 400)
  }

  return (
    <section className="bg-offwhite">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <div className="mx-auto w-full max-w-xl px-6 py-10 sm:px-10 lg:ml-auto lg:mr-8 lg:px-16 lg:py-20 flex flex-col gap-8">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-gold sm:text-sm">POST A JOB</p>
              <span className="mt-2 block h-1 w-10 bg-gold" aria-hidden />
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl">
                Post Office &amp; Administrative Jobs Across Canada
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                Connect with qualified office professionals across Canada. Post your job and find the
                right talent for roles like office managers, receptionists, executive assistants,
                customer service representatives, payroll clerks, data entry clerks, and coordinators.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button variant="gold" icon={FiSend} onClick={() => scrollToId('job-posting-form')}>
                  Start Posting
                </Button>
                <Button variant="outline-gold" icon={FiFileText} onClick={() => scrollToId('pricing')}>
                  View Plans
                </Button>
              </div>

              <ul className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8">
                {postJobTrustBadges.map((badge) => (
                  <li key={badge.label} className="flex items-center gap-3">
                    <IconCircle icon={badge.icon} color="gold-tint" size="sm" />
                    <span className="max-w-[9rem] text-sm font-medium leading-snug text-gold-dark">
                      {badge.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="job-posting-form"
              className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-xl sm:p-8"
            >
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <HiOutlineBuildingOffice2 className="h-6 w-6 text-gold" aria-hidden />
                <h2 className="font-display text-lg font-bold text-navy">Start Posting Your Job</h2>
              </div>

              <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                <Input
                  label="Job Title"
                  name="jobTitle"
                  value={values.jobTitle}
                  onChange={setField('jobTitle')}
                  placeholder="e.g. Office Manager"
                />
                <Input
                  label="Location"
                  name="location"
                  icon={FiMapPin}
                  value={values.location}
                  onChange={setField('location')}
                  placeholder="City, province or region"
                />
                <Select
                  label="Job Type"
                  name="jobType"
                  value={values.jobType}
                  onChange={setField('jobType')}
                  options={jobTypeOptions}
                  placeholder="Select job type"
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
                <Input
                  label="Company Name"
                  name="companyName"
                  icon={HiOutlineBuildingOffice2}
                  value={values.companyName}
                  onChange={setField('companyName')}
                  placeholder="Your company name"
                />

                <p className="flex items-center gap-2 text-xs text-muted">
                  <FiLock className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Your information is secure and will not be shared.
                </p>

                <button type="submit" className="sr-only" disabled={submitting}>
                  Save draft
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="relative order-1 h-80 w-full self-stretch sm:h-[360px] lg:order-2 lg:h-auto lg:min-h-[420px]">
          <img
            src={images.postJobHero}
            alt="Office space with desks and computers"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
