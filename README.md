# acRatets

A React 19 and TypeScript interface for browsing anime seasons, timelines, and
rankings. The application is built with Vite and uses Material UI components.

## Requirements

- Node.js 22 or newer
- npm 10 or newer

## Development

```sh
npm ci
npm run dev
```

Run the validation suite with:

```sh
npm run validate
```

Preview the production build with `npm run preview`.

For the Chromium smoke test, install its browser runtime once and run:

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

## Environment configuration

Copy `.env.example` to `.env.local` for local overrides. `VITE_API_BASE_URL`
is the full browser-facing base path or URL for the application backend and
defaults to `/api`. `VITE_JIKAN_API_BASE_URL` defaults to the public Jikan v4
API.

Production deployments must set `VITE_API_BASE_URL` to a reachable HTTPS API.
The Vite development server proxies the default `/api` path to
`http://localhost:4000`.

## Dependency updates

Dependabot checks npm packages and GitHub Actions every Monday. Minor and patch
updates are grouped by dependency type; major updates are opened separately so
migrations can be reviewed individually.

Pull requests are validated by independent formatting, lint, unit-test,
coverage, build/bundle-budget, security-audit, and Playwright checks. Successful
`main` builds retain the production bundle as a workflow artifact for seven
days.
