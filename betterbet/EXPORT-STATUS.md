# EXPORT-STATUS

## Source freeze

- Export date: 2026-10-12 (Asia/Saigon).
- Exact source: `260cc23d4c78834081e1a3b8f9088f5b88170b12`; package version `1.1.0`.
- Latest saved Site version: **2**, already **published** before this request. There is no newer saved unpublished version in the checked history.
- Source checkout was clean; no in-progress edits were mixed into the archive.
- Application source was copied from that committed snapshot. Only the isolated export copy received portability metadata/documentation changes.
- No source commit, branch change, push, PR, Site modification/publication or Vercel deployment occurred in this export request.

## Retained V1.0 implementation

Approved public/cream-workspace UI, typography, CSS, responsive rules, public and Lab routes, procedural Three.js/SVG art, GSAP/ScrollTrigger, Lenis, existing loading/motion, EN/VI selection, Diagnose → Evidence → Decide → Experiment → Deliver → Review, evidence linking/editing, alternative comparison, snapshots, experiment planning, editable briefs, outcome statistics/simulation, archive, JSON backup/restore, Markdown/CSV export, localStorage/IndexedDB persistence and creator credit are present. This is a source inventory, not an assertion that all browser behaviors were tested here.

## Eight V1.1 cases

**Implemented (essentials)** means configuration, actual sample generator, selected-case funnel/KPIs, units/windows, problem/hypothesis/method guidance, editable alternatives/evidence and reused six-stage components are in the saved code. Every case's raw baseline and segments passed automated checks. Browser case selection and the complete interactive workflow are **NOT TESTED** in this session.

| ID | Name read from code | Status | Unit | Primary metric | Supplied event CSV |
| --- | --- | --- | --- | --- | --- |
| `orbitdesk` | OrbitDesk | Implemented (essentials) | `user` | `first_value_reached` / `signup_completed` | `orbitdesk_small_example_events.csv` |
| `cartbloom` | CartBloom | Implemented (essentials) | `order` | `purchase_completed` / `checkout_started` | `cartbloom_small_example_events.csv` |
| `pocketpath` | PocketPath | Implemented (essentials) | `user` | `repeat_deposit_day30` / `eligible_user_started` | `pocketpath_small_example_events.csv` |
| `learnlane` | LearnLane | Implemented (essentials) | `user` | `course_completed` / `enrollment_completed` | `learnlane_small_example_events.csv` |
| `fleetflow` | FleetFlow | Implemented (essentials) | `shipment` | `delivered_first_attempt` / `shipment_dispatched` | `fleetflow_small_example_events.csv` |
| `skillbridge` | SkillBridge | Implemented (essentials) | `user` | `first_application_submitted` / `candidate_signup` | `skillbridge_small_example_events.csv` |
| `subnest` | SubNest | Implemented (essentials) | `user` | `retained_day30` / `trial_started` | `subnest_small_example_events.csv` |
| `flowpay` | FlowPay | Implemented (essentials) | `invoice` | `paid_within_14d` / `invoice_created` | `flowpay_small_example_events.csv` |

All cases use `computeOrderedFunnel` and the same panels. Guided methods are suggested context, not eight separately implemented analytical systems. Full raw fixture counts, per-case dates and rules are in `src/domain/cases.mjs`. Each supplied small case CSV was parsed and computed to **20 → 14 → 9 → 5**, without replacing it with a full demo. The archive intentionally aggregates saved records; active investigation/import scopes remain separate.

## KPI counters

**Implemented.** First-appearance and value-change counting, current-to-target cancellation, tabular formatting, static final screen-reader text and reduced-motion/background handling are present. Count, percentage and decimal formats are the formats actually used; no currency/duration KPI or formatter was added. Pure animation-controller cancellation/exact endpoints and EN/VI decimals passed tests. Actual IntersectionObserver visibility, reduced-motion media changes, background-tab events and rendered animation are **NOT TESTED** in a browser.

## CSV inventory and status

**Implemented:** the default template-first file/drop upload path, fixed event/feedback/outcome contracts, required-column/type validation, success/errors, preview and import-to-analysis wiring. File contents stay client-side. Source-level valid/invalid event fixtures, actual counts, feedback text/synthetic flags, outcomes/arm counts and experiment ID rejection passed tests. Real file input/drop interactions, worker/CSP behavior (no new worker pipeline is implemented), storage quota/reload and browser restoration are **NOT TESTED**.

- `public/templates/templates/`: three original blank CSVs (`betterbet_events_template_v1.csv`, `betterbet_feedback_template_v1.csv`, `betterbet_experiment_results_template_v1.csv`).
- `public/templates/examples/`: three original filled synthetic CSVs with corresponding names.
- `public/templates/case_examples/`: eight original small event CSVs listed above.
- `public/templates/README.md`: unchanged supplied template guidance. Its advanced mapping references describe the master prompt, not a new Template Studio in this release.
- V1.0 custom mapping remains available for OrbitDesk as an existing retained feature; a new universal mapping interface is not implemented.

## Deferred / incomplete expanded V1.1 scope

**INCOMPLETE / postponed:** advanced Template Studio, new universal/complex column mapping, sophisticated provenance visualizations, advanced import enhancements and additional method-specific analytical panels. These were intentionally deferred in the Fast Completion release and are not represented as complete in this export. No new features were added to finish them.

## Portability changes only

- Omitted `.openai/hosting.json`: it is a hosting identity marker, not needed by this standalone browser app.
- Removed the previous host's canonical/OG URL and sitemap references in the export copy. Kept local OG/favicon/font assets. Optional explicit `PUBLIC_SITE_URL` generates public metadata after build; no domain is guessed.
- Added Node 24 pin/engine and explicit Vite/Corepack build settings to the portable configuration; kept package/dependency versions and `pnpm-lock.yaml` unchanged.
- Replaced export documentation with this inventory, actual checks and exact deployment settings.
- `src/`, `tests/`, fonts/images/licenses and CSV files are unchanged from the frozen revision. No framework migration or runtime replacement occurred.
- Browser storage does not transfer automatically between origins. Use the implemented backup/restore workflow, which still needs manual browser QA for your target origin.
- `node_modules`, `dist`, `.git`, `.sites-runtime`, build/test logs, credentials, earlier exports and private data are excluded. This is a source ZIP: build it to create `dist`.

## GitHub / Vercel settings

Upload the contents of extracted `betterbet/` to your existing repository root. Root Directory: `.`; Framework Preset: Vite; Node: 24.x; Install: `corepack pnpm install --frozen-lockfile`; Build: `corepack pnpm run build`; Output: `dist`; set Vercel's `ENABLE_EXPERIMENTAL_COREPACK=1`. Local commands with installed pnpm 11.25.0 are `pnpm install --frozen-lockfile` and `pnpm run build`. No production or Preview deployment was triggered.

## Outstanding manual browser QA — NOT TESTED

- App initialization and actual navigation/refresh on your target host; EN/VI click/persistence.
- Select eight cases and multiple uploaded files; check case/import state through saves and reloads.
- File picker, drag/drop, validation/error recovery, result import and the rendered refreshed analysis.
- KPI appearance/change/reduced-motion/background/rapid-filter behavior and final announcements.
- IndexedDB/localStorage quota/failure, backup/restore and transfer from the previous origin.
- Keyboard/focus/screen readers, mobile/touch, responsive layouts, Three.js/WebGL and motion lifecycle.
- Visual regression, performance and real-device/browser compatibility.
