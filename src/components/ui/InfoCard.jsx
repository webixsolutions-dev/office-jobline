import IconCircle from './IconCircle'

/**
 * Prop-driven card for contact layouts:
 * (a) icon + title + description
 * (b) + divider + detail rows via children
 * (c) + checklist + button via footer
 *
 * @param {'white' | 'gold'} [tone]
 * @param {boolean} [divided] render a top border above children
 */
export default function InfoCard({
  icon,
  title,
  description,
  tone = 'white',
  divided = true,
  as: Tag = 'article',
  className = '',
  children,
  footer,
}) {
  const surface = tone === 'gold' ? 'bg-gold-tint' : 'bg-white'

  return (
    <Tag className={`flex h-full flex-col rounded-xl p-6 shadow-card ${surface} ${className}`}>
      {icon && <IconCircle icon={icon} color="navy" />}
      {title && (
        <h3 className={`font-display text-lg font-semibold text-navy ${icon ? 'mt-4' : ''}`}>{title}</h3>
      )}
      {description && <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>}
      {children && (
        <div className={divided ? 'mt-5 border-t border-border pt-5' : 'mt-4'}>{children}</div>
      )}
      {footer && <div className="mt-auto pt-6">{footer}</div>}
    </Tag>
  )
}
