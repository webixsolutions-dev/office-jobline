import { Link } from 'react-router-dom'

const variants = {
  teal: 'bg-teal text-white hover:bg-teal-dark',
  green: 'bg-green text-white hover:bg-green-dark',
  gold: 'bg-gold text-navy hover:bg-gold-dark',
  navy: 'bg-navy text-white hover:bg-navy-light',
  'navy-gold': 'bg-navy text-gold hover:bg-navy-light',
  outline: 'border-2 border-white bg-transparent text-white hover:bg-white/10',
  'outline-teal': 'border-2 border-teal bg-transparent text-teal hover:bg-teal-light',
  'outline-navy': 'border-2 border-navy bg-white text-navy hover:bg-offwhite',
  'outline-gold': 'border-2 border-gold bg-white text-navy hover:bg-gold-tint',
}

/**
 * @param {'teal' | 'green' | 'gold' | 'navy' | 'navy-gold' | 'outline' | 'outline-teal' | 'outline-navy' | 'outline-gold'} [variant]
 * @param {string} [to] React Router destination
 * @param {string} [href] Native link (anchors, mailto)
 * @param {React.ComponentType} [icon]
 * @param {'left' | 'right'} [iconPosition]
 */
export default function Button({
  variant = 'teal',
  to,
  href,
  icon: Icon,
  iconPosition = 'left',
  children,
  className = '',
  type = 'button',
  onClick,
  disabled = false,
  ...rest
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
    variants[variant] || variants.teal,
    disabled ? 'cursor-not-allowed opacity-50' : '',
    className,
  ].join(' ')

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="h-4 w-4" aria-hidden />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="h-4 w-4" aria-hidden />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} {...rest}>
      {content}
    </button>
  )
}
