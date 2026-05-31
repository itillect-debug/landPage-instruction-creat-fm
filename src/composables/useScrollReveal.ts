import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Soft scroll-reveal for all `.reveal` elements within `root`.
 * Reveals are batched and staggered; respects reduced-motion.
 */
export function useScrollReveal() {
  let ctx: gsap.Context | null = null

  onMounted(() => {
    const reduced = prefersReducedMotion()

    ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.reveal')

      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 })
        return
      }

      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
            overwrite: true,
          }),
      })
    })

    // Recalculate once fonts/images settle
    requestAnimationFrame(() => ScrollTrigger.refresh())
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}

export { gsap, ScrollTrigger, prefersReducedMotion }
