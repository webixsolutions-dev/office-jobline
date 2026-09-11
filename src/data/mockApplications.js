/**
 * Seed applications for the Job Seeker Dashboard (frontend-only mock data).
 * Status values match ApplicationStatusBadge labels.
 */
export const MOCK_APPLICATIONS = [
  {
    id: 'app-001',
    jobId: 'admin-maple-ridge',
    title: 'Administrative Assistant',
    company: 'Maple Ridge Solutions',
    location: 'Toronto, ON',
    status: 'Applied',
    dateApplied: '2026-08-20',
  },
  {
    id: 'app-002',
    jobId: 'receptionist-northstar',
    title: 'Front Desk Receptionist',
    company: 'Northstar Offices',
    location: 'Toronto, ON',
    status: 'In Review',
    dateApplied: '2026-08-15',
  },
  {
    id: 'app-003',
    jobId: 'office-mgr-harbour',
    title: 'Office Manager',
    company: 'Harbour Lane Group',
    location: 'Vancouver, BC',
    status: 'Interview',
    dateApplied: '2026-08-05',
  },
]
