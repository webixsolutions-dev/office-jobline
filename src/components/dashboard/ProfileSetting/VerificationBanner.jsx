import { FiClock, FiXCircle } from 'react-icons/fi';

export default function VerificationBanner({ 
  isPending, 
  isRejected, 
  rejectionReason 
}) {
  if (isPending) {
    return (
      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <FiClock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Your company is pending verification.</span>
            {' '}You can edit your profile, but some features may be limited until verification is complete.
          </p>
        </div>
      </div>
    );
  }

  if (isRejected) {
    return (
      <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <FiXCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-rose-800">Verification was rejected</p>
            <p className="mt-1 text-sm text-rose-700">
              {rejectionReason || 'Please update your company details and resubmit for verification.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}