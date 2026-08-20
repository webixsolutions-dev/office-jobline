import TestimonialCard from '../ui/TestimonialCard'
import logo from '../../assets/images/logo.png'

/**
 * Full-bleed photo auth shell: left messaging + testimonial, right form card.
 *
 * @param {string} backgroundImage
 * @param {string} heading
 * @param {React.ReactNode} [headingAccent] phrase rendered in gold inside the h1
 * @param {string} [subtitle]
 * @param {{ quote: string, name: string, location: string, avatar?: object, showRating?: boolean }} [testimonial]
 * @param {React.ReactNode} children form card body
 */
export default function AuthLayout({
  backgroundImage,
  heading,
  headingAccent,
  subtitle,
  testimonial,
  children,
}) {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
        role="presentation"
      />
      <div className="absolute inset-0 bg-[var(--color-navy-overlay)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-16">
        <div className="text-white">
          <img src={logo} alt="Office Jobline" className="h-auto w-44 sm:w-52" />
          <h1 className="mt-8 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {heading}{' '}
            {headingAccent && <span className="text-gold">{headingAccent}</span>}
          </h1>
          {subtitle && <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">{subtitle}</p>}
          {testimonial && (
            <div className="mt-10">
              <TestimonialCard
                theme="glass"
                quote={testimonial.quote}
                name={testimonial.name}
                location={testimonial.location}
                avatar={testimonial.avatar}
                image={testimonial.image}
                showRating={testimonial.showRating !== false}
              />
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8">{children}</div>
      </div>
    </section>
  )
}
