<script setup lang="ts">
import { Calculator, LineChart, Network, ArrowRight } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import MiniChart from '@/components/shared/MiniChart.vue'
import { tools } from '@/data/landing'

const icons: Record<string, any> = { Calculator, LineChart, Network }
</script>

<template>
  <section id="tools" class="relative bg-surface/50 py-20 lg:py-28">
    <div class="container">
      <div class="reveal mx-auto max-w-2xl text-center">
        <p class="text-sm font-medium uppercase tracking-widest text-primary">
          Встроенные инструменты
        </p>
        <h2 class="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Дополнительные расчётные модули
        </h2>
      </div>

      <div class="mt-14 grid gap-5 md:grid-cols-3">
        <Card
          v-for="tool in tools"
          :key="tool.title"
          interactive
          class="reveal group flex flex-col p-7"
        >
          <span
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-110"
          >
            <component :is="icons[tool.icon]" class="h-6 w-6" />
          </span>
          <h3 class="mt-5 text-lg font-semibold tracking-tight">{{ tool.title }}</h3>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {{ tool.description }}
          </p>
          <div class="mt-5 h-14 opacity-80">
            <MiniChart :type="tool.icon === 'Calculator' ? 'bars' : 'area'" />
          </div>
          <span
            class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            Открыть модуль <ArrowRight class="h-4 w-4" />
          </span>
        </Card>
      </div>
    </div>
  </section>
</template>
