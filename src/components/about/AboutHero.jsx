import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import {
  HiOutlineBuildingOffice2,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { GiMapleLeaf } from "react-icons/gi";

// ✅ Data directly in component - No import from data/about
const aboutPillars = [
  {
    icon: HiOutlineShieldCheck,
    title: "Trusted Office Job Board",
    desc: "Quality listings from verified employers across a wide range of office and administrative roles.",
  },
  {
    icon: GiMapleLeaf,
    title: "Canada-Wide Reach",
    desc: "Opportunities in cities, towns, and remote locations—connecting talent and employers nationwide.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Built for Employers & Job Seekers",
    desc: "Powerful tools and resources that simplify hiring and help careers grow.",
  },
];

const aboutContent = {
  title: "About Office Jobline",
  subtitle: "Connecting office talent with opportunities across Canada.",
  description1:
    "Office Jobline is Canada's dedicated platform for office and administrative professionals and the employers who hire them.",
  description2:
    "We make it easy to discover rewarding careers, connect with trusted employers, and build stronger teams—from coast to coast to coast.",
  missionButton: "Our Mission",
  image:
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80",
  imageAlt:
    "Office professionals collaborating around a laptop",
  whoWeAreTitle: "Who We Are",
  whoWeAreDescription:
    "We're more than a job board. Office Jobline is a Canadian platform built to support office professionals and the organizations that rely on them.",
};

const aboutStats = [
  {
    value: "10,000+",
    label: "Active Jobs",
    desc: "Office and administrative positions across Canada",
  },
  {
    value: "2,000+",
    label: "Employers",
    desc: "Trusted companies hiring right now",
  },
  {
    value: "95%",
    label: "Satisfaction Rate",
    desc: "From employers and job seekers alike",
  },
];

export default function AboutHero() {
  const navigate = useNavigate();

  // Handle Our Mission button
  const handleMissionClick = () => {
    navigate("/about-us#mission");
  };

  return (
    <section id="about" className="bg-white">
      {/* Hero banner */}
      <div className="bg-offwhite">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
          <div>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-navy sm:text-5xl lg:text-[3.2rem]">
              {aboutContent.title}
            </h1>
            <p className="mt-4 text-lg font-semibold text-teal">
              {aboutContent.subtitle}
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              {aboutContent.description1}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              {aboutContent.description2}
            </p>
            <button
              onClick={handleMissionClick}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              {aboutContent.missionButton}
              <FiArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="h-72 w-full overflow-hidden rounded-2xl sm:h-96 lg:h-[420px]">
            <img
              src={aboutContent.image}
              alt={aboutContent.imageAlt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Who We Are */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex w-full max-w-md items-center gap-4">
            <span className="h-px flex-1 bg-gold" />
            <HiOutlineBuildingOffice2 className="h-7 w-7 shrink-0 text-gold" />
            <span className="h-px flex-1 bg-gold" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">
            {aboutContent.whoWeAreTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {aboutContent.whoWeAreDescription}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {aboutPillars.map(({ icon: Icon, title, desc }) => (
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

        {/* Stats Section */}
        {aboutStats && aboutStats.length > 0 && (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {aboutStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm"
              >
                <p className="text-3xl font-extrabold text-teal">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold text-navy">{stat.label}</p>
                <p className="mt-1 text-xs text-muted">{stat.desc}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 flex items-center gap-4">
          <span className="h-px flex-1 bg-gold" />
          <GiMapleLeaf className="h-5 w-5 shrink-0 text-gold" />
          <span className="h-px flex-1 bg-gold" />
        </div>
      </div>
    </section>
  );
}