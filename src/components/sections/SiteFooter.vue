<script setup lang="ts">
import { Hexagon } from 'lucide-vue-next'
</script>

<template>
  <footer class="border-t border-border bg-surface/60">
    <div class="container flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
      <div class="flex items-center gap-2.5">
        <span
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        >
          <Hexagon class="h-4 w-4" />
        </span>
        <span class="text-sm text-muted-foreground">
          ФМ-ПРО · Сертифицированная финансовая модель
        </span>
      </div>
      <p class="text-xs text-muted-foreground">
        © {{ new Date().getFullYear() }} ФМ-ПРО. Все права защищены.
      </p>
    </div>
  </footer>
</template>
