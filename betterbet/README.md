# BETTERBET. — The Product Decision Lab

An independent, bilingual product decision workspace by Vinh Nguyen. Public pages explain the method; the browser-local Lab connects **Diagnose → Evidence → Decide → Experiment → Deliver → Review**.

This exports the existing BETTERBET source, not a redesign or a new Site. Provenance, exact adaptations and file hashes are in `EXPORT-MANIFEST.json`. No GitHub repository or Vercel project was created by this export.

## Requirements and commands

Use **Node.js 24.x** and **pnpm 11.25.0**. Validation used Node **24.19.0**. `.nvmrc` and `package.json` select Node 24; `packageManager` pins pnpm. pnpm 11 requires Node >=22.13, so the former README's Node 20 recommendation is not suitable.

From the extracted `betterbet/` directory:

```sh
node --version
npx --yes pnpm@11.25.0 install --frozen-lockfile
npx --yes pnpm@11.25.0 run dev
```

Other commands:

```sh
npx --yes pnpm@11.25.0 test
npx --yes pnpm@11.25.0 run build
npx --yes pnpm@11.25.0 run preview
```

Alternatively install pnpm 11.25.0 and use `pnpm install --frozen-lockfile`, `pnpm dev`, `pnpm test`, `pnpm build`, and `pnpm preview`. The exact existing `pnpm-lock.yaml` is included. There is no npm lockfile: **do not use `npm ci`** or substitute a new lockfile when reproducing this export. `pnpm-workspace.yaml` allows esbuild's required installation script. Production output is `dist/`, regenerated from source and omitted from the ZIP. No private Sites helper is required.

## Actual stack

| Component | Version / implementation |
| --- | --- |
| React / React DOM | 19.1.1 |
| Vite | 6.1.0 |
| Source | JavaScript, JSX, CSS; no TypeScript conversion |
| Three.js | 0.180.0; procedural scene, no external model |
| GSAP / ScrollTrigger | 3.12.7 |
| Lenis | 1.3.11 |
| Lucide React | 0.468.0 |
| Fonts | Self-hosted Inter and Space Grotesk; SIL OFL licenses included |
| Backend | None; browser-local processing and storage |

## Included features

- Public pages `/`, `/product`, `/method`, `/case-study`, `/about`.
- Lab entry/overview, six connected stages, Decision Archive, Data Manager and Settings.
- Ordered unique-user funnels, cohort/segment/window filters, step inspection and saved investigations.
- Searchable evidence, source links, counterevidence and editable notes.
- Editable alternatives, hypotheses and rationale; snapshots, history and Decision DNA.
- Linked experiment plans, separate drafts, metric definitions and an approximate sample-size helper.
- Editable delivery briefs and genuine Markdown decision exports.
- Measured outcome import and review; a separately labeled Scenario Sandbox.
- Workspace backup/restore, reset confirmation and local persistence.
- EN/VI resources, Vietnamese-capable fonts, localized number/date formatting and preserved original research text.
- Lazy public motion/Three.js, native Lab scrolling, reduced-motion handling and SVG fallback.

These describe implemented source features. They do not assert that every interaction/device passed QA; see `VALIDATION.md`.

## Project layout

| Path | Purpose |
| --- | --- |
| `index.html` | Vite HTML entry, fonts, favicon and social metadata |
| `src/main.jsx` | React entry, shared state, routes, storage and backup actions |
| `src/Marketing.jsx` | Public pages and motion |
| `src/Lab.jsx` | Six stages, overview, archive and settings |
| `src/DataManager.jsx` | Actual CSV parsing, mapping, validation and import |
| `src/components/` | UI, SVG fallback and procedural Three.js scene |
| `src/domain/analytics.mjs` | Generator, analytics, CSV/outcome validation and statistics |
| `src/domain/content.mjs` | Bilingual content, initial state and Markdown export |
| `src/domain/storage.mjs` | localStorage, IndexedDB and downloads |
| `src/styles.css` | Brand, responsive public/Lab and reduced-motion styles |
| `public/` | OG artwork, favicon, fonts/stylesheet/licenses, robots |
| `scripts/postbuild.mjs` | Route entry points and origin-aware SEO metadata |
| `tests/` | Existing analytics and bilingual React server-render tests |
| `site.config.json` | Optional public production origin; default `null` |
| `vercel.json` | Vite build settings and scoped SPA rewrites |

## Synthetic data and analytics

All bundled OrbitDesk events and research are **synthetic**. No real participant, business outcome or measured improvement is claimed. The deterministic generator produces raw chronological rows in memory; charts and calculations consume those rows.

Default signup cohorts cover September 1–23, 2026 UTC, with a seven-day elapsed conversion window and observation through September 30. The computed ordered unique-user funnel is **12,000 → 10,080 → 3,720 → 2,160**. Invite loss is **6,360**, or **63.095238…% of 10,080** (approximately 63.10%). These are engine results, not substituted display constants.

The engine selects the earliest qualified entry in the cohort range, captures properties at entry and accepts each required later event only after the preceding step and within the window. Duplicate entries do not add users; missing steps prevent credit for later milestones. Incomplete follow-up is flagged and can be excluded. Empty cohorts return null rates, not NaN/Infinity. When selected, imported rows replace the active analytical dataset.

## CSV contracts

Event CSV requires `user_id,event_name,timestamp`; optional fields are `device,acquisition_channel,plan_type,country,session_id`. Columns/events can be mapped to:

```text
signup_completed → workspace_created → teammate_invited → first_value_reached
```

ISO timestamps need `Z` or an offset; missing offsets require an explicit UTC choice. UTF-8 BOM, comma/semicolon/tab separators, quoted commas, multiline fields and escaped quotes are supported. File limit: 10 MB; parser limit: 100,000 data rows. Review errors before choosing to exclude invalid rows. Confirm observation coverage from the actual source; a file's latest event does not prove complete coverage.

Research CSV requires `body,source_reference`, optionally `source_type,source_date,stance,tags`. Research retains its original language.

Outcome CSV requires `user_id,variant,exposure_timestamp,converted`, optionally `conversion_timestamp`. Variants are `control`/`treatment`; converted values are `true/false` or `1/0`. Units must be unique: all rows for duplicate units are excluded. Complete follow-up is required; supplied conversions must be within the declared window. Without conversion timestamps, binary within-window outcomes are taken as supplied with a visible caveat. Outcomes must represent the linked experiment's metric.

Review separates counts, percentage-point differences and relative uplift. Its 95% difference interval uses Newcombe's independent two-proportion method with Wilson intervals. It does not validate random assignment or adjust for sequential monitoring, clustering, multiple comparisons or interference. Sample planning is an equal-split, two-sided normal approximation, not a measured result. Guardrail definitions are not measurements; Review displays “Not measured.” Without valid outcomes it remains “Awaiting measured outcomes.” Simulation stays separate from observed results.

## Storage, privacy and migration

Small records/preferences use localStorage key `betterbet.workspace.v1`; imported event/outcome data use IndexedDB database `betterbet-local`, store `datasets`. Demo rows are regenerated, not stored as a large localStorage object. The app uploads no source data. React renders imported text as text; CSV export neutralizes leading spreadsheet formula characters. Browser storage is not encrypted server storage or a team vault.

**The source ZIP does not contain personal browser work. A new Vercel origin cannot read the old Sites origin's localStorage/IndexedDB.** Move actual work explicitly:

1. In the existing workspace, open `/lab/settings`.
2. Choose **Export Workspace / Xuất không gian**. Keep the downloaded JSON privately; it may contain imported data.
3. Open the new site's assigned URL and `/lab/settings`.
4. Export destination work first if needed. Choose **Restore Backup / Khôi phục sao lưu**, select a trusted backup and confirm replacement.
5. Check datasets, decisions, evidence, plans and edited briefs before clearing the old browser's data.

Backup schema: `betterbet-backup-v1`; restore file limit: 30 MB. Browser restore/reload was not exercised during export. Clearing storage, changing profiles or private browsing can remove/isolate records. Export regularly. No visitor backup, private CSV or authenticated session is bundled.

## Deployment and public origin

Read `DEPLOYMENT.md` before creating the independent repository/project yourself. **No environment variables, credentials, Sites APIs, D1, R2, server runtime or authentication integration are required.**

`site.config.json` defaults to `{ "siteUrl": null }` because no new domain is assigned. Builds omit absolute canonical/OG URL and sitemap metadata until configured; existing OG artwork stays bundled. Once the actual production origin is known, set `siteUrl` to that plain HTTPS origin and rebuild. Postbuild generates route-specific metadata and a public-page sitemap. It does not assume `betterbet.vercel.app` is available. This is public configuration, not a secret/environment variable.

## Verification and limits

`VALIDATION.md` records executed checks, build, tests, audit findings and unverified items. Server rendering does not exercise clicks, browser storage, responsive layout, focus or WebGL. Review preserved dependency audit findings before public rollout.

Local-only workspaces, one active imported event dataset; no cloud sync, team access control, connected analytics, automated experiments, billing, AI inference or verified participant research. User-authored research/drafts are not machine translated. A full translation audit and real-browser accessibility/device review remain unverified. The existing error-boundary fallback is English-only.

Design and Develop by Vinh Nguyen — https://vinh-nguyen-portfolio-three.vercel.app/
