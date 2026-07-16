import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSend,
  FiFileText,
  FiMapPin,
  FiChevronDown,
  FiDollarSign,
  FiLock,
  FiUsers,
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { GiMapleLeaf } from "react-icons/gi";

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
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    jobType: "",
    salaryRange: "",
    companyName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    jobType: false,
    salary: false,
  });

  // Job type options
  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Internship",
    "Freelance",
  ];

  // Salary range options
  const salaryRanges = [
    "$30,000 - $40,000",
    "$40,000 - $50,000",
    "$50,000 - $60,000",
    "$60,000 - $75,000",
    "$75,000 - $90,000",
    "$90,000 - $110,000",
    "$110,000+",
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle dropdown selection
  const handleSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsDropdownOpen((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  // Toggle dropdown
  const toggleDropdown = (field) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validate required fields
    if (!formData.jobTitle || !formData.location || !formData.jobType || 
        !formData.salaryRange || !formData.companyName) {
      setSubmitStatus('error');
      setSubmitStatus('Please fill in all required fields');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    try {
      // API call - replace with your actual endpoint
      const response = await fetch('https://your-api-endpoint.com/post-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          jobTitle: "",
          location: "",
          jobType: "",
          salaryRange: "",
          companyName: "",
        });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error('Error posting job:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Start Posting button - scroll to form
  const handleStartPosting = () => {
    const formElement = document.getElementById('postJobForm');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle View Plans button - redirect to Employer Pricing
  const handleViewPlans = () => {
    navigate('/pricing');
  };

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
            <button 
              onClick={handleStartPosting}
              className="flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-[#0B1B3A] transition hover:bg-amber-300"
            >
              <FiSend /> Start Posting
            </button>
            <button 
              onClick={handleViewPlans}
              className="flex items-center justify-center gap-2 rounded-lg border border-amber-400 bg-white px-6 py-3 text-sm font-semibold text-[#0B1B3A] transition hover:bg-amber-50"
            >
              <FiFileText /> View Plans
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            <TrustPill icon={<FiUsers size={16} />}>
              Reach Qualified
              <br />
              Office Talent
            </TrustPill>
            <TrustPill icon={<GiMapleLeaf size={16} />}>
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
        <div id="postJobForm" className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-100 sm:p-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <BuildingIcon className="h-7 w-7 text-amber-400" />
            <h3 className="text-lg font-extrabold text-slate-900">Start Posting Your Job</h3>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
              <FiCheckCircle className="h-5 w-5 text-green-500" />
              Job posted successfully! We'll review and publish it shortly.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              <FiAlertCircle className="h-5 w-5 text-red-500" />
              {typeof submitStatus === 'string' ? submitStatus : 'Failed to post job. Please try again.'}
            </div>
          )}

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Job Title *</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Office Manager"
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm placeholder-slate-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Location *</label>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
                <FiMapPin className="text-slate-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, province or region"
                  required
                  className="w-full text-sm text-slate-700 placeholder-slate-400 outline-none"
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="mb-1 block text-sm font-semibold text-slate-700">Job Type *</label>
              <div 
                className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700"
                onClick={() => toggleDropdown('jobType')}
              >
                <span className={formData.jobType ? 'text-slate-700' : 'text-slate-400'}>
                  {formData.jobType || 'Select job type'}
                </span>
                <FiChevronDown className={`transition-transform ${isDropdownOpen.jobType ? 'rotate-180' : ''}`} />
              </div>
              {isDropdownOpen.jobType && (
                <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
                  {jobTypes.map((type) => (
                    <div
                      key={type}
                      className="cursor-pointer px-4 py-2 text-sm hover:bg-amber-50"
                      onClick={() => handleSelect('jobType', type)}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative">
              <label className="mb-1 block text-sm font-semibold text-slate-700">Salary Range *</label>
              <div 
                className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700"
                onClick={() => toggleDropdown('salary')}
              >
                <span className={`flex items-center gap-2 ${formData.salaryRange ? 'text-slate-700' : 'text-slate-400'}`}>
                  <FiDollarSign /> {formData.salaryRange || 'Select salary range'}
                </span>
                <FiChevronDown className={`transition-transform ${isDropdownOpen.salary ? 'rotate-180' : ''}`} />
              </div>
              {isDropdownOpen.salary && (
                <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
                  {salaryRanges.map((range) => (
                    <div
                      key={range}
                      className="cursor-pointer px-4 py-2 text-sm hover:bg-amber-50"
                      onClick={() => handleSelect('salaryRange', range)}
                    >
                      {range}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Company Name *</label>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
                <BuildingIcon className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your company name"
                  required
                  className="w-full text-sm text-slate-700 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            <p className="flex items-center gap-2 text-xs text-slate-400">
              <FiLock /> Your information is secure and will not be shared.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex w-full items-center justify-center gap-2 rounded-lg bg-amber-400 py-3 text-sm font-semibold text-[#0B1B3A] transition ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-amber-300'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Posting Job...
                </>
              ) : (
                <>
                  <FiSend className="h-4 w-4" /> Post Job
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}