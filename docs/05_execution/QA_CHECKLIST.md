---
owner: product
status: active
last_updated: 2026-05-28
source_of_truth: true
---

# QA checklist

## Smoke (every deploy)

- [ ] Home loads; no console errors on cold load
- [ ] Onboarding can complete or exit without crash
- [ ] Dashboard renders for guest and (if enabled) account
- [ ] One guide page loads with **sources** block visible where required
- [ ] Search returns results and handles empty state
- [ ] Updates list loads or graceful empty

## Mobile

- [ ] iOS Safari + Android Chrome spot check
- [ ] Tap targets and scroll regions acceptable

## i18n / RTL (when enabled)

- [ ] FA RTL layout sanity on Home + guide

## Accessibility

- [ ] Keyboard nav through main nav and onboarding
- [ ] Focus visible; headings logical

## Performance

- [ ] 375px smoke on launch-critical routes — see [`PERF_SANITY_4_7_REPORT.md`](PERF_SANITY_4_7_REPORT.md) (Slice 4.7, 2026-05-28)
- [ ] LCP acceptable on 3G Fast throttling (define budget in engineering — Phase 5)

## Security

- [ ] No secrets in client bundle
- [ ] Auth flows (when live) — session expiry handled

## Content risk

- [ ] No guide without sources on **high-risk** topics flagged in `DATA_STALENESS.md`
