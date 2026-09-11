import IconCircle from './IconCircle'

/**
 * Numbered process step (icon + badge + title + description).
 * Dashed connectors between steps belong in the parent layout, not this component.
 * @param {number} number
 * @param {React.ComponentType} icon
 * @param {string} title
 * @param {string} description
 */
export default function ProcessStep({ number, icon, title, description, className = '' }) {
  return (
    <article className={`relative ${className}`}>
      <div className="relative inline-flex">
        <IconCircle icon={icon} color="teal" />
        <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal text-[11px] font-bold text-white">
          {number}
        </span>
      </div>
      <h3 className="mt-3 font-display text-base font-bold text-navy">{title}</h3>
      {description && <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>}
    </article>
  )
}
