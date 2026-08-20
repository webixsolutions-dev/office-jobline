import Button from './Button'
import { FiArrowRight } from 'react-icons/fi'

/**
 * Reusable 50/50 split hero with a full-bleed image column.
 * @param {'left' | 'right'} [imagePosition]
 */
export default function SplitHero({
  heading,
  eyebrow,
  paragraphs = [],
  ctaLabel,
  ctaHref,
  ctaTo,
  imageUrl,
  imageAlt = '',
  imagePosition = 'right',
}) {
  const imageOrder =
    imagePosition === 'left' ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
  const textOrder =
    imagePosition === 'left' ? 'order-2 lg:order-2' : 'order-2 lg:order-1'

  const imageCol = (
    <div className={`h-80 w-full self-stretch sm:h-[320px] lg:h-auto lg:min-h-[520px] ${imageOrder}`}>
      <img
        src={imageUrl}
        alt={imageAlt}
        className="h-full w-full object-cover"
      />
    </div>
  )

  const textCol = (
    <div className={`flex items-center bg-offwhite ${textOrder}`}>
      <div className="mx-auto w-full max-w-xl px-6 py-14 sm:px-10 lg:ml-auto lg:mr-8 lg:px-16 lg:py-20">
        <h1 className="font-display text-4xl font-bold leading-tight text-navy sm:text-5xl">
          {heading}
        </h1>
        {eyebrow && (
          <p className="mt-4 text-lg font-semibold text-teal">{eyebrow}</p>
        )}
        {paragraphs.map((p) => (
          <p key={p} className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            {p}
          </p>
        ))}
        {ctaLabel && (
          <Button
            variant="teal"
            href={ctaHref}
            to={ctaTo}
            icon={FiArrowRight}
            iconPosition="right"
            className="mt-8"
          >
            {ctaLabel}
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {imageCol}
      {textCol}
    </section>
  )
}
