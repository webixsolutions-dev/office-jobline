import { Link } from 'react-router-dom'

const variants = {
  teal: 'bg-teal text-white hover:bg-teal-dark',
  gold: 'bg-gold text-navy hover:bg-gold-dark',
  outline: 'border-2 border-white bg-transparent text-white hover:bg-white/10',
}

/**
 * @param {'teal' | 'gold' | 'outline'} [variant]
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
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
    variants[variant] || variants.teal,
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
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
