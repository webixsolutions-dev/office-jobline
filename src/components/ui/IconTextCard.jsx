import IconCircle from './IconCircle'

/**
 * Generic icon + text card.
 * @param {'row' | 'column'} [layout] row = icon-left / text-right; column = icon on top
 * @param {boolean} [underline] gold accent rule under the title (Employers trust strip)
 */
export default function IconTextCard({
  icon,
  title,
  description,
  layout = 'row',
  iconColor = 'teal',
  underline = false,
  className = '',
}) {
  const isRow = layout === 'row'

  return (
    <article
      className={`rounded-xl bg-white p-6 shadow-card ${isRow ? 'flex items-start gap-4' : ''} ${className}`}
    >
      <IconCircle icon={icon} color={iconColor} />
      <div className={isRow ? '' : 'mt-4'}>
        <h3 className="font-display text-lg font-semibold text-navy">{title}</h3>
        {underline && <span className="mt-2 block h-0.5 w-10 bg-gold" aria-hidden />}
        {description && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
        )}
      </div>
    </article>
  )
}
