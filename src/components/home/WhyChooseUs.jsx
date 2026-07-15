
import { FiBriefcase, FiBell, FiFileText, FiArrowRight, FiUser } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FaRegClipboard } from "react-icons/fa";
import { LuMonitor } from "react-icons/lu";
import { HiOutlineChatBubbleLeftRight, HiOutlineBriefcase } from "react-icons/hi2";
import { GiMapleLeaf } from "react-icons/gi";

const FEATURES = [
  {
    icon: FiBriefcase,
    title: "Curated Office Jobs",
    desc: "Handpicked office and administrative roles from reputable employers across Canada.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Top Canadian Employers",
    desc: "Access opportunities from leading companies that value office talent like yours.",
  },
  {
    icon: FiBell,
    title: "Fast Job Alerts",
    desc: "Get notified about new office jobs that match your skills and preferences.",
  },
  {
    icon: FiFileText,
    title: "Easy Applications",
    desc: "Apply quickly and easily with a streamlined process designed to save you time.",
  },
];

const CATEGORIES = [
  { icon: FiUser, title: "Administrative Assistant", jobs: "2,845 Jobs" },
  { icon: FiUser, title: "Receptionist", jobs: "1,826 Jobs" },
  { icon: HiOutlineBriefcase, title: "Executive Assistant", jobs: "1,695 Jobs" },
  { icon: FaRegClipboard, title: "Office Manager", jobs: "1,232 Jobs" },
  { icon: LuMonitor, title: "Data Entry Clerk", jobs: "1,418 Jobs" },
  { icon: HiOutlineChatBubbleLeftRight, title: "Customer Service Representative", jobs: "2,159 Jobs" },
];

export default function WhyChoose() {
  return (
    <section className="bg-white">
    

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Why Choose Office Jobline
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-muted sm:text-lg">
          Office Jobline is Canada's trusted job board for office and
          administrative professionals. Whether you're looking for
          receptionist jobs, executive assistant roles, office coordinator
          jobs, HR support jobs, customer service office roles, or data entry
          opportunities, we connect you with quality employers hiring across
          Canada.
        </p>

        {/* Feature cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

        {/* Categories */}
        <h2 className="mt-16 font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Popular Office Job Categories
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map(({ icon: Icon, title, jobs }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-light">
                <Icon className="h-6 w-6 text-teal" />
              </span>
              <p className="mt-4 font-display text-sm font-bold text-navy">
                {title}
              </p>
              <div className="mt-4 w-full border-t border-gray-100 pt-3">
                <p className="text-sm text-muted">{jobs}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-10 flex flex-col items-start gap-5 rounded-2xl bg-teal-light p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal">
              <GiMapleLeaf className="h-7 w-7 text-white" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-navy">
                Find office and administrative jobs across Canada
              </p>
              <p className="mt-1 text-sm text-muted">
                Explore thousands of opportunities in cities and communities
                from coast to coast.
              </p>
            </div>
          </div>
          <a
            href="#browse-jobs"
            className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-dark sm:w-auto"
          >
            Browse All Jobs
            <FiArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
