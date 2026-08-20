import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from '../pages/Home';
import Browse from '../pages/Browse';
import Employers from '../pages/Employers';
import PostJob from '../pages/PostJob';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import PricingSection from '../components/employers/PricingSection';
import ComingSoonPage from '../pages/ComingSoonPage';

import DashboardLayout from '../components/dashboard/common/DashboardLayout';

// Job Seeker Pages - Using canonical /dashboard/* routes (R1)
import DashBoard from '../pages/dashboard/Seeker/DashBoard';
import MyApplications from '../pages/dashboard/Seeker/Applications';
import SavedJobs from '../pages/dashboard/Seeker/SavedJobs';
import ProfileSettings from '../pages/dashboard/Seeker/ProfileSetting';
import SeekerNotifications from '../pages/dashboard/Seeker/Notifications';

// Recruiter Pages - Using canonical /recruiter/* routes (R1)
import RecruiterDashboard from '../pages/dashboard/recruiter/Dashboard';
import CompanySetup from '../pages/dashboard/Recruiter/CompanySetup';
import MyJobs from '../pages/dashboard/Recruiter/MyJobs';
import PostJobRecruiter from '../pages/dashboard/recruiter/PostJob';
import Applicants from '../pages/dashboard/Recruiter/Applicants';
import CompanyProfile from '../pages/dashboard/Recruiter/CompanyProfile';
import RecruiterNotifications from '../pages/dashboard/Recruiter/Notifications';

// Mock Data - Seeker
const mockSeekerProfile = {
  full_name: 'Sarah Johnson',
  email: 'sarah@email.com',
  role: 'job_seeker',
};

const mockSeekerNotifications = [
  {
    id: 1,
    read_at: null,
    created_at: '2026-07-18T10:00:00Z',
    payload: { message: 'Your application for Senior React Developer has been viewed.' },
  },
  {
    id: 2,
    read_at: null,
    created_at: '2026-07-17T14:30:00Z',
    payload: { message: 'New job recommendation: UX Designer at Design Studio.' },
  },
  {
    id: 3,
    read_at: '2026-07-16T09:00:00Z',
    created_at: '2026-07-15T16:00:00Z',
    payload: { message: 'Your application for Full Stack Developer was shortlisted.' },
  },
];

// Mock Data - Recruiter
const mockRecruiterProfile = {
  full_name: 'John Smith',
  email: 'john@techcorp.com',
  role: 'recruiter',
  company_name: 'TechCorp Inc.',
  company_verification_status: 'verified',
};

const mockRecruiterNotifications = [
  {
    id: 1,
    read_at: null,
    created_at: '2026-07-18T10:00:00Z',
    payload: { message: 'New applicant for Senior React Developer position.' },
  },
  {
    id: 2,
    read_at: null,
    created_at: '2026-07-17T14:30:00Z',
    payload: { message: 'Your company verification was approved.' },
  },
  {
    id: 3,
    read_at: '2026-07-16T09:00:00Z',
    created_at: '2026-07-15T16:00:00Z',
    payload: { message: 'Your job "Full Stack Developer" is now active.' },
  },
];

function AppRoutes() {
  const location = useLocation();

  // Seeker Dashboard Props
  const seekerUnreadCount = mockSeekerNotifications.filter((n) => !n.read_at).length;
  const seekerDashboardProps = {
    role: 'job_seeker',
    basePath: '/dashboard',
    pageTitle: 'Dashboard',
    user: {
      name: mockSeekerProfile.full_name,
      subtitle: 'Job Seeker',
    },
    notifications: mockSeekerNotifications,
    unreadCount: seekerUnreadCount,
    onMarkRead: (id) => console.log('Mark read:', id),
    onMarkAllRead: () => console.log('Mark all read'),
    onViewAll: () => console.log('View all notifications'),
    onProfile: () => console.log('Profile'),
    onSettings: () => console.log('Settings'),
    onLogout: () => console.log('Logout'),
  };

  // Recruiter Dashboard Props
  const recruiterUnreadCount = mockRecruiterNotifications.filter((n) => !n.read_at).length;
  const recruiterDashboardProps = {
    role: 'recruiter',
    basePath: '/recruiter',
    pageTitle: 'Dashboard',
    user: {
      name: mockRecruiterProfile.full_name,
      subtitle: mockRecruiterProfile.company_name,
    },
    notifications: mockRecruiterNotifications,
    unreadCount: recruiterUnreadCount,
    onMarkRead: (id) => console.log('Mark read:', id),
    onMarkAllRead: () => console.log('Mark all read'),
    onViewAll: () => console.log('View all notifications'),
    onProfile: () => console.log('Profile'),
    onSettings: () => console.log('Settings'),
    onLogout: () => console.log('Logout'),
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/browse/cities" element={<ComingSoonPage title="Browse by City" />} />
        <Route path="/browse/:id/apply" element={<ComingSoonPage title="Apply for this job" />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/jobs/:id/apply" element={<ComingSoonPage title="Apply for this job" />} />
        <Route path="/jobs" element={<Navigate to={`/browse${location.search}`} replace />} />
        <Route path="/employers/:slug" element={<ComingSoonPage title="Employer Profile" />} />
        <Route path="/employers" element={<Employers />} />
        <Route path="/job-alerts" element={<ComingSoonPage title="Job Alerts" />} />
        <Route path="/upload-resume" element={<ComingSoonPage title="Upload Your Resume" />} />
        <Route path="/career-tips/:slug" element={<ComingSoonPage title="Career Tips" />} />
        <Route path="/resources/:slug" element={<ComingSoonPage title="Career Resource" />} />
        <Route path="/contact" element={<Navigate to={`/contact-us${location.search}${location.hash}`} replace />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/signin" element={<Navigate to="/sign-in" replace />} />
        <Route path="/sign-up" element={<ComingSoonPage title="Sign Up" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ComingSoonPage title="Forgot Password" />} />
        <Route path="/post-a-job/create" element={<ComingSoonPage title="Create a Job Posting" />} />
        <Route path="/post-a-job" element={<PostJob />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/pricing" element={<PricingSection />} />
        <Route path="/why-hire-with-us" element={<ComingSoonPage title="Why Hire With Us" />} />
        <Route path="/talent-search" element={<ComingSoonPage title="Talent Search" />} />
        <Route path="/browse-resumes" element={<ComingSoonPage title="Browse Resumes" />} />
        <Route path="/recruitment-solutions" element={<ComingSoonPage title="Recruitment Solutions" />} />
        <Route path="/employer-resources" element={<ComingSoonPage title="Employer Resources" />} />
        <Route path="/career-advice" element={<ComingSoonPage title="Career Advice" />} />
        <Route path="/privacy-policy" element={<ComingSoonPage title="Privacy Policy" />} />
        <Route path="/terms-of-service" element={<ComingSoonPage title="Terms of Use" />} />
        <Route path="/accessibility" element={<ComingSoonPage title="Accessibility" />} />
        <Route path="/sitemap" element={<ComingSoonPage title="Sitemap" />} />

        {/* Job Seeker Dashboard Routes - /dashboard/* */}
        <Route path="/dashboard" element={<DashboardLayout {...seekerDashboardProps} />}>
          <Route index element={<DashBoard />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="saved-jobs" element={<SavedJobs />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="notifications" element={<SeekerNotifications />} />
        </Route>

        {/* Recruiter Dashboard Routes - /recruiter/* */}
        <Route path="/recruiter" element={<DashboardLayout {...recruiterDashboardProps} />}>
          <Route index element={<RecruiterDashboard />} />
          <Route path="company-setup" element={<CompanySetup />} />
          <Route path="jobs" element={<MyJobs />} />
          <Route path="jobs/new" element={<PostJobRecruiter />} />
          <Route path="jobs/:id/edit" element={<PostJobRecruiter />} />
          <Route path="/recruiter/applicants" element={<Applicants />} />
          <Route path="company" element={<CompanyProfile />} />
          <Route path="notifications" element={<RecruiterNotifications />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;