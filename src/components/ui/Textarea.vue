<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  modelValue?: string
  class?: string
  placeholder?: string
  id?: string
  rows?: number
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const classes = computed(() =>
  cn(
    'flex w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm transition-all duration-200 placeholder:text-muted-foreground/70 focus:border-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
    props.class,
  ),
)
</script>

<template>
  <textarea
    :id="id"
    :rows="rows ?? 4"
    :value="modelValue"
    :placeholder="placeholder"
    :class="classes"
    @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>
