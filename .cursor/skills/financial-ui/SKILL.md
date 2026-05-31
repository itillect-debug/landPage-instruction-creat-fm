---
name: financial-ui
description: Patterns for financial calculator UI in Vue 3 — currency input, kopeck conversion, P&L display, amCharts 5 integration. Use when building any financial input form, result panel, or chart component.
---

# Financial UI Patterns

## Currency Input

Use a dedicated `CurrencyInput.vue` component wrapping shadcn `Input`:
- User types in rubles (display value)
- Store in Pinia as **kopecks** (multiply by 100, parse to integer)
- Display: always format back via `useFormatCurrency`

```typescript
// composables/useFormatCurrency.ts
export function useFormatCurrency() {
  const format = (kopecks: number): string =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2,
    }).format(kopecks / 100)

  const toKopecks = (rubles: string | number): number =>
    Math.round(Number(rubles) * 100)

  return { format, toKopecks }
}
```

Never inline this logic in a component. Always use the composable.

## P&L / Delta Display

```vue
<span :class="amount >= 0 ? 'text-green-600' : 'text-red-600'">
  {{ format(amount) }}
</span>
```

- Positive or zero → green token
- Negative → red token
- Always show the sign explicitly for deltas: `+1 500,00 ₽` / `−500,00 ₽`
- Label every financial figure — never a bare number without context

## Result Summary Panels

- Group related figures in a card (shadcn `Card`)
- Primary metric (e.g. net profit) gets the most visual weight — larger text, accent color
- Secondary metrics (breakdown) are smaller, muted color
- Divider between input and result sections

## amCharts 5 Integration

Wrap every chart in a composable to handle lifecycle correctly:

```typescript
// composables/useAmChart.ts
import { onMounted, onUnmounted, ref } from 'vue'
import * as am5 from '@amcharts/amcharts5'

export function useAmChart(containerId: string, setup: (root: am5.Root) => void) {
  let root: am5.Root | null = null

  onMounted(() => {
    root = am5.Root.new(containerId)
    setup(root)
  })

  onUnmounted(() => {
    root?.dispose()
    root = null
  })
}
```

- Always dispose the root on `onUnmounted` — memory leak otherwise
- Container div must have explicit height (Tailwind `h-64`, `h-80`, etc.)
- Financial chart colors: use theme tokens, not amCharts defaults

## Input Validation UX

- Show inline validation errors immediately on blur, not only on submit
- For monetary fields: reject non-numeric input silently (filter on input event)
- Show running totals reactively as user types — financial tools should feel live
