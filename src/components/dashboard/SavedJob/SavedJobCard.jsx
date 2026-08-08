import { FiTrash2, FiExternalLink } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function SavedJobCard({
  job,
  onRemove,
  formatDate,
  getJobStatusDisplay,
}) {
  const navigate = useNavigate();
  const jobStatusLabel = getJobStatusDisplay ? getJobStatusDisplay(job.jobStatus) : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-navy-950 truncate">
            {job.jobTitle}
          </h3>
          <div className="flex items-center gap-1">
            <p className="text-sm text-slate-500 truncate">{job.companyName}</p>
            {jobStatusLabel && (
              <span className="text-xs text-slate-400 font-medium ml-1.5">
                ({jobStatusLabel})
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => onRemove(job.id)}
          className="text-slate-400 hover:text-rose-600 transition-colors ml-2"
          aria-label="Remove saved job"
        >
          <FiTrash2 size={16} />
        </button>
      </div>

      <div className="mt-3 space-y-1.5">
        <p className="text-xs text-slate-500 flex items-center gap-1">
          <span className="font-medium">{job.location}</span>
          <span className="text-slate-300">·</span>
          <span>{job.employmentType}</span>
        </p>
        {job.salary && (
          <p className="text-xs font-medium text-emerald-600">
            {job.salary}
          </p>
        )}
        <p className="text-xs text-slate-400">
          Saved {formatDate ? formatDate(job.savedDate) : job.savedDate}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => navigate(`/job/${job.id}`)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md bg-navy-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-navy-800"
        >
          <FiExternalLink size={14} />
          View Job
        </button>
        {job.jobStatus === 'active' && (
          <button
            onClick={() => navigate(`/job/${job.id}/apply`)}
            className="flex-1 inline-flex items-center justify-center rounded-md border border-gold-500 px-3 py-2 text-xs font-semibold text-gold-700 transition hover:bg-gold-50"
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
}