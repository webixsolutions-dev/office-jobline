import {
  FiSearch,
  FiBriefcase,
  FiMail,
  FiArrowRight,
  FiMapPin,
  FiPhone,
  FiClock,
  FiHeadphones,
} from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { GiMapleLeaf } from "react-icons/gi";
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

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

const QUICK_LINKS = ["Browse Jobs", "Employers", "About Us", "Contact Us", "Career Resources"];
const EMPLOYER_LINKS = [
  "Post a Job",
  "Browse Resumes",
  "Hiring Solutions",
  "Pricing",
  "Employer Support",
];
const SOCIALS = [
  { icon: FaLinkedinIn, label: "LinkedIn" },
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaYoutube, label: "YouTube" },
];

export default function HomeCTA() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* CTA banner - Navy background with gold accent */}
        <div className="relative overflow-hidden rounded-2xl bg-[#1a2a4a] px-6 py-14 text-center sm:px-10">
          <HiOutlineBuildingOffice2 className="pointer-events-none absolute -right-6 bottom-0 hidden h-64 w-64 text-white/5 sm:block" />
          <div className="relative">
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Find Office Opportunities or Hire Great Talent?
            </h2>
            <div className="mt-5 flex items-center justify-center gap-4">
              <span className="h-px w-24 bg-[#d4af37]" />
              <GiMapleLeaf className="h-4 w-4 shrink-0 text-[#d4af37]" />
              <span className="h-px w-24 bg-[#d4af37]" />
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-sm text-white/75 sm:text-base">
              Join thousands of office professionals and employers building
              successful careers and teams across Canada.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* Browse Jobs - Teal/Green button */}
              <a
                href="#browse-jobs"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0d9488] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0f766e] sm:w-auto"
              >
                <FiSearch className="h-4 w-4" />
                Browse Jobs
              </a>
              {/* Post a Job - Gold button */}
              <a
                href="#post-job"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d4af37] px-6 py-3 text-sm font-semibold text-[#1a2a4a] transition-colors hover:bg-[#b8960f] sm:w-auto"
              >
                <FiBriefcase className="h-4 w-4" />
                Post a Job
              </a>
            </div>
          </div>
        </div>

      
      </div>

    
    </section>
  );
}