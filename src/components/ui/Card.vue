<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string; interactive?: boolean }>()

const classes = computed(() =>
  cn(
    'rounded-xl border border-border bg-card text-card-foreground shadow-soft transition-all duration-300',
    props.interactive &&
      'hover:-translate-y-1 hover:shadow-soft-lg hover:border-primary/30',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
