export const NOTIFICATION_TYPES = {
  all: 'All Notifications',
  application: 'Applications',
  job: 'Jobs',
  company: 'Company',
};

export const MOCK_SEEKER_NOTIFICATIONS = [
  {
    id: 1,
    user_id: 'user_123',
    type: 'application.viewed',
    site_id: 1,
    entity_type: 'application',
    entity_id: 'app_001',
    payload: { 
      message: 'Your application for Senior React Developer has been viewed.' 
    },
    read_at: null,
    created_at: '2026-07-18T10:30:00Z',
  },
  {
    id: 2,
    user_id: 'user_123',
    type: 'job.recommendation',
    site_id: 2,
    entity_type: 'job',
    entity_id: 'job_002',
    payload: { 
      message: 'New job recommendation: UX Designer at Design Studio.' 
    },
    read_at: null,
    created_at: '2026-07-18T08:15:00Z',
  },
  {
    id: 3,
    user_id: 'user_123',
    type: 'application.shortlisted',
    site_id: 1,
    entity_type: 'application',
    entity_id: 'app_003',
    payload: { 
      message: 'Your application for Full Stack Developer was shortlisted.' 
    },
    read_at: null,
    created_at: '2026-07-17T16:45:00Z',
  },
  {
    id: 4,
    user_id: 'user_123',
    type: 'application.status_changed',
    site_id: 1,
    entity_type: 'application',
    entity_id: 'app_004',
    payload: { 
      message: 'Your application for Product Manager is now being reviewed.' 
    },
    read_at: '2026-07-17T14:20:00Z',
    created_at: '2026-07-17T13:00:00Z',
  },
  {
    id: 5,
    user_id: 'user_123',
    type: 'job.expiring',
    site_id: 1,
    entity_type: 'job',
    entity_id: 'job_005',
    payload: { 
      message: 'Your saved job "DevOps Engineer" is expiring soon.' 
    },
    read_at: '2026-07-16T09:00:00Z',
    created_at: '2026-07-16T08:00:00Z',
  },
];