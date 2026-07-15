# Office Jobline

A fully responsive job-board website built with React, Vite, Tailwind CSS, React Icons, and Framer Motion — recreated from the original design (Home, Browse Jobs, Employers, Post a Job, About Us, Contact Us).

## Getting Started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`) in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## Tech Stack

- **React 19 + Vite** — app shell and dev tooling
- **React Router** — client-side routing across all 6 pages
- **Tailwind CSS v4** — utility-first styling with a custom navy/gold theme (`src/index.css`)
- **Framer Motion** — page transitions, scroll reveals, hover/tap micro-interactions
- **React Icons** — `react-icons/hi`, `react-icons/hi2`, `react-icons/fa`

## Structure

```
src/
  components/   Navbar, Footer, JobCard, SectionHeading, PageWrapper, ScrollToTop
  pages/        Home, Browse, Employers, PostJob, AboutUs, ContactUs
  index.css     Tailwind import + design tokens (colors, fonts)
  App.jsx       Routes + animated page transitions
public/
  logo.png      Site logo / favicon
```

## Notes

- All job/company data is mock/sample content — wire up your own API in `src/pages/*.jsx`.
- The contact and post-a-job forms simulate submission client-side; connect them to your backend or a service like Formspree to send real emails.
- Fully responsive from small mobile screens up through large desktop breakpoints (`sm`, `lg` breakpoints used throughout).
