<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PlayCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import HeroDashboard from '@/components/sections/HeroDashboard.vue'
import { gsap, prefersReducedMotion } from '@/composables/useScrollReveal'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (prefersReducedMotion()) return
  gsap.context(() => {
    gsap.from('[data-hero-anim]', {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 0.1,
    })
    gsap.from('[data-hero-panel]', {
      opacity: 0,
      y: 40,
      scale: 0.98,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.35,
    })
  }, root.value!)
})
</script>

<template>
  <section
    ref="root"
    class="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
  >
    <!-- layered light backgrounds -->
    <div class="pointer-events-none absolute inset-0 bg-grid opacity-70" />
    <div class="pointer-events-none absolute inset-0 bg-radial-fade" />
    <div
      class="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
    />
    <div
      class="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-[hsl(211_100%_60%_/_0.10)] blur-3xl"
    />

    <!-- soft financial flow lines -->
    <svg
      class="pointer-events-none absolute inset-x-0 top-10 mx-auto h-full w-full max-w-6xl opacity-50"
      viewBox="0 0 1200 600"
      fill="none"
    >
      <path
        d="M-20 180 C 220 120, 360 260, 600 220 S 980 120, 1220 200"
        stroke="hsl(211 100% 52% / 0.18)"
        stroke-width="1.5"
      />
      <path
        d="M-20 360 C 260 300, 420 420, 640 380 S 1000 300, 1220 360"
        stroke="hsl(211 100% 52% / 0.12)"
        stroke-width="1.5"
      />
    </svg>

    <!-- floating particles -->
    <span
      class="pointer-events-none absolute left-[12%] top-44 h-2 w-2 rounded-full bg-primary/40 animate-float"
    />
    <span
      class="pointer-events-none absolute right-[18%] top-60 h-1.5 w-1.5 rounded-full bg-primary/30 animate-float"
      style="animation-delay: 1.4s"
    />
    <span
      class="pointer-events-none absolute left-[42%] top-28 h-1.5 w-1.5 rounded-full bg-[hsl(216_97%_55%_/_0.4)] animate-float"
      style="animation-delay: 0.8s"
    />

    <div class="container relative">
      <div class="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <!-- copy -->
        <div>
          <Badge variant="primary" data-hero-anim class="mb-5">
            <ShieldCheck class="h-3.5 w-3.5" />
            Сертифицированная финансовая модель
          </Badge>

          <h1
            data-hero-anim
            class="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]"
          >
            Самостоятельный расчёт
            <span class="gradient-text">инвестиционного проекта</span>
          </h1>

          <p
            data-hero-anim
            class="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Пошаговая система разработки инвестиционного проекта с автоматическим
            расчётом финансовых показателей.
          </p>

          <div data-hero-anim class="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" as="a" href="#contact">
              Получить ФМ-ПРО
              <ArrowRight class="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" as="a" href="#stages">
              <PlayCircle class="h-4 w-4" />
              Смотреть демо
            </Button>
            <Button size="lg" variant="ghost" as="a" href="#contact">
              Получить консультацию
            </Button>
          </div>

          <div
            data-hero-anim
            class="mt-8 flex items-center gap-6 text-sm text-muted-foreground"
          >
            <span class="flex items-center gap-2">
              <Sparkles class="h-4 w-4 text-primary" />
              9 этапов
            </span>
            <span class="h-4 w-px bg-border" />
            <span>10 отчётов + 17 KPI</span>
            <span class="h-4 w-px bg-border" />
            <span>+39 аналитик</span>
          </div>
        </div>

        <!-- live investment dashboard -->
        <div data-hero-panel class="relative">
          <HeroDashboard />
        </div>
      </div>
    </div>
  </section>
</template>
