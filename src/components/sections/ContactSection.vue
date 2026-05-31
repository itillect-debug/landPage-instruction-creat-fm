<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CheckCircle2, ShieldCheck, Clock, MessageSquare } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Textarea from '@/components/ui/Textarea.vue'
import Label from '@/components/ui/Label.vue'

const form = reactive({ name: '', email: '', phone: '', comment: '' })
const errors = reactive<Record<string, string>>({})
const submitted = ref(false)

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^[+()\d\s-]{6,}$/

function validate() {
  errors.name = form.name.trim() ? '' : 'Укажите имя'
  errors.email = emailRe.test(form.email.trim()) ? '' : 'Укажите корректный email'
  errors.phone = phoneRe.test(form.phone.trim()) ? '' : 'Укажите корректный телефон'
  return !errors.name && !errors.email && !errors.phone
}

function onSubmit() {
  if (!validate()) return
  // UI-only: no backend submit wired per current scope
  submitted.value = true
}

const perks = [
  { icon: ShieldCheck, text: 'Сертифицированная финансовая модель' },
  { icon: Clock, text: 'Ответ в течение рабочего дня' },
  { icon: MessageSquare, text: 'Консультация без обязательств' },
]
</script>

<template>
  <section id="contact" class="relative py-20 lg:py-28">
    <div class="pointer-events-none absolute inset-0 bg-grid opacity-40" />
    <div class="container relative">
      <Card class="reveal overflow-hidden p-0">
        <div class="grid lg:grid-cols-[0.9fr_1.1fr]">
          <!-- left info panel -->
          <div class="relative bg-secondary/60 p-8 lg:p-10">
            <div class="pointer-events-none absolute inset-0 bg-radial-fade" />
            <div class="relative">
              <h2 class="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Получить консультацию
              </h2>
              <p class="mt-3 text-muted-foreground">
                Оставьте заявку — поможем подобрать конфигурацию ФМ-ПРО под ваш проект.
              </p>
              <ul class="mt-8 space-y-4">
                <li
                  v-for="(p, i) in perks"
                  :key="i"
                  class="flex items-center gap-3 text-sm text-foreground/80"
                >
                  <span
                    class="flex h-9 w-9 items-center justify-center rounded-xl bg-card text-primary shadow-soft"
                  >
                    <component :is="p.icon" class="h-4 w-4" />
                  </span>
                  {{ p.text }}
                </li>
              </ul>
            </div>
          </div>

          <!-- right form -->
          <div class="p-8 lg:p-10">
            <Transition name="fade" mode="out-in">
              <div
                v-if="submitted"
                key="done"
                class="flex h-full min-h-[280px] flex-col items-center justify-center text-center"
              >
                <span
                  class="flex h-14 w-14 items-center justify-center rounded-full bg-positive/10 text-positive"
                >
                  <CheckCircle2 class="h-7 w-7" />
                </span>
                <h3 class="mt-4 text-xl font-semibold tracking-tight">Заявка отправлена</h3>
                <p class="mt-2 max-w-sm text-sm text-muted-foreground">
                  Спасибо, {{ form.name }}! Мы свяжемся с вами в ближайшее время.
                </p>
              </div>

              <form v-else key="form" class="space-y-5" novalidate @submit.prevent="onSubmit">
                <div class="grid gap-5 sm:grid-cols-2">
                  <div class="space-y-2">
                    <Label for="name">Имя</Label>
                    <Input id="name" v-model="form.name" placeholder="Иван Иванов" />
                    <p v-if="errors.name" class="text-xs text-[hsl(354_72%_54%)]">{{ errors.name }}</p>
                  </div>
                  <div class="space-y-2">
                    <Label for="phone">Телефон</Label>
                    <Input id="phone" v-model="form.phone" type="tel" placeholder="+7 900 000-00-00" />
                    <p v-if="errors.phone" class="text-xs text-[hsl(354_72%_54%)]">{{ errors.phone }}</p>
                  </div>
                </div>

                <div class="space-y-2">
                  <Label for="email">Email</Label>
                  <Input id="email" v-model="form.email" type="email" placeholder="you@company.ru" />
                  <p v-if="errors.email" class="text-xs text-[hsl(354_72%_54%)]">{{ errors.email }}</p>
                </div>

                <div class="space-y-2">
                  <Label for="comment">Комментарий</Label>
                  <Textarea
                    id="comment"
                    v-model="form.comment"
                    placeholder="Кратко опишите ваш проект или вопрос"
                  />
                </div>

                <Button type="submit" size="lg" class="w-full">Получить консультацию</Button>
                <p class="text-center text-xs text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
                </p>
              </form>
            </Transition>
          </div>
        </div>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
