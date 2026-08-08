import { FiClock, FiXCircle, FiCheckCircle } from 'react-icons/fi';

export default function VerificationBanner({ 
  status, 
  reason, 
  onEdit, 
  companyName 
}) {
  if (status === 'verified') {
    return (
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3.5">
        <FiCheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
        <p className="text-sm font-medium text-emerald-800">
          {companyName ? `${companyName} is verified.` : 'Your company is verified.'} 
          {' '}Your jobs can go live.
        </p>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <FiXCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-rose-800">
              Verification was rejected
            </p>
            <p className="mt-1 text-sm text-rose-700">
              {reason || 'An admin rejected your company verification. Update your details and resubmit.'}
            </p>
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                className="mt-3 rounded-md bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-700"
              >
                Edit and Resubmit
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
      <FiClock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
      <p className="text-sm text-amber-800">
        <span className="font-semibold">Your company is pending verification.</span>
        {' '}You can prepare job posts, but they won't go live until you're verified.
      </p>
    </div>
  );
}