import React, { useState } from "react";
import {
  FiBriefcase,
  FiUser,
  FiMenu,
  FiX,
  FiSliders,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiClock,
  FiHeart,
  FiBookmark,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const GREEN = "#0E5C4C";

const BuildingIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M3 21V9l6-4v4l6-4v16H3zm2-2h2v-2H5v2zm0-4h2v-2H5v2zm0-4h2V9H5v2zm6 8h2v-2h-2v2zm0-4h2v-2h-2v2zm6 4h2v-9h-2v9zM18 2l1 2 2 .3-1.5 1.4.4 2.1L18 6.7 16.1 7.8l.4-2.1L15 4.3 17 4l1-2z" />
  </svg>
);

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-amber-400">
      <BuildingIcon className="h-6 w-6 text-amber-400" />
    </div>
    <span className="text-xl font-extrabold tracking-tight text-white">Office Jobline</span>
  </div>
);



const CheckGroup = ({ title, items }) => (
  <div className="border-b border-slate-100 py-4">
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold text-slate-800">{title}</span>
      <FiChevronDown className="text-slate-400" />
    </div>
    <div className="mt-3 space-y-2.5">
      {items.map(([label, count]) => (
        <label key={label} className="flex cursor-pointer items-center justify-between text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#0E5C4C] focus:ring-[#0E5C4C]" />
            {label}
          </span>
          <span className="text-slate-400">({count})</span>
        </label>
      ))}
    </div>
  </div>
);

const Select = ({ title, placeholder }) => (
  <div className="border-b border-slate-100 py-4">
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold text-slate-800">{title}</span>
      <FiChevronDown className="text-slate-400" />
    </div>
    <select className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 outline-none focus:border-[#0E5C4C]">
      <option>{placeholder}</option>
    </select>
  </div>
);

const jobs = [
  { title: "Administrative Assistant", company: "Maple Ridge Solutions", initials: "M", color: "#0B1B3A", location: "Toronto, ON", type: "Full-time", mode: "On-site", pay: "$45,000 - $55,000 / year", desc: "Provide administrative support to ensure efficient daily office operations. Manage schedules, correspondence, and documentation with professionalism and attention to detail." },
  { title: "Receptionist", company: "Greenfield Offices", initials: "🌿", color: "#DFF3E8", location: "Vancouver, BC", type: "Full-time", mode: "On-site", pay: "$40,000 - $48,000 / year", desc: "Greet visitors, answer calls, and provide general administrative support. Maintain a welcoming front desk and ensure smooth office operations." },
  { title: "Office Coordinator", company: "Summit Business Group", initials: "S", color: "#0B1B3A", location: "Calgary, AB", type: "Full-time", mode: "Hybrid", pay: "$50,000 - $60,000 / year", desc: "Coordinate office activities, manage calendars, and support team members. Ensure efficient workflows and a well-organized office environment." },
  { title: "Executive Assistant", company: "NorthPoint Consulting", initials: "N", color: "#0B1B3A", location: "Ottawa, ON", type: "Full-time", mode: "Hybrid", pay: "$60,000 - $75,000 / year", desc: "Provide high-level administrative support to executives. Manage schedules, travel arrangements, and confidential documents with discretion." },
  { title: "Data Entry Clerk", company: "ProData Services", initials: "P", color: "#0E5C4C", location: "Montreal, QC", type: "Part-time", mode: "On-site", pay: "$38,000 - $45,000 / year", desc: "Accurately input and maintain data in databases and systems. Ensure data quality and support reporting requirements." },
  { title: "Customer Service Representative", company: "Bright Customer Care", initials: "B", color: "#F0B429", location: "Halifax, NS", type: "Full-time", mode: "Hybrid", pay: "$42,000 - $52,000 / year", desc: "Assist customers via phone, email, and chat. Resolve inquiries and provide excellent service to ensure customer satisfaction." },
  { title: "HR Assistant", company: "People First HR", initials: "P", color: "#7C3AED", location: "Edmonton, AB", type: "Full-time", mode: "On-site", pay: "$45,000 - $55,000 / year", desc: "Support HR functions including recruitment, onboarding, and employee records management. Help foster a positive workplace." },
  { title: "Office Manager", company: "Alpine Corporate Services", initials: "A", color: "#0B1B3A", location: "Winnipeg, MB", type: "Full-time", mode: "On-site", pay: "$65,000 - $80,000 / year", desc: "Oversee daily office operations, manage budgets, and lead administrative staff. Ensure efficiency and a productive work environment." },
];

const JobCard = ({ job }) => (
  <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3">
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: job.color }}
        >
          {job.initials}
        </div>
        <div>
          <h3 className="font-bold text-slate-900">{job.title}</h3>
          <p className="text-sm font-medium" style={{ color: GREEN }}>
            {job.company}
          </p>
        </div>
      </div>
      <button aria-label="Save" className="text-slate-300 transition hover:text-rose-500">
        <FiHeart />
      </button>
    </div>

    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 sm:text-sm">
      <span className="flex items-center gap-1">
        <FiMapPin /> {job.location}
      </span>
      <span className="flex items-center gap-1">
        <FiBriefcase /> {job.type}
      </span>
      <span className="flex items-center gap-1">
        <HiOutlineOfficeBuilding /> {job.mode}
      </span>
    </div>

    <p className="mt-2 text-sm font-bold text-slate-900">{job.pay}</p>
    <p className="mt-2 text-sm text-slate-500">{job.desc}</p>

    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
      <button
        className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        style={{ backgroundColor: GREEN }}
      >
        Apply Now
      </button>
      <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300">
        Save Job <FiBookmark />
      </button>
    </div>
  </div>
);

export default function JobListings() {
  return (
    <div className="bg-slate-50 font-sans">

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-bold text-slate-900">
                <FiSliders /> Filter Jobs
              </h3>
              <button className="text-sm font-semibold" style={{ color: GREEN }}>
                Clear All
              </button>
            </div>

            <CheckGroup
              title="Job Type"
              items={[
                ["Full-time", "6,234"],
                ["Part-time", "1,842"],
                ["Contract", "1,256"],
                ["Temporary", "668"],
                ["Internship", "312"],
              ]}
            />
            <CheckGroup
              title="Work Mode"
              items={[
                ["On-site", "6,078"],
                ["Hybrid", "1,876"],
                ["Remote", "1,102"],
              ]}
            />
            <CheckGroup
              title="Experience Level"
              items={[
                ["Entry Level", "2,356"],
                ["1-3 Years", "3,412"],
                ["3-5 Years", "2,648"],
                ["5+ Years", "1,596"],
              ]}
            />
            <Select title="Province" placeholder="Select province" />

            <div className="border-b border-slate-100 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800">Salary Range</span>
                <FiChevronDown className="text-slate-400" />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <select className="w-full rounded-lg border border-slate-200 px-2 py-2 text-xs text-slate-500 outline-none focus:border-[#0E5C4C]">
                  <option>Min Salary</option>
                </select>
                <span className="text-slate-400">to</span>
                <select className="w-full rounded-lg border border-slate-200 px-2 py-2 text-xs text-slate-500 outline-none focus:border-[#0E5C4C]">
                  <option>Max Salary</option>
                </select>
              </div>
            </div>

            <Select title="Category" placeholder="Select category" />

            <button
              className="mt-5 w-full rounded-lg py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: GREEN }}
            >
              Show Results
            </button>
            <button className="mt-3 w-full text-center text-sm font-semibold" style={{ color: GREEN }}>
              Reset Filters
            </button>
          </aside>

          {/* Listings */}
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                <span className="font-bold text-slate-900">10,247</span> jobs found
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Sort by:</span>
                <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#0E5C4C]">
                  <option>Most Relevant</option>
                </select>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {jobs.map((job) => (
                <JobCard key={job.title} job={job} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-1">
                <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-slate-300">
                  <FiChevronLeft />
                </button>
                {["1", "2", "3", "...", "256"].map((p) => (
                  <button
                    key={p}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold ${
                      p === "1" ? "text-white" : "border border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                    style={p === "1" ? { backgroundColor: GREEN } : {}}
                  >
                    {p}
                  </button>
                ))}
                <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300">
                  <FiChevronRight />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                Show:
                <select className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-[#0E5C4C]">
                  <option>12 per page</option>
                </select>
              </div>
            </div>

            <p className="mt-6 flex items-center gap-1 text-xs text-slate-500 sm:text-sm">
              Browse office and administrative jobs across Canada. New opportunities added
              daily. <span aria-hidden>🍁</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
