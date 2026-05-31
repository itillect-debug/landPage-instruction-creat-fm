<script setup lang="ts">
import { Check, Star } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import { services } from '@/data/landing'
</script>

<template>
  <section id="services" class="relative py-20 lg:py-28">
    <div class="container">
      <div class="reveal mx-auto max-w-2xl text-center">
        <p class="text-sm font-medium uppercase tracking-widest text-primary">
          Экспертное сопровождение
        </p>
        <h2 class="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Услуги команды ФМ-ПРО
        </h2>
        <p class="mt-4 text-muted-foreground">
          Подключайтесь на любом этапе — от подготовки данных до анализа результатов.
        </p>
      </div>

      <div class="mt-14 grid items-stretch gap-5 md:grid-cols-3">
        <Card
          v-for="service in services"
          :key="service.title"
          interactive
          class="reveal relative flex flex-col p-7"
          :class="service.popular ? 'border-primary/40 shadow-glow' : ''"
        >
          <Badge
            v-if="service.popular"
            variant="primary"
            class="absolute -top-3 left-7"
          >
            <Star class="h-3.5 w-3.5" />
            Популярно
          </Badge>

          <h3 class="text-lg font-semibold leading-snug tracking-tight">
            {{ service.title }}
          </h3>
          <p class="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            {{ service.price }}
          </p>
          <p class="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
            {{ service.description }}
          </p>
          <Button
            class="mt-6 w-full"
            :variant="service.popular ? 'default' : 'outline'"
            as="a"
            href="#contact"
          >
            <Check class="h-4 w-4" />
            Заказать услугу
          </Button>
        </Card>
      </div>
    </div>
  </section>
</template>
