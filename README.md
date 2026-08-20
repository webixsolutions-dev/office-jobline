# Office Jobline

A Canadian office and administrative careers job board, built as a React single-page app. This repo includes Home, Browse Jobs, Employers, About Us, Contact Us, Post a Job, and dashboard screens.

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

Swap files or update that constants file to change imagery later.

## Shared chrome

`Navbar` and `Footer` are rendered once from `App.jsx` on every public page. They consume `src/constants/navLinks.js` and `src/constants/contactInfo.js` so the same header, active-link underline, and footer appear on Home, Browse, Employers, About, Contact, and Post a Job.

## Reusable UI

About Us is composed from prop-driven pieces in `src/components/ui/` that later pages can reuse:

`Button`, `SectionHeading`, `IconTextCard` (`layout="row" | "column"`), `StatItem`, `TestimonialCard`, `ChecklistCard` (`theme="teal" | "gold"`), `SplitHero`, `ImageTextRow`

## Folder overview

```
src/
  constants/          images, nav links, contact info
  components/
    common/           Navbar, Footer, ScrollToTop
    ui/               shared buttons, cards, heroes
    about/            About Us sections
    home/ employers/  other marketing pages
  pages/              route-level screens
  style/              Tailwind theme + design tokens
public/
  img1.webp … img4.webp
  logo.png
```
