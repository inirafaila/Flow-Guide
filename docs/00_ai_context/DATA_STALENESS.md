---
owner: product
status: active
last_updated: 2026-04-01
source_of_truth: true
---

# Data staleness

Some domains **decay quickly** or carry **legal/financial risk** if wrong. Treat them as **high re-verification** surfaces.

## Volatile domains

| Domain | Risk | Mitigation |
|--------|------|------------|
| **Residency / immigration** | Law and procedure change; user consequences severe | Primary sources, dates, “last verified,” link-out to official portals |
| **Payments** | Fees, methods, app rules change | Source records; avoid hard-coded amounts without review workflow |
| **Transport** | Routes, apps, fares change | Prefer official operator/app links + verification metadata |
| **Banking** | KYC, non-resident rules, product names change | Institution sources; avoid implying legal advice |
| **Service availability** | Portals down, booking rules change | Status notes; avoid promising SLA |

## Product rule

Prefer **structured source links + last verified** over static prose-only claims. Any AI-generated content must not invent citations; follow `LOCKED_DECISIONS.md` on source-aware content.
