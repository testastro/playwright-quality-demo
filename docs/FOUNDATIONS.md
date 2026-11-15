# Foundations

## CI workflow (.github/workflows/playwright.yml)
- Trigger (on): push to main + pull request to main 
- runs-on: ubuntu-latest = fresh environment, clean machine every run
- Steps in order: checkout → setup Node → npm ci → install browsers → run tests → upload report
- Slowest step: Install Playwright Browsers (52s), so should install on needed testing env
- Lesson: never print secrets (token) in CI logs because public repo logs are readable by anyone