import { FaStar } from 'react-icons/fa'

/**
 * Testimonial card with circular avatar, quote, stars, and attribution.
 */
export default function TestimonialCard({ image, name, location, quote }) {
  return (
    <article className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-card sm:gap-5 sm:p-8">
      <img
        src={image}
        alt={name}
        className="h-16 w-16 shrink-0 rounded-full object-cover object-top sm:h-[72px] sm:w-[72px]"
      />
      <div>
        <p className="text-sm italic leading-relaxed text-muted sm:text-base">"{quote}"</p>
        <div className="mt-3 flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} className="h-3.5 w-3.5" aria-hidden />
          ))}
        </div>
        <p className="mt-2 font-display text-sm font-bold text-navy">{name}</p>
        <p className="text-xs text-muted">{location}</p>
      </div>
    </article>
  )
}
