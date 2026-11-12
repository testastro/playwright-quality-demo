# playwright-quality-demo

A small, readable reference project for test automation with **Playwright** and **TypeScript**. It combines UI and API tests in a single suite and runs them automatically in CI.

## Purpose

A portfolio project showing how design a lean, layered test strategy — UI + API tests, smoke tagging, and CI quality gates — with Playwright and TypeScript.

**Systems under test** (public demo sites, no setup required):

| Layer | Target                                                 |
| :---- | :----------------------------------------------------- |
| UI    | [Sauce Demo](https://www.saucedemo.com)                |
| API   | [Restful-Booker](https://restful-booker.herokuapp.com) |

## Tech stack

| Area           | Tool                                              |
| :------------- | :------------------------------------------------ |
| Test framework | [Playwright Test](https://playwright.dev) `^1.64` |
| Language       | TypeScript (on Node.js LTS)                       |
| Browsers       | Chromium, Firefox, WebKit                         |
| CI             | GitHub Actions                                    |
| Reporting      | Playwright HTML report                            |

## Project structure

```
.
├── tests/
│   ├── ui/                  # Browser-based tests (login, cart, checkout)
│   └── api/                 # API tests (no browser)
├── pages/                   # Page Objects (currently LoginPage)
├── playwright.config.ts     # Projects, retries, reporter, test-id attribute
├── .github/workflows/
│   └── playwright.yml       # CI: runs the suite on push / pull request
└── PROGRESS.md              # Learning log and checklist
```

**Playwright projects** (defined in `playwright.config.ts`):

| Project                         | Test folder | Notes                                       |
| :------------------------------ | :---------- | :------------------------------------------ |
| `chromium`, `firefox`, `webkit` | `tests/ui`  | API tests are excluded via `testIgnore`     |
| `api`                           | `tests/api` | Uses `request` only; no browser is launched |

## How to run

### Prerequisites

- Node.js (LTS) and npm
- Git

### Setup

```bash
npm ci
npx playwright install --with-deps
```

### Run tests

| Goal                      | Command                                  |
| :------------------------ | :--------------------------------------- |
| Full suite (all projects) | `npx playwright test`                    |
| Smoke tests only          | `npx playwright test --grep @smoke`      |
| UI tests only             | `npx playwright test tests/ui`           |
| API tests only            | `npx playwright test --project=api`      |
| A single browser          | `npx playwright test --project=chromium` |

### Debug and report

| Goal                      | Command                       |
| :------------------------ | :---------------------------- |
| Interactive UI mode       | `npx playwright test --ui`    |
| Step-through debugger     | `npx playwright test --debug` |
| Open the last HTML report | `npx playwright show-report`  |

### Configuration

API credentials are read from environment variables. If they are not set, the public demo defaults of Restful-Booker are used.

| Variable       | Default       | Purpose                   |
| :------------- | :------------ | :------------------------ |
| `API_USER`     | `admin`       | Username for `POST /auth` |
| `API_PASSWORD` | `password123` | Password for `POST /auth` |

```bash
API_USER=myuser API_PASSWORD=mypassword npx playwright test --project=api
```

## Test coverage

### Summary

| Layer     | Tests  | Browsers | Test runs |
| :-------- | :----: | :------: | :-------: |
| UI        |   5    |    3     |    15     |
| API       |   6    |    –     |     6     |
| **Total** | **11** |          |  **21**   |

### UI: Sauce Demo (`tests/ui`)

| ID    | Area     | Scenario                                | Smoke |
| :---- | :------- | :-------------------------------------- | :---: |
| UI-01 | Login    | Valid user lands on the Products page   |   ✓   |
| UI-02 | Login    | Locked-out user sees an error message   |   –   |
| UI-03 | Cart     | Adding an item shows a badge with `1`   |   –   |
| UI-04 | Cart     | Removing the item hides the badge       |   –   |
| UI-05 | Checkout | A user can complete an order end to end |   ✓   |

### API: Restful-Booker (`tests/api`)

| ID     | Endpoint              | Scenario                                           | Smoke |
| :----- | :-------------------- | :------------------------------------------------- | :---: |
| API-01 | `GET /booking`        | Returns a non-empty list of bookings               |   ✓   |
| API-02 | `GET /booking/:id`    | Returns booking details with the expected fields   |   –   |
| API-03 | `GET /booking/:id`    | Returns `404` for an unknown id                    |   –   |
| API-04 | `POST /booking`       | Creates a booking, and `GET` returns the same data |   ✓   |
| API-05 | `POST /auth`          | Returns an auth token for valid credentials        |   –   |
| API-06 | `DELETE /booking/:id` | Deletes a booking, and `GET` then returns `404`    |   –   |

### Not covered yet

| Area         | Gap                                                     |
| :----------- | :------------------------------------------------------ |
| Login        | Invalid credentials and empty fields                    |
| Inventory    | Product sorting, product details, logout                |
| API          | `PUT` / `PATCH` updates and invalid-token (`403`) cases |
| Page Objects | Cart and checkout (only `LoginPage` exists)             |
