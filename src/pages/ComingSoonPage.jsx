import { Link } from 'react-router-dom'

export default function ComingSoonPage({ title = 'Coming Soon' }) {
  return (
    <section className="flex min-h-[50vh] items-center justify-center bg-offwhite px-4 py-24">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl">{title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          This page is on the way. In the meantime, you can browse office jobs or return home.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/browse"
            className="inline-flex rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal-dark"
          >
            Browse Jobs
          </Link>
          <Link
            to="/"
            className="inline-flex rounded-lg border border-border bg-white px-6 py-3 text-sm font-semibold text-navy hover:bg-offwhite"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
