/** Shared client-side job filter helpers used by Browse Jobs. */

export const JOB_LISTINGS_ID = 'job-listings'

export const JOB_TYPES = [
  { label: 'Full-time', slug: 'full-time', count: 6234 },
  { label: 'Part-time', slug: 'part-time', count: 1842 },
  { label: 'Contract', slug: 'contract', count: 956 },
  { label: 'Temporary', slug: 'temporary', count: 412 },
  { label: 'Internship', slug: 'internship', count: 287 },
]

export const WORK_MODES = [
  { label: 'On-site', slug: 'on-site', count: 5410 },
  { label: 'Hybrid', slug: 'hybrid', count: 2988 },
  { label: 'Remote', slug: 'remote', count: 1849 },
]

export const EXPERIENCE_LEVELS = [
  { label: 'Entry Level', slug: 'entry-level', count: 2104 },
  { label: '1-3 Years', slug: '1-3-years', count: 3421 },
  { label: '3-5 Years', slug: '3-5-years', count: 2560 },
  { label: '5+ Years', slug: '5-plus-years', count: 2162 },
]

export const PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Northwest Territories',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon',
]

export const SALARY_OPTIONS = [30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 120000]

export const SORT_OPTIONS = [
  { value: 'relevant', label: 'Most Relevant' },
  { value: 'newest', label: 'Newest' },
  { value: 'salary-high', label: 'Salary High-Low' },
  { value: 'salary-low', label: 'Salary Low-High' },
]

export const PER_PAGE_OPTIONS = [12, 24, 36]

export const HERO_PILLS = [
  { label: 'Full-Time', key: 'types', slug: 'full-time' },
  { label: 'Part-Time', key: 'types', slug: 'part-time' },
  { label: 'Remote', key: 'modes', slug: 'remote' },
  { label: 'Hybrid', key: 'modes', slug: 'hybrid' },
  { label: 'Entry Level', key: 'experience', slug: 'entry-level' },
  { label: 'Contract', key: 'types', slug: 'contract' },
]

export const emptyFilters = {
  keyword: '',
  location: '',
  types: [],
  modes: [],
  experience: [],
  province: '',
  minSalary: '',
  maxSalary: '',
  category: '',
  city: '',
  sort: 'relevant',
  page: 1,
  perPage: 12,
}

function listParam(params, key) {
  const all = params.getAll(key)
  if (all.length) return all.filter(Boolean)
  const csv = params.get(key)
  return csv ? csv.split(',').filter(Boolean) : []
}

export function filtersFromSearchParams(searchParams) {
  const params = searchParams instanceof URLSearchParams ? searchParams : new URLSearchParams(searchParams)
  return {
    keyword: params.get('keyword') || params.get('q') || '',
    location: params.get('location') || '',
    types: listParam(params, 'type'),
    modes: listParam(params, 'mode'),
    experience: listParam(params, 'experience'),
    province: params.get('province') || '',
    minSalary: params.get('minSalary') || '',
    maxSalary: params.get('maxSalary') || '',
    category: params.get('category') || '',
    city: params.get('city') || '',
    sort: params.get('sort') || 'relevant',
    page: Math.max(1, Number(params.get('page')) || 1),
    perPage: PER_PAGE_OPTIONS.includes(Number(params.get('perPage')))
      ? Number(params.get('perPage'))
      : 12,
  }
}

export function filtersToSearchParams(filters) {
  const params = new URLSearchParams()
  if (filters.keyword) params.set('keyword', filters.keyword)
  if (filters.location) params.set('location', filters.location)
  filters.types?.forEach((v) => params.append('type', v))
  filters.modes?.forEach((v) => params.append('mode', v))
  filters.experience?.forEach((v) => params.append('experience', v))
  if (filters.province) params.set('province', filters.province)
  if (filters.minSalary) params.set('minSalary', String(filters.minSalary))
  if (filters.maxSalary) params.set('maxSalary', String(filters.maxSalary))
  if (filters.category) params.set('category', filters.category)
  if (filters.city) params.set('city', filters.city)
  if (filters.sort && filters.sort !== 'relevant') params.set('sort', filters.sort)
  if (filters.page && filters.page > 1) params.set('page', String(filters.page))
  if (filters.perPage && filters.perPage !== 12) params.set('perPage', String(filters.perPage))
  return params
}

function matchesText(haystack, needle) {
  return haystack.toLowerCase().includes(needle.trim().toLowerCase())
}

export function applyJobFilters(jobs, filters) {
  const keyword = filters.keyword?.trim() || ''
  const location = filters.location?.trim() || ''

  let result = jobs.filter((job) => {
    if (keyword) {
      const blob = `${job.title} ${job.company} ${job.description}`
      if (!matchesText(blob, keyword)) return false
    }
    if (location) {
      const blob = `${job.city} ${job.province} ${job.location}`
      if (!matchesText(blob, location)) return false
    }
    if (filters.types?.length && !filters.types.includes(job.typeSlug)) return false
    if (filters.modes?.length && !filters.modes.includes(job.modeSlug)) return false
    if (filters.experience?.length && !filters.experience.includes(job.experienceSlug)) return false
    if (filters.province && job.province !== filters.province) return false
    if (filters.category && job.categorySlug !== filters.category) return false
    if (filters.city && job.citySlug !== filters.city) return false
    if (filters.minSalary && job.salaryMax < Number(filters.minSalary)) return false
    if (filters.maxSalary && job.salaryMin > Number(filters.maxSalary)) return false
    return true
  })

  switch (filters.sort) {
    case 'newest':
      result = [...result].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
      break
    case 'salary-high':
      result = [...result].sort((a, b) => b.salaryMax - a.salaryMax)
      break
    case 'salary-low':
      result = [...result].sort((a, b) => a.salaryMin - b.salaryMin)
      break
    default:
      break
  }

  return result
}

export function paginate(items, page, perPage) {
  const total = items.length
  const pageCount = Math.max(1, Math.ceil(total / perPage) || 1)
  const safePage = Math.min(Math.max(1, page), pageCount)
  const start = (safePage - 1) * perPage
  return {
    items: items.slice(start, start + perPage),
    total,
    pageCount,
    page: safePage,
  }
}

export function toggleListValue(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export function scrollToJobListings() {
  const el = document.getElementById(JOB_LISTINGS_ID)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
