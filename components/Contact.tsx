"use client"

import { SectionHeader } from "@/components/SectionHeader"
import { FadeIn } from "@/components/FadeIn"
import { useCallback, useRef, useState } from "react"

type Panel = "mail" | "links" | "message"

const panels: { id: Panel; icon: string; label: string }[] = [
  { id: "mail", icon: "@", label: "Mail" },
  { id: "links", icon: "#", label: "Links" },
  { id: "message", icon: ">", label: "Message" },
]

const shortcuts = [
  { label: "Email", icon: "@", href: "mailto:madereeyza@gmail.com" },
  { label: "GitHub", icon: "GH", href: "https://github.com/AizenHex" },
  { label: "LinkedIn", icon: "IN", href: "https://linkedin.com/in/made-reeyza" },
  { label: "CV", icon: "CV", href: "mailto:madereeyza@gmail.com?subject=CV%20Request" },
]

export function Contact() {
  const [activePanel, setActivePanel] = useState<Panel>("mail")
  const windowRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const onTitleBarMouseDown = useCallback((event: React.MouseEvent) => {
    if (event.button !== 0) return
    const win = windowRef.current
    const desktop = win?.parentElement
    if (!win || !desktop) return

    dragging.current = true
    win.classList.add("scale-[1.01]")
    win.style.zIndex = "20"

    const desktopRect = desktop.getBoundingClientRect()
    const winRect = win.getBoundingClientRect()
    offset.current = {
      x: event.clientX - winRect.left,
      y: event.clientY - winRect.top,
    }

    if (win.style.position !== "absolute") {
      win.style.position = "absolute"
      win.style.left = `${winRect.left - desktopRect.left}px`
      win.style.top = `${winRect.top - desktopRect.top}px`
    }

    const onMove = (moveEvent: MouseEvent) => {
      if (!dragging.current) return
      const nextDesktopRect = desktop.getBoundingClientRect()
      const nextLeft = moveEvent.clientX - offset.current.x - nextDesktopRect.left
      const nextTop = moveEvent.clientY - offset.current.y - nextDesktopRect.top
      const maxLeft = desktop.clientWidth - win.offsetWidth
      const maxTop = desktop.clientHeight - win.offsetHeight

      win.style.left = `${Math.min(Math.max(nextLeft, 12), Math.max(maxLeft - 12, 12))}px`
      win.style.top = `${Math.min(Math.max(nextTop, 12), Math.max(maxTop - 12, 12))}px`
    }

    const onUp = () => {
      dragging.current = false
      win.classList.remove("scale-[1.01]")
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    event.preventDefault()
  }, [])

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-border py-16 md:py-36"
    >
      <div className="mx-auto max-w-[1040px] px-6 md:px-12">
        <FadeIn>
          <SectionHeader command="$ open contact.workspace" title="Get Contact" />
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="contact-desktop relative min-h-[620px] overflow-hidden rounded-lg border border-border bg-surface/55 shadow-[0_30px_90px_rgba(0,0,0,0.18)] backdrop-blur md:min-h-[560px] dark:bg-[#11140f]/88 dark:shadow-[0_36px_120px_rgba(0,0,0,0.42)]">
            <div className="flex h-10 items-center justify-between border-b border-border bg-bg/70 px-4 font-mono text-[11px] text-ink-muted dark:bg-[#0b0d0a]/82">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span>contact.os</span>
              </div>
              <div className="hidden items-center gap-4 sm:flex">
                <span>Made Reeyza</span>
                <span>Yogyakarta / Bali</span>
              </div>
              <span>online</span>
            </div>

            <div className="absolute left-4 top-16 z-10 grid grid-cols-2 gap-3 sm:left-6 sm:top-20 sm:grid-cols-1">
              {shortcuts.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex w-[76px] flex-col items-center gap-2 rounded-md border border-transparent p-2 text-center transition hover:border-accent/35 hover:bg-accent/8"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-md border border-border bg-bg/85 font-mono text-[12px] font-semibold text-accent shadow-sm transition group-hover:border-accent dark:bg-[#171b14]/92">
                    {item.icon}
                  </span>
                  <span className="font-mono text-[10px] leading-tight text-ink-muted">{item.label}</span>
                </a>
              ))}
            </div>

            <div
              ref={windowRef}
              className="absolute left-1/2 top-[142px] z-20 w-[calc(100%-32px)] max-w-[720px] -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-bg/92 shadow-[0_22px_70px_rgba(0,0,0,0.22)] transition-transform duration-150 dark:bg-[#141710]/95 dark:shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:left-[45%] sm:top-[92px] sm:w-[68%] sm:translate-x-0"
            >
              <div
                className="flex cursor-grab items-center gap-3 border-b border-border bg-surface/80 px-4 py-3 active:cursor-grabbing dark:bg-[#10130f]"
                onMouseDown={onTitleBarMouseDown}
              >
                <div className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-sm border border-border bg-bg" />
                  <span className="h-2.5 w-2.5 rounded-sm border border-border bg-bg" />
                  <span className="h-2.5 w-2.5 rounded-sm border border-accent/50 bg-accent/20" />
                </div>
                <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-ink-muted">
                  workspace://contact/made-reeyza
                </span>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-accent sm:inline">
                  active
                </span>
              </div>

              <div className="grid min-h-[330px] grid-rows-[auto_1fr] sm:grid-cols-[172px_1fr] sm:grid-rows-1">
                <nav className="flex border-b border-border bg-surface/45 p-2 sm:block sm:border-b-0 sm:border-r dark:bg-[#10130f]/65">
                  {panels.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActivePanel(item.id)}
                      className="flex flex-1 items-center justify-center gap-2 rounded px-3 py-2 font-mono text-[12px] transition sm:w-full sm:justify-start"
                      style={{
                        color: activePanel === item.id ? "var(--accent)" : "var(--ink-muted)",
                        background: activePanel === item.id ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent",
                      }}
                    >
                      <span className="grid h-5 w-5 place-items-center rounded border border-border text-[10px]">
                        {item.icon}
                      </span>
                      {item.label}
                    </button>
                  ))}
                </nav>

                <div className="p-5 sm:p-6">
                  {activePanel === "mail" && (
                    <div className="grid gap-5">
                      <div>
                        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                          inbox / primary
                        </p>
                        <h3 className="font-serif text-[clamp(1.45rem,3vw,2.2rem)] font-medium leading-tight text-ink">
                          Let&apos;s build, debug, or discuss something useful.
                        </h3>
                      </div>
                      <div className="rounded-md border border-border bg-surface/50 p-4 dark:bg-[#0f120e]/70">
                        <div className="mb-3 flex items-center justify-between gap-3 border-b border-border pb-3 font-mono text-[11px] text-ink-muted">
                          <span>from: visitor</span>
                          <span>to: Made Reeyza</span>
                        </div>
                        <p className="max-w-[54ch] text-[13px] leading-6 text-ink-muted">
                          Open to project discussion around electrical engineering, IoT, ML, embedded systems, and UI/UX.
                        </p>
                      </div>
                      <a
                        href="mailto:madereeyza@gmail.com"
                        className="inline-flex w-fit items-center gap-2 rounded border border-accent/45 px-4 py-2 font-mono text-[12px] text-accent transition hover:bg-accent hover:text-bg"
                      >
                        <span>@</span>
                        madereeyza@gmail.com
                      </a>
                    </div>
                  )}

                  {activePanel === "links" && (
                    <div className="grid gap-3">
                      {[
                        ["Email", "madereeyza@gmail.com", "mailto:madereeyza@gmail.com"],
                        ["GitHub", "github.com/AizenHex", "https://github.com/AizenHex"],
                        ["LinkedIn", "linkedin.com/in/made-reeyza", "https://linkedin.com/in/made-reeyza"],
                      ].map(([label, value, href]) => (
                        <a
                          key={label}
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group grid gap-1 rounded-md border border-border bg-surface/45 p-4 transition hover:border-accent/60 dark:bg-[#0f120e]/70"
                        >
                          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{label}</span>
                          <span className="break-all font-mono text-[13px] text-accent transition group-hover:text-accent-hover">
                            {value}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}

                  {activePanel === "message" && (
                    <div className="grid gap-5">
                      <div className="rounded-md border border-border bg-[#0c0f0b] p-4 font-mono text-[12px] leading-6 text-[#c8d4be] shadow-inner">
                        <p><span className="text-accent">$</span> connect --with reeyza</p>
                        <p className="text-ink-muted">status: ready</p>
                        <p className="text-ink-muted">scope: collaboration, research, project talk</p>
                        <p><span className="text-accent">output:</span> email thread initialized</p>
                      </div>
                      <a
                        href="mailto:madereeyza@gmail.com?subject=Hello%20Reeyza"
                        className="inline-flex w-fit items-center gap-2 rounded bg-accent px-4 py-2 font-mono text-[12px] text-bg transition hover:bg-accent-hover"
                      >
                        <span>&gt;</span>
                        send message
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-border bg-bg/82 px-3 py-2 shadow-[0_14px_45px_rgba(0,0,0,0.2)] backdrop-blur dark:bg-[#0b0d0a]/84">
              {panels.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePanel(item.id)}
                  title={item.label}
                  className="grid h-9 w-9 place-items-center rounded-md border border-border font-mono text-[12px] text-ink-muted transition hover:border-accent hover:text-accent"
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
