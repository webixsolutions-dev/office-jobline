import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

/**
 * Image-top article card. The entire card is a link.
 * @param {string} to
 * @param {string} image
 * @param {string} imageAlt
 * @param {string} tag
 * @param {string} title
 * @param {string} description
 */
export default function ArticleCard({ to, image, imageAlt, tag, title, description }) {
  return (
    <Link
      to={to}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <img src={image} alt={imageAlt || title} className="h-44 w-full object-cover" />
      <div className="flex flex-1 flex-col p-6">
        {tag && (
          <span className="inline-block w-fit rounded-full bg-teal-light px-3 py-1 text-xs font-semibold text-teal">
            {tag}
          </span>
        )}
        <h3 className="mt-3 font-display text-lg font-bold text-navy">{title}</h3>
        {description && <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>}
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal group-hover:underline">
          Read More
          <FiArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </Link>
  )
}
