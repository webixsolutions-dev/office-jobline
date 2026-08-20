import Button from './Button'
import { FiArrowRight } from 'react-icons/fi'

/**
 * Reusable 50/50 split hero with a full-bleed image column.
 * @param {'left' | 'right'} [imagePosition]
 * @param {'before' | 'after'} [eyebrowPlacement] default `after` keeps About Us unchanged
 * @param {{ label: string, to?: string, href?: string, variant?: string, icon?: object, iconPosition?: string }} [secondaryCta]
 * @param {import('react').ReactNode} [overlay] Optional bar (e.g. SearchBar) that floats across the text/image seam on desktop
 */
export default function SplitHero({
  heading,
  eyebrow,
  eyebrowPlacement = 'after',
  eyebrowClassName = 'mt-4 text-lg font-semibold text-teal',
  paragraphs = [],
  ctaLabel,
  ctaHref,
  ctaTo,
  ctaVariant = 'teal',
  ctaIcon: CtaIcon = FiArrowRight,
  ctaIconPosition = 'right',
  secondaryCta,
  imageUrl,
  imageAlt = '',
  imagePosition = 'right',
  imageFade = false,
  overlay,
  imageClassName = 'object-cover object-[center_20%]',
  children,
}) {
  const hasOverlay = Boolean(overlay)

  const imageOrder =
    imagePosition === 'left'
      ? hasOverlay
        ? 'order-2 lg:order-1'
        : 'order-1 lg:order-1'
      : hasOverlay
        ? 'order-2 lg:order-2'
        : 'order-1 lg:order-2'
  const textOrder =
    imagePosition === 'left'
      ? hasOverlay
        ? 'order-1 lg:order-2'
        : 'order-2 lg:order-2'
      : hasOverlay
        ? 'order-1 lg:order-1'
        : 'order-2 lg:order-1'

  const eyebrowEl = eyebrow ? <p className={eyebrowClassName}>{eyebrow}</p> : null

  const imageCol = (
    <div
      className={`relative h-80 w-full self-stretch sm:h-[320px] lg:h-auto lg:min-h-[520px] ${imageOrder}`}
    >
      <img src={imageUrl} alt={imageAlt} className={`h-full w-full ${imageClassName}`} />
      {imageFade && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-offwhite via-offwhite/30 to-transparent"
          aria-hidden
        />
      )}
    </div>
  )

  const defaultContent = (
    <>
      {eyebrowPlacement === 'before' && eyebrowEl}
      <h1 className="font-display text-4xl font-bold leading-tight text-navy sm:text-5xl">
        {heading}
      </h1>
      {eyebrowPlacement === 'after' && eyebrowEl}
      {paragraphs.map((p) => (
        <p key={p} className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          {p}
        </p>
      ))}
      {ctaLabel && (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            variant={ctaVariant}
            href={ctaHref}
            to={ctaTo}
            icon={CtaIcon}
            iconPosition={ctaIconPosition}
          >
            {ctaLabel}
          </Button>
          {secondaryCta?.label && (
            <Button
              variant={secondaryCta.variant || 'teal'}
              href={secondaryCta.href}
              to={secondaryCta.to}
              icon={secondaryCta.icon}
              iconPosition={secondaryCta.iconPosition || 'left'}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      )}
    </>
  )

  const textCol = (
    <div className={`relative z-10 flex items-center overflow-visible bg-offwhite ${textOrder}`}>
      <div
        className={`mx-auto w-full px-6 py-14 sm:px-10 lg:ml-auto lg:mr-8 lg:px-16 lg:py-20 ${
          children ? 'max-w-2xl' : 'max-w-xl'
        }`}
      >
        {children ?? defaultContent}
        {hasOverlay && (
          <div className="relative z-20 mt-8 w-full overflow-visible lg:w-[min(140%,36rem)] xl:w-[min(155%,42rem)]">
            {overlay}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-2">
      {imageCol}
      {textCol}
    </section>
  )
}
