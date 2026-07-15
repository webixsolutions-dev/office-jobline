import {
  FiArrowRight,
  FiSearch,
  FiUser,
  FiShield,
  FiSettings,
  FiTrendingUp,
} from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { GiMapleLeaf } from "react-icons/gi";

const SEEKER_POINTS = [
  "Discover office jobs that match your skills and career goals.",
  "Apply easily with a simple, streamlined application process.",
  "Set job alerts and never miss new opportunities that fit you.",
];

const EMPLOYER_POINTS = [
  "Post jobs in minutes and reach the right office talent.",
  "Connect with qualified candidates across Canada.",
  "Manage applicants easily with our employer dashboard.",
];

const FEATURES = [
  {
    icon: FiShield,
    title: "Verified Listings",
    desc: "All job postings are reviewed for quality and legitimacy so you can apply or hire with confidence.",
  },
  {
    icon: FiSettings,
    title: "Easy Hiring Tools",
    desc: "Powerful tools and dashboards that simplify hiring and save time for employers.",
  },
  {
    icon: FiTrendingUp,
    title: "Career Growth Support",
    desc: "Resources, tips, and guidance to help office professionals grow their careers and reach their goals.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Office Jobline made it so easy to find the right opportunity. I set up job alerts and found a great role in just two weeks!",
    name: "Jessica H.",
    role: "Toronto, ON",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "We found qualified candidates quickly and the hiring tools are incredibly easy to use. Highly recommend!",
    name: "Mark D.",
    role: "Vancouver, BC",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80",
  },
];

export default function HowWeHelp() {
  return (
    <section className="bg-offwhite">

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
            How We Help Job Seekers &amp; Employers
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">
            Simple solutions that connect office talent with opportunities
            across Canada.
          </p>
        </div>

        {/* Two panels */}
        <div className="relative mt-10 grid grid-cols-1 gap-5 rounded-2xl bg-white p-2 shadow-sm sm:grid-cols-2 sm:gap-0 sm:p-0">
          <span className="absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 bg-gray-200 sm:block" />

          {/* Job seekers */}
          <div className="rounded-xl bg-teal-light p-6 sm:rounded-l-2xl sm:rounded-r-none sm:p-10">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white">
                <span className="relative flex h-8 w-8 items-center justify-center">
                  <FiUser className="h-8 w-8 text-teal" />
                  <FiSearch className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-teal-light text-teal" />
                </span>
              </span>
              <h3 className="font-display text-xl font-extrabold text-navy sm:text-2xl">
                For Job Seekers
              </h3>
            </div>
            <ul className="mt-6 space-y-3">
              {SEEKER_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal text-xs text-white">
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed text-navy/80 sm:text-base">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#browse-jobs"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Browse Office Jobs
              <FiArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Employers */}
          <div className="rounded-xl bg-gold/10 p-6 sm:rounded-l-none sm:rounded-r-2xl sm:p-10">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white">
                <HiOutlineBuildingOffice2 className="h-8 w-8 text-gold-dark" />
              </span>
              <h3 className="font-display text-xl font-extrabold text-navy sm:text-2xl">
                For Employers
              </h3>
            </div>
            <ul className="mt-6 space-y-3">
              {EMPLOYER_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-xs text-navy">
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed text-navy/80 sm:text-base">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#post-job"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold-dark"
            >
              Post a Job
              <FiArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-light">
                <Icon className="h-6 w-6 text-teal" />
              </span>
              <p className="mt-4 font-display text-base font-bold text-navy">
                {title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quote divider */}
        <div className="mt-14 flex items-center gap-4">
          <span className="h-px flex-1 bg-gold" />
          <FaQuoteLeft className="h-5 w-5 shrink-0 text-gold" />
          <span className="h-px flex-1 bg-gold" />
        </div>

        {/* Testimonials */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {TESTIMONIALS.map(({ quote, name, role, image }) => (
            <div
              key={name}
              className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <img
                src={image}
                alt={name}
                className="h-14 w-14 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="text-sm italic leading-relaxed text-navy/80 sm:text-base">
                  "{quote}"
                </p>
                <div className="mt-3 flex text-gold">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="mt-2 font-display text-sm font-bold text-navy">
                  {name}
                </p>
                <p className="text-xs text-muted">{role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="mt-14 flex items-center gap-4">
          <span className="h-px flex-1 bg-gold" />
          <GiMapleLeaf className="h-5 w-5 shrink-0 text-gold" />
          <span className="h-px flex-1 bg-gold" />
        </div>
      </div>
    </section>
  );
}
