---
owner: engineering
status: active
last_updated: 2026-04-01
source_of_truth: false
---

# API contracts

**Status:** stub. Add endpoints or CMS query shapes as implemented.

## Conventions (target)

- JSON over HTTPS; version prefix if public API (`/v1/`).
- Errors: machine-readable code + human message; no stack traces to client.

## Placeholder endpoints

| Method | Path | Purpose |
|--------|------|---------|
| TBD | `/api/health` | Deploy checks |
| TBD | `/api/me` | User profile when auth exists |
| TBD | `/api/checklist` | Sync checklist (if not CMS-only) |

## CMS

- If headless, document **content types** and **preview** URLs in tandem with `CONTENT_SCHEMA.md`.

Update when `OPEN_ITEMS.md` (stack, CMS, auth) is resolved.
