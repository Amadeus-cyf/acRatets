# Agent guidance

These instructions apply to the entire repository. Read any more specific
`AGENTS.md` in a directory before changing files there.

## Project and setup

acRatets is a React 19 and TypeScript anime-browsing frontend built with Vite.
It uses Material UI and Emotion, React Router, Redux, Axios, Vitest, and
Playwright. The application backend is not part of this repository.

- Use Node.js 22 (see `.nvmrc`) and npm 10 or newer. With nvm installed, run
  `nvm use` from the repository root.
- Install locked dependencies with `npm ci`; use npm, not another package manager.
- Start development with `npm run dev`. The default `/api` path proxies to
  `http://localhost:4000`, so real application data requires a running backend.
- Use `.env.example` as the template for `.env.local`. Never commit local
  environment files or secrets. All `VITE_*` values are exposed to the browser
  and must not contain secrets.

## Repository layout

- `src/App.tsx`: Redux provider and lazy-loaded routes.
- `src/index.tsx`: browser entry point; root `index.html` is the Vite HTML entry.
- `src/containers/`: pages and page-specific sections.
- `src/components/`: reusable UI; `src/components/ui/` contains Material UI adapters.
- `src/api/`: shared HTTP clients, endpoint modules, and response types.
- `src/store/`: Redux store, actions, and reducers.
- `src/interface/`: shared domain interfaces; `src/model/` contains domain helpers.
- `src/const/`, `src/utils/`, and `src/assets/`: constants, utilities, and bundled assets.
- `public/`: files served without bundling.
- `e2e/`: Playwright browser tests; unit tests live alongside source files.
- `scripts/`: repository tooling, including the bundle-size check.
- `.github/`: CI and Dependabot configuration.

Follow the naming and placement of neighboring files, including existing
feature directories using underscores and `index.tsx` entry points. Avoid
unrelated renames or introducing a second competing directory structure.

## Code conventions

- Write React function components and hooks, not React class components.
  Non-React domain or API classes are not prohibited.
- Use `@/` imports across source directories and relative imports for files
  within the same directory. Keep Vite and TypeScript alias definitions aligned.
- Use TypeScript with explicit domain and API types. Avoid `any`, boxed primitive
  types, and unsafe assertions; narrow `unknown` where appropriate.
- Preserve the hooks rules and complete effect dependency lists. Do not silence
  lint rules to hide correctness problems.
- Use Material UI or the existing UI adapters. Do not reintroduce Semantic UI.
- Follow `.prettierrc.json`: four-space indentation, double quotes, semicolons,
  and ES5-compatible trailing commas. Prefer formatting only changed files.
- Keep changes focused and preserve existing user edits. Do not commit generated
  build output, coverage, Playwright reports, or dependencies.

## API, accessibility, and performance

- Reuse `apiClient` and `jikanClient` from `src/api/client.ts`; do not duplicate
  Axios configuration or hard-code backend URLs in components.
- Application requests use `VITE_API_BASE_URL` (default `/api`). The Jikan
  fallback uses `VITE_JIKAN_API_BASE_URL` and the v4 response shape.
- Cancel obsolete requests with `AbortController` and pass its signal through
  endpoint helpers. Clean up effects, listeners, and other subscriptions.
- Handle loading, empty, and error states when changing request-driven UI.
- Keep route-level lazy loading and meaningful list keys. Avoid unnecessary
  state updates and renders; add memoization only when it has a concrete benefit.
- Prefer responsive CSS or `matchMedia` subscriptions over updating React state
  on every window resize. Reuse optimized assets where available.
- Preserve accessible labels, image alternative text, and keyboard navigation.
- Do not raise bundle budgets or lower coverage thresholds to make checks pass
  without an explicit, justified decision.

## Verification

For code changes, run:

```sh
npm run validate
```

This checks formatting, lint, unit tests with coverage, TypeScript, the Vite
production build, and the bundle budget. Coverage must meet 40% for statements,
branches, functions, and lines. JavaScript bundles must stay within 200 KiB total
gzip and 300 KiB uncompressed per chunk.

For UI, routing, or browser-runtime changes, also run:

```sh
npx playwright install chromium # Once per environment
npm run build
npm run test:e2e
```

Playwright starts the production preview on `127.0.0.1:4173`; build before running
it. Mock API requests in automated tests instead of depending on a live backend
or third-party service. Add or update colocated `*.test.ts` / `*.test.tsx` tests
for changed behavior, and browser tests in `e2e/` for relevant user flows.

For documentation-only changes, `npm run format:check` is sufficient. Report
which checks actually ran and any failures or limitations; do not claim unrun
checks passed.

## Dependencies and GitHub workflow

- Keep `package.json` and `package-lock.json` synchronized. Check peer dependency
  compatibility, especially React/React DOM/types and TypeScript/typescript-eslint.
  Do not use `--force` or `--legacy-peer-deps` to mask incompatible dependencies.
- After dependency changes, run `npm ci`, the verification above, and
  `npm audit --audit-level=high`. Dependabot manages npm and GitHub Actions updates.
- CI has independent `Format`, `Lint`, `Test`, `Coverage`, `Build`, `Security`, and
  `E2E` jobs. Preserve those names because branch protection requires them.
- This repository is CI-only. Do not add continuous deployment, hosting-provider
  configuration, or deployment secrets unless the user explicitly requests it.
- `main` is protected. When asked to commit and push new changes, use a `codex/`
  branch and the pull-request workflow. Do not force-push or relax protection
  without explicit approval; use an exact lease and restore protection if an
  approved history rewrite requires a temporary exception.
