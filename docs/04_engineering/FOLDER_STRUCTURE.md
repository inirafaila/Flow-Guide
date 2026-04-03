---
owner: engineering
status: active
last_updated: 2026-04-03
source_of_truth: false
---

# Folder structure

Target layout under repo root (framework-agnostic names; map to Next/other as needed).

```text
src/
  app/           # Routes, layouts, route handlers (or pages/)
  app/[locale]/  # IA + hub routes (next-intl internal segment; public URLs stay unprefixed)
  components/    # Shared UI primitives
  features/      # Feature-scoped UI + logic (e.g. routes/page-type placeholder templates, search stub)
  lib/           # Utilities, CMS client, rule engines
  lib/observability/  # Structured server logger (JSON lines); Sentry config lives at repo root
  hooks/         # Shared React hooks (if using React)
  styles/        # Global styles, tokens
  content/       # Optional static MD/MDX or seed content
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
