<script setup lang="ts">
import { ref } from 'vue'
import {
  ArrowRight,
  Play,
  Image as ImageIcon,
  Factory,
  Layers,
  Building2,
  Car,
  Cpu,
  FileBadge,
  Megaphone,
  Server,
  Home,
  Users2,
  Landmark,
  Wallet,
  HandCoins,
  ArrowUpRight,
  Lightbulb,
  ChevronDown,
  X,
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import MiniChart from '@/components/shared/MiniChart.vue'
import type { Stage } from '@/data/landing'

defineProps<{ stage: Stage }>()

const isExpanded = ref(false)
const isVideoModalOpen = ref(false)

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const openVideoModal = () => {
  isVideoModalOpen.value = true
}

const closeVideoModal = () => {
  isVideoModalOpen.value = false
}

const industries = [
  'Производство',
  'Ритейл',
  'HoReCa',
  'IT / SaaS',
  'Логистика',
  'Агро',
  'Недвижимость',
  'Фарм/Био',
  'Прочее',
]
const investmentIcons: Record<string, any> = {
  Оборудование: Factory,
  ERP: Cpu,
  Недвижимость: Building2,
  Транспорт: Car,
  Лицензии: FileBadge,
}
const nonProdIcons: Record<string, any> = {
  Маркетинг: Megaphone,
  IT: Server,
  Аренда: Home,
  Outsource: Users2,
  'Банковские расходы': Landmark,
}
</script>

<template>
  <article
    :id="`stage-${stage.id}`"
    class="reveal scroll-mt-28 rounded-xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft-lg sm:p-8"
  >
    <!-- header -->
    <div class="flex items-start gap-4">
      <span
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-base font-semibold text-primary"
      >
        {{ String(stage.id).padStart(2, '0') }}
      </span>
      <div class="flex-1">
        <h3 class="text-xl font-semibold tracking-tight text-foreground">
          {{ stage.title }}
        </h3>
        <p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {{ stage.description }}
        </p>
      </div>
    </div>

    <!-- mini instruction -->
    <div
      v-if="stage.instruction"
      class="mt-5 flex items-start gap-2.5 rounded-xl border border-primary/15 bg-secondary/60 px-4 py-3"
    >
      <Lightbulb class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <p class="text-sm text-secondary-foreground">{{ stage.instruction }}</p>
    </div>

    <!-- example / visual area (varies per stage) -->
    <div class="mt-6">
      <!-- 1. industry selector -->
      <div v-if="stage.visual === 'industry'" class="flex flex-wrap gap-2">
        <button
          v-for="(ind, i) in industries"
          :key="ind"
          type="button"
          class="rounded-lg border px-3 py-1.5 text-sm transition-all"
          :class="
            i === 0
              ? 'border-primary/40 bg-primary/10 text-primary'
              : 'border-border bg-surface text-muted-foreground hover:border-primary/30 hover:bg-accent'
          "
        >
          {{ ind }}
        </button>
      </div>

      <!-- 2. data service -->
      <div v-else-if="stage.visual === 'data-service'">
        <Button variant="soft" as="a" href="#contact">
          <ArrowUpRight class="h-4 w-4" />
          Open online сервис сбора данных
        </Button>
      </div>

      <!-- 3. investments -->
      <div v-else-if="stage.visual === 'investments'" class="flex flex-wrap gap-2">
        <span
          v-for="ex in stage.examples"
          :key="ex"
          class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground/80"
        >
          <component :is="investmentIcons[ex]" class="h-4 w-4 text-primary" />
          {{ ex }}
        </span>
      </div>

      <!-- 4. production: direct vs indirect -->
      <div v-else-if="stage.visual === 'production'" class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-xl border border-border bg-surface p-4">
          <div class="flex items-center gap-2">
            <Layers class="h-4 w-4 text-primary" />
            <span class="text-sm font-medium">Прямые</span>
          </div>
          <p class="mt-1.5 text-xs text-muted-foreground">
            Сырьё, материалы, сдельный труд, энергия на производство.
          </p>
        </div>
        <div class="rounded-xl border border-border bg-surface p-4">
          <div class="flex items-center gap-2">
            <Layers class="h-4 w-4 text-[hsl(216_97%_55%)]" />
            <span class="text-sm font-medium">Косвенные</span>
          </div>
          <p class="mt-1.5 text-xs text-muted-foreground">
            Амортизация, обслуживание, общепроизводственные расходы.
          </p>
        </div>
      </div>

      <!-- 5. non-production -->
      <div v-else-if="stage.visual === 'non-production'" class="flex flex-wrap gap-2">
        <span
          v-for="ex in stage.examples"
          :key="ex"
          class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground/80"
        >
          <component :is="nonProdIcons[ex]" class="h-4 w-4 text-primary" />
          {{ ex }}
        </span>
      </div>

      <!-- 6. sales chart -->
      <div v-else-if="stage.visual === 'sales'" class="rounded-xl border border-border bg-surface p-4">
        <div class="mb-3 flex items-center justify-between">
          <span class="text-sm font-medium">Рост продаж</span>
          <Badge variant="positive">Break-even · мес. 7</Badge>
        </div>
        <div class="h-24">
          <MiniChart type="area" :break-even="true" :points="[8, 14, 20, 30, 42, 55, 64, 76, 88, 100]" />
        </div>
        <div class="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Старт</span><span>Номинальный объём</span>
        </div>
      </div>

      <!-- 7. staff / org -->
      <div v-else-if="stage.visual === 'staff'" class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-xl border border-border bg-surface p-4">
          <p class="mb-3 text-xs font-medium text-muted-foreground">Орг. структура</p>
          <div class="space-y-2">
            <div class="mx-auto w-2/3 rounded-md bg-primary/10 py-1.5 text-center text-xs text-primary">
              Директор
            </div>
            <div class="grid grid-cols-3 gap-1.5">
              <span class="rounded-md bg-surface ring-1 ring-border py-1.5 text-center text-[11px] text-muted-foreground">Произв.</span>
              <span class="rounded-md bg-surface ring-1 ring-border py-1.5 text-center text-[11px] text-muted-foreground">Продажи</span>
              <span class="rounded-md bg-surface ring-1 ring-border py-1.5 text-center text-[11px] text-muted-foreground">Админ.</span>
            </div>
          </div>
        </div>
        <div class="rounded-xl border border-border bg-surface p-4">
          <p class="mb-2 text-xs font-medium text-muted-foreground">ФОТ по отделам</p>
          <div class="h-16">
            <MiniChart type="bars" :points="[70, 52, 38, 60, 30]" />
          </div>
        </div>
      </div>

      <!-- 8. financing equity/debt/grants -->
      <div v-else-if="stage.visual === 'financing'" class="grid gap-3 sm:grid-cols-3">
        <div class="rounded-xl border border-border bg-surface p-4 text-center">
          <Wallet class="mx-auto h-5 w-5 text-primary" />
          <p class="mt-2 text-sm font-medium">Equity</p>
          <p class="text-xs text-muted-foreground">Собственные средства</p>
        </div>
        <div class="rounded-xl border border-border bg-surface p-4 text-center">
          <Landmark class="mx-auto h-5 w-5 text-[hsl(216_97%_55%)]" />
          <p class="mt-2 text-sm font-medium">Debt</p>
          <p class="text-xs text-muted-foreground">Заёмное финансирование</p>
        </div>
        <div class="rounded-xl border border-border bg-surface p-4 text-center">
          <HandCoins class="mx-auto h-5 w-5 text-positive" />
          <p class="mt-2 text-sm font-medium">Grants</p>
          <p class="text-xs text-muted-foreground">Субсидии и гранты</p>
        </div>
      </div>

      <!-- 9. results summary -->
      <div v-else-if="stage.visual === 'results'" class="grid grid-cols-3 gap-3">
        <div
          v-for="r in [
            { l: 'IRR', v: '34,8%' },
            { l: 'NPV', v: '128 млн' },
            { l: 'PP', v: '2,4 года' },
          ]"
          :key="r.l"
          class="rounded-xl border border-border bg-surface p-4 text-center"
        >
          <p class="text-xs text-muted-foreground">{{ r.l }}</p>
          <p class="mt-1 text-base font-semibold text-foreground">{{ r.v }}</p>
        </div>
      </div>
    </div>

    <!-- media placeholders -->
    <div v-if="stage.id !== 1" class="mt-6 grid gap-3 sm:grid-cols-2">
      <button
        v-if="stage.videoEmbedUrl"
        @click="openVideoModal"
        type="button"
        class="group/media relative aspect-video overflow-hidden rounded-xl border border-border bg-surface/70 transition-colors hover:border-primary/40 cursor-pointer"
        aria-label="Воспроизвести видео-инструкцию"
      >
        <img
          v-if="stage.videoThumbnail"
          :src="stage.videoThumbnail"
          alt=""
          class="absolute inset-0 h-full w-full object-cover"
        />
        <span
          class="absolute inset-0 bg-black/35 transition-colors group-hover/media:bg-black/45"
          aria-hidden="true"
        />
        <span class="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1.5 text-white">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/90 text-white shadow-md transition-transform group-hover/media:scale-110"
          >
            <Play class="h-4 w-4 translate-x-px" />
          </span>
          <span class="text-xs font-medium">Видео-инструкция</span>
        </span>
      </button>
      <div
        v-else
        class="group/media flex aspect-video items-center justify-center rounded-xl border border-dashed border-border bg-surface/70 transition-colors hover:border-primary/40 hover:bg-accent"
      >
        <span class="flex flex-col items-center gap-1.5 text-muted-foreground">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover/media:scale-110"
          >
            <Play class="h-4 w-4 translate-x-px" />
          </span>
          <span class="text-xs">Видео-инструкция</span>
        </span>
      </div>
      <div
        class="flex aspect-video items-center justify-center rounded-xl border border-dashed border-border bg-surface/70 transition-colors hover:border-primary/40 hover:bg-accent"
      >
        <span class="flex flex-col items-center gap-1.5 text-muted-foreground">
          <ImageIcon class="h-5 w-5" />
          <span class="text-xs">Скриншот интерфейса</span>
        </span>
      </div>
    </div>

    <!-- Expandable detailed content -->
    <div v-if="stage.detailedContent" class="mt-6">
      <button
        @click="toggleExpanded"
        class="flex w-full items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-left transition-all hover:border-primary/30 hover:bg-accent"
      >
        <span class="text-sm font-medium text-foreground">Подробнее об этапе</span>
        <ChevronDown
          class="h-4 w-4 text-muted-foreground transition-transform duration-200"
          :class="{ 'rotate-180': isExpanded }"
        />
      </button>

      <div
        v-if="isExpanded"
        class="mt-3 rounded-lg border border-border bg-surface/50 px-4 py-4 text-sm leading-relaxed text-foreground/90"
      >
        {{ stage.detailedContent }}
      </div>
    </div>

    <!-- Video Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isVideoModalOpen && stage.videoEmbedUrl"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          @click.self="closeVideoModal"
        >
          <div class="relative w-full max-w-7xl">
            <button
              @click="closeVideoModal"
              class="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Закрыть видео"
            >
              <X class="h-5 w-5" />
            </button>
            <div class="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
              <iframe
                v-if="isVideoModalOpen"
                :src="stage.videoEmbedUrl"
                class="h-full w-full"
                style="border: none;"
                allow="clipboard-write; autoplay; fullscreen"
                allowfullscreen
                :title="`Видео-инструкция: ${stage.title}`"
              ></iframe>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </article>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative {
  transform: scale(0.95);
}
</style>
