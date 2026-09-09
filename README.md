# Sravan Kumar Yadav Gangi — Portfolio

Personal portfolio for **Sravan Kumar**, AI/ML Engineer. Built with Next.js App Router.

**Live focus:** production AI systems, projects, certificates, Medium writing, and contact.

## Stack

- Next.js (App Router) + TypeScript + React
- Tailwind CSS
- Lucide React
- Zod + Resend (contact form)
- Medium RSS with static fallback (blogs)
- Deploy target: Vercel

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` → `.env.local` (local) and set the same keys in **Vercel → Project → Settings → Environment Variables** for production.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (use your production domain on Vercel) |
| `RESEND_API_KEY` | Resend API key for the contact form (**secret — never commit**) |
| `CONTACT_TO_EMAIL` | Inbox that receives contact messages |
| `CONTACT_FROM_EMAIL` | Resend “from” address (use a verified domain in production) |
| `MEDIUM_USERNAME` | Medium username without `@` (e.g. `sravankumaryadav`) |

- Without `RESEND_API_KEY`, contact returns a configuration error.
- Without `MEDIUM_USERNAME`, blogs fall back to `src/content/blogs.ts`.

`.env.local` is gitignored. Do not commit real keys.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Project layout

| Path | Purpose |
|------|---------|
| `src/app` | Routes (home, projects, blogs, API) |
| `src/components` | UI (home sections, layout, projects, blogs) |
| `src/content` | Editable copy (about, experience, skills, projects, blogs, certificates) |
| `src/config` | Site, nav, social config |
| `src/services` | Medium RSS + Resend email |
| `public/resume` | Downloadable resume PDF |
| `public/images` | Profile and static images |

## Content edits

Most site text lives under `src/content/` and `src/config/site.ts`.  
Replace `public/resume/resume.pdf` when you update your resume.

## Deploy on Vercel

1. Push this repo to GitHub (or import the folder in Vercel).
2. Set the environment variables above in the Vercel project (Production).
3. Set `NEXT_PUBLIC_SITE_URL` to your live domain (e.g. `https://your-domain.com`).
4. Deploy. Framework preset: Next.js.

Optional: `Screen 1`–`Screen 4` folders (if present) are design prototypes only and are not part of the production app.

## Security notes

- Keep `RESEND_API_KEY` only in `.env.local` / Vercel env — never in source or README.
- Prefer a verified custom domain for `CONTACT_FROM_EMAIL` in production (not only `onboarding@resend.dev`).
