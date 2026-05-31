<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Hexagon } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const scrolled = ref(false)
const onScroll = () => (scrolled.value = window.scrollY > 16)

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const links = [
  { label: 'Этапы', href: '#stages' },
  { label: 'Результаты', href: '#results' },
  { label: 'Инструменты', href: '#tools' },
  { label: 'Услуги', href: '#services' },
]
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="
      scrolled
        ? 'border-b border-border bg-background/80 backdrop-blur-xl'
        : 'border-b border-transparent'
    "
  >
    <div class="container flex h-16 items-center justify-between">
      <a href="#" class="flex items-center gap-2.5">
        <span
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft"
        >
          <Hexagon class="h-5 w-5" />
        </span>
        <span class="flex flex-col leading-none">
          <span class="text-sm font-semibold tracking-tight">ФМ-ПРО</span>
          <span class="text-[11px] text-muted-foreground">Финансовая модель</span>
        </span>
      </a>

      <nav class="hidden items-center gap-1 md:flex">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          {{ l.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <Button variant="ghost" size="sm" as="a" class="hidden sm:inline-flex" href="#contact">
          Консультация
        </Button>
        <Button size="sm" as="a" href="#contact">Получить ФМ-ПРО</Button>
      </div>
    </div>
  </header>
</template>
