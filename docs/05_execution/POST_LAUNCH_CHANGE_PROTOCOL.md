---
owner: product
status: active
last_updated: 2026-04-01
source_of_truth: true
---

# Post-launch change protocol

## Classes of change

| Class | Examples | Process |
|-------|----------|---------|
| **Hotfix** | Security, outage, data loss risk | Minimal review; deploy fast; retro doc |
| **Content** | Copy, new guide, verification date | Editorial workflow + `DATA_STALENESS.md` |
| **Product** | New feature, IA change | PRD or addendum + `DECISION_LOG.md`; check locked docs |
| **Engineering** | Refactor, deps major bump | ADR or note in `ENGINEERING_ARCHITECTURE.md` |

## Required updates

- Follow `UPDATE_PROTOCOL.md` for doc touch list.
- User-facing changes: `CHANGELOG.md` entry.

## Metrics gate

- Non-trivial product changes should note expected impact on `SUCCESS_METRICS.md` or analytics dashboard.

## Rollback

- Any change that touches payments/residency content must be reversible via CMS or deploy rollback plan.
