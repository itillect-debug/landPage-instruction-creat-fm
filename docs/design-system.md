# Design System

Single source of truth for visual conventions across all tools in this project.
Frontend Dev reads this before building any new UI. Updates are added here after approval and committed with `docs: update design system — [pattern]`.

---

## Stack

| Tool | Purpose |
|------|---------|
| shadcn-vue | Base UI components (Button, Input, Card, Table, Dialog, etc.) |
| Tailwind CSS | Utility classes — spacing, typography, color tokens |
| Lucide Vue Next | Icon set — only source of icons in the project |
| amCharts 5 | Charts only |

---

## Layout

### Page Structure

```
┌─────────────────────────────────────────┐
│ TopBar (logo, nav, user)                │
├─────────────────────────────────────────┤
│ Page Header (title, subtitle, actions)  │
├─────────────────────────────────────────┤
│ Content Area                            │
│  ┌─────────────────┐  ┌──────────────┐  │
│  │  Main Panel     │  │  Side Panel  │  │
│  │  (2/3 width)   │  │  (1/3 width) │  │
│  └─────────────────┘  └──────────────┘  │
└─────────────────────────────────────────┘
```

- Max content width: `max-w-7xl mx-auto`
- Page padding: `px-6 py-8`
- Section gap: `gap-6`

### Card Layout

Use shadcn `Card` as the primary surface for grouped content.
```vue
<Card>
  <CardHeader>
    <CardTitle>Section Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    <!-- content -->
  </CardContent>
</Card>
```

---

## Typography

| Element | Tailwind class | Usage |
|---------|---------------|-------|
| Page title | `text-2xl font-semibold tracking-tight` | One per page, in Page Header |
| Section title | `text-lg font-semibold` | Card title, section heading |
| Subsection | `text-base font-medium` | Within a card or panel |
| Body | `text-sm text-foreground` | Default content text |
| Muted / helper | `text-sm text-muted-foreground` | Labels, descriptions, hints |
| Monospace | `font-mono text-sm` | Numbers, codes, values |

---

## Spacing Scale

Use Tailwind's default 4px base scale. Standard values in this project:

| Use | Class | Value |
|-----|-------|-------|
| Component internal padding | `p-4` | 16px |
| Card padding | `p-6` | 24px |
| Section gap | `gap-6` | 24px |
| Inline element gap | `gap-2` | 8px |
| Form field gap | `gap-4` | 16px |
| Page section gap | `gap-8` | 32px |

No arbitrary values (e.g. `p-[13px]`). Use the closest standard step.

---

## Color Tokens

Always use Tailwind/shadcn CSS variable tokens — never hardcoded hex.

| Token | Tailwind class | Usage |
|-------|---------------|-------|
| Background | `bg-background` | Page background |
| Card surface | `bg-card` | Cards, panels |
| Foreground | `text-foreground` | Primary text |
| Muted text | `text-muted-foreground` | Secondary text |
| Border | `border-border` | Dividers, card borders |
| Accent / brand | `text-primary`, `bg-primary` | CTAs, active states |
| **Profit / positive** | `text-green-600 dark:text-green-400` | Positive P&L, gains |
| **Loss / negative** | `text-red-600 dark:text-red-400` | Negative P&L, losses |
| Warning | `text-yellow-600` | Caution states |

---

## Components

### Buttons

| Variant | Usage |
|---------|-------|
| `default` | Primary action (one per section max) |
| `outline` | Secondary action |
| `ghost` | Tertiary, in-table actions |
| `destructive` | Delete, remove actions |

```vue
<Button>Calculate</Button>
<Button variant="outline">Reset</Button>
<Button variant="ghost" size="sm">Edit</Button>
```

### Form Inputs

- Always wrap in a `div` with `space-y-2` for label + input + error
- Use shadcn `Label` for all inputs
- Currency inputs use the shared `CurrencyInput.vue` component

```vue
<div class="space-y-2">
  <Label for="revenue">Revenue</Label>
  <CurrencyInput id="revenue" v-model="revenueKopecks" />
  <p v-if="error" class="text-sm text-destructive">{{ error }}</p>
</div>
```

### Financial Result Display

Use the `StatCard` shared component (to be created) for primary metrics:
```vue
<StatCard
  label="Net Profit"
  :value="profitKopecks"
  :trend="profitDelta"
/>
```

- Primary metric: `text-2xl font-semibold` + profit/loss color
- Secondary breakdown: `text-sm text-muted-foreground`
- Delta / change: show sign explicitly (`+1 500 ₽` / `−500 ₽`)

### Tables

Use shadcn `Table` for all data tables.
- Monetary columns: right-aligned, formatted via `useFormatCurrency`
- Positive values: `text-green-600`, negative: `text-red-600`
- Empty state: centered row with muted text + icon

### States

| State | Pattern |
|-------|---------|
| Loading | shadcn `Skeleton` matching the expected layout |
| Empty | Centered text + Lucide icon + optional CTA |
| Error | shadcn `Alert` variant `destructive` + retry button |

---

## Icons

Use **Lucide Vue Next** only.
```vue
import { TrendingUp, AlertCircle } from 'lucide-vue-next'
```
- Default size: `class="h-4 w-4"`
- Paired with text: `class="h-4 w-4 shrink-0"`
- Never use emoji as icons

---

## Charts (amCharts 5)

- Container: explicit height via Tailwind (`h-64`, `h-80`)
- Colors: use project color tokens, not amCharts defaults
- Always dispose root on `onUnmounted` (see `useAmChart` composable)
- Every chart has a visible title and labeled axes

---

## Light Fintech Theme (ФМ-ПРО landing)

Palette and type **mirror the reference product site `itillect.ru/financemodel`** (azure-blue accent, slate text, Rubik). Defined once as HSL channel tokens in `src/style.css` (`:root`) and consumed via Tailwind token classes — **no hardcoded hex in markup** (rule preserved). Per-token hex is documented here only as the design source.

| Token | Tailwind class | Ref. hex | Usage |
|-------|----------------|----------|-------|
| `--background` | `bg-background` | `#f5f5f5` | Section gray background |
| `--surface` | `bg-surface` | `#fafbfc` | Inset panels inside cards |
| `--card` | `bg-card` | `#ffffff` | Card / panel surface |
| `--foreground` | `text-foreground` | `#364655` | Headings / primary text (slate) |
| `--primary` | `bg/text-primary` | `#0a81ff` | Azure-blue accent, CTAs, active states |
| `--secondary` | `bg-secondary` | `#e6f0ff` | Light-blue highlight chips/blocks |
| `--accent` | `bg-accent` | `#e0edff` | Light-blue hover state |
| `--muted-foreground` | `text-muted-foreground` | `#8392a5` | Secondary text |
| `--border` | `border-border` | `#e7e9ee` | Soft neutral borders |
| `--positive` | `text/bg-positive` | `#10b759` | Green for prices / gains / break-even |
| `--danger` | `text-[hsl(var(--danger))]` | `#de3444` | Sale / error accents |

**Type:** `Rubik` (300/400/500/700) via Google Fonts. **Radii:** `--radius` = 0.5rem; tight corners (buttons/inputs `rounded-lg` ≈ 8px, cards `rounded-xl` ≈ 10px) per the reference's flat Element-UI look. **Shadows:** signature `shadow-soft` / `shadow-soft-lg` = `0 6px 21px rgba(54,70,85,.05/.12)`; `shadow-glow` blue. Utilities: `.bg-grid`, `.bg-radial-fade`, `.gradient-text` (blue), `.reveal`.

Animation: GSAP + ScrollTrigger; all motion subtle, guarded by `prefers-reduced-motion`.

## Adding New Patterns

When a new pattern is introduced and approved, add it here in the relevant section.
Commit: `docs: update design system — [pattern name]`
