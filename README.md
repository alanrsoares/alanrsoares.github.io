# alanrsoares.github.io

GitHub Pages OSS index for [@alanrsoares](https://github.com/alanrsoares).

https://alanrsoares.github.io · personal site: https://alanrsoares.me

## Sections

| Section | Source |
| --- | --- |
| Active repositories (6) | `public/active-repos.json` |
| Live demos | `public/deployed-pages.json` |
| GitHub stats | `src/site.ts` (`STATIC_STATS`) |
| Hero copy / links | `src/site.ts` (`SITE`) |

Manifests are generated at build time from the GitHub API. Forks and archived repos are excluded. Active repos are ranked by `pushed_at` + commit count (180d window).

## Commands

```bash
bun install
bun run dev              # http://localhost:5173
GITHUB_TOKEN=$(gh auth token) bun run build
bun run preview
```

Build runs `scripts/generate-github-manifests.ts` then `tsc` then `vite build`. Token required for manifest generation (rate limits without it).

## Deploy

Push to `dev` → `.github/workflows/deploy.yml` builds with `GITHUB_TOKEN` and deploys `dist/` to GitHub Pages. PRs build only.

`dist/` is gitignored.

## Layout

```
src/App.tsx
src/site.ts
src/github.ts
src/hooks/use-github-data.ts
scripts/generate-github-manifests.ts
public/active-repos.json      # generated
public/deployed-pages.json    # generated
```

## Stack

Bun, Vite, React 19, Tailwind v4, shadcn/ui, @styled-cva/react, Motion.

MIT
