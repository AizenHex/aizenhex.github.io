"use client"

import { SectionHeader } from "@/components/SectionHeader"
import { FadeIn } from "@/components/FadeIn"
import { useState, useRef, useCallback } from "react"

type Panel = "profile" | "links" | "message"

const navItems: { id: Panel; icon: string; label: string }[] = [
  { id: "profile", icon: "◉", label: "Profile" },
  { id: "links",   icon: "⇗", label: "Links" },
  { id: "message", icon: "→", label: "Message" },
]

export function Contact() {
  const [activePanel, setActivePanel] = useState<Panel>("profile")

  // Draggable window
  const winRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const onTitleBarMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return
    const win = winRef.current
    if (!win) return
    dragging.current = true
    win.classList.add("dragging")
    const wr = win.parentElement!.getBoundingClientRect()
    const r  = win.getBoundingClientRect()
    offset.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    if (win.style.position !== "absolute") {
      win.style.position = "absolute"
      win.style.left = (r.left - wr.left) + "px"
      win.style.top  = (r.top  - wr.top)  + "px"
    }
    e.preventDefault()

    const onMove = (ev: MouseEvent) => {
      if (!dragging.current || !win) return
      const pr = win.parentElement!.getBoundingClientRect()
      win.style.left = (ev.clientX - offset.current.x - pr.left) + "px"
      win.style.top  = (ev.clientY - offset.current.y - pr.top)  + "px"
    }
    const onUp = () => {
      dragging.current = false
      win.classList.remove("dragging")
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
  }, [])

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 md:py-36 border-t border-border"
    >
      <div className="max-w-[720px] mx-auto px-6 md:px-12">
        <FadeIn>
          <SectionHeader command="$ cat contact.txt" title="Get in Touch" />
        </FadeIn>

        <FadeIn delay={0.05}>
          {/* Terminal window outer */}
          <div className="relative min-h-[320px] sm:min-h-[360px]">
            <div
              ref={winRef}
              id="contact-win"
              className="w-full max-w-[680px] rounded-[10px] overflow-hidden select-none relative transition-[box-shadow,transform] duration-150"
              style={{
                background: "#1a1d1a",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.35),0 8px 24px rgba(0,0,0,0.2)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center gap-2 px-4 py-[11px] cursor-grab active:cursor-grabbing border-b"
                style={{ background: "#141614", borderColor: "rgba(255,255,255,0.07)" }}
                onMouseDown={onTitleBarMouseDown}
              >
                <span className="w-3 h-3 rounded-full bg-[#FF5F57] shrink-0" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shrink-0" />
                <span className="w-3 h-3 rounded-full bg-[#28C840] shrink-0" />
                <span
                  className="flex-1 text-center text-[12px] mr-9 tracking-[0.02em]"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  made-reeyza — contact.sh
                </span>
              </div>

              {/* Body: sidebar + main — stacked on mobile, side-by-side on sm+ */}
              <div className="flex flex-col sm:flex-row min-h-[260px]">
                {/* Sidebar — horizontal tabs on mobile, vertical list on sm+ */}
                <div
                  className="sm:w-[160px] sm:shrink-0 sm:py-4"
                  style={{ background: "#141614", borderRight: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="hidden sm:block text-[10px] uppercase tracking-[0.1em] px-[14px] pb-[10px]"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Info
                  </div>
                  {/* Mobile: horizontal tabs */}
                  <div className="flex sm:hidden" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {navItems.map(({ id, icon, label }) => (
                      <button
                        key={id}
                        onClick={() => setActivePanel(id)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-2 py-[10px] text-[12px] transition-colors duration-100 border-b-2"
                        style={{
                          color: activePanel === id ? "#4EBF6A" : "rgba(255,255,255,0.45)",
                          background: activePanel === id ? "rgba(78,191,106,0.06)" : "transparent",
                          borderBottomColor: activePanel === id ? "#4EBF6A" : "transparent",
                        }}
                      >
                        <span className="text-[12px]">{icon}</span>
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                  {/* Desktop: vertical list */}
                  {navItems.map(({ id, icon, label }) => (
                    <button
                      key={id}
                      onClick={() => setActivePanel(id)}
                      className="hidden sm:flex w-full items-center gap-2 px-[14px] py-[7px] text-[12px] transition-colors duration-100 border-l-2 text-left"
                      style={{
                        color: activePanel === id ? "#4EBF6A" : "rgba(255,255,255,0.45)",
                        background: activePanel === id ? "rgba(78,191,106,0.08)" : "transparent",
                        borderLeftColor: activePanel === id ? "#4EBF6A" : "transparent",
                      }}
                    >
                      <span className="w-4 text-center shrink-0 text-[12px]">{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Main panel */}
                <div className="flex-1 p-5 overflow-hidden">
                  {/* Profile panel */}
                  {activePanel === "profile" && (
                    <div>
                      <div
                        className="text-[11px] uppercase tracking-[0.1em] mb-[14px] pb-[10px] border-b"
                        style={{ color: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.07)" }}
                      >
                        $ whoami
                      </div>
                      {[
                        { k: "name",  v: "Made Reeyza" },
                        { k: "role",  v: "Mahasiswa Teknik Elektro" },
                        { k: "uni",   v: "Universitas Gadjah Mada" },
                        { k: "loc",   v: "Bali → Yogyakarta" },
                        { k: "focus", v: "Elektro × ML × IoT" },
                      ].map(({ k, v }) => (
                        <div
                          key={k}
                          className="grid py-2 items-center border-b last:border-b-0"
                          style={{ gridTemplateColumns: "64px 1fr", borderColor: "rgba(255,255,255,0.05)" }}
                        >
                          <span className="text-[11px] uppercase tracking-[0.07em]" style={{ color: "rgba(255,255,255,0.28)" }}>{k}</span>
                          <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.75)" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Links panel */}
                  {activePanel === "links" && (
                    <div>
                      <div
                        className="text-[11px] uppercase tracking-[0.1em] mb-[14px] pb-[10px] border-b"
                        style={{ color: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.07)" }}
                      >
                        $ cat links.txt
                      </div>
                      {[
                        { k: "email",    href: "mailto:madereeyza@gmail.com",           label: "madereeyza@gmail.com" },
                        { k: "github",   href: "https://github.com/AizenHex",           label: "github.com/AizenHex" },
                        { k: "linkedin", href: "https://linkedin.com/in/made-reeyza",   label: "Made Reeyza" },
                      ].map(({ k, href, label }) => (
                        <div
                          key={k}
                          className="grid py-2 items-center border-b last:border-b-0"
                          style={{ gridTemplateColumns: "64px 1fr", borderColor: "rgba(255,255,255,0.05)" }}
                        >
                          <span className="text-[11px] uppercase tracking-[0.07em]" style={{ color: "rgba(255,255,255,0.28)" }}>{k}</span>
                          <a
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-[12px] transition-colors duration-100 hover:text-[#FFB800]"
                            style={{ color: "#4EBF6A" }}
                          >
                            {label}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Message panel */}
                  {activePanel === "message" && (
                    <div>
                      <div
                        className="text-[11px] uppercase tracking-[0.1em] mb-[14px] pb-[10px] border-b"
                        style={{ color: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.07)" }}
                      >
                        $ ./send-message.sh
                      </div>
                      <div className="flex flex-col gap-2 py-2">
                        <span className="text-[11px] uppercase tracking-[0.07em]" style={{ color: "rgba(255,255,255,0.28)" }}>
                          // tertarik kolaborasi, diskusi, atau sekadar ngobrol?
                        </span>
                        <span className="text-[12px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.75)" }}>
                          Kirim email ke{" "}
                          <a
                            href="mailto:madereeyza@gmail.com"
                            className="transition-colors duration-100 hover:text-[#FFB800]"
                            style={{ color: "#4EBF6A" }}
                          >
                            madereeyza@gmail.com
                          </a>{" "}
                          — saya biasanya reply dalam 24 jam.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status bar */}
              <div
                className="px-4 py-2 flex items-center justify-between gap-3 border-t"
                style={{ background: "#0f110f", borderColor: "rgba(255,255,255,0.07)" }}
              >
                <div className="flex gap-3 text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <span>● connected</span>
                  <span>bali-node-01</span>
                </div>
                <div>
                  <a
                    href="mailto:madereeyza@gmail.com"
                    className="text-[11px] px-3 py-1 rounded-[3px] transition-colors duration-100 hover:bg-[#4EBF6A] hover:text-[#0f110f]"
                    style={{ color: "#4EBF6A", border: "1px solid rgba(78,191,106,0.35)" }}
                  >
                    → send email
                  </a>
                </div>
              </div>
            </div>
            <p className="mt-[10px] font-mono text-[11px] text-ink-muted opacity-55 hidden sm:block">
              // drag the window · click sidebar to switch panels
            </p>
            <p className="mt-[10px] font-mono text-[11px] text-ink-muted opacity-55 sm:hidden">
              // tap tabs to switch panels
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
