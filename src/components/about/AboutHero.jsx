import SplitHero from '../ui/SplitHero'
import { images } from '../../constants/images'

export default function AboutHero() {
  return (
    <SplitHero
      heading="About Office Jobline"
      eyebrow="Connecting office talent with opportunities across Canada."
      paragraphs={[
        "Office Jobline is Canada's dedicated platform for office and administrative professionals and the employers who hire them.",
        'We make it easy to discover rewarding careers, connect with trusted employers, and build stronger teams—from coast to coast to coast.',
      ]}
      ctaLabel="Our Mission"
      ctaHref="#our-mission"
      imageUrl={images.aboutHero}
      imageAlt="Office professionals collaborating around a laptop"
      imagePosition="right"
    />
  )
}
