"use client"

import { ThemeToggle } from "@/components/ThemeToggle"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function Header() {
  const [island, setIsland] = useState(false)
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

  function navHref(item: string) {
    if (item === "now") return "/now"
    if (isHome) return `#${item}`
    return `/#${item}`
  }

  return (
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
          {(["work", "writing", "now", "contact"] as const).map((item) => (
            <Link
              key={item}
              href={navHref(item)}
              className="font-mono text-[0.8125rem] text-ink-muted hover:text-accent transition-colors duration-150 link-underline hidden sm:block whitespace-nowrap"
            >
              {item}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
