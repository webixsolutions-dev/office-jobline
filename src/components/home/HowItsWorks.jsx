import { FiSearch, FiUser, FiFileText, FiCheckCircle, FiBriefcase, FiClock } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { GiMapleLeaf } from "react-icons/gi";
import { FaStar } from "react-icons/fa";

const STEPS = [
  {
    icon: FiSearch,
    number: 1,
    title: "Search Jobs",
    desc: "Find office and administrative jobs that match your skills and location.",
  },
  {
    icon: FiUser,
    number: 2,
    title: "Create Profile",
    desc: "Build your profile, add your experience, and let employers find you.",
  },
  {
    icon: FiFileText,
    number: 3,
    title: "Apply Easily",
    desc: "Apply to jobs in just a few clicks. It's fast, simple, and secure.",
  },
  {
    icon: FiCheckCircle,
    number: 4,
    title: "Get Hired",
    desc: "Connect with employers and land the right opportunity for your career.",
  },
];

const EMPLOYER_FEATURES = [
  {
    icon: HiOutlineUserGroup,
    title: "Quality Applicants",
    desc: "Connect with pre-screened, qualified office and administrative professionals.",
  },
  {
    icon: FiClock,
    title: "Quick Posting",
    desc: "Post your jobs in minutes and start receiving applications fast.",
  },
  {
    icon: GiMapleLeaf,
    title: "Canada-Wide Reach",
    desc: "Get your job in front of candidates from cities and towns across Canada.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I found a great administrative job within a week! Office Jobline made the process so easy and helped me connect with the right employer.",
    name: "Jessica L.",
    role: "Office Administrator, Toronto, ON",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "We posted a job and received excellent candidates quickly. Office Jobline is our go-to platform for hiring office talent.",
    name: "Mark D.",
    role: "HR Manager, Vancouver, BC",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white">
   

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Heading + steps + image */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-base text-muted sm:text-lg">
              Get discovered. Get hired. Build your office career.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-2">
              {STEPS.map(({ icon: Icon, number, title, desc }, i) => (
                <div key={title} className="relative">
                  {i % 2 === 0 && (
                    <span className="absolute left-6 top-6 hidden h-px w-full border-t border-dashed border-gray-300 sm:block lg:hidden" />
                  )}
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-teal-light">
                    <Icon className="h-6 w-6 text-teal" />
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal text-[11px] font-bold text-white">
                      {number}
                    </span>
                  </div>
                  <p className="mt-3 font-display text-base font-bold text-navy">
                    {title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-64 w-full overflow-hidden rounded-2xl sm:h-80 lg:h-96">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80"
              alt="Team reviewing candidate profiles together"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* For Employers */}
        <div className="mt-14 rounded-2xl bg-teal-light p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr] lg:gap-10">
            <div>
              <h3 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
                For Employers
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Post office jobs, hire qualified administrative professionals,
                and grow your team with ease. Reach thousands of job seekers
                across Canada actively looking for office and administrative
                roles.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {EMPLOYER_FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-xl bg-white p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-light">
                    <Icon className="h-5 w-5 text-teal" />
                  </span>
                  <p className="mt-3 font-display text-base font-bold text-navy">
                    {title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <h3 className="mt-14 font-display text-2xl font-extrabold text-navy sm:text-3xl">
          What Our Users Say
        </h3>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {TESTIMONIALS.map(({ quote, name, role, image }) => (
            <div
              key={name}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <img
                  src={image}
                  alt={name}
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
                <p className="text-sm italic leading-relaxed text-navy/80">
                  "{quote}"
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <p className="font-display text-sm font-bold text-navy">
                    {name}
                  </p>
                  <p className="text-xs text-muted">{role}</p>
                </div>
                <div className="flex text-gold">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="#post-job"
            className="flex items-center justify-center gap-2 rounded-lg bg-teal px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-dark"
          >
            <FiBriefcase className="h-4 w-4" />
            Post a Job Today
          </a>
        </div>
      </div>
    </section>
  );
}
