import IconCircle from './IconCircle'
import Button from './Button'

/**
 * Full-width navy CTA: icon, heading, subtitle, and one or two buttons.
 * Distinct from PromoBanner (inset tinted card).
 *
 * @param {React.ComponentType} icon
 * @param {string} heading
 * @param {string} [subtitle]
 * @param {{ label: string, to?: string, onClick?: Function, icon?: object, variant?: string }} [primary]
 * @param {{ label: string, to?: string, onClick?: Function, icon?: object, variant?: string }} [secondary]
 */
export default function CTABanner({ icon, heading, subtitle, primary, secondary, className = '' }) {
  return (
    <section className={`bg-white px-4 py-8 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl bg-navy px-6 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4 lg:max-w-2xl">
          <IconCircle icon={icon} color="gold-outline" size="lg" />
          <div>
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl md:text-3xl">{heading}</h2>
            {subtitle && <p className="mt-2 text-sm text-white/80 sm:text-base">{subtitle}</p>}
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
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
    </section>
  )
}
