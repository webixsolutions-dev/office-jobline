import React, { useState } from "react";
import { FiBriefcase, FiPhone, FiHelpCircle, FiChevronDown } from "react-icons/fi";

const GREEN = "#0E5C4C";

const faqs = [
  "How much does it cost to post a job?",
  "How long will my job posting stay active?",
  "Can I edit or update my job posting after it's live?",
  "What types of office and administrative jobs can I post?",
];

const FaqItem = ({ question }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-slate-800 sm:px-6"
      >
        {question}
        <FiChevronDown className={`flex-shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-slate-500 sm:px-6">
          Reach out to our support team or check your employer dashboard for the most up to
          date details on this.
        </div>
      )}
    </div>
  );
};

export default function CTAFAQ() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      {/* CTA banner */}
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 rounded-2xl bg-[#0B1B3A] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-400">
            <FiBriefcase size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to Post Your Office Job?
            </h2>
            <p className="mt-1 max-w-lg text-sm text-slate-300">
              Reach thousands of qualified office professionals across Canada and find the
              right talent for your team.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button className="flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-[#0B1B3A] transition hover:bg-amber-300">
            <FiBriefcase /> Post a Job
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition hover:border-amber-400 hover:text-amber-400">
            <FiPhone /> Contact Sales
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto mt-10 max-w-7xl rounded-2xl bg-slate-100/70 p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#E4F0EC", color: GREEN }}>
              <FiHelpCircle size={20} />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Frequently Asked Questions
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Get quick answers to common questions about posting office and administrative
                jobs.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((q) => (
              <FaqItem key={q} question={q} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
