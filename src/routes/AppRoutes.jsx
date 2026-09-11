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

import SeekerDashboardLayout from '../components/dashboard/SeekerDashboardLayout';
import EmployerDashboardLayout from '../components/dashboard/EmployerDashboardLayout';
import RequireAuth from '../components/dashboard/RequireAuth';
import RequireEmployerAuth from '../components/dashboard/RequireEmployerAuth';

// Job Seeker Dashboard v2 pages
import OverviewPage from '../pages/dashboard/OverviewPage';
import FindJobsPage from '../pages/dashboard/FindJobsPage';
import MyApplicationsPage from '../pages/dashboard/MyApplicationsPage';
import SavedJobsPage from '../pages/dashboard/SavedJobsPage';
import MyProfilePage from '../pages/dashboard/MyProfilePage';
import NotificationsPage from '../pages/dashboard/NotificationsPage';

// Employer Dashboard pages
import EmployerOverviewPage from '../pages/employerDashboard/EmployerOverviewPage';
import JobPostingsPage from '../pages/employerDashboard/JobPostingsPage';
import PostJobDashboardPage from '../pages/employerDashboard/PostJobDashboardPage';
import JobApplicantsPage from '../pages/employerDashboard/JobApplicantsPage';
import AllApplicantsPage from '../pages/employerDashboard/AllApplicantsPage';
import CompanyProfilePage from '../pages/employerDashboard/CompanyProfilePage';
import EmployerSettingsPage from '../pages/employerDashboard/EmployerSettingsPage';

function AppRoutes() {
  const location = useLocation();

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
        <Route path="/terms-of-use" element={<Navigate to="/terms-of-service" replace />} />
        <Route path="/cookie-policy" element={<ComingSoonPage title="Cookie Policy" />} />
        <Route path="/accessibility" element={<ComingSoonPage title="Accessibility" />} />
        <Route path="/sitemap" element={<ComingSoonPage title="Sitemap" />} />

        {/* Job Seeker Dashboard Routes - /dashboard/* (v2) */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <SeekerDashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/dashboard/overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="find-jobs" element={<FindJobsPage />} />
          <Route path="applications" element={<MyApplicationsPage />} />
          <Route path="saved-jobs" element={<SavedJobsPage />} />
          <Route path="profile" element={<MyProfilePage />} />
          <Route path="settings" element={<Navigate to="/dashboard/profile" replace />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* Employer Dashboard Routes - /employer-dashboard/* */}
        <Route
          path="/employer-dashboard"
          element={
            <RequireEmployerAuth>
              <EmployerDashboardLayout />
            </RequireEmployerAuth>
          }
        >
          <Route index element={<Navigate to="/employer-dashboard/overview" replace />} />
          <Route path="overview" element={<EmployerOverviewPage />} />
          <Route path="job-postings" element={<JobPostingsPage />} />
          <Route path="post-a-job" element={<PostJobDashboardPage />} />
          <Route path="job-postings/:jobId/applicants" element={<JobApplicantsPage />} />
          <Route path="applicants" element={<AllApplicantsPage />} />
          <Route path="company-profile" element={<CompanyProfilePage />} />
          <Route path="settings" element={<EmployerSettingsPage />} />
        </Route>

        {/* Legacy recruiter routes redirect to employer dashboard */}
        <Route path="/recruiter/*" element={<Navigate to="/employer-dashboard/overview" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;
