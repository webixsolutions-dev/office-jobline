import React from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiHeadphones, FiArrowRight } from "react-icons/fi";

const plans = [
  {
    name: "Starter",
    desc: "Perfect for small teams and occasional hiring.",
    price: "99",
    popular: false,
    features: [
      "1 Job Post",
      "Standard Job Listing",
      "30-Day Listing Duration",
      "Applicant Access",
      "Employer Dashboard Access",
      "Email Support",
    ],
    path: "/signup"
  },
  {
    name: "Growth",
    desc: "Great for growing companies hiring regularly.",
    price: "199",
    popular: true,
    features: [
      "5 Job Posts",
      "Featured Job Listing",
      "30-Day Listing Duration",
      "Applicant Access",
      "Employer Dashboard Access",
      "Priority Email Support",
    ],
    starred: ["Featured Job Listing"],
    path: "/signup"
  },
  {
    name: "Enterprise",
    desc: "For teams with high-volume hiring needs.",
    price: "399",
    popular: false,
    features: [
      "20 Job Posts",
      "Featured Job Listings",
      "60-Day Listing Duration",
      "Applicant Access",
      "Employer Dashboard Access",
      "Priority Support",
      "Custom Branding (Optional)",
    ],
    starred: ["Featured Job Listings"],
    path: "/contact-us"
  },
];

const testimonials = [
  {
    quote:
      "Office Jobline has helped us connect with exceptional administrative talent quickly and efficiently. The platform is easy to use and delivers great results.",
    name: "Natalie L.",
    role: "HR Manager, Northbridge Solutions",
    initials: "N",
    color: "#0B1B3A",
    path: "/employers"
  },
  {
    quote:
      "We've filled multiple office positions through Office Jobline. The quality of candidates and the support from their team is outstanding.",
    name: "Brian C.",
    role: "Operations Director, Brightpath Consulting",
    initials: "BC",
    color: "#0E5C4C",
    path: "/employers"
  },
];

const PlanCard = ({ plan, onGetStarted }) => (
  <div
    className={`relative flex flex-col rounded-2xl bg-white shadow-sm ${
      plan.popular ? "ring-2 ring-amber-400" : "ring-1 ring-slate-100"
    }`}
  >
    {plan.popular && (
      <div className="rounded-t-2xl bg-amber-400 py-2 text-center text-sm font-bold text-slate-900">
        Most Popular
      </div>
    )}
    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <h3 className="text-center text-2xl font-extrabold text-slate-900">{plan.name}</h3>
      <p className="mt-2 text-center text-sm text-slate-500">{plan.desc}</p>
      <div className="mt-5 text-center">
        <span className="text-4xl font-extrabold text-slate-900">${plan.price}</span>
        <span className="text-slate-400">/month</span>
      </div>

      <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
            <FiCheckCircle className="flex-shrink-0 text-amber-400" />
            {feature}
            {plan.starred?.includes(feature) && (
              <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] text-white">
                ★
              </span>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onGetStarted(plan.path)}
        className={`mt-7 w-full rounded-lg py-3 text-sm font-semibold transition ${
          plan.popular
            ? "bg-amber-400 text-slate-900 hover:bg-amber-300"
            : "border border-slate-200 text-slate-700 hover:border-slate-300"
        }`}
      >
        Get Started
      </button>
    </div>
  </div>
);

const TestimonialCard = ({ testimonial, onClick }) => (
  <div 
    onClick={onClick}
    className="cursor-pointer rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:scale-[1.02] sm:p-7"
  >
    <span className="text-3xl font-serif text-amber-400">&ldquo;</span>
    <p className="-mt-3 text-sm text-slate-600">{testimonial.quote}</p>
    <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: testimonial.color }}
      >
        {testimonial.initials}
      </div>
      <div>
        <p className="font-bold text-slate-900">{testimonial.name}</p>
        <p className="text-xs text-slate-500">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

export default function PricingPlans() {
  const navigate = useNavigate();

  const handleGetStarted = (path) => {
    navigate(path);
  };

  const handleContactSales = () => {
    navigate("/contact-us");
  };

  const handleTestimonialClick = (path) => {
    navigate(path);
  };

  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8" id="employer-pricing">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Choose a Posting Plan</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-500">
          Select the plan that best fits your hiring needs. All plans include easy job posting,
          applicant management, and access to top office talent across Canada.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl items-start gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} onGetStarted={handleGetStarted} />
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        <h3 className="text-center text-2xl font-extrabold text-slate-900">
          Trusted by Employers Across Canada
        </h3>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <TestimonialCard 
              key={testimonial.name} 
              testimonial={testimonial} 
              onClick={() => handleTestimonialClick(testimonial.path)}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B1B3A] text-amber-400">
              <FiHeadphones size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-900">Need help choosing the right plan?</p>
              <p className="text-sm text-slate-500">
                Contact our team and we will help you find the best solution for your hiring
                goals.
              </p>
            </div>
          </div>
          <button 
            onClick={handleContactSales}
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 sm:w-auto"
          >
            Contact Sales <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}