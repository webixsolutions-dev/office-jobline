import { normalizeJob } from './jobs'

/** API hiring stage → seeker dashboard label */
export function mapApplicationStatusForSeeker(apiStatus) {
  switch (apiStatus) {
    case 'submitted':
      return 'Applied'
    case 'viewed':
    case 'shortlisted':
      return 'In Review'
    case 'interviewing':
      return 'Interview'
    case 'offered':
    case 'hired':
      return 'Offer'
    case 'rejected':
    case 'withdrawn':
      return 'Not Selected'
    default:
      return 'Applied'
  }
}

/** API hiring stage → employer pipeline label */
export function employerStageFromApiStatus(apiStatus) {
  switch (apiStatus) {
    case 'submitted':
      return 'New'
    case 'viewed':
      return 'Reviewed'
    case 'shortlisted':
      return 'Shortlisted'
    case 'interviewing':
      return 'Interview'
    case 'offered':
    case 'hired':
      return 'Offer'
    case 'rejected':
    case 'withdrawn':
      return 'Rejected'
    default:
      return 'New'
  }
}

/** Employer pipeline label → API status for PATCH */
export function apiStatusFromEmployerStage(stage) {
  switch (stage) {
    case 'New':
      return 'submitted'
    case 'Reviewed':
      return 'viewed'
    case 'Shortlisted':
      return 'shortlisted'
    case 'Interview':
      return 'interviewing'
    case 'Offer':
      return 'offered'
    case 'Rejected':
      return 'rejected'
    default:
      return 'viewed'
  }
}

export function mapSeekerApplication(row, categories = []) {
  const job = row.jobs || row.job || {}
  const normalized = job.id ? normalizeJob(job, categories) : null
  const jobId = String(row.job_id ?? job.id ?? '')
  const jobCard =
    normalized ||
    (jobId
      ? {
          id: jobId,
          title: job.title || 'Job',
          company: job.companies?.name || 'Company',
          location: 'Canada',
          logoColor: '#0E5D4E',
          initials: '?',
          type: 'Full-time',
        }
      : null)

  return {
    id: row.id,
    jobId,
    title: jobCard?.title || job.title || 'Job',
    company: jobCard?.company || job.companies?.name || 'Company',
    location: jobCard?.location || 'Canada',
    status: mapApplicationStatusForSeeker(row.status),
    apiStatus: row.status,
    dateApplied: row.created_at?.slice(0, 10) || '',
    job: jobCard,
  }
}

export function mapRecruiterApplicant(row) {
  const profile = row.profiles || {}
  const job = row.jobs || {}
  const city = profile.location_city
  const province = profile.location_province
  const location =
    city && province ? `${city}, ${province}` : city || province || ''

  return {
    id: row.id,
    jobId: String(row.job_id ?? job.id ?? ''),
    name: profile.full_name || 'Applicant',
    headline: profile.headline || '',
    email: profile.email || '',
    phone: profile.phone || '',
    location,
    resumeFilename: row.resume_path?.split('/').pop() || '',
    resumePath: row.resume_path || '',
    skills: profile.skills || [],
    experience: profile.experience || [],
    education: profile.education || [],
    stage: employerStageFromApiStatus(row.status),
    apiStatus: row.status,
    notes: row.notes || '',
    appliedDate: row.created_at?.slice(0, 10) || '',
    coverLetter: row.cover_letter || '',
  }
}

export function mapRecruiterJobPosting(job) {
  const company = job.companies?.name || ''
  const city = job.city || ''
  const province = job.province || ''
  const location = city && province ? `${city}, ${province}` : city || province || 'Canada'

  const statusMap = {
    active: 'Active',
    pending_review: 'Draft',
    closed: 'Closed',
    expired: 'Closed',
    removed: 'Closed',
  }

  return {
    id: String(job.id),
    title: job.title,
    status: statusMap[job.status] || 'Active',
    apiStatus: job.status,
    location,
    employmentType: (job.employment_type || 'full_time').replace('_', '-'),
    salaryRange: '',
    description: job.description || '',
    category: job.categories?.slug || '',
    companyName: company,
    postedDate: job.published_at?.slice(0, 10) || job.created_at?.slice(0, 10) || '',
    applicantCount: job.applications_count ?? 0,
    viewsCount: job.views_count ?? 0,
    raw: job,
  }
}

export function mapDashboardProfile(apiProfile, user) {
  const p = apiProfile || user || {}
  const city = p.location_city || ''
  const province = p.location_province || ''
  return {
    fullName: p.full_name || '',
    email: p.email || user?.email || '',
    phone: p.phone || '',
    headline: p.headline || '',
    location: city && province ? `${city}, ${province}` : city || province || '',
    location_city: city,
    location_province: province,
    skills: p.skills || [],
    experience: p.experience || [],
    education: p.education || [],
    default_resume_path: p.default_resume_path || null,
    defaultResumePath: p.default_resume_path || null,
  }
}

export function mapCompanyToForm(company) {
  if (!company) {
    return {
      name: '',
      logoFilename: '',
      industry: '',
      size: '',
      website: '',
      location: '',
      description: '',
      id: null,
    }
  }
  return {
    id: company.id,
    name: company.name || '',
    logoFilename: company.logo_path?.split('/').pop() || '',
    industry: '',
    size: '',
    website: company.website || '',
    location: '',
    description: company.description || '',
    registration_number: company.registration_number || '',
  }
}

export function employmentTypeToApi(value) {
  if (!value) return 'full_time'
  return value.replace('-', '_')
}
