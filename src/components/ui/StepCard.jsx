import IconCircle from './IconCircle'

/**
 * Numbered step card used in How Hiring Works and How Posting Works.
 * @param {'default' | 'process'} [variant] process = centered icon + number badge + bordered card
 */
export default function StepCard({ number, icon, title, description, variant = 'default' }) {
  if (variant === 'process') {
    return (
      <article className="h-full rounded-xl border border-border bg-white p-6 text-center shadow-card sm:p-7">
        <div className="relative mx-auto mb-2 w-fit">
          <IconCircle icon={icon} color="teal" size="lg" />
          <span className="absolute -bottom-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
            {number}
          </span>
        </div>
        <h3 className="mt-6 font-display text-lg font-semibold text-navy">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
      </article>
    )
  }

  return (
    <article className="relative h-full rounded-xl bg-white p-6 pt-8 shadow-card">
      <span className="absolute left-4 top-0 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-teal text-xs font-bold text-white">
        {number}
      </span>
      <IconCircle icon={icon} color="teal" />
      <h3 className="mt-4 font-display text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
    </article>
  )
}
