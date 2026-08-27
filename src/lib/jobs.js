// src/lib/jobs.js
// API Client Methods and Job Normalization

import { api } from './api';

/**
 * Fetch taxonomy categories.
 */
export async function getServiceCareCategories() {
  return api('/v1/taxonomy/categories?sector_id=3', { method: 'GET' });
}

/**
 * Fetch public jobs with search/filters.
 */
export async function getPublicJobs(query = {}) {
  const params = new URLSearchParams();
  if (query.q) params.set('q', query.q);
  if (query.category_id) params.set('category_id', query.category_id);
  if (query.city) params.set('city', query.city);
  if (query.province) params.set('province', query.province);
  if (query.employment_type) params.set('employment_type', query.employment_type);
  if (query.is_remote !== undefined) params.set('is_remote', String(query.is_remote));
  params.set('limit', String(query.limit || 100));

  const queryString = params.toString();
  const path = `/v1/jobs${queryString ? `?${queryString}` : ''}`;
  return api(path, { method: 'GET' });
}

/**
 * Fetch a single job by ID.
 */
export async function getPublicJob(id) {
  return api(`/v1/jobs/${id}`, { method: 'GET' });
}

/**
 * Record a view for a job.
 */
export async function recordJobView(id) {
  return api(`/v1/jobs/${id}/view`, {
    method: 'POST',
    body: JSON.stringify({}),
  });
}

/**
 * Apply to a job.
 */
export async function applyToJob(id, token, coverLetter) {
  return api(`/v1/jobs/${id}/applications`, {
    method: 'POST',
    body: JSON.stringify({ cover_letter: coverLetter }),
  }, token);
}

/**
 * Get current user's applications.
 */
export async function getMyApplications(token) {
  return api('/v1/me/applications', { method: 'GET' }, token);
}

/**
 * Get employer's companies list.
 */
export async function getMyCompanies(token) {
  return api('/v1/companies', { method: 'GET' }, token);
}

/**
 * Get recruiter's created job openings.
 */
export async function getEmployerJobs(token) {
  return api('/v1/employer/jobs', { method: 'GET' }, token);
}

/**
 * Get applications for a specific job.
 */
export async function getJobApplications(jobId, token) {
  return api(`/v1/employer/jobs/${jobId}/applications`, { method: 'GET' }, token);
}

/**
 * Get views tracking records for a job.
 */
export async function getJobViews(jobId, token) {
  return api(`/v1/employer/jobs/${jobId}/views`, { method: 'GET' }, token);
}

/**
 * Create a new job opening (recruiter).
 */
export async function createEmployerJob(payload, token) {
  return api('/v1/employer/jobs', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, token);
}

/**
 * Normalizes a raw backend job object into a frontend schema.
 */
export function normalizeJob(job, categories = []) {
  if (!job) return null;
  const companyName = job.company?.name || 'Unknown Company';
  
  // Resolve category name
  const catId = job.category_id || job.categoryId;
  const catObj = categories.find(c => String(c.id) === String(catId));
  const categoryName = catObj ? catObj.name : 'Office & Admin';
  const categorySlug = catObj ? catObj.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'office-admin';

  // Format type
  const typeDisplayMap = {
    'full_time': 'Full-time',
    'part_time': 'Part-time',
    'contract': 'Contract',
    'temporary': 'Temporary',
    'internship': 'Internship',
    'seasonal': 'Seasonal'
  };
  const type = typeDisplayMap[job.employment_type] || job.employment_type || 'Full-time';
  
  // Format mode
  const mode = job.is_remote ? 'Remote' : 'On-site';
  
  // Format salary
  const minSal = job.salary_min || job.salaryMin;
  const maxSal = job.salary_max || job.salaryMax;
  const period = job.salary_period || job.salaryPeriod || 'yearly';
  let salaryLabel = 'Salary not specified';
  if (minSal && maxSal) {
    salaryLabel = `$${minSal.toLocaleString('en-CA')} - $${maxSal.toLocaleString('en-CA')} / ${period}`;
  } else if (minSal) {
    salaryLabel = `$${minSal.toLocaleString('en-CA')} / ${period}`;
  }

  // Logo Color & Initials
  const colors = ['#0E5D4E', '#0A1F3D', '#F2B705', '#17A24A', '#7C3AED', '#DB2777'];
  const hash = companyName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const logoColor = colors[hash % colors.length];
  const initials = companyName
    .split(/\s+/)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const city = job.city || '';
  const province = job.province || '';
  const location = city && province ? `${city}, ${province}` : (city || province || 'Canada');

  // Slugify employer, type, city
  const employerSlug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const typeSlug = (job.employment_type || 'full-time').replace('_', '-');
  const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Parse postedDate
  const dateObj = new Date(job.published_at || job.created_at || Date.now());
  const postedDate = dateObj.toISOString().split('T')[0];

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
  };

}
