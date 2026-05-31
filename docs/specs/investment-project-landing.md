# Spec — Самостоятельный расчёт инвестиционного проекта (Landing)

Status: **Implemented, pending review** · Owner: Tech Lead → Frontend Dev

## Goal
Premium **light-theme** fintech landing section for the product **«Сертифицированная финансовая модель ФМ-ПРО»**. Acts as onboarding + product walkthrough + educational sales funnel for building an investment project step-by-step.

## Stack decisions (approved with user)
- Full **Vue 3 + Vite + TypeScript + Tailwind v3 + shadcn-vue-style primitives**.
- Animations via **GSAP + ScrollTrigger** (reduced-motion aware).
- Contact form is **UI-only** (client-side validation, no backend submit wired).
- Reference screenshot was **not provided**; built from the written visual direction.

## Structure
| # | Component | Notes |
|---|-----------|-------|
| Nav | `SiteNav.vue` | Fixed, blurs on scroll, anchor links |
| Hero | `HeroSection.vue` | Headline, 3 CTAs, KPI dashboard preview, grid/flow-line bg, floating particles |
| Stages | `StagesSection.vue` + `StageCard.vue` | Sticky left timeline (9 nodes, active/progress), scroll-spy via ScrollTrigger |
| Results | `ResultsSection.vue` | CF/PL/Balance reports, 7 investment KPIs (IRR/NPV/PI/PP/DPP/ARR/WACC) + «+39 отчётов» |
| Tools | `ToolsSection.vue` | 3 cards: Себестоимость, Планирование продаж, Орг. план |
| Services | `ServicesSection.vue` | 3 priced cards (11 000 / 49 000 / 12 000 ₽) |
| Contact | `ContactSection.vue` | Имя, Email, Телефон, Комментарий + validation + success state |
| Footer | `SiteFooter.vue` | — |

### Shared / UI
- `components/ui/`: Button, Card, Badge, Input, Textarea, Label (cva + `cn`).
- `components/shared/`: `KpiStat.vue`, `MiniChart.vue` (SVG area/bars, break-even line).
- `composables/useScrollReveal.ts`: batched `.reveal` fade-up, reduced-motion fallback.
- `data/landing.ts`: all copy/content (stages, KPIs, tools, services).

## 9 timeline stages
1. Название проекта и отрасль · 2. Сбор исходных данных · 3. Инвестиции · 4. Производственные затраты · 5. Непроизводственные затраты · 6. Планирование продаж · 7. Персонал · 8. Финансирование · 9. Итоговые показатели.

## Open items / follow-ups (not done — flagged)
- Replace video/screenshot placeholders with real media.
- Wire contact form + "online сервис сбора данных" button to real endpoints (would need Backend Dev + API contract).
- amCharts 5 not used yet (lightweight SVG mini-charts instead); swap in if richer charts are needed.
- Mobile timeline is hidden < lg; consider a horizontal/stepper variant.

## Verification
- `npm run build` → typecheck + prod build pass (0 errors).
- `npm run dev` → serves 200 on :5173.
