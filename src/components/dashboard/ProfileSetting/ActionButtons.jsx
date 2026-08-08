import { FiSave } from 'react-icons/fi';

export default function ActionButtons({
  isSaving,
  onSave,
  onCancel,
}) {
  return (
    <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6">
      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="inline-flex items-center gap-2 rounded-md bg-navy-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FiSave className="h-4 w-4" />
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
      <button
        type="button"
        onClick={onCancel}
        disabled={isSaving}
        className="rounded-md border border-slate-200 px-6 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
      >
        Cancel
      </button>
    </div>
  );
}