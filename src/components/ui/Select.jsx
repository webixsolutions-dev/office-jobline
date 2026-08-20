import { useId } from 'react'
import { FiChevronDown } from 'react-icons/fi'

/**
 * Labeled native select with optional left icon.
 * @param {string} label
 * @param {{ value: string, label: string }[]} options
 * @param {string} [placeholder]
 * @param {string} [error]
 * @param {React.ComponentType} [icon]
 */
export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select',
  required = false,
  error,
  icon: Icon,
  id,
  className = '',
}) {
  const reactId = useId()
  const selectId = id || `${reactId}-${name || 'select'}`
  const errorId = `${selectId}-error`

  return (
    <div className={className}>
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-muted">
          {label}
          {required && (
            <span className="ml-0.5 text-red-700" aria-hidden>
              *
            </span>
          )}
        </label>
      )}
      <div
        className={`relative flex items-center rounded-lg border bg-white focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 ${
          error ? 'border-red-400' : 'border-border'
        }`}
      >
        {Icon && <Icon className="pointer-events-none absolute left-4 h-4 w-4 text-muted" aria-hidden />}
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`w-full appearance-none rounded-lg bg-transparent py-2.5 pr-10 text-sm outline-none ${
            Icon ? 'pl-10' : 'pl-4'
          } ${value ? 'text-navy' : 'text-muted/70'}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FiChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-muted" aria-hidden />
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
