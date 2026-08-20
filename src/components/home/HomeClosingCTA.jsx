import { FiBriefcase, FiSearch } from 'react-icons/fi'
import IconCircle from '../ui/IconCircle'
import Button from '../ui/Button'
import SkylineGraphic from '../ui/SkylineGraphic'

export default function HomeClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-teal">
      <SkylineGraphic position="left" />
      <SkylineGraphic position="right" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:flex-row lg:px-8 lg:py-20 lg:text-left">
        <IconCircle icon={FiBriefcase} color="white" size="lg" />
        <div className="flex-1">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to Find Your Next Office Role or Hire Top Office Talent?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/85 sm:text-base lg:mx-0">
            Join thousands of office professionals and employers building successful careers and teams
            across Canada.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Button variant="outline" to="/jobs" icon={FiSearch} className="w-full sm:w-auto">
              Browse Jobs
            </Button>
            <Button variant="gold" to="/post-a-job" icon={FiBriefcase} className="w-full sm:w-auto">
              Post a Job
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
