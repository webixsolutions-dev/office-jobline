import { FiBriefcase, FiGlobe, FiHome } from 'react-icons/fi';

export default function CompanyProfile({
  formData,
  isEditing,
  onChange,
  isVerified,
  isPending,
  isRejected,
  onResubmit,
}) {
  const getVerificationBadge = () => {
    if (isVerified) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Verified
        </span>
      );
    }
    if (isPending) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          Pending Verification
        </span>
      );
    }
    if (isRejected) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
          Rejected
        </span>
      );
    }
    return null;
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h4 className="mb-4 font-display text-base font-semibold text-navy-950">
        <FiHome className="inline mr-2 h-5 w-5" />
        Company Profile
      </h4>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            <FiBriefcase className="inline mr-1.5 h-4 w-4" />
            Company Name *
          </label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name || ''}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            <FiGlobe className="inline mr-1.5 h-4 w-4" />
            Website *
          </label>
          <input
            type="url"
            name="company_website"
            value={formData.company_website || ''}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Registration Number *
          </label>
          <input
            type="text"
            name="company_registration_number"
            value={formData.company_registration_number || ''}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Verification Status
          </label>
          <div className="flex items-center gap-2 pt-1.5">
            {getVerificationBadge()}
            {isRejected && isEditing && (
              <button
                type="button"
                onClick={onResubmit}
                className="rounded-md bg-navy-950 px-3 py-1 text-xs font-semibold text-white hover:bg-navy-800"
              >
                Resubmit
              </button>
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Company Description
          </label>
          <textarea
            name="company_description"
            value={formData.company_description || ''}
            onChange={onChange}
            disabled={!isEditing}
            rows={3}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-500"
            placeholder="Tell us about your company..."
          />
        </div>
      </div>
    </div>
  );
}