import { FiArrowRight } from 'react-icons/fi'
import ImageTextRow from '../ui/ImageTextRow'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { images } from '../../constants/images'

export default function OurMission() {
  return (
    <section id="our-mission" className="bg-offwhite scroll-mt-24" aria-labelledby="our-mission-heading">
      <div className="site-container pt-6 pb-16">
        <SectionHeading
          id="our-mission-heading"
          eyebrow="Our Mission & Values"
          title="Our Mission"
          subtitle="Office Jobline connects office professionals with meaningful opportunities and helps employers find the talent they need—across cities, towns, and communities in Canada."
        />

        <div className="mt-12">
          <ImageTextRow
            imageUrl={images.aboutMission}
            imageAlt="Office team collaborating around a laptop"
            heading="Our Vision"
            imagePosition="left"
          >
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              To be Canada's most trusted platform for office and administrative
              careers—empowering people and organizations to build stronger, more
              connected workplaces.
            </p>
            <Button
              variant="teal"
              to="/browse"
              icon={FiArrowRight}
              iconPosition="right"
              className="mt-6"
            >
              Explore Jobs
            </Button>
          </ImageTextRow>
        </div>
      </div>
    </section>
  )
}
