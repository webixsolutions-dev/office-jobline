import React, { useState } from "react";
import {
  FiUser,
  FiBriefcase,
  FiMessageCircle,
  FiUsers,
  FiMail,
  FiCheckCircle,
  FiChevronDown,
} from "react-icons/fi";
import { FaHandshake } from "react-icons/fa";

const HelpCard = ({ icon, title, children, points, cta, ctaIcon }) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B1B3A] text-amber-400">
      {icon}
    </div>
    <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
    <p className="mt-1 text-sm text-slate-500">{children}</p>
    <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
      {points.map((p) => (
        <li key={p} className="flex items-center gap-2 text-sm text-slate-600">
          <FiCheckCircle className="text-amber-500" /> {p}
        </li>
      ))}
    </ul>
    <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B1B3A] py-3 text-sm font-semibold text-white transition hover:bg-[#132a56]">
      {ctaIcon} {cta}
    </button>
  </div>
);

const faqs = [
  "How can I contact support?",
  "How do I post a job on Office Jobline?",
  "I need help with my application. What should I do?",
  "How long does it take to get a response?",
];

const FaqItem = ({ question }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold text-slate-800"
      >
        {question}
        <FiChevronDown className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-4 text-sm text-slate-500">
          Our team typically responds within one business day. Reach out via the contact
          options above and we'll route you to the right person.
        </div>
      )}
    </div>
  );
};

export default function NeedHelpSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <span className="text-sm font-bold tracking-widest text-amber-500">CONTACT US</span>
      <h1 className="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">
        Need Help With Something Specific?
      </h1>
      <p className="mt-4 max-w-2xl text-slate-500">
        Choose the option that best fits your needs. Our team is here to provide the right
        support and connect you with the right person.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <HelpCard
          icon={<FiUser />}
          title="For Job Seekers"
          points={["Application assistance", "Account and profile support", "Job search tips and guidance"]}
          cta="Contact Support"
          ctaIcon={<FiMessageCircle />}
        >
          Get help with job search, applications, account issues, and more.
        </HelpCard>
        <HelpCard
          icon={<FiBriefcase />}
          title="For Employers"
          points={["Post a job or edit a listing", "Account and billing support", "Employer onboarding help"]}
          cta="Talk to Sales"
          ctaIcon={<FiUsers />}
        >
          Get support with posting jobs, managing listings, and finding the right talent.
        </HelpCard>
        <HelpCard
          icon={<FaHandshake />}
          title="Partnerships & Media"
          points={["Partnership inquiries", "Press and media requests", "Sponsorship opportunities"]}
          cta="Send Inquiry"
          ctaIcon={<FiMail />}
        >
          For partnership opportunities, media inquiries, or brand collaborations.
        </HelpCard>
      </div>

      <div className="mt-16">
        <span className="text-sm font-bold tracking-widest text-amber-500">FAQ</span>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((q) => (
            <FaqItem key={q} question={q} />
          ))}
        </div>
      </div>
    </section>
  );
}