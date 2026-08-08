export default function FilterChip({
  label,
  count,
  isActive,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
        isActive
          ? 'bg-navy-950 text-white'
          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
      }`}
    >
      {label} ({count})
    </button>
  );
}