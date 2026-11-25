# Why this setup

## Context
- Portfolio repo to show how I would set up test automation and a quality gate as a Head of Quality.
- Targets public demo apps: saucedemo.com (UI) and restful-booker (API).
- Constraints: one person, 4 weeks, starting with no coding background.

## Options considered
- UI: Playwright vs Cypress vs Selenium.
- API: Playwright `request` vs Postman/Newman.
- CI: GitHub Actions vs Jenkins.

## Decisions
- Playwright + TypeScript for UI and API: one tool, auto-waiting, trace viewer, 3 browsers built in.
- GitHub Actions: lives next to the code, free for public repos, no server to maintain.
- Branch protection on main: every change needs a PR and a green `test` check (see QUALITY_GATE.md).
- More API tests than UI tests, following the test pyramid.

## Trade-offs
- 3 browsers catch cross-browser bugs, but triple UI run time and add more places for flaky failures.
- Playwright `request` keeps UI and API in one tool and one CI run, but is less convenient than Postman for manual exploration by non-coders.
- Public demo sites are free and realistic, but can be slow or down, which can fail CI for reasons outside our code.

## At team scale
- Ownership: developers write and fix tests for their own features; QA owns the strategy, the framework and the gate rules.
- Gate override: only the QA lead or engineering manager can override, with a written reason in the PR, reviewed weekly.
- Flaky tests: quarantine with @flaky and a 5-day deadline to fix or delete; track the flaky rate on a dashboard.
- Speed: run @smoke on every PR (under 5 minutes) and the full suite nightly (already set up with cron).
- Measure: track change failure rate and lead time (DORA) to show the gate helps delivery, not slows it.
- Test data: create data via API per test instead of relying on shared demo sites.