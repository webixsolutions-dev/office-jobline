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
  const checkWrap = isGold ? 'bg-gold-tint text-gold-dark' : 'bg-teal-light text-teal'
  const ctaVariant = highlighted ? 'gold' : featured ? 'teal' : isGold ? 'outline-navy' : 'outline-teal'

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl bg-white transition duration-200 ${
        highlighted
          ? 'order-first z-10 border-2 border-gold shadow-xl lg:order-none lg:-translate-y-3'
          : featured
            ? 'order-first z-10 border-2 border-teal shadow-xl lg:order-none lg:-translate-y-3'
            : 'border border-border shadow-card hover:-translate-y-1 hover:shadow-lg'
      }`}
    >
      {isPopular && (
        <p
          className={`py-2.5 text-center text-sm font-semibold ${
            highlighted
              ? 'bg-gold text-xs font-bold uppercase tracking-[0.14em] text-navy'
              : 'bg-teal text-white'
          }`}
        >
          Most Popular
        </p>
      )}
      <div className="flex flex-1 flex-col p-8 sm:p-9">
        <h3 className={`font-display text-2xl font-bold ${featured && !highlighted ? 'text-teal' : 'text-navy'}`}>
          {name}
        </h3>
        <p className="mt-2 min-h-[2.5rem] text-sm leading-relaxed text-muted">{tagline}</p>
        <p className="mt-6 flex items-end gap-1 font-display text-5xl font-bold tracking-tight text-navy">
          {price}
          <span className="mb-1 text-base font-semibold text-muted">{period}</span>
        </p>
        <hr className="my-7 border-border" />
        <ul className="flex-1 space-y-3.5">
          {features.map((feature) => {
            const label = featureLabel(feature)
            return (
              <li key={label} className="flex items-start gap-3 text-sm text-navy">
                <span
                  className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${checkWrap}`}
                >
                  <FiCheck className="h-3 w-3" aria-hidden />
                </span>
                <span className="leading-relaxed">{label}</span>
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
