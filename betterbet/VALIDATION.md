# VALIDATION

## Revision and environment

Exported saved **published version 2**, package `1.1.0`, source commit `260cc23d4c78834081e1a3b8f9088f5b88170b12`. Checked 2026-10-12 (Asia/Saigon). Node **v24.19.0**; pnpm **11.25.0**; React **19.1.1**; Vite **6.1.0**. The application code, tests, lockfile, original visual assets/fonts/licenses and supplied CSV bytes match the committed snapshot. There are no unsaved source edits in the original checkout.

The verification below was one focused export pass. Dependencies were not upgraded. No Site or external repository was changed, committed, pushed or deployed.

## Actual commands and outcomes

| Command/check | Result | Evidence and limit |
| --- | --- | --- |
| `pnpm install --offline --frozen-lockfile` | FAIL (environment cache) | Missing offline package metadata for `@esbuild/aix-ppc64`; this attempt could not complete. |
| `pnpm install --frozen-lockfile` | PASS | Clean exported project installed with the frozen lockfile; 18 packages added; no source/package-version change. |
| `pnpm test` | PASS | 206 tests, 206 passed, 0 failed, 0 skipped; one test run. |
| `pnpm run build` | PASS | Vite transformed 1,598 modules; production build completed in 3m 2s; postbuild succeeded. One Vite build was run. |
| `node scripts/verify-export.mjs` | PASS | Static public/Lab entry files, local built assets/fonts, relative module imports and explicit-origin postbuild metadata. |
| Frozen-file byte comparison | PASS | 53 implementation/test/dependency-lock/asset/template files compared to the exact source commit. |
| Original checkout status | PASS | Clean before and after export; original source not modified. |
| `timeout 45 pnpm audit --json` | FAIL (reported advisories) | Audit completed within the bound and returned exit 1 because of the advisories listed below, not an install/build failure. |
| Typecheck | NOT TESTED / not configured | JavaScript/JSX project; no TypeScript/typecheck script exists. |
| Vercel deploy/build-container command | NOT TESTED | No Preview/production deployment or Vercel project mutation was authorized. Local pnpm install/build passed; Corepack/Vercel configuration follows documented settings. |

Default build output is `dist/`. Representative outputs: CSS 88.48 kB, Lab chunk 128.25 kB, Three.js scene chunk 489.66 kB. These are build sizes, **not** performance measurements. No chunk-size warning appeared in the captured Vite output. Dependency policy checks passed during the normal frozen-lockfile install. The initial offline-cache failure was resolved by the ordinary install; it does not imply offline install will work on another machine.

## Automated feature coverage — PASS at the stated level

- Eight raw full-case baselines, explicit entity units/case IDs, event chronology, conversion/observation bounds, cohort filters and segment reconciliation.
- Pure workspace transitions preserve case/import edits without sharing the active analytical dataset.
- Supplied case CSVs parsed through the actual validator/dataset builder/engine: all eight small files computed **20 → 14 → 9 → 5**. General supplied OrbitDesk example computed **3 → 2 → 1 → 1**.
- Invalid schema, unit, ISO calendar date, JSON object and future-event errors are reported; zero-data and previous V1.0 CSV/statistical tests passed.
- Supplied feedback text and synthetic classification; outcome control/treatment counts and wrong-experiment-ID rejection.
- Counter controller starts/updates, cancels stale frames, reaches exact targets and handles instant values; EN/VI percentage decimals and no-data formatting.
- Existing conversion statistics, sample planning, formula-safe CSV export, local-state serialization and user-edited decision Markdown tests.
- React server rendering of primary routes in EN and VI, with and without saved decision fixtures; this does not execute browser event handlers.
- V1.1 per-case server rendering for overview, Diagnose, Evidence, Decide, Experiment, Deliver, Review and Data in both languages, with saved-record fixtures.
- Optional configured-origin canonical/OG/sitemap/robots metadata tested by the postbuild helper in a temporary fixture; the supplied application does not contain a guessed deployment origin.

## Routes checked

Server-rendered EN/VI routes: `/`, `/product`, `/method`, `/case-study`, `/about`, `/lab`, `/lab/overview`, `/lab/diagnose`, `/lab/evidence`, `/lab/decide`, `/lab/experiment`, `/lab/deliver`, `/lab/review`, `/lab/decisions`, `/lab/data`, `/lab/settings`. The production route-entry files were also checked. Vercel's actual rewrite handling and real navigation/refresh are **NOT TESTED** here.

## Browser-only verification — NOT TESTED

Managed browser interaction tooling was unavailable. No preview server or alternative browser path was used. The following were not run and must not be inferred from the build or SSR tests:

- Client application initialization/hydration, clicks/navigation/refresh and EN/VI preference persistence.
- All eight case selections, editing/saving/reopening and repeated imported-dataset selection in a browser.
- Actual File API picker/drop, success/errors, source preview and rendered import-to-analysis updates.
- IntersectionObserver count-up appearance, rapid value changes, reduced-motion media events, tab visibility, live screen-reader behavior.
- Actual localStorage/IndexedDB reload/quota/failure and complete backup/restore across origins.
- Keyboard focus, screen readers, mobile/touch, layout breakpoints, WebGL/Three.js, GSAP/Lenis motion, visual regression, load/performance and browser/device compatibility.

## Dependency/security audit — FAIL; versions intentionally frozen

The current audit reported **13 advisories: 2 high, 9 moderate, 2 low, 0 critical**. They involve the frozen Vite **6.1.0** development/build dependency and its esbuild **0.24.2** dependency. This export is not a clean security bill or a dependency-upgrade release. The source-faithful dependency versions/lockfile remain unchanged; fixes are deferred for a separate reviewed update. Serve the static production output and avoid exposing the Vite development server publicly.

| Package | Severity | Advisory | Reported issue | Audit patched range |
| --- | --- | --- | --- | --- |
| `esbuild` | moderate | [GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99) | esbuild enables any website to send any requests to the development server and read the response | `>=0.25.0` |
| `vite` | moderate | [GHSA-x574-m823-4x7w](https://github.com/advisories/GHSA-x574-m823-4x7w) | Vite bypasses server.fs.deny when using ?raw?? | `>=6.1.2` |
| `vite` | moderate | [GHSA-356w-63v5-8wf4](https://github.com/advisories/GHSA-356w-63v5-8wf4) | Vite has an `server.fs.deny` bypass with an invalid `request-target` | `>=6.1.5` |
| `vite` | moderate | [GHSA-859w-5945-r5v3](https://github.com/advisories/GHSA-859w-5945-r5v3) | Vite's server.fs.deny bypassed with /. for files under project root | `>=6.1.6` |
| `vite` | moderate | [GHSA-xcj6-pq6g-qj4x](https://github.com/advisories/GHSA-xcj6-pq6g-qj4x) | Vite allows server.fs.deny to be bypassed with .svg or relative paths | `>=6.1.4` |
| `vite` | low | [GHSA-g4jq-h2w9-997c](https://github.com/advisories/GHSA-g4jq-h2w9-997c) | Vite middleware may serve files starting with the same name with the public directory | `>=6.3.6` |
| `vite` | low | [GHSA-jqfw-vq24-v9c3](https://github.com/advisories/GHSA-jqfw-vq24-v9c3) | Vite's `server.fs` settings were not applied to HTML files | `>=6.3.6` |
| `vite` | moderate | [GHSA-93m4-6634-74q7](https://github.com/advisories/GHSA-93m4-6634-74q7) | vite allows server.fs.deny bypass via backslash on Windows | `>=6.4.1` |
| `vite` | moderate | [GHSA-4r4m-qw57-chr8](https://github.com/advisories/GHSA-4r4m-qw57-chr8) | Vite has a `server.fs.deny` bypassed for `inline` and `raw` with `?import` query | `>=6.1.3` |
| `vite` | moderate | [GHSA-4w7w-66w2-5vf9](https://github.com/advisories/GHSA-4w7w-66w2-5vf9) | Vite Vulnerable to Path Traversal in Optimized Deps `.map` Handling | `>=6.4.2` |
| `vite` | high | [GHSA-p9ff-h696-f583](https://github.com/advisories/GHSA-p9ff-h696-f583) | Vite Vulnerable to Arbitrary File Read via Vite Dev Server WebSocket | `>=6.4.2` |
| `vite` | moderate | [GHSA-v6wh-96g9-6wx3](https://github.com/advisories/GHSA-v6wh-96g9-6wx3) | launch-editor: NTLMv2 hash disclosure via UNC path handling on Windows | `>=6.4.3` |
| `vite` | high | [GHSA-fx2h-pf6j-xcff](https://github.com/advisories/GHSA-fx2h-pf6j-xcff) | vite: `server.fs.deny` bypass on Windows alternate paths | `>=6.4.3` |

## Scope status

Eight essentials cases, current KPI counters and simple template-first CSV implementation are included. Advanced Template Studio, new complex mapping/provenance visualizations and additional analytical views remain **INCOMPLETE / deferred**, as documented in `EXPORT-STATUS.md`. Preservation/implementation inventory is distinct from browser verification.
