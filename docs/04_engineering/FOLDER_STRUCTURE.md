---
owner: engineering
status: active
last_updated: 2026-04-11
source_of_truth: false
---

# Folder structure

Target layout under repo root (framework-agnostic names; map to Next/other as needed).

```text
src/
  app/           # Routes, layouts, route handlers (or pages/)
  app/[locale]/  # IA + hub routes (next-intl internal segment; public URLs stay unprefixed)
  components/    # Shared UI primitives
  components/ui/     # Phase 1 primitives (Button, Card, SectionHeader) + Phase 2 ChecklistItemRow, SourceBlock, LastVerifiedNote, WhatMayVaryNote
  components/shell/  # SiteHeader, SiteHeaderChrome (responsive / mobile nav), footer, locale switcher
  features/          # Feature-scoped UI + logic (onboarding/start, dashboard/NBA + checklist block)
  lib/           # Utilities, CMS client, rule engines
  lib/checklist/     # Phase 2 checklist filtering logic (checklist-filter.ts — pure filterChecklistItems)
  lib/onboarding/    # Phase 2 /start: start-slice, emphasis v1/v2, outcome preview v1
  lib/content/       # parse-md, search-index records, load-checklist-and-updates, load-sources, load-places, load-trust-for-page (Node-only loaders)
  lib/observability/  # Structured server logger (JSON lines); Sentry config lives at repo root
  hooks/         # Shared React hooks (if using React)
  styles/        # Global styles, tokens
  content/       # Git Markdown + YAML (Zod-validated)
  content/pages/
  content/faq/
  content/checklist-items/   # Checklist Item rows (§7) — parse-md + checklist-item schema
  content/updates/             # Update Item entries (§11) — parse-md + update-item schema
  content/sources/           # Source Record rows (§10) — parse-md + source-record schema
  content/places/            # Place rows (§12) — parse-md + place schema
  data/          # Static JSON seeds, fixtures
  types/         # Shared TypeScript types
public/          # Static assets
docs/            # Product + engineering documentation
```

## Rules

- **Colocate** feature-specific components under `features/<name>/` when they are not reused.
- **Shared** design-system-level pieces in `components/`.
- **Types** mirror `CONTENT_SCHEMA.md` and API payloads.

Update paths when stack is finalized (e.g. Next `app/` router vs `pages/`).
