import { FiArrowRight } from 'react-icons/fi'
import IconCircle from './IconCircle'
import Button from './Button'

const themes = {
  teal: { bg: 'bg-teal-light', iconColor: 'teal-solid', ctaVariant: 'teal' },
  gold: { bg: 'bg-gold-tint', iconColor: 'gold-solid', ctaVariant: 'gold' },
  neutral: {
    bg: 'border border-navy/20 bg-offwhite',
    iconColor: 'navy',
    ctaVariant: 'outline-navy',
  },
}

/**
 * Rounded tinted banner: icon, heading, subtitle, and a single CTA.
 * Distinct from `Banner` (full-color navy/teal closing strips).
 * @param {'teal' | 'gold' | 'neutral'} [theme]
 * @param {string} [ctaTo] React Router destination
 * @param {string} [ctaHref] Native link
 * @param {Function} [ctaOnClick]
 * @param {string} [ctaVariant] override button variant
 */
export default function PromoBanner({
  theme = 'teal',
  icon,
  heading,
  subtitle,
  ctaLabel,
  ctaTo,
  ctaHref,
  ctaOnClick,
  ctaVariant,
  className = '',
}) {
  const palette = themes[theme] || themes.teal

  return (
    <aside
      className={`flex flex-col items-start gap-5 rounded-2xl ${palette.bg} p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${className}`}
    >
      <div className="flex items-start gap-4 sm:items-center">
        <IconCircle icon={icon} color={palette.iconColor} size="lg" />
        <div>
          <h2 className="font-display text-lg font-bold text-navy sm:text-xl">{heading}</h2>
          {subtitle && <p className="mt-1 text-sm leading-relaxed text-muted">{subtitle}</p>}
        </div>
      </div>
      {ctaLabel && (
        <Button
          variant={ctaVariant || palette.ctaVariant}
          to={ctaTo}
          href={ctaHref}
          onClick={ctaOnClick}
          icon={FiArrowRight}
          iconPosition="right"
          className="w-full shrink-0 sm:w-auto"
        >
          {ctaLabel}
        </Button>
      )}
    </aside>
  )
}
