<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'area' | 'bars'
    points?: number[]
    breakEven?: boolean
    /** Fixed scale ceiling — stabilises morphing when points animate. */
    max?: number
    class?: string
  }>(),
  {
    type: 'area',
    points: () => [18, 26, 22, 38, 34, 52, 60, 74, 82, 96],
    breakEven: false,
  },
)

const W = 280
const H = 96
const max = computed(() => props.max ?? Math.max(...props.points, 1))

const coords = computed(() =>
  props.points.map((p, i) => {
    const x = (i / (props.points.length - 1)) * W
    const y = H - (p / max.value) * (H - 10) - 4
    return [x, y] as const
  }),
)

const linePath = computed(() =>
  coords.value.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' '),
)

const areaPath = computed(
  () => `${linePath.value} L ${W} ${H} L 0 ${H} Z`,
)

const barW = computed(() => (W / props.points.length) * 0.56)
</script>

<template>
  <svg
    :viewBox="`0 0 ${W} ${H}`"
    preserveAspectRatio="none"
    :class="props.class"
    class="h-full w-full"
  >
    <defs>
      <linearGradient :id="`grad-${type}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="hsl(211 100% 52%)" stop-opacity="0.26" />
        <stop offset="100%" stop-color="hsl(211 100% 52%)" stop-opacity="0" />
      </linearGradient>
    </defs>

    <template v-if="type === 'area'">
      <path :d="areaPath" :fill="`url(#grad-${type})`" />
      <path
        :d="linePath"
        fill="none"
        stroke="hsl(211 100% 52%)"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        :cx="coords[coords.length - 1][0]"
        :cy="coords[coords.length - 1][1]"
        r="3.5"
        fill="hsl(211 100% 52%)"
      />
    </template>

    <template v-else>
      <rect
        v-for="(c, i) in coords"
        :key="i"
        :x="c[0] - barW / 2"
        :y="c[1]"
        :width="barW"
        :height="H - c[1]"
        rx="2.5"
        fill="hsl(211 100% 52%)"
        :opacity="0.35 + (i / coords.length) * 0.55"
      />
    </template>

    <line
      v-if="breakEven"
      x1="0"
      :y1="H * 0.55"
      :x2="W"
      :y2="H * 0.55"
      stroke="hsl(146 84% 39%)"
      stroke-width="1.4"
      stroke-dasharray="4 4"
    />
  </svg>
</template>
