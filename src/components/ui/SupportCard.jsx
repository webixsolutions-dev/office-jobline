import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import IconCircle from './IconCircle'

/**
 * Support article card with a "Read Tips" link.
 */
export default function SupportCard({ icon, title, description, href }) {
  return (
    <article className="rounded-xl bg-white p-6 shadow-card">
      <IconCircle icon={icon} color="teal" />
      <h3 className="mt-4 font-display text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
      <Link
        to={href}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        Read Tips <FiArrowRight aria-hidden />
      </Link>
    </article>
  )
}
