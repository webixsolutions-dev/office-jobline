import IconCircle from './IconCircle'

/**
 * Icon-left + stacked number/label used in the stats strip.
 */
export default function StatItem({ icon, value, label, caption, iconSize = 'md' }) {
  return (
    <div className="flex items-center gap-4">
      <IconCircle icon={icon} color="teal-solid" size={iconSize} />
      <div className="min-w-0">
        <p className="font-display text-lg font-bold leading-tight text-navy sm:text-xl">
          {value}
          {label ? ` ${label}` : ''}
        </p>
        {caption && <p className="mt-1 text-sm leading-relaxed text-muted">{caption}</p>}
      </div>
    </div>
  )
}
