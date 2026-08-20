import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { GiMapleLeaf } from 'react-icons/gi'

/**
 * Distinct stats-strip card with rating row and maple-leaf watermark.
 * @param {string} [title]
 * @param {string} [rating]
 * @param {string} [caption]
 */
export default function TrustCard({
  title = 'Trusted by job seekers across Canada',
  rating = '4.6/5',
  caption = 'Based on thousands of reviews',
}) {
  return (
    <article className="relative flex flex-col justify-center overflow-hidden rounded-xl bg-offwhite p-6">
      <GiMapleLeaf
        className="pointer-events-none absolute -right-2 -bottom-4 h-24 w-24 text-navy/5"
        aria-hidden
      />
      <p className="text-sm text-muted">{title}</p>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex text-gold" aria-label={`${rating} out of 5 stars`}>
          <FaStar aria-hidden />
          <FaStar aria-hidden />
          <FaStar aria-hidden />
          <FaStar aria-hidden />
          <FaStarHalfAlt aria-hidden />
        </div>
        <span className="text-sm font-semibold text-navy">{rating}</span>
      </div>
      {caption && <p className="mt-1 text-sm text-muted">{caption}</p>}
    </article>
  )
}
