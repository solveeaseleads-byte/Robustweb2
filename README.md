# SolveEase Platform v5 — End-to-End Conversion Build

SolveEase is a free-first business problem-solving platform. v5 connects the public discovery experience to functional calculators, intent-aware recommendations, optional consent-based lead capture, solution clicks, and persistent analytics hooks.

## Included
- Mobile-first Next.js 14 + React + TypeScript app
- Business Problem Search and intent routing
- Functional calculators for business, advertising, e-commerce, freelancers, cloud and cleaning
- Cleaning Business vertical
- Tool-open, calculation, search, recommendation, lead and solution-click analytics
- Consent-based lead capture API
- Supabase/PostgreSQL persistence schema and server-side service-role boundary
- Payhip solution catalogue hook using the existing SolveEase store until exact product URLs are configured
- Autopilot opportunity/insight engine
- SEO sitemap + robots + PWA manifest
- Modular architecture for future affiliates, subscriptions, sponsored results, distribution and monitoring

## Local setup
1. Install Node.js 18.17+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Add Supabase values if persistent analytics/leads are required.
5. Run `npm run dev`.
6. Open the local URL shown by Next.js.

## Supabase
Run `supabase/schema.sql` in the Supabase SQL editor. The server uses `SUPABASE_SERVICE_ROLE_KEY`; never expose that key to browser code.

## Environment
- `NEXT_PUBLIC_SITE_URL` — public site URL used by metadata/sitemap.
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL.
- `SUPABASE_SERVICE_ROLE_KEY` — server-only Supabase service-role key.
- `DASHBOARD_TOKEN` — optional protection token for the dashboard API. Set this in production and protect `/dashboard` appropriately.

## End-to-end flow
Visitor → Problem Search → Recommendation → Functional Free Tool → Result → Related Tool/Solution → Optional consented Lead → Analytics → Autopilot insight.

## Trust rules
The platform does not fabricate leads, reviews, financial discrepancies or traffic. Distribution must use legitimate platform APIs, feeds, authorized accounts and opt-in channels. Sponsored and affiliate placements must be clearly labelled. Financial/audit outputs are estimates or evidence-led findings, not guarantees.
