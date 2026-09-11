import { FiBriefcase, FiUser } from 'react-icons/fi'

const DEFAULT_OPTIONS = [
  { value: 'job_seeker', label: 'Job Seeker', icon: FiUser },
  { value: 'employer', label: 'Employer', icon: FiBriefcase },
]

/**
 * Two-segment role toggle (Job Seeker / Employer).
 * @param {string} value
 * @param {(next: string) => void} onChange
 * @param {{ value: string, label: string, icon?: React.ComponentType }[]} [options]
 */
export default function RoleToggle({ value, onChange, options = DEFAULT_OPTIONS, name = 'role' }) {
  return (
    <div
      role="radiogroup"
      aria-label="Account type"
      className="grid grid-cols-2 gap-2 rounded-xl bg-offwhite p-1"
    >
      {options.map((option) => {
        const Icon = option.icon
        const selected = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            name={name}
            onClick={() => onChange(option.value)}
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              selected
                ? 'border border-gold bg-white text-navy shadow-sm'
                : 'border border-transparent text-muted hover:text-navy'
            }`}
          >
            {Icon && <Icon className={`h-4 w-4 ${selected ? 'text-teal' : ''}`} aria-hidden />}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
