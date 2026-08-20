import { FiBriefcase } from 'react-icons/fi'
import Button from '../ui/Button'

export default function PostAJobCTA() {
  return (
    <section className="bg-offwhite" aria-label="Post a job">
      <div className="mx-auto flex max-w-7xl justify-center px-4 py-6 sm:px-6 lg:px-8">
        <Button variant="gold" to="/post-a-job" icon={FiBriefcase}>
          Post a Job Today
        </Button>
      </div>
    </section>
  )
}
