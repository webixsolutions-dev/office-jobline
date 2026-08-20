import { FaQuoteLeft, FaStar } from 'react-icons/fa'
import IconCircle from './IconCircle'

/**
 * Testimonial card.
 * @param {'person' | 'company'} [variant] company renders a logo block instead of a circular avatar
 * @param {boolean} [showRating] star row; default true for person/company, false when omitted with initials quotes
 * @param {{ type: 'photo', src: string } | { type: 'initials', initials: string, color?: 'navy' | 'teal' }} [avatar]
 * @param {'light' | 'glass'} [theme] glass is for overlays (Sign In)
 */
export default function TestimonialCard({
  image,
  name,
  location,
  quote,
  variant = 'person',
  companyLogo: Logo,
  logoClassName = 'text-teal',
  avatar,
  showRating = true,
  theme = 'light',
}) {
  const isGlass = theme === 'glass'
  const stars = showRating ? (
    <div className={`flex gap-0.5 ${isGlass ? 'text-gold' : 'text-gold'}`} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} className="h-3.5 w-3.5" aria-hidden />
      ))}
    </div>
  ) : null

  const initialsColor =
    avatar?.color === 'teal' ? 'bg-teal text-white' : 'bg-navy text-white'

  const avatarNode = (() => {
    if (avatar?.type === 'initials') {
      return (
        <span
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${initialsColor}`}
          aria-hidden
        >
          {avatar.initials}
        </span>
      )
    }
    const src = avatar?.type === 'photo' ? avatar.src : image
    if (src) {
      return (
        <img
          src={src}
          alt={name}
          className="h-12 w-12 shrink-0 rounded-full object-cover object-top sm:h-14 sm:w-14"
        />
      )
    }
    return null
  })()

  if (variant === 'company') {
    return (
      <article className="rounded-xl bg-white p-6 shadow-card sm:p-8">
        <IconCircle icon={FaQuoteLeft} color="teal-solid" size="sm" />
        {stars && <div className="mt-3">{stars}</div>}
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

  if (isGlass) {
    return (
      <article className="max-w-md rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-md">
        {stars && <div className="mb-3">{stars}</div>}
        <p className="text-sm italic leading-relaxed text-white/90 sm:text-base">"{quote}"</p>
        <div className="mt-4 flex items-center gap-3">
          {avatarNode}
          <div>
            <p className="font-display text-sm font-bold text-white">{name}</p>
            <p className="text-xs text-white/70">{location}</p>
          </div>
        </div>
      </article>
    )
  }

  if (avatar?.type === 'initials' || (avatar && !image && variant === 'person')) {
    return (
      <article className="rounded-xl bg-white p-6 shadow-card sm:p-8">
        <FaQuoteLeft className="h-7 w-7 text-gold" aria-hidden />
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">"{quote}"</p>
        <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
          {avatarNode}
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
        src={avatar?.type === 'photo' ? avatar.src : image}
        alt={name}
        className="h-16 w-16 shrink-0 rounded-full object-cover object-top sm:h-[72px] sm:w-[72px]"
      />
      <div>
        <p className="text-sm italic leading-relaxed text-muted sm:text-base">"{quote}"</p>
        {stars && <div className="mt-3">{stars}</div>}
        <p className="mt-2 font-display text-sm font-bold text-navy">{name}</p>
        <p className="text-xs text-muted">{location}</p>
      </div>
    </article>
  )
}
