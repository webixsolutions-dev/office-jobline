import { FiEdit2 } from 'react-icons/fi';

export default function ProfileHeader({
  fullName,
  initials,
  isRecruiter,
  formatDate,
  created_at,
  isEditing,
  onEdit,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy-950 text-xl font-bold text-white">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-display text-lg font-semibold text-navy-950">
              {fullName}
            </h3>
            <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-medium text-slate-600">
              {isRecruiter ? 'Recruiter' : 'Job Seeker'}
            </span>
            {isRecruiter && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Verified
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500">
            Member since {formatDate(created_at)}
          </p>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-2 rounded-md bg-navy-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-800"
          >
            <FiEdit2 className="h-4 w-4" />
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}