import {
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiEye,
  FiStar,
  FiSend,
  FiCalendar,
  FiAward,
  FiUserCheck,
  FiSlash,
  FiPauseCircle,
} from 'react-icons/fi';

export const STATUS_STYLES = {
  pending_review: { 
    label: 'Pending Review', 
    icon: FiClock, 
    classes: 'bg-amber-50 text-amber-700 ring-amber-600/20' 
  },
  active: { 
    label: 'Active', 
    icon: FiCheckCircle, 
    classes: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' 
  },
  closed: { 
    label: 'Closed', 
    icon: FiPauseCircle, 
    classes: 'bg-slate-100 text-slate-600 ring-slate-500/20' 
  },
  expired: { 
    label: 'Expired', 
    icon: FiClock, 
    classes: 'bg-slate-100 text-slate-600 ring-slate-500/20' 
  },
  removed: { 
    label: 'Removed', 
    icon: FiXCircle, 
    classes: 'bg-rose-50 text-rose-700 ring-rose-600/20' 
  },
  submitted: { 
    label: 'Submitted', 
    icon: FiSend, 
    classes: 'bg-amber-50 text-amber-700 ring-amber-600/20' 
  },
  viewed: { 
    label: 'Viewed', 
    icon: FiEye, 
    classes: 'bg-amber-50 text-amber-700 ring-amber-600/20' 
  },
  shortlisted: { 
    label: 'Shortlisted', 
    icon: FiStar, 
    classes: 'bg-amber-50 text-amber-700 ring-amber-600/20' 
  },
  interviewing: { 
    label: 'Interviewing', 
    icon: FiCalendar, 
    classes: 'bg-amber-50 text-amber-700 ring-amber-600/20' 
  },
  offered: { 
    label: 'Offered', 
    icon: FiAward, 
    classes: 'bg-amber-50 text-amber-700 ring-amber-600/20' 
  },
  hired: { 
    label: 'Hired', 
    icon: FiUserCheck, 
    classes: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' 
  },
  rejected: { 
    label: 'Rejected', 
    icon: FiXCircle, 
    classes: 'bg-rose-50 text-rose-700 ring-rose-600/20' 
  },
  withdrawn: { 
    label: 'Withdrawn', 
    icon: FiSlash, 
    classes: 'bg-slate-100 text-slate-600 ring-slate-500/20' 
  },
  pending: { 
    label: 'Pending Verification', 
    icon: FiClock, 
    classes: 'bg-amber-50 text-amber-700 ring-amber-600/20' 
  },
  verified: { 
    label: 'Verified', 
    icon: FiCheckCircle, 
    classes: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' 
  },
  suspended: { 
    label: 'Suspended', 
    icon: FiXCircle, 
    classes: 'bg-rose-50 text-rose-700 ring-rose-600/20' 
  },
};

const SIZE_CLASSES = {
  sm: 'px-2 py-0.5 text-[11px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
};

export default function StatusBadge({ 
  status, 
  size = 'md', 
  showIcon = true, 
  className = '' 
}) {
  const config = STATUS_STYLES[status] || {
    label: status || 'Unknown',
    icon: FiClock,
    classes: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  };
  
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ring-1 ring-inset ${config.classes} ${SIZE_CLASSES[size]} ${className}`}
    >
      {showIcon && <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />}
      {config.label}
    </span>
  );
}