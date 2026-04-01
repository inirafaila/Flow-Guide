---
owner: product
status: active
last_updated: 2026-04-01
source_of_truth: false
---

# Cursor task packs

Small, **composable** work units for AI-assisted implementation. Each pack should cite specs and end with verifiable acceptance criteria.

## Pack template

```markdown
### Pack: <name>
**Goal:** …
**Read first:** `…`, `…`
**Tasks:**
1. …
**Acceptance:**
- [ ] …
**Out of scope:** …
```

## Suggested packs (fill when scaffold exists)

### P0 — Repository hygiene

- Lint, format, TypeScript strict if applicable, `README` scripts verified.

### P1 — App shell

- Global layout, nav, responsive grid; matches `UI_HANDOFF_SPEC.md` skeleton.

### P2 — Routing skeleton

- All MVP routes from `IA_SPEC.md` as stubs with titles.

### P3 — CMS/types sync

- Types from `CONTENT_SCHEMA.md`; one guide page from CMS.

### P4 — Guest state

- localStorage onboarding + checklist stub per `STATE_MANAGEMENT_PLAN.md`.

### P5 — Source UI

- Component for sources block; used on one sensitive guide.

Pull detailed tickets from `DEVELOPMENT_BREAKDOWN.md` as the single execution backlog.
