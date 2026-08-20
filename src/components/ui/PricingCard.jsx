import { FiCheck } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'
import Button from './Button'

function featureLabel(feature) {
  return typeof feature === 'string' ? feature : feature.label
}

function featureBadge(feature) {
  return typeof feature === 'object' && feature.badge
}

/**
 * Pricing plan card.
 * @param {boolean} [featured] Most Popular ribbon + teal treatment (Employers page)
 * @param {boolean} [highlighted] Most Popular ribbon + gold treatment (Post a Job)
 * @param {'teal' | 'gold'} [accent] checkmark + outline color for non-featured cards
 * @param {string[] | { label: string, badge?: boolean }[]} [features]
 */
export default function PricingCard({
  name,
  price,
  period = '/month',
  tagline,
  features = [],
  ctaLabel,
  ctaTo,
  featured = false,
  highlighted = false,
  accent = 'teal',
}) {
  const isGold = highlighted || accent === 'gold'
  const isPopular = featured || highlighted
  const checkClass = isGold ? 'text-gold' : 'text-teal'
  const ctaVariant = highlighted ? 'gold' : featured ? 'teal' : isGold ? 'outline-navy' : 'outline-teal'

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card ${
        highlighted
          ? 'order-first border-2 border-gold lg:order-none lg:-translate-y-2'
          : featured
            ? 'order-first border-2 border-teal lg:order-none lg:-translate-y-2'
            : 'border border-border'
      }`}
    >
      {isPopular && (
        <p
          className={`py-2 text-center text-sm font-semibold ${
            highlighted ? 'bg-gold text-navy' : 'bg-teal text-white'
          }`}
        >
          Most Popular
        </p>
      )}
      <div className="flex flex-1 flex-col p-8">
        <h3 className={`font-display text-2xl font-bold ${featured && !highlighted ? 'text-teal' : 'text-navy'}`}>
          {name}
        </h3>
        <p className="mt-1 text-sm text-muted">{tagline}</p>
        <p className="mt-5 font-display text-4xl font-bold text-navy">
          {price}
          <span className="ml-1 text-base font-semibold text-muted">{period}</span>
        </p>
        <hr className="my-6 border-border" />
        <ul className="flex-1 space-y-3">
          {features.map((feature) => {
            const label = featureLabel(feature)
            return (
              <li key={label} className="flex items-start gap-2 text-sm text-navy">
                <FiCheck className={`mt-0.5 h-4 w-4 shrink-0 ${checkClass}`} aria-hidden />
                <span>{label}</span>
                {featureBadge(feature) && (
                  <FaStar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-label="Featured" />
                )}
              </li>
            )
          })}
        </ul>
        <Button variant={ctaVariant} to={ctaTo} className="mt-8 w-full">
          {ctaLabel}
        </Button>
      </div>
    </article>
  )
}
