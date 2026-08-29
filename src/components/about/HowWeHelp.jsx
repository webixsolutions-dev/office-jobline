import { FiSearch, FiUser } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import SectionHeading from '../ui/SectionHeading'
import ChecklistCard from '../ui/ChecklistCard'

function SeekerIcon({ className }) {
  return (
    <span className={`relative inline-flex ${className}`}>
      <FiUser className="h-8 w-8" aria-hidden />
      <FiSearch className="absolute -bottom-0.5 -right-0.5 h-4 w-4" aria-hidden />
    </span>
  )
}

const seekerPoints = [
  'Discover office jobs that match your skills and career goals.',
  'Apply easily with a simple, streamlined application process.',
  'Set job alerts and never miss new opportunities that fit you.',
]

const employerPoints = [
  'Post jobs in minutes and reach the right office talent.',
  'Connect with qualified candidates across Canada.',
  'Manage applicants easily with our employer dashboard.',
]

export default function HowWeHelp() {
  return (
    <section className="bg-offwhite" aria-labelledby="how-we-help-heading">
      <div className="site-container py-16">
        <SectionHeading
          id="how-we-help-heading"
          showIcon={false}
          title="How We Help Job Seekers & Employers"
          subtitle="Simple solutions that connect office talent with opportunities across Canada."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <ChecklistCard
            theme="teal"
            icon={SeekerIcon}
            title="For Job Seekers"
            points={seekerPoints}
            ctaLabel="Browse Office Jobs"
            ctaTo="/browse"
          />
          <ChecklistCard
            theme="gold"
            icon={HiOutlineBuildingOffice2}
            title="For Employers"
            points={employerPoints}
            ctaLabel="Post a Job"
            ctaTo="/post-a-job"
          />
        </div>
      </div>
    </section>
  )
}
