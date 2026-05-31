import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { gsap, prefersReducedMotion } from '@/composables/useScrollReveal'

export interface DashboardScenario {
  id: string
  name: string
  irr: number
  npv: number
  payback: number
  breakEvenMonth: number
  cf: number[]
  capex: number[]
  equity: number
  debt: number
  grants: number
}

/** Same array lengths across scenarios so values can tween index-by-index. */
const scenarios: DashboardScenario[] = [
  {
    id: 'base',
    name: 'Базовый',
    irr: 28.4,
    npv: 96.2,
    payback: 3.1,
    breakEvenMonth: 9,
    cf: [12, 20, 18, 30, 28, 44, 52, 63, 74, 88],
    capex: [40, 64, 30, 78, 52, 88],
    equity: 55,
    debt: 35,
    grants: 10,
  },
  {
    id: 'optimistic',
    name: 'Оптимистичный',
    irr: 38.6,
    npv: 142.7,
    payback: 2.2,
    breakEvenMonth: 6,
    cf: [16, 28, 34, 46, 58, 70, 82, 92, 104, 118],
    capex: [52, 72, 44, 90, 68, 96],
    equity: 62,
    debt: 28,
    grants: 10,
  },
  {
    id: 'conservative',
    name: 'Консервативный',
    irr: 19.8,
    npv: 58.4,
    payback: 4.3,
    breakEvenMonth: 13,
    cf: [8, 12, 16, 22, 24, 32, 38, 47, 55, 66],
    capex: [30, 48, 26, 60, 40, 70],
    equity: 48,
    debt: 44,
    grants: 8,
  },
]

const CYCLE_MS = 4200
const TWEEN_S = 1.2

export function useLiveDashboard() {
  const active = ref(0)
  const reduced = prefersReducedMotion()

  const first = scenarios[0]
  const live = reactive({
    irr: first.irr,
    npv: first.npv,
    payback: first.payback,
    breakEvenMonth: first.breakEvenMonth,
    cf: [...first.cf],
    capex: [...first.capex],
    equity: first.equity,
    debt: first.debt,
    grants: first.grants,
  })

  let timer: ReturnType<typeof setInterval> | null = null
  let paused = false

  function animateTo(i: number) {
    const s = scenarios[i]
    const duration = reduced ? 0 : TWEEN_S
    const ease = 'power2.inOut'

    gsap.to(live, {
      irr: s.irr,
      npv: s.npv,
      payback: s.payback,
      breakEvenMonth: s.breakEvenMonth,
      equity: s.equity,
      debt: s.debt,
      grants: s.grants,
      duration,
      ease,
      overwrite: 'auto',
    })

    const cfTarget: Record<number, number> = {}
    s.cf.forEach((v, idx) => (cfTarget[idx] = v))
    gsap.to(live.cf, { ...cfTarget, duration, ease, overwrite: 'auto' })

    const capexTarget: Record<number, number> = {}
    s.capex.forEach((v, idx) => (capexTarget[idx] = v))
    gsap.to(live.capex, { ...capexTarget, duration, ease, overwrite: 'auto' })
  }

  function startTimer() {
    if (reduced || timer) return
    timer = setInterval(() => {
      if (paused) return
      active.value = (active.value + 1) % scenarios.length
      animateTo(active.value)
    }, CYCLE_MS)
  }

  function setScenario(i: number) {
    if (i === active.value) return
    active.value = i
    animateTo(i)
  }

  const pause = () => (paused = true)
  const resume = () => (paused = false)

  onMounted(startTimer)
  onUnmounted(() => {
    if (timer) clearInterval(timer)
    gsap.killTweensOf(live)
    gsap.killTweensOf(live.cf)
    gsap.killTweensOf(live.capex)
  })

  const fmt = (n: number, digits = 1) =>
    n.toFixed(digits).replace('.', ',')

  const kpis = computed(() => {
    const base = scenarios[0]
    return [
      {
        label: 'IRR',
        value: `${fmt(live.irr)}%`,
        delta: `${live.irr >= base.irr ? '+' : '−'}${fmt(Math.abs(live.irr - base.irr))} п.п.`,
        positive: live.irr >= base.irr,
      },
      {
        label: 'NPV',
        value: `${fmt(live.npv)} млн ₽`,
        delta: `${live.npv >= base.npv ? '+' : '−'}${fmt(Math.abs(((live.npv - base.npv) / base.npv) * 100))}%`,
        positive: live.npv >= base.npv,
      },
      {
        label: 'Окупаемость',
        value: `${fmt(live.payback)} года`,
      },
    ]
  })

  return { scenarios, active, live, kpis, setScenario, pause, resume }
}
