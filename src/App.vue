<script setup lang="ts">
import SiteNav from '@/components/sections/SiteNav.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import StagesSection from '@/components/sections/StagesSection.vue'
import ResultsSection from '@/components/sections/ResultsSection.vue'
import ToolsSection from '@/components/sections/ToolsSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import SiteFooter from '@/components/sections/SiteFooter.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()
</script>

<template>
  <SiteNav />
  <main>
    <HeroSection />
    <StagesSection />
    <ResultsSection />
    <ToolsSection />
    <ServicesSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
