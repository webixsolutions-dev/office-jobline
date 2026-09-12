// src/lib/jobs.js — public + authenticated job APIs

import { api } from './api'

export async function getPublicCategories() {
  const data = await api('public/categories', { method: 'GET' })
  return data?.items ?? []
}

/** @deprecated use getPublicCategories */
export async function getServiceCareCategories() {
  return getPublicCategories()
}

export async function getPublicJobs(query = {}) {
  const params = new URLSearchParams()
  if (query.q) params.set('q', query.q)
  if (query.page) params.set('page', String(query.page))
  if (query.limit) params.set('limit', String(query.limit))
  if (query.location) params.set('location', query.location)
  if (query.category) params.set('category', query.category)
  if (query.category_id) params.set('category', String(query.category_id))
  if (query.city) params.set('location', query.city)
  if (query.province) params.set('location', query.province)
  if (query.employment_type) params.set('type', query.employment_type)
  if (query.is_remote !== undefined) {
    params.set('workplace', query.is_remote ? 'remote' : 'onsite')
  }

  const qs = params.toString()
  const data = await api(`public/jobs${qs ? `?${qs}` : ''}`, { method: 'GET' })
  return data
}

export async function getPublicJob(id) {
  const data = await api(`public/jobs/${id}`, { method: 'GET' })
  return data?.job ?? data
}

export async function recordJobView(id) {
  await getPublicJob(id)
}

export async function applyToJob(jobId, token, { cover_letter, resume_path } = {}) {
  return api(
    `job-seeker/jobs/${jobId}/apply`,
    {
      method: 'POST',
      body: JSON.stringify({
        cover_letter: cover_letter ?? null,
        resume_path: resume_path ?? undefined,
      }),
    },
    token,
  )
}

export async function getSeekerDashboard(token) {
  return api('job-seeker/dashboard', { method: 'GET' }, token)
}

/** Build normalized saved job cards from dashboard payload (fetches missing jobs by id). */
export async function resolveSavedJobsFromDashboard(dashboard, token, categories = []) {
  const rows = Array.isArray(dashboard?.savedJobs) ? dashboard.savedJobs : []
  const byId = new Map()

  for (const row of rows) {
    const jobId = String(row.job_id ?? row.jobId ?? row.jobs?.id ?? row.job?.id ?? '')
    const embed = row.jobs || row.job
    if (embed?.id) {
      byId.set(String(embed.id), normalizeJob(embed, categories))
    } else if (jobId) {
      byId.set(jobId, null)
    }
  }

  const idList = dashboard?.savedJobIds
  if (Array.isArray(idList)) {
    for (const raw of idList) {
      const id = typeof raw === 'object' ? String(raw.job_id ?? raw.jobId ?? '') : String(raw)
      if (id && !byId.has(id)) byId.set(id, null)
    }
  }

  const missingIds = [...byId.entries()].filter(([, job]) => job === null).map(([id]) => id)

  await Promise.all(
    missingIds.map(async (id) => {
      try {
        const job = await getPublicJob(id)
        if (job?.id) byId.set(id, normalizeJob(job, categories))
        else byId.delete(id)
      } catch {
        byId.delete(id)
      }
    }),
  )

  return [...byId.values()].filter(Boolean)
}

export function collectSavedJobIds(dashboard) {
  const ids = new Set()
  const rows = dashboard?.savedJobs
  if (Array.isArray(rows)) {
    for (const row of rows) {
      const id = row?.job_id ?? row?.jobId ?? row?.jobs?.id ?? row?.job?.id
      if (id != null) ids.add(String(id))
    }
  }
  const idList = dashboard?.savedJobIds
  if (Array.isArray(idList)) {
    for (const raw of idList) {
      if (typeof raw === 'object') {
        const id = raw.job_id ?? raw.jobId
        if (id != null) ids.add(String(id))
      } else if (raw != null) {
        ids.add(String(raw))
      }
    }
  }
  return ids
}

export async function getMyApplications(token) {
  const dashboard = await getSeekerDashboard(token)
  return dashboard?.applications ?? []
}

export async function getMyCompanies(token) {
  const data = await api('recruiter/companies', { method: 'GET' }, token)
  return data?.items ?? []
}

export async function createRecruiterCompany(payload, token) {
  return api(
    'recruiter/companies',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    token,
  )
}

export async function getRecruiterDashboard(token) {
  return api('recruiter/dashboard', { method: 'GET' }, token)
}

export async function getEmployerJobs(token) {
  const data = await getRecruiterDashboard(token)
  return data?.jobs ?? []
}

export async function getJobApplications(jobId, token) {
  const data = await api(`recruiter/jobs/${jobId}/applications`, { method: 'GET' }, token)
  return data?.items ?? []
}

export async function createEmployerJob(payload, token) {
  const { company_id: _ignored, ...body } = payload
  return api(
    'recruiter/jobs',
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
    token,
  )
}

export async function updateEmployerJob(jobId, payload, token) {
  return api(
    `recruiter/jobs/${jobId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
    token,
  )
}

export async function getRecommendedJobs(token, limit = 6) {
  const data = await api(
    `job-seeker/recommended-jobs?limit=${Math.min(12, Math.max(1, limit))}`,
    { method: 'GET' },
    token,
  )
  return data?.items ?? []
}

export async function getRecruiterApplications(token, { page = 1, pageSize = 100, status } = {}) {
  const params = new URLSearchParams()
  params.set('page', String(page))
  params.set('pageSize', String(pageSize))
  if (status && status !== 'all') params.set('status', status)
  const data = await api(`recruiter/applications?${params}`, { method: 'GET' }, token)
  return data
}

export async function updateApplicationStatus(applicationId, status, token) {
  return api(
    `recruiter/applications/${applicationId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    },
    token,
  )
}

export async function getPublicCompanies() {
  const data = await api('public/companies', { method: 'GET' })
  return data?.items ?? []
}

export function normalizeJob(job, categories = []) {
  if (!job) return null

  const companyEmbed = job.companies || job.company
  const companyName =
    (typeof companyEmbed === 'object' && companyEmbed?.name) ||
    job.company_name ||
    'Unknown Company'

  const catId = job.category_id || job.categoryId
  const catObj =
    job.categories ||
    categories.find((c) => String(c.id) === String(catId))
  const categoryName = catObj?.name || 'Office & Admin'
  const categorySlug = catObj?.slug || 'office-admin'

  const typeDisplayMap = {
    full_time: 'Full-time',
    part_time: 'Part-time',
    contract: 'Contract',
    temporary: 'Temporary',
    internship: 'Internship',
    seasonal: 'Seasonal',
  }
  const type = typeDisplayMap[job.employment_type] || job.employment_type || 'Full-time'

  const mode = job.is_remote ? 'Remote' : 'On-site'

  const minSal = job.salary_min ?? job.salaryMin
  const maxSal = job.salary_max ?? job.salaryMax
  const period = job.salary_period || job.salaryPeriod || 'yearly'
  let salaryLabel = 'Salary not specified'
  if (minSal && maxSal) {
    salaryLabel = `$${Number(minSal).toLocaleString('en-CA')} - $${Number(maxSal).toLocaleString('en-CA')} / ${period}`
  } else if (minSal) {
    salaryLabel = `$${Number(minSal).toLocaleString('en-CA')} / ${period}`
  }

  const colors = ['#0E5D4E', '#0A1F3D', '#F2B705', '#17A24A', '#7C3AED', '#DB2777']
  const hash = companyName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const logoColor = colors[hash % colors.length]
  const initials = companyName
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const city = job.city || ''
  const province = job.province || ''
  const location = city && province ? `${city}, ${province}` : city || province || 'Canada'

  const employerSlug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const typeSlug = (job.employment_type || 'full-time').replace('_', '-')
  const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const dateObj = new Date(job.published_at || job.created_at || Date.now())
  const postedDate = dateObj.toISOString().split('T')[0]

  return {
    id: String(job.id),
    title: job.title,
    company: companyName,
    logoColor,
    initials,
    city,
    provinceCode: province,
    province,
    location,
    type,
    typeSlug,
    mode,
    modeSlug: job.is_remote ? 'remote' : 'on-site',
    experience: 'Not specified',
    experienceSlug: 'not-specified',
    salaryMin: minSal || 0,
    salaryMax: maxSal || 0,
    salaryLabel,
    category: categoryName,
    categorySlug,
    citySlug,
    employerSlug,
    postedDate,
    description: job.description || '',
    tags: [type, mode].filter(Boolean),
    raw: job,
  }
}
