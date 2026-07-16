import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GiMapleLeaf } from "react-icons/gi";
import {
  featuredJobs,
  filterOptions,
  filterGroups,
  jobTypes,
  salaryRanges,
  jobCategories,
} from "../../data/job"; 
import { provinces } from "../../data/employers";

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

const CheckGroup = ({ title, items, onItemClick }) => (
  <div className="border-b border-slate-100 py-4">
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold text-slate-800">{title}</span>
      <FiChevronDown className="text-slate-400" />
    </div>
    <div className="mt-3 space-y-2.5">
      {items.map(([label, count]) => (
        <label key={label} className="flex cursor-pointer items-center justify-between text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <input 
              type="checkbox" 
              className="h-4 w-4 rounded border-slate-300 text-[#0E5C4C] focus:ring-[#0E5C4C]" 
              onChange={() => onItemClick && onItemClick(label)}
            />
            {label}
          </span>
          <span className="text-slate-400">({count})</span>
        </label>
      ))}
    </div>
  </div>
);

const Select = ({ title, placeholder, options, onChange }) => (
  <div className="border-b border-slate-100 py-4">
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold text-slate-800">{title}</span>
      <FiChevronDown className="text-slate-400" />
    </div>
    <select 
      className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 outline-none focus:border-[#0E5C4C]"
      onChange={onChange}
    >
      <option value="">{placeholder}</option>
      {options && options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const JobCard = ({ job, onApply, onSave, onSaveJob }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (onSaveJob) onSaveJob(job.id);
  };

  return (
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
        <button 
          onClick={handleSave}
          aria-label="Save" 
          className={`transition ${isSaved ? 'text-rose-500' : 'text-slate-300 hover:text-rose-500'}`}
        >
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
          onClick={() => onApply && onApply(job.id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: GREEN }}
        >
          Apply Now
        </button>
        <button 
          onClick={() => onSave && onSave(job.id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
        >
          Save Job <FiBookmark />
        </button>
      </div>
    </div>
  );
};

export default function JobListings() {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState([]);
  const totalPages = 256;

  // Handle filter selection
  const handleFilterClick = (filter) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  // Handle Clear All Filters
  const handleClearAll = () => {
    setSelectedFilters([]);
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  };

  // Handle Reset Filters
  const handleResetFilters = () => {
    setSelectedFilters([]);
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('select').forEach(sel => sel.selectedIndex = 0);
  };

  // Handle Show Results
  const handleShowResults = () => {
    const params = new URLSearchParams();
    if (selectedFilters.length > 0) {
      params.append('filters', selectedFilters.join(','));
    }
    navigate(`/browse?${params.toString()}`);
  };

  // Handle Apply Job
  const handleApply = (jobId) => {
    navigate(`/post-a-job?jobId=${jobId}`);
  };

  // Handle Save Job
  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  // Handle Pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle Sort Change
  const handleSortChange = (e) => {
    const value = e.target.value;
    console.log('Sort by:', value);
  };

  // Handle Per Page Change
  const handlePerPageChange = (e) => {
    const value = e.target.value;
    console.log('Show:', value);
  };

  // Handle Province Select
  const handleProvinceChange = (e) => {
    const value = e.target.value;
    if (value) {
      navigate(`/browse?location=${encodeURIComponent(value)}`);
    }
  };

  // Handle Category Select
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value) {
      navigate(`/browse?category=${encodeURIComponent(value)}`);
    }
  };

  // Get category names for select
  const categoryNames = jobCategories.items.map(item => item.title);

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
              <button 
                onClick={handleClearAll}
                className="text-sm font-semibold transition hover:opacity-80" 
                style={{ color: GREEN }}
              >
                Clear All
              </button>
            </div>

            <CheckGroup
              title="Job Type"
              items={filterGroups.jobType}
              onItemClick={handleFilterClick}
            />
            <CheckGroup
              title="Work Mode"
              items={filterGroups.workMode}
              onItemClick={handleFilterClick}
            />
            <CheckGroup
              title="Experience Level"
              items={filterGroups.experience}
              onItemClick={handleFilterClick}
            />
            <Select 
              title="Province" 
              placeholder="Select province"
              options={provinces}
              onChange={handleProvinceChange}
            />

            <div className="border-b border-slate-100 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800">Salary Range</span>
                <FiChevronDown className="text-slate-400" />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <select className="w-full rounded-lg border border-slate-200 px-2 py-2 text-xs text-slate-500 outline-none focus:border-[#0E5C4C]">
                  <option>Min Salary</option>
                  <option>$30,000</option>
                  <option>$40,000</option>
                  <option>$50,000</option>
                  <option>$60,000</option>
                  <option>$70,000</option>
                </select>
                <span className="text-slate-400">to</span>
                <select className="w-full rounded-lg border border-slate-200 px-2 py-2 text-xs text-slate-500 outline-none focus:border-[#0E5C4C]">
                  <option>Max Salary</option>
                  <option>$50,000</option>
                  <option>$60,000</option>
                  <option>$70,000</option>
                  <option>$80,000</option>
                  <option>$100,000</option>
                </select>
              </div>
            </div>

            <Select 
              title="Category" 
              placeholder="Select category"
              options={categoryNames}
              onChange={handleCategoryChange}
            />

            <button
              onClick={handleShowResults}
              className="mt-5 w-full rounded-lg py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: GREEN }}
            >
              Show Results
            </button>
            <button 
              onClick={handleResetFilters}
              className="mt-3 w-full text-center text-sm font-semibold transition hover:opacity-80" 
              style={{ color: GREEN }}
            >
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
                <select 
                  onChange={handleSortChange}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#0E5C4C]"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Salary</option>
                  <option value="lowest">Lowest Salary</option>
                </select>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {featuredJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onApply={handleApply}
                  onSaveJob={handleSaveJob}
                  isSaved={savedJobs.includes(job.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-slate-300 ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FiChevronLeft />
                </button>
                {[1, 2, 3, 4, 5, '...', totalPages].map((p, index) => {
                  if (p === '...') {
                    return (
                      <span key={`ellipsis-${index}`} className="flex h-9 w-9 items-center justify-center text-sm text-slate-400">
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold ${
                        p === currentPage 
                          ? 'text-white' 
                          : 'border border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                      style={p === currentPage ? { backgroundColor: GREEN } : {}}
                    >
                      {p}
                    </button>
                  );
                })}
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FiChevronRight />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                Show:
                <select 
                  onChange={handlePerPageChange}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-[#0E5C4C]"
                >
                  <option value="12">12 per page</option>
                  <option value="24">24 per page</option>
                  <option value="48">48 per page</option>
                  <option value="96">96 per page</option>
                </select>
              </div>
            </div>

            <p className="mt-6 flex items-center gap-1 text-xs text-slate-500 sm:text-sm">
              Browse office and administrative jobs across Canada. New opportunities added
              daily. <GiMapleLeaf className="inline-block h-3 w-3" />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}