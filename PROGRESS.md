# PROGRESS — Playwright 4-week learning project

> Dán toàn bộ file này vào chat ở đầu mỗi buổi học (prompt: "Continue. Here is my PROGRESS.md").
> Cuối mỗi buổi: tick checklist + thêm 1 dòng vào Session log + commit.

**Owner:** Hung Phan · **Start:** Sat 2026-10-31 · **End:** Fri 2026-11-27 · **Rhythm:** Mon–Sat, 14:00–15:30 (Sunday off)
**Week dates:** W1 31/10–06/11 · W2 07/11–13/11 · W3 14/11–20/11 · W4 21/11–27/11 (D1 = Saturday, D2–D6 = Mon–Fri)
**Current position:** Week 1 · Day 2
**Rule:** Behind schedule → cut Stretch, never MVP. Stuck > 20 min → ask Claude Code to debug.

---

## Checklist

### Week 1 — Foundations + UI (saucedemo.com) · MVP: 5 UI tests on GitHub
- [x] D1 Install Node LTS, VS Code + Playwright extension, Git · GitHub repo · `npm init playwright@latest` (TS, + GitHub Actions) · sample tests pass
- [x] D2 TypeScript basics via sample test (variables, functions, objects, import/export, async/await) · run codegen on saucedemo
- [x] D3 HTML + DevTools + locators · tests: **login success**, **locked-out user error**
- [x] D4 Git add/commit/push · tests: **add to cart (badge = 1)**, **remove from cart**
- [x] D5 Test: **complete checkout** · debug with UI mode + Trace Viewer · beforeEach
- [x] D6 Buffer + review + quiz
- [x] ✅ **Checkpoint W1:** 5 UI tests pass locally and are on GitHub
- [x] _Stretch:_ simple Page Object Model for login

### Week 2 — API testing with Playwright `request` (restful-booker) · MVP: 4 API tests
- [x] D1 HTTP basics (method, URL, status, headers, JSON) · first **GET** test
- [x] D2 Assert JSON body · **GET by id** + **404 negative** test
- [x] D3 **POST create booking** → verify with GET
- [ ] D4 Auth token → **DELETE (or PUT)** booking
- [ ] D5 Folders `tests/ui`, `tests/api` · `@smoke` tags · README v1
- [ ] D6 Concept: **test pyramid** + review
- [ ] ✅ **Checkpoint W2:** 5 UI + 4 API tests pass, organized, README v1
- [ ] _Stretch:_ create data via API before a UI test

### Week 3 — CI/CD with GitHub Actions · MVP: tests run on push/PR, failing PR blocked
- [ ] D1 YAML basics · read generated workflow line by line · first CI run green
- [ ] D2 Break a test on purpose · read logs · download report artifact · fix
- [ ] D3 Branch → Pull Request → automatic check
- [ ] D4 Flaky tests: retries, trace on retry, quarantine tag, root cause
- [ ] D5 Branch protection + required status check (first quality gate)
- [ ] D6 Concept: **pipeline stages** + review
- [ ] ✅ **Checkpoint W3:** a PR with a failing test cannot be merged
- [ ] _Stretch:_ scheduled nightly full run

### Week 4 — Reporting, quality gate, story · MVP: report + gate rules + WHY.md + demo
- [ ] D1 HTML report artifact + GitHub job summary
- [ ] D2 Written gate rules · demo a blocked PR
- [ ] D3 Concept: **DORA metrics** and QA's influence
- [ ] D4 `docs/WHY.md` (1 page: context, options, choices, trade-offs, at scale)
- [ ] D5 README how-to-run + 5-minute demo script · rehearse once
- [ ] D6 Mock CTO interview on this repo (English)
- [ ] ✅ **Checkpoint W4:** repo public, CI green, demo rehearsed
- [ ] _Stretch:_ report on GitHub Pages · status badge

---

## Concepts — can I explain it in 60–90s in English?
| Concept | Not yet | Shaky | Confident |
|---|---|---|---|
| Pipeline stages | ☐ | ☐ | ☐ |
| Quality gate | ☐ | ☐ | ☐ |
| Test pyramid | ☐ | ☐ | ☐ |
| Flaky test handling | ☐ | ☐ | ☐ |
| DORA metrics | ☐ | ☐ | ☐ |

---

## Session log
### W1 D1 · 2026-10-31 · ~95 min
- Done: Node/VS Code/Git installed, Playwright project created, 6 sample tests pass, repo public on GitHub.
- Stuck / error: git email typo (fixed + amend); push rejected — token missing `workflow` scope (fixed).
- Learned: CI files need a separate `workflow` permission; UI error messages can be vague — read the raw terminal log.
### W1 D2 · 2026-11-02
- Done: read example.spec.ts line by line; TS basics (const, object, array); codegen login test on saucedemo with toHaveURL assertion — passes.
- Stuck / error: typo in password from codegen; test without expect still passed (false pass).
- Learned: test() = test case, await = wait for each step, expect = expected result; no assertion = no real test.
## W1·D3 — 2026-11-03 — Locators + 2 login tests
- Done: tests/ui/login.spec.ts — 2 tests pass (valid login, locked-out user) using getByRole/getByPlaceholder/getByTestId; removed sample files.
- Stuck: expect('error') passed a string instead of a locator; VS Code auto-added a wrong import.
- Learned: locator priority (role > placeholder/label > test id > avoid CSS); positive + negative tests; refactor without changing results.
## W1·D4 (2026-11-04) Done: tests/ui/cart.spec.ts – add to cart (badge=1), remove (badge hidden); 6 passed; pushed.
- Stuck: steps placed directly in test.describe (no test()) → "No tests found"; GitHub push error once (retry OK).
- Learned: git status → add → commit → push; every test must set up its own data (independent tests).
## W1·D5 (2026-11-05) — Done
- Done: checkout E2E test; login moved to beforeEach in cart.spec.ts; used UI mode + Trace Viewer; 5 UI tests (15 passed on 3 browsers), pushed.
- Stuck: first run failed – missed the cart-icon click; getByText is case-insensitive/partial → use getByRole('heading').
- Learned: read errors as Expected vs Actual; trace separates "wrong test" from "app bug".
## W1·D6 — Ôn tập + Checkpoint tuần 1 (2026-11-06) ✅
- Done: Suite 15 passed; quiz 8 câu; Stretch POM: pages/LoginPage.ts, dùng trong test login success.
- Stuck: Click Login 2 lần (trong POM + trong test) → timeout "element detached from DOM" → xoá dòng trùng.
- Learned: POM = SOP dùng chung, sửa 1 chỗ thay vì nhiều file. Cần ôn: playwright.config.ts (projects, testIdAttribute), codegen phải thêm expect.
- Checkpoint W1: ĐẠT (5 UI test trên GitHub).

## W2·D1 (08/11) — Done: tests/api/booking.spec.ts GET /booking pass (status 200, list not empty); baseURL; project "api" → suite 16 passed.
- Stuck: /booking/2 trên browser trả 418 vì header Accept: text/html → hiểu vai trò của header.
- Learned: API test = kiểm tầng dưới UI, nhanh & ổn định hơn; kiểm status trước khi đọc body; test phải fail được mới đáng tin.
## W2·D2 - Done: 2 API test mới (GET /booking/:id kiểm field, unknown id → 404); suite api 3 passed.
- Stuck: Viết test GET by id (lấy id từ list + template literal); nhầm list[999999999] (vị trí) với id.
- Learned: res.json() + toHaveProperty (kể cả field lồng nhau), positive vs negative test, đọc lỗi Expected/Received, expected result lấy từ spec.
## W2·D3 · 2026-11-10 · POST tạo dữ liệu rồi verify — Done
- Done: POST /booking → lấy bookingid → GET /booking/:id → toEqual(bookingData); test data tách thành const bookingData. Suite api 4 passed.
- Stuck: thiếu `{` sau `data:` (2 lớp ngoặc options/body); khai báo biến giữa lời gọi post; xoá mất `});` cuối test.
- Learned: request body/payload, round-trip test (ghi rồi đọc lại), toEqual so cả object vs toBe so một giá trị, test data dùng chung.