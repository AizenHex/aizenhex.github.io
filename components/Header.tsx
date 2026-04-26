"use client"

import { ThemeToggle } from "@/components/ThemeToggle"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const NAV_ITEMS = ["work", "writing", "now", "contact"] as const

export function Header() {
  const [island, setIsland] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    function onScroll() {
      setIsland(window.scrollY > 80)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  function navHref(item: string) {
    if (item === "now") return "/now"
    if (isHome) return `#${item}`
    return `/#${item}`
  }

  return (
    <>
      <header
        className={[
          "fixed left-1/2 -translate-x-1/2 z-40 flex items-center",
          "backdrop-blur-[16px] border-border",
          "transition-[top,width,height,border-radius,box-shadow,background] duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)]",
          island
            ? "top-3 w-[min(700px,calc(100vw-40px))] h-12 rounded-[100px] border shadow-[0_8px_32px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.06)] bg-bg/88"
            : "top-0 w-screen h-[60px] rounded-none border-b bg-bg/92",
        ].join(" ")}
      >
        <div
          className={[
            "w-full flex items-center justify-between gap-5",
            island
              ? "px-6 max-w-none"
              : "px-6 md:px-12 max-w-[1100px] mx-auto",
          ].join(" ")}
        >
          <Link
            href="/"
            className="font-mono text-[0.875rem] text-accent hover:text-accent-hover transition-colors duration-150 whitespace-nowrap"
            aria-label="Kembali ke halaman utama"
          >
            ~/portfolio
          </Link>

          <nav className="flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                href={navHref(item)}
                className="font-mono text-[0.8125rem] text-ink-muted hover:text-accent transition-colors duration-150 link-underline hidden sm:block whitespace-nowrap"
              >
                {item}
              </Link>
            ))}
            <ThemeToggle />

            {/* Hamburger — mobile only */}
            <button
              className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] shrink-0"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`block w-5 h-[1.5px] bg-ink-muted transition-transform duration-200 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-ink-muted transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-ink-muted transition-transform duration-200 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={[
          "fixed inset-0 z-30 sm:hidden flex flex-col pt-[60px]",
          "transition-opacity duration-200",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        style={{ background: "var(--bg)" }}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col px-6 pt-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              href={navHref(item)}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-[1.125rem] text-ink py-4 border-b border-border hover:text-accent transition-colors duration-150 flex items-center gap-3"
            >
              <span className="text-accent text-[0.8125rem] w-5 shrink-0">$</span>
              {item}
            </Link>
          ))}
        </nav>

        <p className="px-6 pt-8 font-mono text-[0.75rem] text-ink-muted">
          // tekan <kbd className="border border-border px-1 py-0.5 rounded text-[10px]">Ctrl K</kbd> untuk command palette
        </p>
      </div>
    </>
  )
}
