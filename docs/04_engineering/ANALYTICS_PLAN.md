---
owner: engineering
status: active
last_updated: 2026-04-01
source_of_truth: false
---

# Analytics plan

## Principles

- **Privacy-first:** minimize PII; align with consent strategy (open item).
- **Event naming:** `domain.action` snake_case or vendor convention — pick one and document.

## Core events (candidates)

- `home.view`, `onboarding.start`, `onboarding.complete`
- `dashboard.view`, `next_action.click`, `checklist.toggle`
- `guide.view`, `source.expand`, `search.submit`, `search.no_results`
- `signup.start`, `signup.complete` (when auth exists)

## Dimensions

- Locale, guest vs authenticated (boolean), traffic source if available.

## Tools

- Vendor TBD; ensure server-side vs client events defined for SSR framework.

Update when vendor chosen and when `SUCCESS_METRICS.md` is baselined.
