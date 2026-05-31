---
name: design-system
description: Enforces visual consistency across all features and tools. Use before building any new UI component or page layout. Reads docs/design-system.md as the source of truth, and updates it when new patterns are introduced.
---

# Design System

## Before Building Any UI

1. Read `docs/design-system.md` — it is the single source of truth for visual conventions
2. Use existing components and patterns from the design system first
3. Only introduce a new pattern if it genuinely doesn't exist yet — then add it to the document

## Core Principle

Every feature and tool must look like it belongs to the same product.
New screens should feel immediately familiar to someone who has used another tool in this project.

## How to Use Existing Patterns

When building UI, check `docs/design-system.md` for:
- Which shadcn-vue component to use for this element type
- What Tailwind spacing/sizing classes are standard
- What the page layout structure looks like
- What typography level (h1/h2/body) this content belongs to

## How to Add a New Pattern

When you create something new that isn't in the design system:
1. Implement it
2. After user approval, add it to `docs/design-system.md` under the right section
3. Commit: `docs: update design system — [pattern name]`

Only approved, used patterns go into the design system. No speculative additions.

## Consistency Checklist (run before presenting any UI work)

- [ ] Page layout matches the standard layout from design system (sidebar / topbar / content area)
- [ ] Typography uses the defined scale — no ad hoc font sizes
- [ ] Spacing uses the defined scale (`gap-4`, `p-6`, etc.) — no arbitrary values
- [ ] shadcn-vue components used for all standard elements (Button, Input, Card, Table, Dialog)
- [ ] Financial indicators use the defined color tokens (green/red), not custom colors
- [ ] Empty states, loading states, and error states match existing patterns
- [ ] Icons come from the project's defined icon set (Lucide Vue Next)
- [ ] No inline styles — Tailwind utilities only

## Design System Document Location

`docs/design-system.md`

This file is maintained collaboratively — Frontend Dev updates it, Tech Lead reviews it.
Every update is committed with `docs: update design system — [what changed]`.
