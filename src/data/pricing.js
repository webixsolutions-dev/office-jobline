// src/data/pricing.js

export const pricingPlans = [
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

export const pricingTestimonials = [
  {
    quote: "Office Jobline has helped us connect with exceptional administrative talent quickly and efficiently. The platform is easy to use and delivers great results.",
    name: "Natalie L.",
    role: "HR Manager, Northbridge Solutions",
    initials: "N",
    color: "#0B1B3A",
    path: "/employers"
  },
  {
    quote: "We've filled multiple office positions through Office Jobline. The quality of candidates and the support from their team is outstanding.",
    name: "Brian C.",
    role: "Operations Director, Brightpath Consulting",
    initials: "BC",
    color: "#0E5C4C",
    path: "/employers"
  },
];