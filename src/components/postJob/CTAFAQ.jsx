import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBriefcase, FiPhone, FiHelpCircle, FiChevronDown } from "react-icons/fi";

const GREEN = "#0E5C4C";

const faqs = [
  {
    question: "How much does it cost to post a job?",
    answer: "We offer flexible pricing plans starting from $99/month. Check our Pricing page for detailed plan options including Starter, Growth, and Enterprise plans."
  },
  {
    question: "How long will my job posting stay active?",
    answer: "Job postings stay active for 30 days on Starter and Growth plans, and 60 days on Enterprise plans. You can also renew or extend your posting at any time."
  },
  {
    question: "Can I edit or update my job posting after it's live?",
    answer: "Yes! You can edit, update, or modify your job posting at any time through your employer dashboard. Changes are reflected immediately."
  },
  {
    question: "What types of office and administrative jobs can I post?",
    answer: "You can post any office and administrative roles including Office Managers, Receptionists, Executive Assistants, Administrative Assistants, Data Entry Clerks, Customer Service Representatives, Payroll Clerks, HR Support, and more."
  },
];

const FaqItem = ({ question, answer }) => {
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
          {answer}
        </div>
      )}
    </div>
  );
};

export default function CTAFAQ() {
  const navigate = useNavigate();

  // Handle Post a Job
  const handlePostJob = () => {
    navigate("/post-a-job");
  };

  // Handle Contact Sales
  const handleContactSales = () => {
    navigate("/contact-us");
  };

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
          <button 
            onClick={handlePostJob}
            className="flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-[#0B1B3A] transition hover:bg-amber-300"
          >
            <FiBriefcase /> Post a Job
          </button>
          <button 
            onClick={handleContactSales}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition hover:border-amber-400 hover:text-amber-400"
          >
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
              <FaqItem key={q.question} question={q.question} answer={q.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}