import { FiTrash2 } from 'react-icons/fi';

export default function DangerZone({ onDelete }) {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-6">
      <h4 className="font-display text-base font-semibold text-rose-800">
        Danger Zone
      </h4>
      <p className="mt-1 text-sm text-rose-600">
        Permanently delete your account and all associated data.
      </p>
      <button
        type="button"
        onClick={onDelete}
        className="mt-4 inline-flex items-center gap-2 rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
      >
        <FiTrash2 className="h-4 w-4" />
        Delete Account
      </button>
    </div>
  );
}