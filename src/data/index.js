export * from './seeker/applications';
export * from './seeker/savedJobs';
export * from './seeker/notifications';
export * from './recruiter/jobs';
export * from './recruiter/applicants';
export * from './recruiter/company';
export * from './shared/taxonomy';
export * from './shared/constants';
// Seeker Data
export { FINAL_STATES, MOCK_APPLICATIONS } from './seeker/applications';
export { MOCK_SAVED_JOBS } from './seeker/savedJobs';
export { MOCK_SEEKER_NOTIFICATIONS, NOTIFICATION_TYPES } from './seeker/notifications';

// Recruiter Data
export { MOCK_JOBS } from './recruiter/jobs';
export { MOCK_APPLICANTS } from './recruiter/applicants';
export { MOCK_COMPANY } from './recruiter/company';

// Shared Data
export {
  APPLICATION_STATUSES,
  JOB_STATUSES,
  EMPLOYMENT_TYPES,
  SALARY_PERIODS,
  PROVINCES,
  VERIFICATION_STATUSES,
  USER_ROLES,
} from './shared/constants';

export {
  CATEGORIES,
  getCategoriesBySector,
  getCategoryById,
  getCategoryNameById,
  getSectors,
  getSectorByCategoryId,
} from './shared/taxonomy';