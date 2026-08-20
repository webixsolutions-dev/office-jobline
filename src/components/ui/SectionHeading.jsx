import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'

/**
 * Centered section header: optional icon, eyebrow, title, subtitle.
 * @param {string} [as] heading tag, default h2
 */
export default function SectionHeading({
  icon: Icon = HiOutlineBuildingOffice2,
  showIcon = true,
  eyebrow,
  title,
  subtitle,
  as: Tag = 'h2',
  id,
  align = 'center',
}) {
  const isLeft = align === 'left'

  return (
    <div className={`flex flex-col ${isLeft ? 'items-start text-left' : 'items-center text-center'}`}>
      {showIcon && Icon && (
        <Icon className="h-7 w-7 shrink-0 text-gold" aria-hidden />
      )}

      {eyebrow && (
        <div
          className={`${showIcon ? 'mt-4' : ''} flex w-full max-w-md items-center gap-4 ${
            isLeft ? 'justify-start' : 'justify-center'
          }`}
        >
          {!isLeft && <span className="h-px w-12 bg-gold sm:w-16" />}
          <p className="text-sm font-semibold tracking-wide text-teal">{eyebrow}</p>
          {!isLeft && <span className="h-px w-12 bg-gold sm:w-16" />}
        </div>
      )}

      <Tag id={id} className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">{title}</Tag>

      {subtitle && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
