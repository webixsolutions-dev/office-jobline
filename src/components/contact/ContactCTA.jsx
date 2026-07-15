import { FiSearch, FiBriefcase } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { GiMapleLeaf } from "react-icons/gi";

export default function CTASection() {
  return (
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
          <a
            href="#browse-jobs"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0d9488] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0f766e] sm:w-auto"
          >
            <FiSearch className="h-4 w-4" />
            Browse Jobs
          </a>
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
  );
}