import { GiMapleLeaf } from 'react-icons/gi'
import IconCircle from './IconCircle'
import Button from './Button'

function SkylineGraphic() {
  return (
    <svg
      viewBox="0 0 480 280"
      className="pointer-events-none absolute right-0 top-1/2 hidden h-[140%] w-[40%] -translate-y-1/2 text-white/10 lg:block"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="40" y="80" width="70" height="180" />
      <rect x="120" y="40" width="90" height="220" />
      <rect x="220" y="100" width="60" height="160" />
      <rect x="290" y="20" width="80" height="240" />
      <rect x="380" y="70" width="70" height="190" />
      <path d="M330 20 L350 0 L370 20" />
    </svg>
  )
}

/**
 * Full-width colored banner with icon, copy, and two CTAs.
 * @param {'teal' | 'navy'} [theme]
 * @param {'white' | 'gold-outline' | 'teal'} [iconColor]
 * @param {{ label: string, to?: string, onClick?: Function, icon?: object, variant?: string, iconPosition?: string }} [primary]
 * @param {'row' | 'stack'} [actionsLayout] default row keeps Browse Jobs banners side-by-side
 * @param {{ label: string, to?: string, onClick?: Function, icon?: object, variant?: string, iconPosition?: string }} [secondary]
 */
export default function Banner({
  theme = 'teal',
  icon,
  iconColor = 'white',
  title,
  subtitle,
  primary,
  secondary,
  showSkyline = true,
  showMapleLeaf = false,
  actionsLayout = 'row',
}) {
  const bg = theme === 'navy' ? 'bg-navy' : 'bg-teal'

  return (
    <section className="site-gutter py-8">
      <div className={`relative w-full overflow-hidden rounded-2xl ${bg} px-6 py-8 sm:px-10 lg:py-10`}>
        {showSkyline && <SkylineGraphic />}
        {showMapleLeaf && (
          <GiMapleLeaf
            className="pointer-events-none absolute -right-6 bottom-0 h-40 w-40 text-white/10 sm:h-52 sm:w-52"
            aria-hidden
          />
        )}
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4 lg:max-w-2xl">
            <IconCircle icon={icon} color={iconColor} size="lg" />
            <div>
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">{title}</h2>
              {subtitle && <p className="mt-2 text-sm text-white/85 sm:text-base">{subtitle}</p>}
            </div>
          </div>
          <div
            className={`flex w-full flex-col gap-3 lg:w-auto ${
              actionsLayout === 'stack' ? 'sm:flex-col' : 'sm:flex-row'
            }`}
          >
            {primary && (
              <Button
                variant={primary.variant || 'gold'}
                to={primary.to}
                onClick={primary.onClick}
                icon={primary.icon}
                iconPosition={primary.iconPosition || 'left'}
                className="w-full sm:w-auto"
              >
                {primary.label}
              </Button>
            )}
            {secondary && (
              <Button
                variant={secondary.variant || 'outline'}
                to={secondary.to}
                onClick={secondary.onClick}
                icon={secondary.icon}
                iconPosition={secondary.iconPosition || 'left'}
                className="w-full sm:w-auto"
              >
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
