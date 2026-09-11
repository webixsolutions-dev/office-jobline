import { FiUser } from 'react-icons/fi'
import IconCircle from '../ui/IconCircle'
import SupportCard from '../ui/SupportCard'
import { supportArticles } from '../../constants/supportArticles'

export default function JobSeekerSupport() {
  return (
    <section className="bg-offwhite" aria-labelledby="job-seeker-support-heading">
      <div className="site-container py-16">
        <div className="flex items-start gap-4">
          <IconCircle icon={FiUser} color="teal" />
          <div>
            <h2 id="job-seeker-support-heading" className="font-display text-3xl font-bold text-navy sm:text-4xl">
              Job Seeker Support
            </h2>
            <p className="mt-2 text-base text-muted">
              Helpful tips and resources to help you land your next office role.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {supportArticles.map((item) => (
            <SupportCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
