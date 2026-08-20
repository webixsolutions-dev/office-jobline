import SectionHeading from '../ui/SectionHeading'
import CategoryCard from '../ui/CategoryCard'
import { categories } from '../../constants/categories'

export default function PopularCategories() {
  return (
    <section className="bg-offwhite" aria-labelledby="popular-categories-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          id="popular-categories-heading"
          title="Popular Office Job Categories"
          subtitle="Explore the most in-demand office and administrative jobs across Canada."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((item) => (
            <CategoryCard
              key={item.slug}
              icon={item.icon}
              title={item.title}
              jobCount={item.jobCount}
              to={`/browse?category=${item.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
