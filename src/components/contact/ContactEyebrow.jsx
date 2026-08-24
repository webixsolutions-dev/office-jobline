/** Gold section kicker used on Contact Us only. */
export default function ContactEyebrow({ children }) {
  return (
    <div>
      <p className="text-sm font-semibold tracking-wide text-gold">{children}</p>
      <span className="mt-1.5 block h-[3px] w-11 rounded-full bg-gold" aria-hidden />
    </div>
  )
}
