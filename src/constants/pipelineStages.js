/**
 * Pipeline stage labels for seeker-facing vs employer-facing dashboards.
 * Maps 1:1 so a future backend can reconcile status across both views.
 */
export const SEEKER_STAGES = ['Applied', 'In Review', 'Interview', 'Offer', 'Not Selected']

export const EMPLOYER_STAGES = ['New', 'Reviewed', 'Shortlisted', 'Interview', 'Offer', 'Rejected']

/** Seeker label → employer label */
export const SEEKER_TO_EMPLOYER_STAGE = {
  Applied: 'New',
  'In Review': 'Reviewed',
  Interview: 'Interview',
  Offer: 'Offer',
  'Not Selected': 'Rejected',
}

/** Employer label → seeker label */
export const EMPLOYER_TO_SEEKER_STAGE = {
  New: 'Applied',
  Reviewed: 'In Review',
  Shortlisted: 'In Review',
  Interview: 'Interview',
  Offer: 'Offer',
  Rejected: 'Not Selected',
}

/** Advancement order for employer pipeline (excludes Rejected as a forward step). */
export const EMPLOYER_STAGE_ORDER = ['New', 'Reviewed', 'Shortlisted', 'Interview', 'Offer']

export function getNextEmployerStage(current) {
  const idx = EMPLOYER_STAGE_ORDER.indexOf(current)
  if (idx < 0 || idx >= EMPLOYER_STAGE_ORDER.length - 1) return current
  return EMPLOYER_STAGE_ORDER[idx + 1]
}
