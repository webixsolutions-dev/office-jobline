import TestimonialCard from '../ui/TestimonialCard'
import MapleDivider from '../ui/MapleDivider'
import { images } from '../../constants/images'

const testimonials = [
  {
    quote:
      'Office Jobline made it so easy to find the right opportunity. I set up job alerts and found a great role in just two weeks!',
    name: 'Jessica H.',
    location: 'Toronto, ON',
    image: images.testimonialJessica,
  },
  {
    quote:
      'We found qualified candidates quickly and the hiring tools are incredibly easy to use. Highly recommend!',
    name: 'Mark D.',
    location: 'Vancouver, BC',
    image: images.testimonialMark,
  },
]

export default function Testimonials() {
  return (
    <section className="bg-offwhite" aria-label="Testimonials">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <MapleDivider variant="quote" />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} {...item} />
          ))}
        </div>

        <MapleDivider className="mt-14" />
      </div>
    </section>
  )
}
