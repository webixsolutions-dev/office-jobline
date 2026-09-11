/** Seed job postings for the employer dashboard (extends mockJobs shape). */
export const MOCK_JOB_POSTINGS = [
  {
    id: 'emp-job-001',
    title: 'Administrative Assistant',
    status: 'Active',
    location: 'Toronto, ON',
    employmentType: 'full-time',
    salaryRange: '40-50',
    description:
      'Support daily office operations including scheduling, correspondence, and front-desk coverage. Ideal for newcomers with strong organizational skills.',
    category: 'administrative-assistant',
    companyName: 'Maple Ridge Solutions',
    postedDate: '2026-08-15',
    applicantCount: 3,
  },
  {
    id: 'emp-job-002',
    title: 'Receptionist',
    status: 'Active',
    location: 'Vancouver, BC',
    employmentType: 'part-time',
    salaryRange: '30-40',
    description:
      'Greet visitors, manage phone lines, and assist with light administrative tasks in a welcoming office environment.',
    category: 'receptionist',
    companyName: 'Maple Ridge Solutions',
    postedDate: '2026-08-10',
    applicantCount: 2,
  },
  {
    id: 'emp-job-003',
    title: 'Office Coordinator',
    status: 'Draft',
    location: 'Calgary, AB',
    employmentType: 'full-time',
    salaryRange: '50-60',
    description:
      'Coordinate office supplies, meeting schedules, and team events. Draft posting — not yet published.',
    category: 'office-manager',
    companyName: 'Maple Ridge Solutions',
    postedDate: '2026-08-22',
    applicantCount: 0,
  },
]
