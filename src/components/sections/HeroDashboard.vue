<script setup lang="ts">
import { computed } from 'vue'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import KpiStat from '@/components/shared/KpiStat.vue'
import MiniChart from '@/components/shared/MiniChart.vue'
import { useLiveDashboard } from '@/composables/useLiveDashboard'

const { scenarios, active, live, kpis, setScenario, pause, resume } = useLiveDashboard()

const fmt = (n: number, d = 1) => n.toFixed(d).replace('.', ',')

const finance = computed(() => [
  { label: 'Equity', value: live.equity, cls: 'bg-primary' },
  { label: 'Debt', value: live.debt, cls: 'bg-[hsl(216_97%_62%)]' },
  { label: 'Grants', value: live.grants, cls: 'bg-positive' },
])
</script>

<template>
  <div @mouseenter="pause" @mouseleave="resume">
    <Card class="overflow-hidden p-0">
      <!-- title bar -->
      <div class="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div class="flex items-center gap-2">
          <span class="h-2.5 w-2.5 rounded-full bg-[hsl(0_0%_85%)]" />
          <span class="h-2.5 w-2.5 rounded-full bg-[hsl(0_0%_85%)]" />
          <span class="h-2.5 w-2.5 rounded-full bg-[hsl(0_0%_85%)]" />
        </div>
        <div class="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span class="relative flex h-2 w-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-75"
            />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-positive" />
          </span>
          Инвестиционный дашборд
        </div>
      </div>

      <!-- scenario switcher -->
      <div class="flex items-center gap-1.5 border-b border-border bg-surface/50 px-5 py-2.5">
        <span class="mr-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Сценарий
        </span>
        <button
          v-for="(s, i) in scenarios"
          :key="s.id"
          type="button"
          :aria-pressed="i === active"
          class="rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-200"
          :class="
            i === active
              ? 'bg-primary text-primary-foreground shadow-soft'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          "
          @click="setScenario(i)"
        >
          {{ s.name }}
        </button>
      </div>

      <div class="space-y-5 p-5">
        <!-- KPI row -->
        <div class="grid grid-cols-3 gap-3">
          <KpiStat
            v-for="k in kpis"
            :key="k.label"
            :label="k.label"
            :value="k.value"
            :delta="k.delta"
            :positive="k.positive"
          />
        </div>

        <!-- cash flow -->
        <div class="rounded-lg border border-border bg-surface/60 p-4">
          <div class="mb-3 flex items-center justify-between">
            <span class="text-sm font-medium text-foreground">Денежный поток проекта</span>
            <Badge variant="positive">Break-even · мес. {{ Math.round(live.breakEvenMonth) }}</Badge>
          </div>
          <div class="h-24">
            <MiniChart type="area" :points="live.cf" :max="125" />
          </div>
        </div>

        <!-- capex + financing -->
        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg border border-border bg-surface/60 p-4">
            <p class="text-xs text-muted-foreground">Структура CAPEX</p>
            <div class="mt-3 h-14">
              <MiniChart type="bars" :points="live.capex" :max="100" />
            </div>
          </div>
          <div class="rounded-lg border border-border bg-surface/60 p-4">
            <p class="text-xs text-muted-foreground">Финансирование</p>
            <div class="mt-3 space-y-2">
              <div v-for="f in finance" :key="f.label" class="flex items-center gap-2">
                <span class="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <span class="block h-full rounded-full" :class="f.cls" :style="{ width: `${f.value}%` }" />
                </span>
                <span class="w-9 text-right text-xs tabular-nums text-muted-foreground">
                  {{ Math.round(f.value) }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <!-- floating live NPV badge -->
    <div
      class="absolute -bottom-5 -left-5 hidden rounded-lg border border-border bg-card px-4 py-3 shadow-soft-lg sm:block"
    >
      <p class="text-xs text-muted-foreground">NPV проекта</p>
      <p class="text-lg font-semibold tabular-nums text-positive">+{{ fmt(live.npv) }} млн ₽</p>
    </div>
  </div>
</template>
