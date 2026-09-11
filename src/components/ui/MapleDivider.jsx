import { GiMapleLeaf } from 'react-icons/gi'
import { FaQuoteLeft } from 'react-icons/fa'

/**
 * Thin gold line with a centered icon, used as a section break.
 * @param {'leaf' | 'quote'} [variant]
 */
export default function MapleDivider({ variant = 'leaf', className = '' }) {
  const Icon = variant === 'quote' ? FaQuoteLeft : GiMapleLeaf

  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-gold" />
      <Icon className={variant === 'quote' ? 'h-6 w-6 text-gold' : 'h-5 w-5 text-gold'} />
      <span className="h-px flex-1 bg-gold" />
    </div>
  )
}
