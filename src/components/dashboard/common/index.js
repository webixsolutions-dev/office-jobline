// Dashboard Common Components
export { default as DashboardLayout } from './DashboardLayout';
export { default as DashboardSidebar } from './DashboardSidebar';
export { default as DashboardTopbar } from './DashboardTopbar';

// UI Components
export { default as NotificationBell } from './NotificationBell';
export { default as UserMenu } from './UserMenu';
export { default as StatCard } from './StatCard';
export { default as StatusBadge, STATUS_STYLES } from './StatusBadge';
export { default as PageHeader } from './PageHeader';

// State Components
export { default as EmptyState } from './EmptyState';
export { default as LoadingState } from './LoadingState';
export { default as ErrorState } from './ErrorState';
export { default as DataState } from './DataState';

// Utility Components
export { default as VerificationBanner } from './VerificationBanner';
export { default as ConfirmModal } from './ConfirmModal';
export { default as ErrorBoundary } from './ErrorBoundary';

// Navigation
export { getSeekerNav, getRecruiterNav, getDashboardNav } from './dashboardNav';