import {
  FiGrid,
  FiFileText,
  FiBookmark,
  FiUser,
  FiBell,
  FiBriefcase,
  FiUsers,
  FiHome,
} from 'react-icons/fi';

export function getSeekerNav(basePath = '/dashboard') {
  return [
    { label: 'Dashboard', to: `${basePath}`, icon: FiGrid, end: true },
    { label: 'My Applications', to: `${basePath}/applications`, icon: FiFileText },
    { label: 'Saved Jobs', to: `${basePath}/saved-jobs`, icon: FiBookmark },
    { label: 'Profile & Settings', to: `${basePath}/profile`, icon: FiUser },
    { label: 'Notifications', to: `${basePath}/notifications`, icon: FiBell },
  ];
}

export function getRecruiterNav(basePath = '/recruiter') {
  return [
    { label: 'Dashboard', to: `${basePath}`, icon: FiGrid, end: true },
    { label: 'My Jobs', to: `${basePath}/jobs`, icon: FiBriefcase },
    { label: 'Applicants', to: `${basePath}/applicants`, icon: FiUsers },
    { label: 'Company Profile', to: `${basePath}/company`, icon: FiHome },
    { label: 'Notifications', to: `${basePath}/notifications`, icon: FiBell },
  ];
}

export function getDashboardNav(role, basePath = '/dashboard') {
  if (role === 'recruiter') {
    return getRecruiterNav(basePath);
  }
  return getSeekerNav(basePath);
}