import { FiCheck, FiArrowRight } from 'react-icons/fi'
import Button from './Button'

/**
 * Dual-purpose "For Job Seekers" / "For Employers" panel.
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
      className={`rounded-xl p-6 shadow-card sm:p-10 ${isTeal ? 'bg-teal-light' : 'bg-gold-tint'}`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${
            isTeal ? 'bg-teal text-white' : 'bg-gold text-navy'
          }`}
        >
          {Icon && <Icon className="h-8 w-8" aria-hidden />}
        </span>
        <h3
          className={`font-display text-xl font-bold sm:text-2xl ${
            isTeal ? 'text-teal' : 'text-gold-dark'
          }`}
        >
          {title}
        </h3>
      </div>

      <ul className="mt-6 space-y-3">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                isTeal ? 'bg-teal text-white' : 'bg-gold text-navy'
              }`}
            >
              <FiCheck className="h-3 w-3" aria-hidden />
            </span>
            <span className="text-sm leading-relaxed text-navy/80 sm:text-base">{point}</span>
          </li>
        ))}
      </ul>

      {ctaLabel && (
        <Button
          variant={isTeal ? 'teal' : 'gold'}
          to={ctaTo}
          icon={FiArrowRight}
          iconPosition="right"
          className="relative z-10 mt-8"
        >
          {ctaLabel}
        </Button>
      )}
    </article>
  )
}
