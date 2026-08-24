import { HiOutlineShieldCheck, HiOutlineUserGroup } from 'react-icons/hi2'
import { GiMapleLeaf } from 'react-icons/gi'
import SectionHeading from '../ui/SectionHeading'
import IconTextCard from '../ui/IconTextCard'
import MapleDivider from '../ui/MapleDivider'

const pillars = [
  {
    icon: HiOutlineShieldCheck,
    title: 'Trusted Office Job Board',
    description:
      'Quality listings from verified employers across a wide range of office and administrative roles.',
  },
  {
    icon: GiMapleLeaf,
    title: 'Canada-Wide Reach',
    description:
      'Opportunities in cities, towns, and remote locations—connecting talent and employers nationwide.',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Built for Employers & Job Seekers',
    description: 'Powerful tools and resources that simplify hiring and help careers grow.',
  },
]

export default function WhoWeAre() {
  return (
    <section className="bg-offwhite" aria-labelledby="who-we-are-heading">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-6 sm:px-6 lg:px-8">
        <SectionHeading
          id="who-we-are-heading"
          title="Who We Are"
          subtitle="We're more than a job board. Office Jobline is a Canadian platform built to support office professionals and the organizations that rely on them."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {pillars.map((item) => (
            <IconTextCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              layout="row"
              iconColor="teal-solid"
            />
          ))}
        </div>

        <MapleDivider className="mt-10" />
      </div>
    </section>
  )
}
