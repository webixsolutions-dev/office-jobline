/**
 * Small toggle pill used under the Browse Jobs hero.
 * @param {boolean} active
 */
export default function FilterPill({ icon: Icon, label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
        active
          ? 'border-teal bg-teal-light text-teal'
          : 'border-border bg-white text-muted hover:border-teal hover:text-teal'
      } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden />}
      {label}
    </button>
  )
}
