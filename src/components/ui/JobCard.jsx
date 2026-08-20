import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiBookmark, FiBriefcase, FiHeart, FiMapPin } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import Button from './Button'

/**
 * Single job listing card.
 */
export default function JobCard({ job }) {
  const [saved, setSaved] = useState(false)

  return (
    <article className="flex h-full flex-col rounded-xl bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: job.logoColor }}
            aria-hidden
          >
            {job.initials}
          </span>
          <div>
            <h3 className="font-display text-base font-bold text-navy">{job.title}</h3>
            <Link
              to={`/employers/${job.employerSlug}`}
              className="text-sm font-medium text-teal hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {job.company}
            </Link>
          </div>
        </div>
        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? 'Unsave job' : 'Save job'}
          onClick={() => setSaved((v) => !v)}
          className={`rounded-full p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
            saved ? 'text-teal' : 'text-muted hover:text-teal'
          }`}
        >
          <FiHeart className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted sm:text-sm">
        <span className="inline-flex items-center gap-1">
          <FiMapPin className="h-3.5 w-3.5" aria-hidden />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <FiBriefcase className="h-3.5 w-3.5" aria-hidden />
          {job.type}
        </span>
        <span className="inline-flex items-center gap-1">
          <HiOutlineBuildingOffice2 className="h-3.5 w-3.5" aria-hidden />
          {job.mode}
        </span>
      </div>

      <p className="mt-3 font-display text-sm font-bold text-navy">{job.salaryLabel}</p>
      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">{job.description}</p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Button variant="teal" to={`/browse/${job.id}/apply`} className="flex-1">
          Apply Now
        </Button>
        <Button
          variant="outline-teal"
          icon={FiBookmark}
          iconPosition="right"
          className="flex-1"
          onClick={() => setSaved((v) => !v)}
          aria-pressed={saved}
        >
          {saved ? 'Saved' : 'Save Job'}
        </Button>
      </div>
    </article>
  )
}
