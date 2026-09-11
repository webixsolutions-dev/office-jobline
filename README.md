# Office Jobline

A Canadian office and administrative careers job board, built as a React single-page app. **Home (`/`), About Us (`/about-us`), Post a Job (`/post-a-job`), and Sign In (`/sign-in`) are fully built**, along with Browse Jobs, Employers, Contact Us, and dashboard screens. Remaining article, legal, and some auth helper routes still render `ComingSoon`.

## Tech stack

- **React 19 + Vite**
- **React Router** — client-side routing
- **Tailwind CSS v4** — utility styling with shared navy / gold / teal tokens (`src/style/index.css`, `src/style/tokens.css`)
- **Framer Motion** — page transitions and mobile nav
- **React Icons**

## Prerequisites

- Node.js 18+ (20 recommended)
- npm

## Setup

```bash
cd office-jobline
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run oxlint |

## About Us imagery

Hero, mission, and testimonial photos live in `public/` and are mapped in `src/constants/images.js`:

- `img1.webp` — About hero (full-bleed split)
- `img2.webp` — Our Mission / vision photo
- `img3.webp` — Jessica H. testimonial
- `img4.webp` — Mark D. testimonial
- `img5.webp` — Browse Jobs hero (full-bleed split)
- `img6.webp` — Contact Us hero (meeting room)
- `img7.webp` — Employers hero (full-bleed split)
- `img8.webp` — Home hero
- `img9.webp` — Home How It Works
- `img10.webp`–`img12.webp` — Home article cards
- `img13.webp` — Post a Job hero
- `map-toronto.svg` — static placeholder map for Visit Our Office (not a live Maps embed)

Swap files or update that constants file to change imagery later.

## Home page (`/`)

The Home page reuses the shared `Navbar`, `Footer`, `ScrollToTop`, and Module 1 UI primitives. The hero is a merged 50/50 layout (`HomeHero`): `img8.webp` is a right-half **background** with a fade into the left copy — not a separate image column.

Hero photography and article thumbnails live in `public/` and are mapped in `src/constants/images.js`:

- `img8.webp` — Home hero (full-bleed split)
- `img9.webp` — How It Works team photo
- `img10.webp` — Resume tips article
- `img11.webp` — Interview tips article
- `img12.webp` — Hiring support article
- `img3.webp` / `img4.webp` — Jessica L. and Mark D. testimonials (same files as About Us)
- `img13.webp` — Post a Job hero background (modern office interior)

Hero search submits to `/jobs?q=…&location=…` (redirects to `/browse` with the same query; `q` is an alias for `keyword`). Category cards go to `/jobs?category=<slug>`. Article cards go to `/resources/<slug>` (`ComingSoon` until those articles are built).

### New reusable UI

`PromoBanner` (`theme="teal" | "gold" | "neutral"`), `ProcessStep`, `ArticleCard`, `TrustCard`, `SkylineGraphic`

`SplitHero` now accepts an optional `overlay` slot so the Home search bar can float across the text/image seam on desktop without changing About Us or Browse Jobs.

`--color-teal-dark` was already in `tokens.css` and is used for teal hover states; the Home closing CTA uses `--color-teal` as a full-width band (intentionally distinct from the About Us navy closing CTA).

### Footer (canonical)

The Home, Browse, About, and Post a Job screenshots disagreed on footer columns and legal links. The **4-column footer** (Quick Links, For Employers, Contact Us, plus brand) with Privacy Policy / Terms of Use / Cookie Policy is now the site-wide source of truth, rendered once from `App.jsx`.

## Module 2 — Browse Jobs (`/browse`)

This module adds the Browse Jobs page with working **client-side search, filters, sorting, and pagination** over a mock dataset in `src/constants/jobs.js`. Hero search, filter pills, the sidebar, category tiles, and city tiles all write the same URL query params so the listings grid and live result count stay in sync.

Reusable UI added for later modules (Employers, Home):

`SearchBar`, `FilterPill`, `FilterSidebar`, `JobCard`, `Pagination`, `CategoryCard`, `EmployerCard`, `CityCard`, `SupportCard`, `Banner` (`theme="teal" | "navy"`), `TileCard`

`Apply Now`, employer profile links (`/employers/:slug`), job alerts, resume upload, city directory, and support article links currently render `ComingSoon` and will be replaced module-by-module.

Navbar, Footer, design tokens, and `ScrollToTop` are shared across every module. The nav item **Browse Jobs** stays on `/browse`. `/jobs` redirects to `/browse` with the same query string.

Hero photography: `public/img5.webp` mapped as `images.browseHero`.

## Module 3 — Contact Us (`/contact-us`)

This module adds the Contact Us page with a **client-side validated contact form** (no backend yet), a **static placeholder map**, and an **FAQ accordion**. `/contact` redirects to `/contact-us`. Navbar **Contact Us** uses the existing `NavLink` active underline.

### Footer (site-wide)

The canonical `Footer` in `src/components/common/Footer.jsx` is **4 columns** on every public page (Home, Browse Jobs, Employers, About Us, Contact, Post a Job):

1. Brand (logo, tagline, LinkedIn / Facebook / Instagram / YouTube with gold outlines)
2. Quick Links — Home, Browse Jobs, Employers, About Us, Contact Us
3. For Employers — Post a Job, Browse Candidates, Employer Pricing, Hiring Resources, Help Centre
4. Contact Us — address, email, phone, hours

The bottom bar is copyright on the left and **Privacy Policy / Terms of Use / Cookie Policy** on the right. Navbar and Footer are rendered once from `App.jsx` so they stay identical on every public route.

### New reusable UI

`ContactForm`, `InfoCard` (icon + title + description, optional divider/children, optional footer — used for Ways to Reach, Visit Our Office, and Specific Help), `FAQAccordionItem`, `MapCard`

`InfoCard` variants are intended for reuse on later modules.

### Placeholders / follow-ups

- **Map:** `public/map-toronto.svg` via `images.officeMap` is a static graphic, not a live Google Maps integration. Replace when an API key is available.
- **Contact Support** and **Talk to Sales** scroll to the hero form and pre-select the matching subject (`?subject=job-seeker|employer#contact-form`).
- **Send Inquiry** opens `mailto:partnerships@officejobline.com`.
- **Post a Job** routes to the existing `/post-a-job` page.
- Footer items that are not built yet (`/browse-resumes`, `/recruitment-solutions`, `/employer-resources`, `/career-advice`, `/job-alerts`, `/upload-resume`) render `ComingSoon`.

Closing CTA **Browse Jobs** navigates to the real `/browse` page from Module 2 (`/jobs` still redirects there).

Hero photography: `public/img6.webp` mapped as `images.contactHero`.

## Module 4 — Employers (`/employers`)

This module rebuilds the Employers page around the shared design system from Modules 1–3: navy / gold / teal tokens, `Navbar`, `Footer`, `ScrollToTop`, and the existing `components/ui/` library. The page includes pricing plans (Starter / Growth / Enterprise) and company-style employer testimonials.

Hero photography: `public/img7.webp` mapped as `images.employersHero`.

### Component extensions (not duplicates)

- **`SplitHero`** — optional `secondaryCta`, `ctaVariant` / `ctaIcon`, `eyebrowPlacement="before"`, and `imageFade`. About Us and Browse Jobs still omit `secondaryCta`, so their single-CTA (or custom `children`) heroes are unchanged.
- **`IconTextCard`** — optional `underline` gold rule under the title (Employers trust strip). Why Choose Us uses the same card without `underline`.
- **`TestimonialCard`** — `variant="company"` renders a logo block instead of a circular person avatar. About Us person testimonials are unchanged.
- **`Banner`** — reused for Mid CTA (`theme="teal"`, maple-leaf watermark) and Employers closing CTA (`theme="navy"`, skyline). Optional `iconColor="gold-outline"`, `showMapleLeaf`, and `actionsLayout="stack"`.

### New components

- **`StepCard`** — numbered badge + icon circle + title + description for How Hiring Works.
- **`PricingCard`** — plan name, price, checklist, CTA; `featured` drives the “Most Popular” ribbon and teal border.

### CTA destinations (placeholders until later modules)

- **Talk to Sales** and **Contact Sales** (hero, Enterprise plan, closing CTA) go to `/contact-us?subject=employer#contact-form` — the employer Contact Us form from Module 3 — rather than a dead `ComingSoon` page.
- **Get Started** on Starter and Growth routes to `/signup` (`ComingSoon` until auth is finished).
- **Post a Job** / **Start Hiring Today** route to the existing `/post-a-job` page.

The site-wide footer is the **4-column** layout (brand, Quick Links, For Employers, Contact Us) with Privacy Policy / Terms of Use / Cookie Policy in the bottom bar. Navbar and Footer are shared from `App.jsx` on every public page.

## Module 3 — Post a Job (`/post-a-job`) + Module 4 — Sign In (`/sign-in`)

These pages reuse the shared `Navbar`, `Footer`, `ScrollToTop`, and existing UI primitives. Navbar **Post a Job** and **Sign In** now route to the real pages. Neither page marks a primary nav item as active.

### Post a Job

Full-bleed hero (`HeroWithForm`) uses `public/img13.webp` (`images.postJobHero`). **Start Posting** and **Post Your Job Today** scroll to the hero form (`#job-posting-form`). **View Plans** scrolls to `#pricing`. Plan **Get Started** buttons go to `/post-a-job/create?plan=starter|growth|enterprise` (`ComingSoon`). **Contact Sales** goes to `/contact?topic=sales#contact-form` (redirects to Contact Us and pre-selects Employer Support).

### Sign In

`AuthLayout` is a split overlay on a professional office photo (`images.signInHero` → `public/img2.webp`). Branding is Office Jobline navy / gold / teal only; the layout pattern was taken from a separate product screenshot. Client-side validation only — no real auth call yet. **Forgot password?** → `/forgot-password` (`ComingSoon`). **Sign Up** → `/sign-up` (`ComingSoon`). `/signin` redirects to `/sign-in`.

### New reusable UI

`Input` (optional icon, password `showToggle`), `Select`, `HeroWithForm`, `StepCard` (`variant="process"`), `PricingCard` (`highlighted` gold ribbon, optional feature `badge`), `CTABanner`, `FAQAccordion`, `AuthLayout`, `RoleToggle`

`IconTextCard` accepts `divider` (alias of `underline`). `TestimonialCard` accepts `avatar` (`photo` | `initials`), `showRating`, and `theme="glass"`. `PromoBanner` adds `theme="neutral"`.

### Design token

`--color-navy-overlay: rgba(10, 31, 61, 0.72)` in `src/style/tokens.css` (and `src/style/index.css`) for the Sign In photo scrim.

### Footer link data

Footer markup was **not forked**. The 4-column lists and legal links are the single source of truth in `src/constants/navLinks.js` and `src/constants/contactInfo.js`.

## Shared chrome

`Navbar` and `Footer` are rendered once from `App.jsx` on every public page. They consume `src/constants/navLinks.js` and `src/constants/contactInfo.js` so the same header, active-link underline, and footer appear on Home, Browse, Employers, About, Contact, and Post a Job.

## Reusable UI

About Us is composed from prop-driven pieces in `src/components/ui/` that later pages can reuse:

`Button`, `SectionHeading`, `IconTextCard` (`layout="row" | "column"`, optional `underline` / `divider`), `StatItem`, `TestimonialCard` (`variant="person" | "company"`, optional `avatar`, `showRating`, `theme="glass"`), `ChecklistCard` (`theme="teal" | "gold"`), `SplitHero` (optional `children`, optional `secondaryCta`, optional `overlay`), `ImageTextRow`, `StepCard` (`variant="default" | "process"`), `PricingCard` (`featured` teal / `highlighted` gold), `PromoBanner` (`theme="teal" | "gold" | "neutral"`), `CTABanner`, `FAQAccordion`, `Input`, `Select`, `RoleToggle`, `ProcessStep`, `ArticleCard`, `TrustCard`, `SkylineGraphic`, Browse Jobs tiles listed under Module 2, plus Contact Us pieces listed under Module 3.

## Job Seeker Dashboard (`/dashboard/*`)

The authenticated **Job Seeker Dashboard** is a private workspace for signed-in job seekers, structurally separate from the public marketing site (no public Navbar/Footer) but built from the same design tokens (`src/style/tokens.css`, `src/style/index.css`) and shared UI library.

### Routes

| Route | Page |
| --- | --- |
| `/dashboard` | Redirects to `/dashboard/overview` |
| `/dashboard/overview` | Overview — stats, profile completeness, recommended jobs |
| `/dashboard/find-jobs` | Find Jobs — reuses Browse Jobs search/filter/pagination inside the dashboard shell |
| `/dashboard/applications` | My Applications — status tracking, filter/sort, withdraw with confirmation |
| `/dashboard/saved-jobs` | Saved Jobs — bookmarked jobs with apply/remove actions |
| `/dashboard/profile` | My Profile — simplified personal details form (no resume upload) |
| `/dashboard/settings` | Settings — account, notifications, sign out (no delete account) |

### Auth gating

All `/dashboard/*` routes are wrapped in `RequireAuth`. Logged-out users are redirected to `/sign-in`. Users with the **Employer/Recruiter** role are redirected to `/employer-dashboard/overview`.

### State management

`DashboardDataContext` (`src/lib/DashboardDataContext.jsx`) centralizes frontend-only mock state:

- `applications`, `savedJobs`, `profile`
- Actions: `applyToJob`, `withdrawApplication`, `toggleSaveJob`, `removeSavedJob`, `updateProfile`

Seed data lives in `src/data/mockApplications.js` and `src/data/mockRecommendedJobs.js` (extends `constants/jobs.js`). Actions are structured so real API calls can replace the in-memory logic later.

### My Profile (v2 — simplified)

Intentionally approachable for newcomers: a single **Personal Details** card with Full Name, Email (prominently near the top), Phone, Location, Skills (chip input), and optional Work Experience / Education repeatable sections. **No resume upload** and **no professional headline field**.

### Settings (v2)

Account email/password placeholders and notification toggles only. **Account deletion was intentionally removed** from this version.

### Dashboard components

`SeekerDashboardLayout`, `SeekerDashboardSidebar`, `DashboardUserCard`, `SidebarNavItem`, `DashboardTopBanner`, `StatCardRow`, `RecommendedJobsSection`, `ApplicationStatusBadge`, `ApplicationListItem`, `SavedJobListItem`, `ProfileCompletenessBar`

`JobCard` accepts optional dashboard props (`isApplied`, `isSaved`, `onApply`, `onSaveToggle`) so apply/save state is shared between Overview, Find Jobs, and Saved Jobs.

## Employer Dashboard (`/employer-dashboard/*`)

The authenticated **Employer / Recruiter Dashboard** is a private workspace for signed-in employers, structurally parallel to the Job Seeker Dashboard (same shell pattern: persistent sidebar, top banner, stat card row) but with employer-specific navigation and content. Legacy `/recruiter/*` routes redirect here.

### Routes

| Route | Page |
| --- | --- |
| `/employer-dashboard` | Redirects to `/employer-dashboard/overview` |
| `/employer-dashboard/overview` | Overview — stats, recent applicants, active postings |
| `/employer-dashboard/job-postings` | Job Postings — filter/search, edit, close, delete |
| `/employer-dashboard/post-a-job` | Post / edit a job (`?edit=:jobId` for edit mode) |
| `/employer-dashboard/job-postings/:jobId/applicants` | Applicants for one posting |
| `/employer-dashboard/applicants` | All Applicants — filter by job, stage, name |
| `/employer-dashboard/company-profile` | Company Profile form |
| `/employer-dashboard/settings` | Settings — account, notifications, sign out, delete company account |

### Auth gating

All `/employer-dashboard/*` routes use `RequireEmployerAuth`. Logged-out users redirect to `/sign-in`. Signed-in **Job Seeker** users redirect to `/dashboard/overview`.

### State management

`EmployerDataContext` (`src/lib/EmployerDataContext.jsx`) centralizes frontend-only mock state:

- `jobPostings`, `applicants`, `companyProfile`
- Actions: `createJobPosting`, `updateJobPosting`, `closeJobPosting`, `deleteJobPosting`, `advanceApplicantStage`, `rejectApplicant`, `updateApplicantNotes`, `updateCompanyProfile`, etc.

Seed data: `src/data/mockJobPostings.js`, `src/data/mockApplicants.js`. Actions are structured for future API integration.

### Pipeline stage mapping (seeker ↔ employer)

| Job Seeker (applicant-facing) | Employer (recruiter-facing) |
| --- | --- |
| Applied | New |
| In Review | Reviewed / Shortlisted |
| Interview | Interview |
| Offer | Offer |
| Not Selected | Rejected |

Defined in `src/constants/pipelineStages.js` for consistent reconciliation when a backend is connected.

### Reused components

`EmployerDashboardLayout` / `EmployerDashboardSidebar` mirror the seeker shell (`SeekerDashboardLayout`, `SeekerDashboardSidebar`). `StatCardRow` is reused via `EmployerStatCardRow`. `JobPostingForm` (`src/components/postJob/JobPostingForm.jsx`) is shared with the public Post a Job flow. `ConfirmModal` handles close posting, delete posting, reject applicant, and delete company account.

### Employer dashboard components

`EmployerStatCardRow`, `JobPostingCard`, `JobPostingStatusBadge`, `ApplicantListItem`, `ApplicantProfileDrawer`, `CompanyProfileForm`, `JobPostingsFilterBar`, `ApplicantStageBadge`

---

## Folder overview

```
src/
  constants/          images, nav, contact, jobs, categories, pipelineStages
  components/
    dashboard/          seeker + employer shell (layouts, sidebars, shared dashboard UI)
    employerDashboard/    employer-specific cards, badges, forms, drawers
    postJob/              public Post a Job + JobPostingForm
  lib/                  auth, SavedJobsContext, DashboardDataContext, EmployerDataContext
  data/                 mock dashboard seed data (applications, job postings, applicants)
  components/
    common/           Navbar, Footer, ScrollToTop
    ui/               shared buttons, cards, heroes, browse tiles
    about/            About Us sections
    browse/           Browse Jobs sections
    contact/          Contact Us sections
    postJob/          Post a Job sections
    auth/             AuthLayout
  pages/              route-level screens
  style/              Tailwind theme + design tokens
public/
  img1.webp … img13.webp
  map-toronto.svg
  logo.png
```
