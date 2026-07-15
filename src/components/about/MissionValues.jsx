import { FiArrowRight, FiBriefcase, FiTrendingUp, FiCheckCircle, FiShield } from "react-icons/fi";
import { HiOutlineBuildingOffice2, HiOutlineUserGroup } from "react-icons/hi2";
import { GiMapleLeaf } from "react-icons/gi";

const VALUES = [
  {
    icon: FiShield,
    title: "Trust",
    desc: "We're committed to transparency, fairness, and protecting the trust of our community.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Inclusion",
    desc: "We welcome talent from all backgrounds and believe diverse teams build stronger workplaces.",
  },
  {
    icon: FiCheckCircle,
    title: "Simplicity",
    desc: "We make the job search and hiring process straightforward and stress-free.",
  },
  {
    icon: FiTrendingUp,
    title: "Growth",
    desc: "We support career growth and help businesses and people move forward.",
  },
];

const STATS = [
  {
    icon: FiBriefcase,
    value: "10,000+",
    label: "Office Jobs",
    desc: "New opportunities added every week",
  },
  {
    icon: HiOutlineUserGroup,
    value: "2,000+",
    label: "Employers",
    desc: "Trusted by organizations across Canada",
  },
  {
    icon: GiMapleLeaf,
    value: "Canada-Wide Reach",
    label: "",
    desc: "Opportunities in cities, towns, and communities coast to coast",
  },
];

export default function MissionValues() {
  return (
    <section className="bg-offwhite">

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="flex flex-col items-center text-center">
          <div className="flex w-full max-w-md items-center gap-4">
            <span className="h-px flex-1 bg-gold" />
            <HiOutlineBuildingOffice2 className="h-7 w-7 shrink-0 text-gold" />
            <span className="h-px flex-1 bg-gold" />
          </div>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-teal">
            Our Mission &amp; Values
          </p>
          <h2
            id="mission"
            className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl"
          >
            Our Mission
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Office Jobline connects office professionals with meaningful
            opportunities and helps employers find the talent they
            need—across cities, towns, and communities in Canada.
          </p>
        </div>

        {/* Mission image + vision */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="h-64 w-full overflow-hidden rounded-2xl sm:h-80 lg:h-96">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="Team collaborating over a laptop in the office"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
              Our Vision
            </h3>
            <span className="mt-2 block h-1 w-14 rounded-full bg-gold" />
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              To be Canada's most trusted platform for office and
              administrative careers—empowering people and organizations to
              build stronger, more connected workplaces.
            </p>
            <a
              href="#browse-jobs"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Explore Jobs
              <FiArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Values */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, desc }) => (
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

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 divide-y divide-gray-200 rounded-2xl bg-white p-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:p-8">
          {STATS.map(({ icon: Icon, value, label, desc }) => (
            <div
              key={value}
              className="flex items-start gap-4 py-4 first:pt-0 sm:px-6 sm:py-0 sm:first:pl-0 sm:last:pr-0"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal">
                <Icon className="h-6 w-6 text-white" />
              </span>
              <div>
                <p className="font-display text-xl font-extrabold text-navy">
                  {value}
                </p>
                {label && (
                  <p className="text-sm font-semibold text-navy">{label}</p>
                )}
                <p className="mt-1 text-sm text-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
