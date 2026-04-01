---
owner: product
status: active
last_updated: 2026-04-01
source_of_truth: false
---

# Release plan

## Channels

- **Staging** — continuous; CMS preview if available
- **Production** — tagged releases after checklist

## Versioning

- Semantic versioning for app (`v1.0.0` first public)
- Content freeze window optional for major launch

## Steps (per release)

1. Merge to release branch or tag from main
2. Run `QA_CHECKLIST.md` critical subset
3. Verify env vars and CMS keys
4. Deploy; smoke test Home, guide, dashboard, search
5. Monitor errors/analytics for 24–48h

## Rollback

- Document host-specific rollback (previous deployment artifact or git revert)

## Comms

- Prepare user-facing changelog snippet; internal notes in `CHANGELOG.md`
