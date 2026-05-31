<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Check } from 'lucide-vue-next'
import StageCard from './StageCard.vue'
import { stages } from '@/data/landing'
import { gsap, ScrollTrigger } from '@/composables/useScrollReveal'

const active = ref(0)
const progress = ref(0)
let triggers: ScrollTrigger[] = []

onMounted(() => {
  stages.forEach((stage, i) => {
    const el = document.getElementById(`stage-${stage.id}`)
    if (!el) return
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 60%',
        onToggle: (self) => {
          if (self.isActive) {
            active.value = i
            progress.value = ((i + 1) / stages.length) * 100
          }
        },
      }),
    )
  })
  requestAnimationFrame(() => ScrollTrigger.refresh())
})

onUnmounted(() => {
  triggers.forEach((t) => t.kill())
  triggers = []
})

function scrollTo(id: number) {
  document.getElementById(`stage-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  gsap.to(window, { duration: 0 })
}
</script>

<template>
  <section id="stages" class="relative py-20 lg:py-28">
    <div class="pointer-events-none absolute inset-0 bg-grid opacity-40" />
    <div class="container relative">
      <div class="reveal mx-auto max-w-2xl text-center">
        <p class="text-sm font-medium uppercase tracking-widest text-primary">
          Пошаговый процесс
        </p>
        <h2 class="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          9 этапов от идеи до инвестиционных показателей
        </h2>
        <p class="mt-4 text-muted-foreground">
          Система последовательно ведёт вас через каждый блок данных, а расчёты
          автоматически связываются между собой.
        </p>
      </div>

      <div class="mt-14 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
        <!-- sticky timeline -->
        <aside class="hidden lg:block">
          <div class="sticky top-28">
            <div class="relative pl-2">
              <!-- track -->
              <span class="absolute left-[18px] top-2 bottom-2 w-px bg-border" />
              <!-- progress -->
              <span
                class="absolute left-[18px] top-2 w-px bg-gradient-to-b from-primary to-[hsl(216_97%_49%)] transition-all duration-500"
                :style="{ height: `calc(${progress}% - 8px)` }"
              />

              <ul class="space-y-1">
                <li v-for="(stage, i) in stages" :key="stage.id">
                  <button
                    type="button"
                    class="group flex w-full items-center gap-3 rounded-lg py-2 pr-2 text-left transition-colors"
                    :class="i === active ? '' : 'hover:bg-accent/60'"
                    @click="scrollTo(stage.id)"
                  >
                    <span
                      class="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-300"
                      :class="
                        i < active
                          ? 'border-primary bg-primary text-primary-foreground'
                          : i === active
                            ? 'border-primary bg-card text-primary shadow-glow'
                            : 'border-border bg-card text-muted-foreground'
                      "
                    >
                      <Check v-if="i < active" class="h-4 w-4" />
                      <template v-else>{{ stage.id }}</template>
                    </span>
                    <span
                      class="text-sm transition-colors duration-300"
                      :class="
                        i === active
                          ? 'font-semibold text-foreground'
                          : 'text-muted-foreground group-hover:text-foreground'
                      "
                    >
                      {{ stage.short }}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <!-- cards -->
        <div class="space-y-6">
          <StageCard v-for="stage in stages" :key="stage.id" :stage="stage" />
        </div>
      </div>
    </div>
  </section>
</template>
