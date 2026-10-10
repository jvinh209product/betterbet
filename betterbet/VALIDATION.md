# BETTERBET export validation

Validation date: **2026-10-10 UTC**. These results apply to the portable copy, not an assumed Vercel deployment. They distinguish executed checks from implemented-but-unverified behavior.

## Provenance and scope

The native source-opening workflow checked the current repository HEAD. It matches saved Site version **1**, commit **09f0ea0dd7479cf0f114ff27478ba426907de460**. The source checkout had no uncommitted tracked changes. All **11 files under `src/`** and the exact `pnpm-lock.yaml` were verified SHA-256 identical to that source. The existing Site was not edited, saved, published or redeployed; GitHub/Vercel account operations were not performed.

Portability changes are confined to Node/build/deployment configuration, origin-specific SEO metadata, a test-cache directory name and documentation. `EXPORT-MANIFEST.json` lists changes and hashes. The ZIP excludes `.git`, `.openai`, `node_modules`, `dist`, test caches, secrets and visitor data.

## Executed commands

Commands ran from the portable `betterbet/` directory unless noted. No source-repository dependency installation or rebuild was used in place of this clean copy.

| Command / check | Actual result |
| --- | --- |
| `node --version` | Node **v24.19.0** |
| `pnpm --version` | **11.25.0** |
| `npx --yes pnpm@11.25.0 install --frozen-lockfile` | **PASS**, exit 0. Fresh `node_modules`; 18 packages downloaded/added, esbuild postinstall completed. Lockfile resolution unchanged; supply-chain policy checks passed. |
| `npx --yes pnpm@11.25.0 test` | **PASS**, exit 0. **54 tests, 54 passed, 0 failed/skipped/cancelled**. Reported test duration 711.477449 ms. |
| `npx --yes pnpm@11.25.0 run build` | **PASS**, exit 0. Vite 6.1.0 transformed 1,591 modules; build reported **2m 57s**. Postbuild created **16 route entry points**. |
| `npx --yes pnpm@11.25.0 audit --json` | **WARN**, exit 1 for known vulnerabilities: **13 advisories** (2 high, 9 moderate, 2 low, 0 critical). See below and `DEPENDENCY-AUDIT.json`. |
| Python SHA-256 source/asset inspection | **PASS**. All application source and the existing lockfile preserved byte-for-byte. |
| Python HTMLParser/resource inspection of `dist` | **PASS**. Every implemented route has HTML; HTML/font references resolve to bundled files. No former Sites origin remains in built HTML. |
| Python temporary-directory postbuild exercise | **PASS**. A reserved test origin generated per-route canonical/OG metadata, a five-public-page sitemap and robots reference. Invalid origin with a path was rejected. Default null origin omits stale absolute metadata/sitemap. This is not a real domain/deployment test. |
| Node React SSR internal-link inspection | **PASS**. 32 EN/VI route renders; all inspected internal link targets are implemented routes. This does not test click handlers. |
| Python font/Pillow inspection | **PASS**. All eight TTF files parse and contain sampled Vietnamese accented glyphs; both font licenses are present. Original OG PNG decodes at **1200 × 630**. |
| Runtime source/private-API inspection | **PASS within inspected scope**. No private Sites API, platform asset origin, environment-specific absolute import, fetch/XHR/WebSocket call, `eval`, or raw-HTML renderer in app/runtime source. No hosting manifest is needed by build. |
| ZIP CRC/path/file/hash/secret-pattern inspection | **PASS** for the delivered ZIP; performed before saving the artifact. Manifest inventory excludes its own recursive hash. |

`npm ci` was not run: this source uses pnpm and has no `package-lock.json`. `npm test` was not run; the command executed was the pnpm test invocation above. No lint script exists and lint was not requested.

## Build output and warnings

The built entry CSS is 87.29 kB (17.80 kB gzip). The lazy Three.js scene chunk is 489.66 kB (123.28 kB gzip); the main React chunk is 223.83 kB (73.66 kB gzip); Lab is 108.32 kB (34.80 kB gzip). These are emitted file sizes, not measured network performance or Core Web Vitals.

Vite reported no unresolved imports, missing scripts/assets or chunk-size warnings. The npx wrapper printed an environment-specific npm warning about an unknown `http-proxy` setting and npm/pnpm upgrade notices. These did not fail install, test or build and are not required application settings. The pnpm version and dependency lockfile were retained.

## Analytics and import/export tests actually passed

The existing 16 domain tests cover:

- Raw deterministic generator and canonical **12,000 / 10,080 / 3,720 / 2,160** counts, invite loss **6,360**, correct conversion values and chronological seven-day events.
- Segment totals matching the full cohort; property filters changing derived counts/rates.
- Duplicate identities, strict event order, missing milestones, valid repeated later events and outside-window exclusion.
- Entry-date cohort selection, entry-time properties, incomplete observation exclusion and zero-cohort null rates.
- BOM, quoting, escaped quotes, multiline/alternate-separator parsing and malformed CSV rejection.
- Actual imported column/event mapping, timezone validation and duplicate-row handling.
- Binary outcome assignment duplicates, full follow-up and conversion-window rejection.
- Count-based two-arm metrics, Wilson/Newcombe uncertainty and approximate sample-size reference.
- Spreadsheet formula-injection protection.
- Actual edited-state serialization and quota-failure behavior using a localStorage mock.
- Nonempty Markdown exporter output containing exact hypotheses/rationale, source IDs, alternatives and edited brief/learning text.

These are executed function tests. Actual browser file selection, download, full mapped-import UI and chart repainting were **NOT RUN**. A full browser filter/reset interaction was **NOT RUN**; engine-filter/segment results passed.

## Route and workflow render tests actually passed

The 38 existing render tests use React server rendering: **16 routes × 2 languages = 32**, plus **6 saved-decision workflow renders**. Routes: `/`, `/product`, `/method`, `/case-study`, `/about`, `/lab`, `/lab/overview`, `/lab/diagnose`, `/lab/evidence`, `/lab/decide`, `/lab/experiment`, `/lab/deliver`, `/lab/review`, `/lab/decisions`, `/lab/data`, `/lab/settings`.

They check that components render, retain the creator portfolio link and do not emit NaN/undefined. Saved workflow fixtures retain `BET-0001` across Overview, Decide, Experiment, Deliver, Review and Archive. They do not establish a browser end-to-end pass for saving, evidence link/unlink, editing/locking snapshots, replaying backups or assigning real outcomes.

## Browser, device and deployment checks

The required managed browser capability is unavailable. No preview server/browser was started, and no substitute browser automation or screenshot result is claimed.

| Check | Status |
| --- | --- |
| Visual layouts at 375, 430, 768, 1024 and 1440 px | **NOT RUN / UNVERIFIED** |
| Real CTA clicks, history navigation and direct route refresh in Vercel | **NOT RUN / UNVERIFIED**; route files/scoped rewrites inspected only |
| Keyboard focus, dialog behavior, screen reader and full accessibility review | **NOT RUN / UNVERIFIED** |
| EN/VI switching during edits/imports/filter changes | **NOT RUN / UNVERIFIED**; both language render sets passed |
| Complete translation/content review | **UNVERIFIED**; preserved English-only error boundary is known |
| WebGL on devices, context loss, fallback and reduced-motion behavior | **NOT RUN / UNVERIFIED**; source/fallback preserved |
| Browser localStorage/IndexedDB reload, full backup/restore/reset | **NOT RUN / UNVERIFIED**; serialization mock test passed |
| Full evidence → decision → experiment → brief → review browser journey | **NOT RUN / UNVERIFIED** |
| Outcome/simulation separation under actual user interaction | **NOT RUN / UNVERIFIED**; source/validation retained |
| Vercel build/deployment, assigned domain and Ready status | **NOT RUN**; no project was created |
| GitHub repository existence/ownership/authentication | **NOT VERIFIED**; no GitHub account/repository was accessed |
| Desired `betterbet.vercel.app` availability | **NOT VERIFIED** |

## Dependency audit: unresolved findings

The actual audit returned **2 high, 9 moderate, 2 low; 0 critical**. Findings are in preserved **Vite 6.1.0** and its **esbuild 0.24.2** dependency. Exact advisories, affected/patched ranges and links are in `DEPENDENCY-AUDIT.json`.

| High advisory | Module | Patched range reported by audit |
| --- | --- | --- |
| GHSA-p9ff-h696-f583 — arbitrary file read through dev-server WebSocket | Vite | `>=6.4.2` |
| GHSA-fx2h-pf6j-xcff — Windows alternate-path file-deny bypass | Vite | `>=6.4.3` |

The reviewed primary advisories concern exposed development servers; the planned Vercel configuration serves compiled static `dist`, not a Vite dev server. This is an architectural distinction, **not security clearance** for an untested deployment. Existing dev/preview scripts bind to `0.0.0.0`; do not expose these preserved vulnerable development tools to untrusted networks. Dependency remediation and regression testing should be an explicit subsequent upgrade. No dependency upgrade or lockfile replacement was silently included in this source export.

Primary advisory references:

- https://github.com/advisories/GHSA-p9ff-h696-f583
- https://github.com/advisories/GHSA-fx2h-pf6j-xcff
- https://github.com/advisories/GHSA-67mh-4wv8-2f99

## Privacy checks and remaining limits

The ZIP uses an explicit source-file inventory, with no user CSV, JSON workspace backup, `.env`, credential, cookie, repository metadata or browser storage. Known token/private-key patterns were checked in source/config/document text; this is not a comprehensive security audit. Imported text is rendered through React text nodes in inspected source; CSV formula protection is unit-tested. No server encryption, team access control or automatic origin-to-origin migration is claimed.

The app remains local-only. Guardrails are definitions rather than measured outcomes; planning and simulation do not establish observed impact. The optional public SEO origin is unconfigured until an actual production hostname is assigned. No clean-install/build blocker remains; dependency warnings and real-browser/deployment checks remain open before a public production acceptance decision.
