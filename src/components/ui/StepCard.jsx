import IconCircle from './IconCircle'

/**
 * Numbered step card used in How Hiring Works.
 * @param {number} number
 * @param {React.ComponentType} icon
 * @param {string} title
 * @param {string} description
 */
export default function StepCard({ number, icon, title, description }) {
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
