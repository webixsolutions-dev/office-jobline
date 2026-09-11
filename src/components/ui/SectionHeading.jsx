/** Gold skyline mark used on centered section titles (three buildings, flag on the middle). */
function SkylineMark({ className }) {
  return (
    <svg viewBox="0 0 32 24" className={className} fill="none" aria-hidden>
      <rect x="1.5" y="11" width="8" height="11.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="12" y="5" width="8" height="17.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M16 5 V1.2 L19.2 2.8 L16 5"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <rect x="22.5" y="9" width="8" height="13.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

/**
 * Centered section header: optional icon, eyebrow, title, subtitle.
 * @param {string} [as] heading tag, default h2
 */
export default function SectionHeading({
  icon: Icon,
  showIcon = true,
  eyebrow,
  title,
  subtitle,
  as: Tag = 'h2',
  id,
  align = 'center',
}) {
  const isLeft = align === 'left'
  const Mark = Icon || SkylineMark

  return (
    <div className={`flex flex-col ${isLeft ? 'items-start text-left' : 'items-center text-center'}`}>
      {showIcon &&
        (isLeft ? (
          <Mark className="h-7 w-7 shrink-0 text-gold" aria-hidden />
        ) : (
          <div className="flex w-40 items-center gap-3 sm:w-48" aria-hidden>
            <span className="h-px flex-1 bg-gold" />
            <Mark className="h-7 w-7 shrink-0 text-gold" />
            <span className="h-px flex-1 bg-gold" />
          </div>
        ))}

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

      <Tag
        id={id}
        className={`${showIcon || eyebrow ? 'mt-4' : ''} font-display text-3xl font-bold text-navy sm:text-4xl`}
      >
        {title}
      </Tag>

      {subtitle && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
