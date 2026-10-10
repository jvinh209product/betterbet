# BETTERBET — manual GitHub → Vercel deployment

This document is a manual handoff. The export did not create, connect, push to, deploy or modify any GitHub/Vercel account or project. The existing BETTERBET Site was not edited or redeployed.

## 1. Review locally

Extract `betterbet-complete-portable-source.zip`. It contains one project directory, `betterbet/`. Use Node 24.x and the existing pnpm 11.25.0 lockfile:

```sh
cd betterbet
npx --yes pnpm@11.25.0 install --frozen-lockfile
npx --yes pnpm@11.25.0 test
npx --yes pnpm@11.25.0 run build
npx --yes pnpm@11.25.0 run preview
```

Review `VALIDATION.md`, including audit findings and browser checks still needed. Keep all source, scripts, configuration, assets and font licenses. Do not upload `node_modules`, `dist`, caches, browser backups, private CSV or credentials.

## 2. Create the independent GitHub repository yourself

Under account **jvinh209product**, create a new, separate repository **betterbet**, with initial branch **main**. The proposed URL is `https://github.com/jvinh209product/betterbet`; it is only a destination suggestion until you create it. Do not use a branch of `vinh-nguyen-portfolio`, `PMshipit`, `gieo` or another existing repository.

Choose the layout deliberately:

| Upload layout | Location of `package.json` in GitHub | Vercel Root Directory |
| --- | --- | --- |
| Recommended: upload the contents inside the ZIP's `betterbet/` directory | `/package.json` | `./` (root; leave the UI field blank if it represents root) |
| Alternative: upload the enclosing directory itself | `/betterbet/package.json` | `betterbet` |

`vercel.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `site.config.json`, `src/`, `public/`, `scripts/` and `tests/` must be beside that `package.json`. Include `.gitignore` and `.nvmrc`; verify hidden files are not accidentally omitted.

If using your own local Git CLI, these commands are suggestions to run **after** you create the empty repository and confirm your working directory. They were not executed during export:

```sh
git init -b main
git add .
git commit -m "Initial BETTERBET standalone source migration"
git remote add origin https://github.com/jvinh209product/betterbet.git
git push -u origin main
```

A GitHub web upload is also possible; upload the whole intended layout, then inspect actual paths before Vercel import.

## 3. Import into a new Vercel project

Create a **new independent** Vercel project from your new repository. Proposed project name: **betterbet**. Production branch: **main**. Desired hostname: **betterbet.vercel.app**, subject to availability and the actual domain Vercel assigns. No availability/ownership has been verified.

The project is a React/Vite static SPA, not Next.js, SSR or a Worker. Use:

| Setting | Value |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | `./` or `betterbet`, according to the table above |
| Node.js version | 24.x (also selected by `engines.node`) |
| Install Command | `npx --yes pnpm@11.25.0 install --frozen-lockfile` |
| Build Command | `npx --yes pnpm@11.25.0 run build` |
| Output Directory | `dist` |
| Production branch | `main` |
| Required environment variables | None |

`vercel.json` already declares the framework/install/build/output values and scoped rewrites. If the UI requests overrides, use exactly these values. The versioned `npx` command deliberately selects pnpm 11.25.0: do not rely on Vercel's lockfile-version inference to select that version or replace it with a bare `pnpm install` override. No `ENABLE_EXPERIMENTAL_COREPACK` variable is needed for this explicit npx workflow. Dependencies come from the public npm registry; no private package registry/token is required.

The configuration has been inspected and the same install/build commands executed locally. **A Vercel-hosted build/deployment has not been run.** If it fails, inspect its logs, Node version, root path and package-manager version before changing source or dependencies.

## 4. Deploy manually and verify the assigned URL

Choose Deploy yourself. Wait for Vercel's actual **Ready** status and inspect logs; the ZIP does not establish any deployment status. Open the assigned project URL rather than assuming the desired hostname.

The included rewrites route `/lab/:path*` and named public pages to `/index.html`. They do not match `/assets/`, `/fonts/`, `/fonts.css`, `/favicon.svg` or `/og-image.png`. Postbuild also emits HTML entry points for all 16 implemented routes. Keep the `vercel.json` in the selected project root; do not add `cleanUrls` without reviewing destination paths.

After deployment, directly visit and refresh:

- `/product`, `/method`, `/case-study`, `/about`.
- `/lab`, `/lab/overview`, `/lab/diagnose`, `/lab/evidence`, `/lab/decide`.
- `/lab/experiment`, `/lab/deliver`, `/lab/review`, `/lab/decisions`, `/lab/data`, `/lab/settings`.

Check static assets return their actual file content, not SPA HTML. Exercise the workflow and imported datasets; verify the default 12,000 → 10,080 → 3,720 → 2,160 funnel. Test EN/VI, local reload/backup/restore, real Markdown downloads, keyboard focus, reduced motion and WebGL fallback. Review layouts at 375, 430, 768, 1024 and 1440 px. These live/browser checks remain unverified in this export.

## 5. Configure SEO only once the real production domain is known

No new hostname is hardcoded in the application. `site.config.json` has `siteUrl: null`; the app works without an absolute origin, but absolute canonical/OG URL and sitemap output are omitted.

When the actual stable production origin has been assigned, set `siteUrl` to that HTTPS origin, with no path, query, fragment or credentials. Rebuild through your normal commit/deployment workflow. Postbuild generates the canonical and OG URLs for each route and a sitemap for the five public pages; Lab remains excluded in `robots.txt`. Keep the production origin in Preview builds too, to avoid treating ephemeral Preview hosts as the canonical production site.

## 6. Move browser work explicitly

The ZIP contains source and synthetic demo content, **not existing browser-local records**. A new origin cannot read the old Sites origin's localStorage/IndexedDB. Preview and Production URLs also have separate browser storage.

In the old workspace, use `/lab/settings` → **Export Workspace / Xuất không gian**. On the assigned new Production URL, use `/lab/settings` → **Restore Backup / Khôi phục sao lưu** and confirm replacement. Export destination work first if needed. Verify restored records/data before clearing the old origin. Keep backups private and out of GitHub. There is no automatic migration or cloud synchronization.

## 7. Future upgrades

Create `upgrade/<topic>` from `main`, make/test changes locally and push that branch yourself. Vercel should build a Preview for the branch. Review the actual Preview and its logs; then open a pull request and merge into `main` after review. Vercel's main-branch deployment becomes Production when successful. Keep repository and project identity separate from your portfolio and other apps.

## Official references checked during export

- Vercel Vite and SPA deep links: https://vercel.com/docs/frameworks/frontend/vite
- Vercel package-manager selection: https://vercel.com/docs/package-managers
- Vercel build/root settings and Corepack alternative: https://vercel.com/docs/builds/configure-a-build
- Vercel Node versions: https://vercel.com/docs/functions/runtimes/node-js/node-js-versions
- Vercel scoped rewrites: https://vercel.com/docs/routing/rewrites
