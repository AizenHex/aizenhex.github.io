"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"

interface Command {
  icon: string
  title: string
  sub: string
  action: () => void
}

export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
  }, [])

  function navigate(path: string) {
    close()
    router.push(path)
  }

  function scrollToSection(id: string) {
    close()
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" })
    } else {
      router.push(`/#${id}`)
    }
  }

  const commands: Command[] = [
    {
      icon: "~",
      title: "Home",
      sub: "kembali ke halaman utama",
      action: () => navigate("/"),
    },
    {
      icon: "⚡",
      title: "Work",
      sub: "lihat selected projects",
      action: () => scrollToSection("work"),
    },
    {
      icon: "✍",
      title: "Writing",
      sub: "semua tulisan",
      action: () => navigate("/writing"),
    },
    {
      icon: "◉",
      title: "Now",
      sub: "apa yang sedang dikerjakan",
      action: () => navigate("/now"),
    },
    {
      icon: "@",
      title: "Contact",
      sub: "kirim email / github",
      action: () => scrollToSection("contact"),
    },
    {
      icon: "🔬",
      title: "Vortexa",
      sub: "IoT · ML · case study",
      action: () => navigate("/work/vortexa"),
    },
    {
      icon: "♻",
      title: "Plaswa2Grow",
      sub: "hardware · case study",
      action: () => navigate("/work/plaswa2grow"),
    },
    {
      icon: "🧠",
      title: "NLP for Health",
      sub: "ml · nlp · case study",
      action: () => navigate("/work/nlp-for-health"),
    },
  ]

  const filtered = query.trim()
    ? commands.filter((c) =>
        (c.title + c.sub).toLowerCase().includes(query.toLowerCase().trim())
      )
    : commands

  // Clamp activeIdx when filtered changes
  const clampedActive = Math.min(activeIdx, Math.max(filtered.length - 1, 0))

  useEffect(() => {
    setActiveIdx(0)
  }, [query])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) {
        // Open on Ctrl+K / Cmd+K or /
        if (
          ((e.metaKey || e.ctrlKey) && e.key === "k") ||
          (e.key === "/" && !["INPUT", "TEXTAREA"].includes((document.activeElement as HTMLElement)?.tagName ?? ""))
        ) {
          e.preventDefault()
          setOpen(true)
          setQuery("")
          setActiveIdx(0)
        }
        return
      }
      if (e.key === "Escape") { e.preventDefault(); close(); return }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveIdx((i) => Math.min(i + 1, filtered.length - 1))
        return
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveIdx((i) => Math.max(i - 1, 0))
        return
      }
      if (e.key === "Enter") {
        e.preventDefault()
        const cmd = filtered[clampedActive]
        if (cmd) cmd.action()
        return
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, filtered, clampedActive, close])

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  if (!open) return null

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[120px]"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      role="dialog"
      aria-label="Command palette"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
    >
      {/* Box */}
      <div
        className="w-[min(560px,90vw)] overflow-hidden rounded-[6px]"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-[14px] border-b border-border"
        >
          <span className="font-mono text-[14px] text-accent shrink-0">~$</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="type a command..."
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent border-none outline-none font-mono text-[14px] text-ink placeholder:text-ink-muted caret-accent"
          />
          <span className="font-mono text-[11px] text-ink-muted shrink-0">esc to close</span>
        </div>

        {/* Results */}
        <div className="max-h-[300px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-4 py-4 font-mono text-[13px] text-ink-muted">
              no results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((cmd, i) => (
              <div
                key={cmd.title}
                className="flex items-center gap-[14px] px-4 py-3 cursor-pointer border-b border-border last:border-b-0 transition-colors duration-100"
                style={{ background: i === clampedActive ? "var(--bg)" : "transparent" }}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => cmd.action()}
              >
                <div
                  className="w-7 h-7 flex items-center justify-center text-[12px] text-accent border border-border rounded-[3px] shrink-0 font-mono"
                >
                  {cmd.icon}
                </div>
                <div>
                  <div className="font-mono text-[13px] text-ink">{cmd.title}</div>
                  <div className="font-mono text-[11px] text-ink-muted mt-px">{cmd.sub}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border flex gap-4 font-mono text-[10px] text-ink-muted">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  )
}
