import { FiTrash2 } from 'react-icons/fi';
import StatusBadge from '../../../components/dashboard/common/StatusBadge';

export default function ApplicationRow({
  application,
  canWithdraw,
  onWithdraw,
  formatDate,
  getJobStatusDisplay,
}) {
  const isWithdrawable = canWithdraw ? canWithdraw(application.status) : false;
  const jobStatusLabel = getJobStatusDisplay ? getJobStatusDisplay(application.job_status) : null;

  return (
    <tr className="hover:bg-slate-50/60 transition-colors">
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-navy-950">
            {application.job_title}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-sm text-slate-500">{application.company_name}</span>
            {jobStatusLabel}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-slate-600">{application.applied_via_site_id === 1 ? 'Office Jobline' : 'Partner Site'}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-slate-600">
          {formatDate ? formatDate(application.applied_date) : application.applied_date}
        </span>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={application.status} size="sm" />
      </td>
      <td className="px-6 py-4 text-right">
        {isWithdrawable && (
          <button
            onClick={() => onWithdraw(application.id)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-rose-600 hover:text-rose-800 transition-colors"
          >
            <FiTrash2 size={15} />
            Withdraw
          </button>
        )}
        {application.status === 'withdrawn' && (
          <span className="text-xs text-slate-400 font-medium">Withdrawn</span>
        )}
        {application.status === 'rejected' && (
          <span className="text-xs text-slate-400">—</span>
        )}
        {application.status === 'hired' && (
          <span className="text-xs font-semibold text-emerald-600">Hired</span>
        )}
      </td>
    </tr>
  );
}