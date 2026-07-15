import { FiArrowRight, FiHeadphones, FiBriefcase, FiMail } from "react-icons/fi";

const CONTACT_CARDS = [
  {
    icon: FiHeadphones,
    title: "Job Seeker Support",
    desc: "Need help with your account, applications, or career resources?",
    email: "support@officejobline.ca",
  },
  {
    icon: FiBriefcase,
    title: "Employer Support",
    desc: "Get assistance with postings, plans, or finding the right talent.",
    email: "employers@officejobline.ca",
  },
  {
    icon: FiMail,
    title: "General Inquiries",
    desc: "Have a question or feedback? We'd love to hear from you.",
    email: "info@officejobline.ca",
  },
];

export default function ContactCards() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
      {CONTACT_CARDS.map(({ icon: Icon, title, desc, email }) => (
        <div
          key={title}
          className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ccfbf1]">
            <Icon className="h-6 w-6 text-[#0d9488]" />
          </span>
          <p className="mt-4 font-display text-base font-bold text-[#1a2a4a]">
            {title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            {desc}
          </p>
          <a
            href={`mailto:${email}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0d9488] hover:text-[#0f766e]"
          >
            {email}
            <FiArrowRight className="h-4 w-4" />
          </a>
        </div>
      ))}
    </div>
  );
}