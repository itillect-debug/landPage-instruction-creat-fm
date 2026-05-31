<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-soft hover:shadow-glow hover:-translate-y-0.5 hover:bg-primary/95',
        outline:
          'border border-border bg-card text-foreground hover:bg-accent hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-soft',
        ghost: 'text-foreground/80 hover:bg-accent hover:text-accent-foreground',
        soft: 'bg-secondary text-secondary-foreground hover:bg-accent hover:-translate-y-0.5',
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4 text-[13px]',
        lg: 'h-12 px-8 text-[15px]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

type Props = {
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  class?: string
  as?: string
}

const props = withDefaults(defineProps<Props>(), { as: 'button' })

const classes = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class),
)
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
