import React from "react";
import {
  FiSend,
  FiFileText,
  FiMapPin,
  FiChevronDown,
  FiDollarSign,
  FiLock,
  FiUsers,
  FiShield,
} from "react-icons/fi";

const BuildingIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M3 21V9l6-4v4l6-4v16H3zm2-2h2v-2H5v2zm0-4h2v-2H5v2zm0-4h2V9H5v2zm6 8h2v-2h-2v2zm0-4h2v-2h-2v2zm6 4h2v-9h-2v9z" />
  </svg>
);

const TrustPill = ({ icon, children }) => (
  <div className="flex items-center gap-2">
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-500">
      {icon}
    </div>
    <span className="text-sm font-medium text-slate-700">{children}</span>
  </div>
);

export default function PostJobHero() {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/95 to-slate-50/30" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        {/* Left content */}
        <div>
          <span className="text-xs font-bold tracking-[0.2em] text-amber-500 sm:text-sm">
            POST A JOB
          </span>
          <div className="mt-2 h-1 w-10 bg-amber-400" />
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            Post Office &amp; Administrative Jobs Across Canada
          </h1>
          <p className="mt-4 max-w-xl text-slate-500">
            Connect with qualified office professionals across Canada. Post your job and find
            the right talent for roles like office managers, receptionists, executive
            assistants, customer service representatives, payroll clerks, data entry clerks,
            and coordinators.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-[#0B1B3A] transition hover:bg-amber-300">
              <FiSend /> Start Posting
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-amber-400 bg-white px-6 py-3 text-sm font-semibold text-[#0B1B3A] transition hover:bg-amber-50">
              <FiFileText /> View Plans
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            <TrustPill icon={<FiUsers size={16} />}>
              Reach Qualified
              <br />
              Office Talent
            </TrustPill>
            <TrustPill icon={<span aria-hidden>🍁</span>}>
              Canada-Wide
              <br />
              Exposure
            </TrustPill>
            <TrustPill icon={<FiShield size={16} />}>
              Trusted by
              <br />
              Employers Nationwide
            </TrustPill>
          </div>
        </div>

        {/* Right form card */}
        <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-100 sm:p-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <BuildingIcon className="h-7 w-7 text-amber-400" />
            <h3 className="text-lg font-extrabold text-slate-900">Start Posting Your Job</h3>
          </div>

          <form className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Job Title</label>
              <input
                type="text"
                placeholder="e.g. Office Manager"
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm placeholder-slate-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Location</label>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
                <FiMapPin className="text-slate-400" />
                <input
                  type="text"
                  placeholder="City, province or region"
                  className="w-full text-sm text-slate-700 placeholder-slate-400 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Job Type</label>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-400 focus-within:border-amber-400">
                <span>Select job type</span>
                <FiChevronDown />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Salary Range</label>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-400 focus-within:border-amber-400">
                <span className="flex items-center gap-2">
                  <FiDollarSign /> Select salary range
                </span>
                <FiChevronDown />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Company Name</label>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
                <BuildingIcon className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Your company name"
                  className="w-full text-sm text-slate-700 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            <p className="flex items-center gap-2 text-xs text-slate-400">
              <FiLock /> Your information is secure and will not be shared.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
