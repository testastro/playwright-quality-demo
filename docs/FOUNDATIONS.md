# Foundations

## CI workflow (.github/workflows/playwright.yml)
- Trigger (on): push to main + pull request to main 
- runs-on: ubuntu-latest = fresh environment, clean machine every run
- Steps in order: checkout → setup Node → npm ci → install browsers → run tests → upload report
- Slowest step: Install Playwright Browsers (52s), so should install on needed testing env
- Lesson: never print secrets (token) in CI logs because public repo logs are readable by anyone
- Artifact = file CI giữ lại sau khi chạy (vd: playwright-report), vì máy CI bị xoá sau mỗi lần chạy
- Khi CI đỏ: log ở Actions → run ❌ → job test → step "Run Playwright tests"; report ở cuối trang run → Artifacts → playwright-report.zip → index.html
- Khi CI đỏ: người vừa push xử lý; không sửa xong trong 30p–1h thì revert để main xanh lại, rồi phân loại lỗi: product / test / env
## Branch workflow
- A branch is a separate working copy where make changes without touching `main`.
- A Pull Request (PR) asks to merge a branch into `main`; it shows the changes and runs CI automatically.
- Commit on the branch, open a PR, and merge only when CI is green, so `main` always stays green.
## Flaky tests
- A flaky test passes or fails randomly while the code has not changed.
- Retries detect flakiness: a test that passes on retry is still flaky, not green.
- Quarantine (tag `@flaky` + `--grep-invert`) isolates it for debugging; every quarantined test needs an owner and a deadline.
## Quality gate
- A quality gate is a mandatory, automated rule a change must pass before it can be merged.
- In this repo, `main` is protected: every change needs a Pull Request, and the CI check `test` must be green before merging.
- Admin bypass is disabled because I am the only person in the repo, so a bypass would make the gate useless; in a real team, overrides should be allowed only for a named role, with a reason, and logged.