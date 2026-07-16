import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaQuoteRight, FaStar, FaLandmark } from "react-icons/fa";
import { GiMapleLeaf } from "react-icons/gi";

const plans = [
  {
    name: "Starter",
    desc: "Perfect for small teams getting started.",
    price: "149",
    featured: false,
    features: [
      "3 Job Posts Included",
      "30-Day Applicant Access",
      "Standard Job Listing",
      "Employer Dashboard Access",
      "Email Support",
    ],
    cta: "Get Started",
    path: "/signup"
  },
  {
    name: "Growth",
    desc: "Ideal for growing businesses.",
    price: "299",
    featured: true,
    features: [
      "10 Job Posts Included",
      "60-Day Applicant Access",
      "Featured Job Listing",
      "Employer Dashboard Access",
      "Priority Email Support",
    ],
    cta: "Get Started",
    path: "/signup"
  },
  {
    name: "Enterprise",
    desc: "For companies with ongoing hiring needs.",
    price: "599",
    featured: false,
    features: [
      "Unlimited Job Posts",
      "90-Day Applicant Access",
      "Featured Company Profile",
      "Advanced Dashboard & Analytics",
      "Priority Phone & Email Support",
    ],
    cta: "Contact Sales",
    path: "/contact-us"
  },
];

const testimonials = [
  {
    quote:
      "Office Jobline has made hiring office staff so much easier. We found great candidates quickly and the process was seamless from start to finish.",
    icon: <GiMapleLeaf className="text-teal-800 text-xl" />,
    company: "Maple Leaf Consulting",
    location: "Toronto, ON",
    path: "/employers"
  },
  {
    quote:
      "We've hired outstanding administrative professionals through Office Jobline. Their platform is easy to use and the support team is fantastic.",
    icon: <FaLandmark className="text-teal-800 text-xl" />,
    company: "Prairie Business Group",
    location: "Calgary, AB",
    path: "/employers"
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  // Handle Plan Button Click
  const handlePlanClick = (path) => {
    navigate(path);
  };

  // Handle Testimonial Card Click
  const handleTestimonialClick = (path) => {
    navigate(path);
  };

  return (
    <section className="w-full bg-slate-50 py-16" id="employer-pricing">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            Simple Pricing for Office Hiring
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Choose the right plan to hire office staff, administrative
            professionals, and support teams across Canada.
          </p>
          <p className="text-slate-600">Transparent pricing. No hidden fees. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl overflow-hidden border ${
                plan.featured
                  ? "border-teal-800 shadow-lg lg:-translate-y-2"
                  : "border-slate-200"
              }`}
            >
              {plan.featured && (
                <div className="bg-teal-800 text-white text-center text-sm font-semibold py-2">
                  Most Popular
                </div>
              )}
              <div className="p-8 flex flex-col h-full">
                <h3 className="text-2xl font-bold text-teal-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{plan.desc}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">
                    ${plan.price}
                  </span>
                  <span className="text-slate-500 mb-1">/month</span>
                </div>
                <hr className="mb-6 border-slate-200" />
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-slate-700 text-sm">
                      <FaCheck className="text-teal-800 mt-1 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePlanClick(plan.path)}
                  className={`w-full py-3 my-3~ rounded-md font-semibold transition ${
                    plan.featured
                      ? "bg-teal-800 hover:bg-teal-900 text-white"
                      : "border border-teal-800 text-teal-800 hover:bg-teal-50"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-slate-100 rounded-xl px-6 sm:px-10 py-12 overflow-hidden">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Trusted by Canadian Employers
            </h3>
            <p className="text-slate-600">
              Join thousands of organizations that trust Office Jobline to hire top
              office talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                onClick={() => handleTestimonialClick(t.path)}
                className="bg-white rounded-lg p-6 shadow-sm cursor-pointer transition hover:shadow-md hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-yellow-400 gap-1">
                    {[...Array(5)].map((_, s) => (
                      <FaStar key={s} />
                    ))}
                  </div>
                  <FaQuoteRight className="text-teal-800 text-xl" />
                </div>
                <p className="text-slate-700 text-sm mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  {t.icon}
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.company}</p>
                    <p className="text-slate-500 text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-600 text-sm">
            Hire with confidence. Post jobs, connect with qualified office
            professionals, and grow your business across Canada.
          </p>

          <GiMapleLeaf className="hidden sm:block absolute bottom-4 right-4 text-teal-800/10 text-8xl" />
        </div>
      </div>
    </section>
  );
}