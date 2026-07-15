import { FiArrowRight, FiSearch, FiBriefcase, FiMapPin, FiMail, FiPhone, FiClock } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const ARTICLES = [
  {
    tag: "Job Seeker Tips",
    title: "Resume Tips for Office Jobs",
    desc: "Learn how to craft a strong resume that gets noticed by office employers.",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
  },
  {
    tag: "Career Advice",
    title: "Interview Tips for Administrative Roles",
    desc: "Prepare with confidence and stand out in your next office job interview.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
  },
  {
    tag: "For Employers",
    title: "Hiring Support for Office Employers",
    desc: "Find the right office talent faster with expert hiring support and tools.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
];

const QUICK_LINKS = ["Home", "Browse Jobs", "Employers", "About Us", "Contact Us"];
const EMPLOYER_LINKS = [
  "Post a Job",
  "Browse Candidates",
  "Employer Pricing",
  "Hiring Resources",
  "Help Centre",
];
const SOCIALS = [
  { icon: FaLinkedinIn, label: "LinkedIn" },
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaYoutube, label: "YouTube" },
];

export default function CareerSupport() {
  return (
    <section className="bg-white">
  

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Career Support &amp; Hiring Insights
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
          Expert tips, resources, and insights to help job seekers grow their
          careers and employers build strong office teams.
        </p>

        {/* Articles */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map(({ tag, title, desc, image }) => (
            <div
              key={title}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
            >
              <img
                src={image}
                alt={title}
                className="h-44 w-full object-cover"
              />
              <div className="p-6">
                <span className="inline-block rounded-full bg-teal-light px-3 py-1 text-xs font-semibold text-teal">
                  {tag}
                </span>
                <p className="mt-3 font-display text-lg font-bold text-navy">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {desc}
                </p>
                <a
                  href="#read-more"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-teal-dark"
                >
                  Read More
                  <FiArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      
      </div>

      
    </section>
  );
}
