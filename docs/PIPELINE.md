# Pipeline: stages and owners
trigger → PR to main / merge to main            → owner: engineer who pushes
install → GitHub Actions clean machine, npm ci   → owner: DevOps (workflow file)
build   → N/A (testing public demo apps)
test    → npx playwright test (UI + API)         → owner: pusher fixes red; QA owns suite health
report  → HTML report artifact + PR checks       → owner: QA (content & readability)
gate    → branch protection: PR + check "test"   → owner: QA defines rules, admin configures
deploy  → N/A here; in a real team after the gate → owner: DevOps, smoke test + rollback