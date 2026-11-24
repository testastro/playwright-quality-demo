# Quality Gate

## 1. What blocks a merge to main
- Any failing test in the required check will block the merge
- If main turns red, the person who pushed fixes it within 1 hour; otherwise the change is reverted.
## 2. Flaky tests
- A test that passes on retry = flaky: it does not block, but must be fixed.
- Tag it @flaky = quarantine, with a named owner.
- Max 5 working days in quarantine, then fix the root cause or delete the test.
## 3. Who can override, and when
- Lead or QAM can override only after a re-run, and only when the failure isn't caused by the PR's change (for example, the demo site is down).
- Write the reason in the PR and open a follow-up ticket.
- Never override a real product bug.
## 4. How it is enforced
| Rule | Enforced by | Status |
|---|---|---|
| Failing test blocks merge | Branch protection: required check `test` | Automated |
| Main red → fix in 1h or revert | Team process | Process |
| Retry pass = flaky, not blocking | `playwright.config.ts`: `retries: 2` on CI | Automated |
| @flaky quarantine | `playwright.yml`: `--grep-invert @flaky` | Automated |
| Max 5 days in quarantine | Owner + weekly review | Process |
| Lead/QAM override | "Do not allow bypassing" is ON → nobody can merge red | Gap: stricter than the rule (OK for a solo repo; at team scale allow bypass for QA leads only) |