"use client"

import { useEffect, useRef } from "react"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

// Module-level back-nav flag. In Next.js 16 App Router, <Link> clicks are
// client-side transitions — so a back-button press fires `popstate` BEFORE
// the destination page components remount. We record that fact here so the
// re-mounted FadeIn effects can skip their entry animation and render
// content immediately (otherwise the scroll-restored page shows a blank
// viewport because every below-hero section is still opacity:0).
let backNavPending = false
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    backNavPending = true
    // Clear after any remount + scroll-restore has reasonably settled.
    setTimeout(() => { backNavPending = false }, 1000)
  })
  // bfcache restores (Firefox/Safari/Chrome hard-nav back).
  window.addEventListener("pageshow", (e) => {
    if ((e as PageTransitionEvent).persisted) {
      backNavPending = true
      setTimeout(() => { backNavPending = false }, 1000)
    }
  })
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let shown = false

    const show = (animated: boolean) => {
      if (shown) return
      shown = true
      el.style.transitionDelay = animated && delay ? `${delay}s` : ""
      el.classList.add("is-visible")
    }

    // Back navigation (SPA popstate OR bfcache): show immediately, no animation.
    if (backNavPending) {
      show(false)
      return
    }

    // Hard page load via browser back/forward (fresh reload, not SPA).
    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined
    if (navEntry?.type === "back_forward") {
      show(false)
      return
    }

    // Primary: IntersectionObserver for scroll-into-view animations.
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) show(true) },
      { rootMargin: "-60px 0px" }
    )
    observer.observe(el)

    // Fallback timer: catches elements already in viewport on mount
    // (e.g. the first above-the-fold section). 400ms is long enough
    // to be past any scroll-restoration race.
    const fallback = setTimeout(() => {
      if (shown) return
      const rect = el.getBoundingClientRect()
      if (rect.bottom <= 0) {
        show(false)
      } else if (rect.top < window.innerHeight) {
        show(true)
      }
    }, 400)

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [delay])

  return (
    <div ref={ref} className={`fade-section${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  )
}
