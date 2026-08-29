export default function DashboardTopBanner({ eyebrow, title, subtitle }) {
  return (
    <div
      className="mb-6 rounded-xl border border-[var(--color-border)] px-5 py-6 sm:px-8 sm:py-8"
      style={{
        background: 'linear-gradient(135deg, var(--color-teal-light) 0%, var(--color-white) 55%, var(--color-gold-tint) 100%)',
      }}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-teal)]">{eyebrow}</p>
      )}
      <h1 className="mt-1 font-display text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-2 text-sm text-[var(--color-text-secondary)] sm:text-base">{subtitle}</p>}
    </div>
  )
}
