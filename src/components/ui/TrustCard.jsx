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
        className="pointer-events-none absolute -right-6 -bottom-8 h-16 w-16 text-navy/[0.04]"
        aria-hidden
      />
      <p className="relative z-10 text-sm text-muted">{title}</p>
      <div className="relative z-10 mt-2 flex items-center gap-2">
        <div className="flex text-gold" aria-label={`${rating} out of 5 stars`}>
          <FaStar aria-hidden />
          <FaStar aria-hidden />
          <FaStar aria-hidden />
          <FaStar aria-hidden />
          <FaStarHalfAlt aria-hidden />
        </div>
        <span className="text-sm font-semibold text-navy">{rating}</span>
      </div>
      {caption && <p className="relative z-10 mt-1 pr-8 text-sm text-muted">{caption}</p>}
    </article>
  )
}
