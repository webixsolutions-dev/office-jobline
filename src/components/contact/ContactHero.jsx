import React from "react";
import {
  FiMail,
  FiPhone,
  FiClock,
  FiSend,
  FiMapPin,
} from "react-icons/fi";

const InfoRow = ({ icon, title, children }) => (
  <div className="flex gap-4 border-b border-slate-100 py-4 last:border-b-0">
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0B1B3A] text-amber-400">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-slate-900">{title}</h4>
      <div className="mt-0.5 text-sm text-slate-600">{children}</div>
    </div>
  </div>
);

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="flex flex-col lg:grid lg:grid-cols-[1.2fr_1fr]">
        {/* Left content */}
        <div className="px-4 py-12 sm:px-6 md:px-8 lg:px-12 lg:py-16 xl:px-16 xl:py-20">
          <span className="text-xs font-bold tracking-[0.2em] text-amber-500 sm:text-sm">
            CONTACT US
          </span>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            Contact Office Jobline
          </h1>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Connecting job seekers and employers across Canada.
          </p>
          <p className="mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
            We're here to help! Whether you're looking for office jobs or administrative jobs,
            need employer support, or want assistance hiring top talent in Canada, our team is
            ready to assist you.
          </p>

          <div className="mt-8 flex flex-col gap-6 md:grid md:grid-cols-[1.3fr_1fr] lg:mt-10">
            {/* Form card */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6 md:p-7">
              <div className="flex items-start gap-3 sm:items-center">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0B1B3A] text-amber-400">
                  <FiMail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Send us a message</h3>
                  <p className="text-xs text-slate-500 sm:text-sm">
                    Fill out the form below and we'll get back to you shortly.
                  </p>
                </div>
              </div>

              <form className="mt-5 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 sm:text-sm">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm placeholder:text-sm placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 sm:px-4 sm:py-2.5"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 sm:text-sm">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm placeholder:text-sm placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 sm:px-4 sm:py-2.5"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 sm:text-sm">
                    Subject
                  </label>
                  <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 sm:px-4 sm:py-2.5">
                    <option>Select or type a subject</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 sm:text-sm">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="How can we help you?"
                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm placeholder:text-sm placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 sm:px-4 sm:py-2.5"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B1B3A] py-2.5 text-sm font-semibold text-white transition hover:bg-[#132a56] sm:py-3"
                >
                  <FiSend className="h-4 w-4" /> Send Message
                </button>
              </form>
            </div>

            {/* Contact info card */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6 md:p-7">
              <h3 className="mb-1 font-bold text-slate-900">Contact Information</h3>
              <div className="mt-2 space-y-0">
                <InfoRow icon={<FiMail className="h-4 w-4" />} title="Email Us">
                  <a href="mailto:info@officejobline.com" className="font-semibold text-amber-500 hover:underline">
                    info@officejobline.com
                  </a>
                  <p className="text-xs text-slate-500">We aim to reply within one business day.</p>
                </InfoRow>
                <InfoRow icon={<FiPhone className="h-4 w-4" />} title="Call Us">
                  <a href="tel:+16475550198" className="font-semibold text-amber-500 hover:underline">
                    +1 (647) 555-0198
                  </a>
                  <p className="text-xs text-slate-500">Mon – Fri, 9:00 AM – 5:00 PM ET</p>
                </InfoRow>
                <InfoRow icon={<FiClock className="h-4 w-4" />} title="Office Hours">
                  <p className="text-sm">Monday – Friday</p>
                  <p className="text-sm">9:00 AM – 5:00 PM ET</p>
                  <p className="text-xs text-slate-500">Closed on weekends and statutory holidays.</p>
                </InfoRow>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-xs text-slate-700 sm:px-4 sm:py-3 sm:text-sm">
                <FiMapPin className="flex-shrink-0 text-amber-500" />
                <span>Proudly supporting job seekers and employers across Canada. 🍁</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - real office photo with navy gradient overlay + logo lockup */}
        <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-full">
          {/* Background photo */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80')",
            }}
          />
          {/* Navy gradient overlay so the photo reads on-brand and text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B3A]/95 via-[#0B1B3A]/70 to-[#0B1B3A]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/60 via-transparent to-transparent" />

          {/* Logo lockup */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <svg viewBox="0 0 24 24" className="h-16 w-16 text-amber-400 drop-shadow-lg sm:h-20 sm:w-20" fill="currentColor">
              <path d="M3 21V9l6-4v4l6-4v16H3zm2-2h2v-2H5v2zm0-4h2v-2H5v2zm0-4h2V9H5v2zm6 8h2v-2h-2v2zm0-4h2v-2h-2v2zm6 4h2v-9h-2v9z" />
            </svg>
            <span className="mt-2 text-2xl font-extrabold text-white drop-shadow-lg sm:text-3xl">
              Office Jobline
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
