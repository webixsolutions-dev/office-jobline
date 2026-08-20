import { useId, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

/**
 * Labeled text input with optional left icon and password visibility toggle.
 * @param {string} label
 * @param {string} [name]
 * @param {string} [type]
 * @param {string} [value]
 * @param {Function} [onChange]
 * @param {string} [placeholder]
 * @param {boolean} [required]
 * @param {string} [error]
 * @param {React.ComponentType} [icon]
 * @param {boolean} [showToggle] show/hide control when type is password
 */
export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  icon: Icon,
  showToggle = false,
  id,
  autoComplete,
  className = '',
}) {
  const reactId = useId()
  const inputId = id || `${reactId}-${name || 'input'}`
  const errorId = `${inputId}-error`
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showToggle ? (visible ? 'text' : 'password') : type

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-muted">
          {label}
          {required && (
            <span className="ml-0.5 text-red-700" aria-hidden>
              *
            </span>
          )}
        </label>
      )}
      <div
        className={`flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 ${
          error ? 'border-red-400' : 'border-border'
        }`}
      >
        {Icon && <Icon className="h-4 w-4 shrink-0 text-muted" aria-hidden />}
        <input
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          className="w-full bg-transparent text-sm text-navy placeholder:text-muted/70 outline-none"
        />
        {isPassword && showToggle && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="shrink-0 text-muted hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
