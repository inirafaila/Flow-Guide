---
owner: engineering
status: active
last_updated: 2026-04-01
source_of_truth: false
---

# Deployment readiness

Checklist before **first** production deploy.

## Environment

- [ ] `NODE_ENV` / production config validated
- [ ] Secrets in host manager (not repo)
- [ ] CMS credentials scoped read-only where possible

## Quality

- [ ] `QA_CHECKLIST.md` critical path passed
- [ ] Lighthouse / performance budget smoke test
- [ ] Basic a11y checks on core templates

## Operations

- [ ] Error monitoring (optional vendor)
- [ ] Uptime or health endpoint
- [ ] Rollback path documented

## Content

- [ ] Sensitive pages have sources + last verified
- [ ] `DATA_STALENESS.md` risks reviewed for launch set

## Legal / product

- [ ] Privacy policy + terms links (placeholders if needed)
- [ ] Cookie/consent if analytics requires

Target platform TBD (`OPEN_ITEMS.md`).
