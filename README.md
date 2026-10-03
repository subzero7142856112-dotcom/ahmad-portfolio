# Ahmad Al-Zawahrah — Portfolio

Premium dark portfolio site built with **Next.js (App Router) · React · TypeScript · Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # strict TypeScript check
npm run build      # production build
```

## Configuration — everything editable lives in `/data`

| File | Contents |
| --- | --- |
| `data/personal.ts` | Name, role, bio, location, email, CV path, site metadata |
| `data/socials.ts` | GitHub / LinkedIn / email links, contact cards |
| `data/nav.ts` | Navigation + footer links |
| `data/stats.ts` | Hero statistics (set `value: null` + `text` for non-numeric) |
| `data/services.ts` | "What I Do" cards |
| `data/skills.ts` | Skill groups, filters, per-technology colours |
| `data/projects.ts` | Projects, filters and full case studies |
| `data/experience.ts` | Timeline entries |
| `data/education.ts` | Education + graduation project |
| `data/blog.ts` | Articles (`status: "draft" \| "published"`, optional `body`) |

### Rules used for content

- **Nothing is invented.** Metrics in `caseStudy.results` are `null` until verified — they render
  as `—` with a "pending verified evaluation" note.
- **Datasets** carry a `verified` flag. Unverified sources render as *Candidate*, not *Used*.
- **CV**: drop the real PDF at `public/cv/Ahmad-Al-Zawahrah-CV.pdf` (see `public/cv/README.md`).
- **GitHub links**: set `project.github` to the repository URL; when `null` the card falls back to
  the GitHub profile from `data/socials.ts`.

## Environment variables

Copy `.env.example` → `.env.local`:

| Variable | Purpose |
| --- | --- |
| `CONTACT_WEBHOOK_URL` | Contact-form endpoint (Formspree, Resend, Make, …) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used by `metadataBase`, sitemap, robots and Open Graph — **set this in production** or canonical/OG URLs resolve to `http://localhost:3000` |

## Contact form

`POST /api/contact` validates, sanitises and rate-limits input, then forwards to
`CONTACT_WEBHOOK_URL` (Formspree, Resend, Make, …). Copy `.env.example` → `.env.local`.
If the variable is missing the API returns `503` and the UI shows an error with a mailto fallback —
no secrets are ever exposed to the client.

## Structure

```
app/            routes (home, projects/[slug], blog, api/contact, sitemap, robots)
components/
  layout/       Navbar, Footer, ScrollToTop
  sections/     Hero, Stats, About, Services, Skills, Projects, Experience, Education, Blog, Contact
  projects/     ProjectCard, CaseStudyNav, ArchitectureFlow, MetricGrid, TechList
  blog/         BlogCard
  ui/           Button, Badge, Reveal, Counter, SectionHeading, Container, SocialLinks
  icons.tsx     inline SVG icon set
data/           all editable content
lib/            utils + hooks (scroll spy, reduced motion, body scroll lock)
public/images/  original SVG artwork (project + article thumbnails)
```

## Adding a project

Add one object to `data/projects.ts` — card, filters, case-study page, sitemap entry and
"next project" link are generated automatically.

## Open Graph image

`public/og.png` (1200×630) is generated from `scripts/og-card.html`. To refresh it:

```bash
chrome --headless=new --disable-gpu --hide-scrollbars --window-size=1200,630 \
  --virtual-time-budget=8000 --screenshot=public/og.png \
  "file:///D:/english%20language%20project/try/scripts/og-card.html"
```

## Accessibility & performance

Semantic landmarks, skip link, keyboard-operable navigation, visible focus rings, ARIA-labelled
forms, `prefers-reduced-motion` support, lazy-loaded images, no heavy client dependencies.
