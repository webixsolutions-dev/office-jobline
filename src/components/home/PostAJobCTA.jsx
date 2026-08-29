import { FiBriefcase } from 'react-icons/fi'
import Button from '../ui/Button'

export default function PostAJobCTA() {
  return (
    <section className="bg-offwhite" aria-label="Post a job">
      <div className="site-container flex justify-center py-6">
        <Button variant="gold" to="/post-a-job" icon={FiBriefcase}>
          Post a Job Today
        </Button>
      </div>
    </section>
  )
}
