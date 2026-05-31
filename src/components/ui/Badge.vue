<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-primary/20 bg-secondary text-secondary-foreground',
        outline: 'border-border bg-card text-muted-foreground',
        primary: 'border-transparent bg-primary/10 text-primary',
        positive: 'border-transparent bg-positive/10 text-positive',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

const props = defineProps<{
  variant?: VariantProps<typeof badgeVariants>['variant']
  class?: string
}>()

const classes = computed(() => cn(badgeVariants({ variant: props.variant }), props.class))
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
