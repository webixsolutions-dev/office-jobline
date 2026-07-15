import React from "react";
import {
  FiMail,
  FiPhone,
  FiUser,
  FiBriefcase,
} from "react-icons/fi";

const ReachCard = ({ icon, title, children, email, phone }) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B1B3A] text-amber-400">
      {icon}
    </div>
    <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
    <p className="mt-1 text-sm text-slate-500">{children}</p>
    <div className="mt-5 space-y-2 border-t border-slate-100 pt-5">
      <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm font-semibold text-amber-500">
        <FiMail className="text-slate-400" /> {email}
      </a>
      <a href={`tel:${phone.replace(/\D/g, "")}`} className="flex items-center gap-2 text-sm font-semibold text-amber-500">
        <FiPhone className="text-slate-400" /> {phone}
      </a>
      <p className="pt-1 text-xs text-slate-400">Mon – Fri, 9:00 AM – 5:00 PM ET</p>
    </div>
  </div>
);

export default function WaysToReachUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <span className="text-sm font-bold tracking-widest text-amber-500">CONTACT US</span>
      <h1 className="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">Ways to Reach Us</h1>
      <p className="mt-4 max-w-2xl text-slate-500">
        We're here to help. Reach out to Office Jobline for office jobs, administrative
        careers, and employer hiring support across Canada.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <ReachCard 
          icon={<FiMail />} 
          title="General Inquiries" 
          email="info@officejobline.com" 
          phone="+1 (647) 555-0198"
        >
          Questions about Office Jobline, our services, or how we can help.
        </ReachCard>
        <ReachCard 
          icon={<FiUser />} 
          title="Job Seeker Support" 
          email="support@officejobline.com" 
          phone="+1 (647) 555-0198"
        >
          Get help with job searching, applications, and your account.
        </ReachCard>
        <ReachCard 
          icon={<FiBriefcase />} 
          title="Employer Support" 
          email="employers@officejobline.com" 
          phone="+1 (647) 555-0198"
        >
          Assistance with posting jobs, account management, and hiring.
        </ReachCard>
      </div>
    </section>
  );
}