import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiFileText, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import Button from '../ui/Button'
import ApplicantStageBadge, { APPLICANT_STAGE_OPTIONS } from './ApplicantStageBadge'

export default function ApplicantProfileDrawer({
  applicant,
  jobTitle,
  isOpen,
  onClose,
  onStageChange,
  onNotesChange,
}) {
  const [notes, setNotes] = useState(applicant?.notes || '')

  useEffect(() => {
    setNotes(applicant?.notes || '')
  }, [applicant])

  if (!applicant) return null

  const handleNotesBlur = () => {
    if (notes !== applicant.notes) {
      onNotesChange?.(applicant.id, notes)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-[var(--color-navy-overlay)] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-y-0 right-0 z-[95] flex w-full flex-col bg-white shadow-2xl sm:max-w-lg lg:max-w-xl"
          >
            <div className="flex items-start justify-between border-b border-[var(--color-border)] px-5 py-4">
              <div>
                <h2 className="font-display text-lg font-bold text-[var(--color-text-primary)]">
                  {applicant.name}
                </h2>
                {jobTitle && (
                  <p className="text-sm text-[var(--color-text-secondary)]">{jobTitle}</p>
                )}
                <div className="mt-2">
                  <ApplicantStageBadge stage={applicant.stage} />
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close profile"
                className="rounded-md p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Contact
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-primary)]">
                  <li className="flex items-center gap-2">
                    <FiMail className="h-4 w-4 text-[var(--color-teal)]" aria-hidden />
                    {applicant.email}
                  </li>
                  {applicant.phone && (
                    <li className="flex items-center gap-2">
                      <FiPhone className="h-4 w-4 text-[var(--color-teal)]" aria-hidden />
                      {applicant.phone}
                    </li>
                  )}
                  {applicant.location && (
                    <li className="flex items-center gap-2">
                      <FiMapPin className="h-4 w-4 text-[var(--color-teal)]" aria-hidden />
                      {applicant.location}
                    </li>
                  )}
                </ul>
              </section>

              {applicant.resumeFilename && (
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Resume
                  </h3>
                  <div className="mt-3 flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3">
                    <span className="flex items-center gap-2 text-sm text-[var(--color-text-primary)]">
                      <FiFileText className="h-4 w-4 text-[var(--color-teal)]" aria-hidden />
                      {applicant.resumeFilename}
                    </span>
                    <Button variant="outline-teal" type="button" onClick={() => {}}>
                      View Resume
                    </Button>
                  </div>
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                    Preview placeholder — no file storage yet.
                  </p>
                </section>
              )}

              {applicant.skills?.length > 0 && (
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Skills
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {applicant.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-[var(--color-teal-light)] px-3 py-1 text-xs font-medium text-[var(--color-teal)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {applicant.experience?.length > 0 && (
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Work Experience
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {applicant.experience.map((exp) => (
                      <li
                        key={exp.id}
                        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3 text-sm"
                      >
                        <p className="font-semibold text-[var(--color-text-primary)]">{exp.title}</p>
                        <p className="text-[var(--color-text-secondary)]">{exp.company}</p>
                        {exp.dates && (
                          <p className="text-xs text-[var(--color-text-secondary)]">{exp.dates}</p>
                        )}
                        {exp.description && (
                          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                            {exp.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {applicant.education?.length > 0 && (
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Education
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {applicant.education.map((edu) => (
                      <li
                        key={edu.id}
                        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3 text-sm"
                      >
                        <p className="font-semibold text-[var(--color-text-primary)]">
                          {edu.institution}
                        </p>
                        <p className="text-[var(--color-text-secondary)]">{edu.field}</p>
                        {edu.dates && (
                          <p className="text-xs text-[var(--color-text-secondary)]">{edu.dates}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <label
                  htmlFor="pipeline-stage"
                  className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]"
                >
                  Pipeline Stage
                </label>
                <select
                  id="pipeline-stage"
                  value={applicant.stage}
                  onChange={(e) => onStageChange?.(applicant.id, e.target.value)}
                  className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text-primary)]"
                >
                  {APPLICANT_STAGE_OPTIONS.map((stage) => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </section>

              <section>
                <label
                  htmlFor="recruiter-notes"
                  className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]"
                >
                  Recruiter Notes
                </label>
                <textarea
                  id="recruiter-notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={handleNotesBlur}
                  placeholder="Private notes about this candidate…"
                  className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-teal)] focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/20"
                />
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
