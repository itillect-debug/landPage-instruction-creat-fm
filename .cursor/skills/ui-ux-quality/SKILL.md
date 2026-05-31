---
name: ui-ux-quality
description: Quality checklist for Vue 3 components — accessibility, desktop-first responsiveness, shadcn-vue usage, UX anti-patterns. Apply when building or reviewing any frontend component.
---

# UI/UX Quality Checklist

Run through this checklist before presenting any frontend work for review.

## Layout & Responsiveness (desktop-first)

- [ ] Designed for `1280px+` first; adapted down via `md:` and default Tailwind classes
- [ ] No horizontal scroll at `768px`
- [ ] Dense information layouts work at `1024px` without breakage
- [ ] Tables and data grids are scrollable on smaller widths, not broken

## Component Quality

- [ ] Uses shadcn-vue primitives as the base layer — no reinvented buttons, inputs, modals
- [ ] `<script setup lang="ts">` — no Options API
- [ ] Logic used in 2+ components is extracted into a composable
- [ ] No inline styles — Tailwind utilities only
- [ ] No hardcoded color hex values — Tailwind tokens or CSS variables

## Accessibility

- [ ] All form inputs have associated `<label>` elements
- [ ] Icon-only buttons have `aria-label`
- [ ] Interactive elements are keyboard-navigable (tab order is logical)
- [ ] Error states are visible and described (not only color-coded)
- [ ] Focus ring visible on all interactive elements (not removed globally)

## UX Anti-patterns to Avoid

- No layout shifts on data load — use skeleton states (shadcn Skeleton)
- No silent failures — every async action has a visible error state
- No confirmation dialogs for non-destructive actions
- No disabling buttons without explaining why (show tooltip or helper text)
- Financial results must be clearly labeled — units, currency, what the number represents

## Data Display

- [ ] Empty states are designed — not blank space
- [ ] Loading states are designed — skeleton or spinner, not blank
- [ ] Error states show a human-readable message + retry option where applicable
