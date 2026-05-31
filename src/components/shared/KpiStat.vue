<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'

defineProps<{
  label: string
  value: string
  delta?: string
  positive?: boolean
}>()
</script>

<template>
  <div class="rounded-xl border border-border bg-card/80 px-4 py-3 backdrop-blur">
    <p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {{ label }}
    </p>
    <p class="mt-1 text-xl font-semibold tracking-tight text-foreground">
      {{ value }}
    </p>
    <p
      v-if="delta"
      class="mt-1 inline-flex items-center gap-1 text-xs font-medium"
      :class="positive ? 'text-positive' : 'text-muted-foreground'"
    >
      <TrendingUp v-if="positive" class="h-3.5 w-3.5" />
      {{ delta }}
    </p>
  </div>
</template>
