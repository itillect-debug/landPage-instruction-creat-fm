<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string; for?: string }>()

const classes = computed(() =>
  cn('text-sm font-medium text-foreground/80', props.class),
)
</script>

<template>
  <label :for="props.for" :class="classes">
    <slot />
  </label>
</template>
