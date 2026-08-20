import { FaQuoteLeft, FaStar } from 'react-icons/fa'
import IconCircle from './IconCircle'

/**
 * Testimonial card.
 * @param {'person' | 'company'} [variant] company renders a logo block instead of a circular avatar
 */
export default function TestimonialCard({
  image,
  name,
  location,
  quote,
  variant = 'person',
  companyLogo: Logo,
  logoClassName = 'text-teal',
}) {
  const stars = (
    <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} className="h-3.5 w-3.5" aria-hidden />
      ))}
    </div>
  )

  if (variant === 'company') {
    return (
      <article className="rounded-xl bg-white p-6 shadow-card sm:p-8">
        <IconCircle icon={FaQuoteLeft} color="teal-solid" size="sm" />
        <div className="mt-3">{stars}</div>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">"{quote}"</p>
        <div className="mt-6 flex items-center gap-3">
          {Logo && <Logo className={`h-8 w-8 shrink-0 ${logoClassName}`} aria-hidden />}
          <div>
            <p className="font-display text-sm font-bold text-navy">{name}</p>
            <p className="text-xs text-muted">{location}</p>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-card sm:gap-5 sm:p-8">
      <img
        src={image}
        alt={name}
        className="h-16 w-16 shrink-0 rounded-full object-cover object-top sm:h-[72px] sm:w-[72px]"
      />
      <div>
        <p className="text-sm italic leading-relaxed text-muted sm:text-base">"{quote}"</p>
        <div className="mt-3">{stars}</div>
        <p className="mt-2 font-display text-sm font-bold text-navy">{name}</p>
        <p className="text-xs text-muted">{location}</p>
      </div>
    </article>
  )
}
