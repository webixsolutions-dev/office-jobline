import { FiCheck, FiArrowRight } from 'react-icons/fi'
import Button from './Button'

/**
 * Dual-purpose "For Job Seekers" / "For Employers" panel.
 * Icon on the left; title, list, and CTA stacked on the right.
 * @param {'teal' | 'gold'} theme
 */
export default function ChecklistCard({
  theme = 'teal',
  icon: Icon,
  title,
  points = [],
  ctaLabel,
  ctaTo,
}) {
  const isTeal = theme === 'teal'

  return (
    <article
      className={`flex items-start gap-5 rounded-2xl p-6 shadow-card sm:gap-6 sm:p-8 ${
        isTeal ? 'bg-teal-light' : 'bg-gold-tint'
      }`}
    >
      <span
        className={`inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${
          isTeal ? 'bg-white/70 text-teal' : 'bg-white/70 text-gold-dark'
        }`}
      >
        {Icon && <Icon className="h-8 w-8" aria-hidden />}
      </span>

      <div className="min-w-0 flex-1">
        <h3
          className={`font-display text-xl font-bold sm:text-2xl ${
            isTeal ? 'text-teal' : 'text-gold-dark'
          }`}
        >
          {title}
        </h3>

        <ul className="mt-4 space-y-2.5">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  isTeal ? 'bg-teal text-white' : 'bg-gold text-navy'
                }`}
              >
                <FiCheck className="h-3 w-3" aria-hidden />
              </span>
              <span className="text-sm leading-snug text-navy/80 sm:text-base">{point}</span>
            </li>
          ))}
        </ul>

        {ctaLabel && (
          <Button
            variant={isTeal ? 'teal' : 'gold'}
            to={ctaTo}
            icon={FiArrowRight}
            iconPosition="right"
            className="relative z-10 mt-6"
          >
            {ctaLabel}
          </Button>
        )}
      </div>
    </article>
  )
}
