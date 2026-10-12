# betterbet. — The Product Decision Lab

Stop shipping guesses. Start making better bets.

Complete portable source of the saved V1.1 essentials release: published Site version 2, commit `260cc23d4c78834081e1a3b8f9088f5b88170b12`. This export preserves the actual product; it does not finish deferred V1.1 features. See `EXPORT-STATUS.md` and `VALIDATION.md` for the scope and checks.

## Local setup

Use Node.js **24.x** and **pnpm 11.25.0**, pinned by `.nvmrc`, `engines` and `packageManager`. The original `pnpm-lock.yaml` is included. There is no npm lockfile; do not use `npm ci` for this archive.

If pnpm is not installed, install the pinned tool with `npm install --global pnpm@11.25.0`, or enable Corepack and use the `packageManager` field. Then run these commands inside the extracted `betterbet/` directory:

```sh
pnpm install --frozen-lockfile
pnpm run dev
pnpm test
pnpm run build
pnpm run preview
```

The development command uses Vite; the production build creates `dist/`. No runtime API keys, backend, Sites runtime, Sites authentication, D1 or R2 are required. `.env.example` documents optional build metadata and the Vercel-only package-manager setting.

## Actual stack and files

React / React DOM 19.1.1, Vite 6.1.0, Three.js 0.180.0, GSAP 3.12.7 with ScrollTrigger, Lenis 1.3.11, and Lucide React 0.468.0. This project uses procedural Three.js, not React Three Fiber. Inter and Space Grotesk are self-hosted with their SIL Open Font License files.

| Location | Purpose |
| --- | --- |
| `src/main.jsx` | Initialization, routing, selected dataset, local persistence and exports |
| `src/Marketing.jsx`, `src/Lab.jsx` | Existing public pages and six-stage workspace |
| `src/domain/cases.mjs` | Eight configurations, deterministic data, scope isolation and case-specific drafts |
| `src/domain/analytics.mjs` | Shared ordered-entity funnel, segmentation and conversion statistics |
| `src/domain/counters.mjs`, `src/components/CountUp.jsx` | Real-target count-up animation and EN/VI formatters |
| `src/domain/imports.mjs`, `src/DataManager.jsx` | Template schemas, parser/validation wiring and import UI |
| `src/LegacyDataManager.jsx` | Retained V1.0 custom import for OrbitDesk |
| `src/components/DecisionField.jsx`, `field-scene.mjs` | Original procedural scene and motion fallback |
| `public/` | Fonts, license notices, favicon, OG image and supplied CSV assets |
| `scripts/postbuild.mjs` | Route entry points and optional configured-domain SEO metadata |
| `tests/` | Domain, import, counter and EN/VI server-rendered route checks |
| `vercel.json` | Vite build settings and existing SPA rewrites |

## Cases and data

Each fictional case uses its own raw event dataset, counting unit, entry dates, ordered milestones, conversion window, hypothesis and suggested methodology. The same analytical engine and panels are reused. All full demo baselines are designed synthetic fixtures, not observed customer outcomes.

| ID | Product | Industry | Unit | Window (days) | Full synthetic fixture counts |
| --- | --- | --- | --- | ---: | --- |
| `orbitdesk` | OrbitDesk | B2B SaaS | `user` | 7 | 12,000 → 10,080 → 3,720 → 2,160 |
| `cartbloom` | CartBloom | E-commerce | `order` | 7 | 16,000 → 10,900 → 7,800 → 6,400 |
| `pocketpath` | PocketPath | Personal finance | `user` | 45 | 10,000 → 6,400 → 4,600 → 2,900 |
| `learnlane` | LearnLane | EdTech | `user` | 45 | 7,200 → 5,600 → 3,500 → 2,200 |
| `fleetflow` | FleetFlow | Logistics operations | `shipment` | 7 | 8,000 → 6,800 → 5,500 → 4,900 |
| `skillbridge` | SkillBridge | Talent marketplace | `user` | 7 | 9,000 → 6,200 → 2,800 → 1,450 |
| `subnest` | SubNest | Subscription content | `user` | 45 | 15,000 → 11,300 → 8,200 → 4,100 |
| `flowpay` | FlowPay | SME invoicing | `invoice` | 21 | 4,000 → 3,200 → 2,380 → 1,640 |

Select a case in the Lab entry cards or top-bar selector. Case/import workspaces retain their separate filters, evidence, draft reasoning and active decision. The archive intentionally lists saved records across workspaces; reopening a record restores its source context. Missing original raw imports are reported as unavailable rather than replaced by a demo.

The engine counts distinct entities, takes segment properties from the entry event, and requires later milestones in strict order within the chosen window and observation end. Day-30 milestones cannot be credited before Day 30, SubNest's second session must be within seven days, and FlowPay's payment milestone must be within 14 days. FleetFlow's primary KPI is first-attempt delivery, not its final proof-of-delivery milestone. Incomplete observation is flagged and can be excluded.

Recommended methodologies are case guidance. Additional analytical views such as advanced retention/time-to-value panels are not part of this essentials release.

## Template-first CSV import

Open Lab → Data Manager, choose the data type and event-case schema, download a template, keep its headers, fill it with your actual rows, upload it, review validation, then select **Analyze Uploaded Data**. The standard path uses predefined schemas. Validation errors block import; correct the file and upload again. The preserved OrbitDesk V1.0 importer remains available for its old custom-mapping workflow.

| Type | Required columns | Optional columns |
| --- | --- | --- |
| Events | `entity_id, entity_type, event_name, timestamp` | `device, acquisition_channel, plan_type, country, session_id, properties_json` |
| Feedback | `feedback_id, source_type, source_date, feedback_text` | `entity_id, segment, stance, tags, synthetic` |
| Outcomes | `experiment_id, arm, entity_id, assigned_at, converted` | `converted_at` |

Templates: `public/templates/templates/betterbet_events_template_v1.csv`, `betterbet_feedback_template_v1.csv`, and `betterbet_experiment_results_template_v1.csv`. Three filled synthetic examples are under `public/templates/examples/`. Eight `{case_id}_small_example_events.csv` files are under `public/templates/case_examples/`; they contain 20 entities, not the full demo population. The exact supplied CSV bytes and accompanying README are preserved.

CSV supports UTF-8/BOM, comma/semicolon/tab separators, quotes, escaped quotes and multiline fields. UI limit: 10 MB; parser limit: 100,000 rows. ISO timestamps need a timezone; feedback dates may also use `YYYY-MM-DD`. Entity types must match the selected case (`user`, `order`, `shipment` or `invoice`). Optional `properties_json` must be a JSON object. Empty optional dimensions become `unknown`.

Confirm the complete observation end from your source; the last recorded event does not prove observation coverage. Imported entry-date filters are derived from the uploaded entries. Charts use parsed uploaded events, not full synthetic fixture totals. Provided unchanged example files are recognized and labeled synthetic. Edited files are ordinary uploads, not authenticated data sources. Original feedback text is preserved.

Outcome imports require a saved decision and experiment plan. `experiment_id` must match the saved plan, `arm` is `control` or `treatment`, and `converted` is `true/false` or `1/0`. Repeated units and incomplete follow-up are rejected. The generic example uses `exp_sample_01`; replace that ID with your own saved plan ID to use it in the UI. Uploaded counts do not establish valid random assignment or causation. Scenario Sandbox is explicitly simulated. Guardrails remain unmeasured unless a future implementation adds their data.

## Persistence, privacy and moving domains

Small workspace state and language preference use localStorage; raw imports, the import registry and outcomes use IndexedDB. No imported CSV contents are sent to a server by this app. Export a workspace JSON backup and individual decision Markdown bundles before clearing data or changing browsers.

Browser storage is scoped to an origin. Data on the old Site origin does **not** automatically appear on a Vercel domain or localhost. Download a backup from the old app, then restore that backup using Lab → Settings on the new origin. Browser reload/restore and cross-origin transfer require manual QA; source-level preservation is not a claim that those flows were exercised in this export session.

This ZIP contains fictional bundled fixtures and application source, not anyone's browser workspace or private imported data. Local persistence is not a cloud synchronization or enterprise access-control system.

## Vercel settings for the existing project

Upload the **contents** of extracted `betterbet/` into the root of your existing repository `jvinh209product/betterbet`. Do not upload the outer archive folder as a second nested app. Use your own branch/Preview review process; this export did not push or deploy anything.

| Setting | Value |
| --- | --- |
| Framework Preset | **Vite** |
| Node.js | **24.x** |
| Root Directory | Repository root, `.` / default, where `package.json` sits |
| Install Command | `corepack pnpm install --frozen-lockfile` |
| Build Command | `corepack pnpm run build` |
| Output Directory | `dist` |
| Package manager environment | `ENABLE_EXPERIMENTAL_COREPACK=1` in your Vercel project |
| Optional SEO origin | `PUBLIC_SITE_URL` set to your actual configured HTTP(S) origin |

`vercel.json` supplies these commands/output and preserves rewrites for `/lab/:path*`, `/product`, `/method`, `/case-study` and `/about`. The postbuild script also writes route HTML entry points and a static-host `_redirects` file. Vercel deployment itself is **NOT TESTED** by this request.

Vercel's standard pnpm detection may select a different version from the lockfile. Enable Corepack to honor the existing `pnpm@11.25.0` pin; the explicit Corepack commands avoid relying on an older preinstalled pnpm. See the official [package-manager documentation](https://vercel.com/docs/package-managers), [Corepack/build settings](https://vercel.com/docs/builds/configure-a-build), and [Node version settings](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

No domain is assumed or reserved. Without `PUBLIC_SITE_URL`, the export omits absolute canonical/OG URL and sitemap URLs, and uses the local `/og-image.png`. Set your actual origin as a build environment variable, or in `.env.local`, to emit matching SEO metadata on the next build. Do not commit `.env.local`.

## Verification and troubleshooting

`VALIDATION.md` records the one verification pass and security audit. Automated domain/SSR checks do not verify actual browser clicks, file pickers, animation appearance, screen readers, responsive layouts, WebGL or performance. Complete the listed browser checks in your own Preview before production.

If install fails because of an unsupported lockfile or `allowBuilds`, check `node --version` and `pnpm --version`; use the pinned versions. Offline installation needs cached platform/package metadata; a normal frozen-lockfile install was used for this export. Do not upgrade dependencies during an upload merely to resolve an old default pnpm.

If refresh returns 404, check Root Directory, `dist` and the included `vercel.json` rewrites. If a case CSV reports a unit/entry error, select its matching case and keep the case's required event names. If imported data is unavailable, restore a backup or re-import the actual file.

Known dependency advisories are documented in `VALIDATION.md`; the frozen versions were not upgraded for this export. Serve the built static output rather than exposing the Vite development server publicly.

Design and Develop by Vinh Nguyen — https://vinh-nguyen-portfolio-three.vercel.app/
