"use client"

import { SectionHeader } from "@/components/SectionHeader"
import { FadeIn } from "@/components/FadeIn"
import { useCallback, useEffect, useRef, useState } from "react"

type AppId = "apps" | "mail" | "links" | "profile" | "terminal"

type DesktopApp = {
  id: AppId
  label: string
  icon: string
  title: string
  size: string
}

type WindowPosition = {
  x: number
  y: number
}

type TerminalEntry = {
  input?: string
  output: string[]
  accent?: boolean
}

const APPS: DesktopApp[] = [
  { id: "apps", label: "Apps", icon: "AP", title: "App Launcher", size: "md:w-[430px]" },
  { id: "mail", label: "Mail", icon: "@", title: "Mail", size: "md:w-[540px]" },
  { id: "links", label: "Links", icon: "#", title: "Link Hub", size: "md:w-[440px]" },
  { id: "profile", label: "Profile", icon: "ID", title: "Profile Card", size: "md:w-[420px]" },
  { id: "terminal", label: "Terminal", icon: ">_", title: "Terminal", size: "md:w-[560px]" },
]

const INITIAL_OPEN_APPS: AppId[] = ["apps", "mail", "terminal"]

const INITIAL_POSITIONS: Record<AppId, WindowPosition> = {
  apps: { x: 132, y: 96 },
  mail: { x: 316, y: 78 },
  links: { x: 388, y: 174 },
  profile: { x: 164, y: 242 },
  terminal: { x: 238, y: 232 },
}

const INITIAL_Z_ORDER: Record<AppId, number> = {
  apps: 14,
  mail: 16,
  links: 10,
  profile: 11,
  terminal: 18,
}

const INITIAL_TERMINAL: TerminalEntry[] = [
  {
    output: [
      "contactOS terminal ready",
      "type help to list commands",
      "hint: some names unlock hidden modes",
    ],
  },
]

function appById(id: AppId) {
  return APPS.find((app) => app.id === id)!
}

export function Contact() {
  const [openApps, setOpenApps] = useState<AppId[]>(INITIAL_OPEN_APPS)
  const [minimizedApps, setMinimizedApps] = useState<AppId[]>([])
  const [activeApp, setActiveApp] = useState<AppId>("terminal")
  const [positions, setPositions] = useState<Record<AppId, WindowPosition>>(INITIAL_POSITIONS)
  const [zOrder, setZOrder] = useState<Record<AppId, number>>(INITIAL_Z_ORDER)
  const [terminalEntries, setTerminalEntries] = useState<TerminalEntry[]>(INITIAL_TERMINAL)
  const [terminalInput, setTerminalInput] = useState("")
  const [isDesktop, setIsDesktop] = useState(false)
  const [clock, setClock] = useState("")
  const [easterEggUnlocked, setEasterEggUnlocked] = useState(false)
  const [pulseKey, setPulseKey] = useState(0)
  const dragRef = useRef<{
    appId: AppId
    startX: number
    startY: number
    originX: number
    originY: number
  } | null>(null)

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)")
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const updateClock = () => {
      setClock(new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date()))
    }

    updateClock()
    const interval = window.setInterval(updateClock, 30000)
    return () => window.clearInterval(interval)
  }, [])

  const focusApp = useCallback((appId: AppId) => {
    setOpenApps((current) => current.includes(appId) ? current : [...current, appId])
    setMinimizedApps((current) => current.filter((id) => id !== appId))
    setActiveApp(appId)
    setZOrder((current) => ({ ...current, [appId]: Math.max(...Object.values(current)) + 1 }))
  }, [])

  const minimizeApp = useCallback((appId: AppId) => {
    setMinimizedApps((current) => current.includes(appId) ? current : [...current, appId])
    setActiveApp((current) => {
      if (current !== appId) return current
      const next = openApps.find((id) => id !== appId && !minimizedApps.includes(id))
      return next ?? "apps"
    })
  }, [minimizedApps, openApps])

  const closeApp = useCallback((appId: AppId) => {
    setOpenApps((current) => current.filter((id) => id !== appId))
    setMinimizedApps((current) => current.filter((id) => id !== appId))
    setActiveApp((current) => {
      if (current !== appId) return current
      const next = openApps.find((id) => id !== appId && !minimizedApps.includes(id))
      return next ?? "apps"
    })
  }, [minimizedApps, openApps])

  const startDrag = useCallback((appId: AppId, event: React.MouseEvent) => {
    if (!isDesktop || event.button !== 0) return
    focusApp(appId)
    dragRef.current = {
      appId,
      startX: event.clientX,
      startY: event.clientY,
      originX: positions[appId].x,
      originY: positions[appId].y,
    }
    event.preventDefault()
  }, [focusApp, isDesktop, positions])

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const drag = dragRef.current
      if (!drag) return

      const nextX = drag.originX + event.clientX - drag.startX
      const nextY = drag.originY + event.clientY - drag.startY

      setPositions((current) => ({
        ...current,
        [drag.appId]: {
          x: Math.min(Math.max(nextX, 20), 620),
          y: Math.min(Math.max(nextY, 54), 424),
        },
      }))
    }

    const onUp = () => {
      dragRef.current = null
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }
  }, [])

  const runTerminalCommand = useCallback((rawCommand: string) => {
    const command = rawCommand.trim()
    const normalized = command.toUpperCase()

    if (!command) return
    if (normalized === "CLEAR") {
      setTerminalEntries([])
      return
    }

    if (normalized === "MADEREEYZA") {
      setEasterEggUnlocked(true)
      setPulseKey((current) => current + 1)
      setTerminalEntries((current) => [
        ...current,
        {
          input: command,
          accent: true,
          output: [
            "access granted",
            "reeyza mode unlocked",
            " __  __    _    ____  _____   ____  _____ _____ ______   __  _    ",
            "|  \\/  |  / \\  |  _ \\| ____| |  _ \\| ____| ____|  _ \\ \\ / / / \\   ",
            "| |\\/| | / _ \\ | | | |  _|   | |_) |  _| |  _| | |_) \\ V / / _ \\  ",
            "| |  | |/ ___ \\| |_| | |___  |  _ <| |___| |___|  __/ | | / ___ \\ ",
            "|_|  |_/_/   \\_\\____/|_____| |_| \\_\\_____|_____|_|    |_|/_/   \\_\\",
            "cross-domain mode: Elektro x ML x IoT",
          ],
        },
      ])
      return
    }

    if (normalized === "HELP") {
      setTerminalEntries((current) => [
        ...current,
        {
          input: command,
          output: ["commands: help, contact, links, clear", "secret: try a name without spaces"],
        },
      ])
      return
    }

    if (normalized === "CONTACT") {
      focusApp("mail")
      setTerminalEntries((current) => [
        ...current,
        {
          input: command,
          output: ["opening Mail", "mailto: madereeyza@gmail.com"],
        },
      ])
      return
    }

    if (normalized === "LINKS") {
      focusApp("links")
      setTerminalEntries((current) => [
        ...current,
        {
          input: command,
          output: ["opening Link Hub", "github.com/AizenHex", "linkedin.com/in/made-reeyza"],
        },
      ])
      return
    }

    setTerminalEntries((current) => [
      ...current,
      {
        input: command,
        output: [`command not found: ${command}`],
      },
    ])
  }, [focusApp])

  function submitTerminal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    runTerminalCommand(terminalInput)
    setTerminalInput("")
  }

  function renderApp(appId: AppId) {
    if (appId === "apps") {
      return (
        <div className="grid gap-4">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              launcher
            </p>
            <h3 className="font-serif text-[1.7rem] leading-tight text-ink">Contact workspace</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {APPS.filter((app) => app.id !== "apps").map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => focusApp(app.id)}
                className="group rounded-md border border-border bg-surface/45 p-4 text-left transition hover:border-accent/60 dark:bg-[#0f120e]/70"
              >
                <span className="mb-3 grid h-10 w-10 place-items-center rounded border border-border bg-bg font-mono text-[12px] text-accent transition group-hover:border-accent">
                  {app.icon}
                </span>
                <span className="font-mono text-[12px] text-ink">{app.label}</span>
              </button>
            ))}
          </div>
          <p className="font-mono text-[11px] leading-5 text-ink-muted">
            Tip: open Terminal and type <span className="text-accent">MADEREEYZA</span>.
          </p>
        </div>
      )
    }

    if (appId === "mail") {
      return (
        <div className="grid gap-5">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              inbox / primary
            </p>
            <h3 className="font-serif text-[clamp(1.45rem,3vw,2.1rem)] font-medium leading-tight text-ink">
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
      )
    }

    if (appId === "links") {
      return (
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
      )
    }

    if (appId === "profile") {
      return (
        <div className="grid gap-4">
          {[
            ["name", "Made Reeyza"],
            ["role", "Electrical Engineering student"],
            ["base", "Yogyakarta / Bali"],
            ["focus", "Elektro x ML x IoT"],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[76px_1fr] border-b border-border pb-3 last:border-b-0">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">{label}</span>
              <span className="font-mono text-[13px] text-ink">{value}</span>
            </div>
          ))}
          <div className="rounded-md border border-accent/30 bg-accent/8 p-3 font-mono text-[11px] leading-5 text-ink-muted">
            status: available for focused project discussion
          </div>
        </div>
      )
    }

    return (
      <div className="flex min-h-[260px] flex-col rounded-md border border-border bg-[#0a0d09] p-4 font-mono text-[12px] text-[#c8d4be] shadow-inner">
        <div className="flex-1 space-y-2 overflow-hidden">
          {terminalEntries.map((entry, index) => (
            <div key={`${entry.input ?? "boot"}-${index}`}>
              {entry.input && (
                <p>
                  <span className="text-accent">$</span> {entry.input}
                </p>
              )}
              {entry.output.map((line) => (
                <p
                  key={`${index}-${line}`}
                  className={entry.accent ? "whitespace-pre text-accent" : "text-ink-muted"}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
        <form onSubmit={submitTerminal} className="mt-4 flex items-center gap-2 border-t border-border pt-3">
          <span className="text-accent">$</span>
          <input
            value={terminalInput}
            onChange={(event) => setTerminalInput(event.target.value)}
            aria-label="Terminal command"
            className="min-w-0 flex-1 bg-transparent text-[#c8d4be] outline-none placeholder:text-ink-muted"
            placeholder="type help"
          />
        </form>
      </div>
    )
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-border py-16 md:py-36"
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-12">
        <FadeIn>
          <SectionHeader command="$ boot contactOS" title="Get Contact" />
        </FadeIn>

        <FadeIn delay={0.05}>
          <div
            className={[
              "contact-os-shell relative min-h-[760px] overflow-hidden rounded-lg border border-border bg-surface/55 shadow-[0_30px_90px_rgba(0,0,0,0.18)] backdrop-blur",
              "md:min-h-[640px] dark:bg-[#11140f]/88 dark:shadow-[0_36px_120px_rgba(0,0,0,0.42)]",
              easterEggUnlocked ? "reeyza-unlocked" : "",
            ].join(" ")}
          >
            {pulseKey > 0 && <div key={pulseKey} className="reeyza-pulse" aria-hidden />}

            <div className="relative z-20 flex h-11 items-center justify-between border-b border-border bg-bg/72 px-4 font-mono text-[11px] text-ink-muted backdrop-blur dark:bg-[#0b0d0a]/86">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(78,191,106,0.7)]" />
                <span className="text-ink">contactOS</span>
                <span className="hidden text-ink-muted sm:inline">workspace</span>
              </div>
              <div className="hidden items-center gap-4 sm:flex">
                <span>Made Reeyza</span>
                <span>Yogyakarta / Bali</span>
                {easterEggUnlocked && <span className="text-accent">reeyza mode</span>}
              </div>
              <span>{clock || "online"}</span>
            </div>

            <div className="relative z-10 grid grid-cols-4 gap-3 p-4 md:absolute md:left-6 md:top-20 md:grid-cols-1 md:p-0">
              {APPS.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => focusApp(app.id)}
                  className="group flex min-w-0 flex-col items-center gap-2 rounded-md border border-transparent p-2 text-center transition hover:border-accent/35 hover:bg-accent/8"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-md border border-border bg-bg/85 font-mono text-[12px] font-semibold text-accent shadow-sm transition group-hover:border-accent dark:bg-[#171b14]/92">
                    {app.icon}
                  </span>
                  <span className="w-full truncate font-mono text-[10px] leading-tight text-ink-muted">{app.label}</span>
                </button>
              ))}
            </div>

            <div className="relative z-10 flex flex-col gap-4 px-4 pb-24 md:block md:px-0 md:pb-0">
              {openApps.map((appId) => {
                const app = appById(appId)
                const isMinimized = minimizedApps.includes(appId)
                const isActive = activeApp === appId && !isMinimized

                if (isMinimized) return null

                return (
                  <div
                    key={appId}
                    onMouseDown={() => focusApp(appId)}
                    className={[
                      "relative overflow-hidden rounded-lg border bg-bg/94 shadow-[0_22px_70px_rgba(0,0,0,0.22)] backdrop-blur transition-[border-color,box-shadow,transform] duration-150",
                      "md:absolute dark:bg-[#141710]/95",
                      app.size,
                      isActive
                        ? "border-accent/55 shadow-[0_30px_90px_rgba(0,0,0,0.44)]"
                        : "border-border shadow-[0_18px_52px_rgba(0,0,0,0.24)]",
                    ].join(" ")}
                    style={isDesktop ? {
                      left: positions[appId].x,
                      top: positions[appId].y,
                      zIndex: zOrder[appId],
                    } : undefined}
                  >
                    <div
                      className="flex cursor-grab items-center gap-3 border-b border-border bg-surface/80 px-3 py-2.5 active:cursor-grabbing dark:bg-[#10130f]"
                      onMouseDown={(event) => startDrag(appId, event)}
                    >
                      <div className="flex gap-1.5" onMouseDown={(event) => event.stopPropagation()}>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation()
                            minimizeApp(appId)
                          }}
                          className="h-3 w-3 rounded-sm border border-border bg-bg hover:border-accent"
                          aria-label={`Minimize ${app.label}`}
                        />
                        <span className="h-3 w-3 rounded-sm border border-border bg-bg" />
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation()
                            closeApp(appId)
                          }}
                          className="h-3 w-3 rounded-sm border border-accent/50 bg-accent/20 hover:bg-accent/35"
                          aria-label={`Close ${app.label}`}
                        />
                      </div>
                      <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-ink-muted">
                        contactOS://{app.title.toLowerCase().replaceAll(" ", "-")}
                      </span>
                      <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-accent sm:inline">
                        {isActive ? "active" : "idle"}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6">
                      {renderApp(appId)}
                    </div>
                  </div>
                )
              })}
            </div>

            {easterEggUnlocked && (
              <div className="absolute bottom-[86px] right-5 z-30 hidden rounded-md border border-accent/35 bg-bg/82 px-3 py-2 font-mono text-[11px] text-accent shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur md:block">
                cross-domain mode: Elektro x ML x IoT
              </div>
            )}

            <div className="absolute bottom-4 left-1/2 z-40 flex max-w-[calc(100%-32px)] -translate-x-1/2 items-center gap-2 overflow-hidden rounded-lg border border-border bg-bg/86 px-3 py-2 shadow-[0_14px_45px_rgba(0,0,0,0.2)] backdrop-blur dark:bg-[#0b0d0a]/88">
              {APPS.map((app) => {
                const isOpen = openApps.includes(app.id)
                const isMinimized = minimizedApps.includes(app.id)
                const isActive = activeApp === app.id && isOpen && !isMinimized

                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => focusApp(app.id)}
                    title={app.label}
                    className={[
                      "relative grid h-10 w-10 shrink-0 place-items-center rounded-md border font-mono text-[11px] transition",
                      isActive
                        ? "border-accent bg-accent/12 text-accent"
                        : "border-border text-ink-muted hover:border-accent hover:text-accent",
                    ].join(" ")}
                  >
                    {app.icon}
                    {isOpen && (
                      <span
                        className={[
                          "absolute bottom-1 h-1 w-1 rounded-full",
                          isMinimized ? "bg-ink-muted" : "bg-accent",
                        ].join(" ")}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
