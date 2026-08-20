import { FiCheck } from 'react-icons/fi'
import Button from './Button'

/**
 * Employer pricing plan card.
 * @param {boolean} [featured] Most Popular ribbon, teal border, raised treatment
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
}) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card ${
        featured
          ? 'order-first border-2 border-teal lg:order-none lg:-translate-y-2'
          : 'border border-border'
      }`}
    >
      {featured && (
        <p className="bg-teal py-2 text-center text-sm font-semibold text-white">Most Popular</p>
      )}
      <div className="flex flex-1 flex-col p-8">
        <h3 className="font-display text-2xl font-bold text-teal">{name}</h3>
        <p className="mt-1 text-sm text-muted">{tagline}</p>
        <p className="mt-5 font-display text-4xl font-bold text-navy">
          {price}
          <span className="ml-1 text-base font-semibold text-muted">{period}</span>
        </p>
        <hr className="my-6 border-border" />
        <ul className="flex-1 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-navy">
              <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          variant={featured ? 'teal' : 'outline-teal'}
          to={ctaTo}
          className="mt-8 w-full"
        >
          {ctaLabel}
        </Button>
      </div>
    </article>
  )
}
