---
owner: engineering
status: active
last_updated: 2026-04-01
source_of_truth: false
---

# Routing plan

**Source of truth for IA:** `docs/02_product/IA_SPEC.md`.

## Principles

- **English-first slugs** for URLs; locale prefix strategy TBD (e.g. `/en/...`, `/fa/...`).
- Map each **page type** in IA to a route pattern and data loader.
- Separate **payments** and **transport** sections per locked decisions.

## Placeholder table (fill from IA)

| Pattern | Page type | Data source |
|---------|-----------|-------------|
| `/` | Home | CMS + user state |
| `/onboarding` | Onboarding | Wizard state |
| `/dashboard` | Dashboard | User + CMS |
| `/guide/[slug]` | Guide | CMS |
| `/search` | Search | Index / API |
| `/updates` | Updates list | CMS |
| … | … | … |

Revise this table to match the exact slug list in `IA_SPEC.md` before build.
