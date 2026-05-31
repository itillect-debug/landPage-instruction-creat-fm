# ProjCLI — Financial Web Tools

Small, focused web tools for financial analysis: sales calculators, expense trackers, P&L dashboards, and similar instruments.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vue 3 + Vite + TypeScript + Pinia |
| UI Library | shadcn-vue + Tailwind CSS |
| Charts | amCharts 5 |
| Backend | Node.js + Fastify |
| Database | MongoDB + Mongoose |
| Testing | Vitest + mongodb-memory-server |

## Agent System

This project uses a role-based AI agent system. The entry point is `.cursorrules` which acts as the **Tech Lead orchestrator** by default.

| Agent | File | Model | Activated by |
|-------|------|-------|-------------|
| Tech Lead | `.cursor/agents/tech-lead.md` | claude-opus-4 (thinking) | Default — every task |
| DB Architect | `.cursor/agents/db-architect.md` | claude-sonnet-4.6 (thinking) | `models/`, `schemas/`, `openapi*` |
| Backend Dev | `.cursor/agents/backend-dev.md` | claude-sonnet-4.6 | `server/**`, `routes/**` |
| Frontend Dev | `.cursor/agents/frontend-dev.md` | composer-2.5-fast | `*.vue`, `src/**/*.ts` |
| QA / Tester | `.cursor/agents/qa-tester.md` | claude-sonnet-4.6 | `*.spec.ts`, `*.test.ts` |

## Core Rules

**Change policy**: No changes without explicit user approval.
**Task discipline**: Execute exactly what was asked. Flag deviations — do not fix them unilaterally.
**Git**: Commit every approved iteration using Conventional Commits.
**Rules**: Living documents — updated when edge cases are discovered and approved.

Full rules: `.cursor/rules/`

## Skills

| Skill | Purpose |
|-------|---------|
| `task-decomposition` | Break tasks into a plan, create and maintain feature specs |
| `api-contract` | Generate Mongoose schemas and OpenAPI 3.1 contracts |
| `ui-ux-quality` | Frontend quality checklist (a11y, responsiveness, UX) |
| `financial-ui` | Currency input, kopeck formatting, amCharts 5 patterns |
| `backend-dev` | Fastify route patterns, aggregations, error handling |
| `qa-testing` | Unit/integration tests for business logic and API routes |
| `design-system` | Visual consistency enforcement — reads/updates `docs/design-system.md` |
| `git-commit` | Conventional commit generation |

## Financial Data Convention

All monetary values are stored as **integers in kopecks** (amount × 100).
- `revenueKopecks: 150000` = 1 500.00 ₽
- Frontend converts for display: `kopecks / 100` via `useFormatCurrency()`
- API always sends and receives kopeck integers

## Feature Specifications

Every feature has a living spec document in `docs/specs/[feature-name].md`.
Specs are created at task start and updated throughout development and on future modifications.

## Workflow

```
User sends task
  → Tech Lead: clarify if needed → confirm plan → decompose
  → DB Architect: schema + API contract → user approval
  → Backend Dev: implement routes + logic → review
  → Frontend Dev: implement UI → review
  → QA: write tests → review
  → Commit each approved step
  → Update feature spec
```

## Project Structure (per tool/feature)

```
[tool-name]/
  server/
    features/
      [feature]/
        routes.ts
        controller.ts
        service.ts
    shared/
      models/
      middleware/
      plugins/
    app.ts
    server.ts
  src/
    features/
      [feature]/
        components/
        composables/
        store/
    components/
      ui/          ← shadcn-vue primitives
      shared/      ← composite components
    composables/   ← useFormatCurrency, useAmChart, etc.
    stores/
    types/
  docs/
    api/           ← OpenAPI YAML contracts
    specs/         ← Feature specifications
```
