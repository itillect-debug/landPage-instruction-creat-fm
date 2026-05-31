<script setup lang="ts">
import { FileText, TrendingUp, Scale, Plus } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import MiniChart from '@/components/shared/MiniChart.vue'
import { reports, investmentKpis } from '@/data/landing'

const reportIcon: Record<string, any> = {
  CF: TrendingUp,
  PL: FileText,
  BS: Scale,
}
</script>

<template>
  <section id="results" class="relative py-20 lg:py-28">
    <div class="pointer-events-none absolute inset-0 bg-radial-fade" />
    <div class="container relative">
      <div class="reveal mx-auto max-w-2xl text-center">
        <p class="text-sm font-medium uppercase tracking-widest text-primary">
          Автоматический расчёт
        </p>
        <h2 class="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Результаты финансового моделирования
        </h2>
        <p class="mt-4 text-muted-foreground">
          Все введённые данные превращаются в готовые отчёты и инвестиционные показатели.
        </p>
      </div>

      <!-- reports -->
      <div class="mt-14 grid gap-5 md:grid-cols-3">
        <Card
          v-for="r in reports"
          :key="r.code"
          interactive
          class="reveal p-6"
        >
          <div class="flex items-center justify-between">
            <span
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary"
            >
              <component :is="reportIcon[r.code]" class="h-5 w-5" />
            </span>
            <Badge variant="outline">{{ r.code }}</Badge>
          </div>
          <h3 class="mt-4 text-lg font-semibold tracking-tight">{{ r.name }}</h3>
          <p class="mt-1 text-sm text-muted-foreground">{{ r.desc }}</p>
          <div class="mt-4 h-16">
            <MiniChart :type="r.code === 'PL' ? 'bars' : 'area'" />
          </div>
        </Card>
      </div>

      <!-- investment KPIs -->
      <div class="reveal mt-10">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-lg font-semibold tracking-tight">Инвестиционные показатели</h3>
          <span class="text-sm text-muted-foreground">7 ключевых метрик</span>
        </div>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <div
            v-for="k in investmentKpis"
            :key="k.code"
            class="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft"
          >
            <p
              class="text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary"
            >
              {{ k.code }}
            </p>
            <p class="mt-1 text-sm font-medium text-foreground/80">{{ k.name }}</p>
            <p class="mt-0.5 text-xs text-muted-foreground">{{ k.hint }}</p>
          </div>

          <!-- +39 additional -->
          <div
            class="flex flex-col justify-center rounded-xl border border-dashed border-primary/30 bg-secondary/50 p-5"
          >
            <span
              class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              <Plus class="h-5 w-5" />
            </span>
            <p class="mt-3 text-lg font-semibold text-foreground">+39 отчётов</p>
            <p class="text-xs text-muted-foreground">дополнительных аналитик</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
