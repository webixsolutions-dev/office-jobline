import TestimonialCard from '../ui/TestimonialCard'
import { homeTestimonials } from '../../constants/homeContent'

export default function HomeTestimonials() {
  return (
    <section className="bg-offwhite" aria-labelledby="home-testimonials-heading">
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <h2 id="home-testimonials-heading" className="font-display text-3xl font-bold text-navy sm:text-4xl">
          What Our Users Say
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {homeTestimonials.map((item) => (
            <TestimonialCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
