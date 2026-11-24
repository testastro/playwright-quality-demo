# DORA & this repo

- **Deployment frequency** — how often we release. In this repo: tests run on every PR in ~1 minute, so releasing is cheap and can happen more often.
- **Lead time for changes** — time from commit to production. In this repo: automated tests replace manual regression, so a change is verified in minutes, not days.
- **Change failure rate** — % of releases that need a hotfix or rollback. In this repo: branch protection + required check `test` block failing PRs before merge.
- **Time to restore** — time to fix or roll back after a production issue. In this repo: nightly cron detects issues early; trace and HTML report show where it broke.
- **Risk:** flaky tests hurt lead time and deployment frequency (constant re-runs) and can raise change failure rate (people ignore red builds) → handled by retries with trace on first retry, quarantine with `@flaky` + `--grep-invert @flaky`, then fixing the root cause.