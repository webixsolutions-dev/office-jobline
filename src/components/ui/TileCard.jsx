import { Link } from 'react-router-dom'

/**
 * Shared card shell for category, employer, and city tiles.
 * @param {string} [to]
 * @param {Function} [onClick]
 */
export default function TileCard({ to, onClick, children, className = '', as: Tag = 'article' }) {
  const classes = [
    'rounded-xl bg-white p-5 shadow-card transition hover:shadow-md',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
    to || onClick ? 'block h-full' : '',
    className,
  ].join(' ')

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${classes} w-full text-left`}>
        {children}
      </button>
    )
  }

  return <Tag className={classes}>{children}</Tag>
}
