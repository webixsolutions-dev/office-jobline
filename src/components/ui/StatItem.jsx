import IconCircle from './IconCircle'

/**
 * Icon-left + stacked number/label used in the stats strip.
 */
export default function StatItem({ icon, value, label, caption }) {
  return (
    <div className="flex items-start gap-4">
      <IconCircle icon={icon} color="teal-solid" />
      <div>
        <p className="font-display text-xl font-bold leading-tight text-navy">
          {value}
          {label ? ` ${label}` : ''}
        </p>
        {caption && <p className="mt-1 text-sm text-muted">{caption}</p>}
      </div>
    </div>
  )
}
