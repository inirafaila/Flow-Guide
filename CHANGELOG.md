---
owner: product
status: active
last_updated: 2026-04-01
source_of_truth: false
---

# Changelog

All notable project changes are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Phase 1 **App Router `[locale]` segment** under **`src/app/[locale]/`** ( **`setRequestLocale`** + **`generateStaticParams`** ) so **`next-intl`** middleware internal rewrites match the filesystem; hub routes no longer 404.
- Phase 1 **i18n**: header locale switcher, **`NEXT_LOCALE`** server action, **`messages/*`** parity test, hardened **`src/i18n/request.ts`** (`requestLocale`).
- Canonical `docs/` tree: AI context, strategy, product, design, engineering, execution, research.
- Cursor rules under `.cursor/rules/` for project context and doc update policy.
- `src/` and `public/` directory placeholders for upcoming application scaffold.
- Placeholder Word document `docs/06_research/ARMENIA_PRODUCT_RESEARCH_REVISED_FA.docx` (replace with final export).

### Changed

- Prepended YAML frontmatter to existing product, design, execution, and research markdown specs where absent.
