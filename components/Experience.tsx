import { SectionHeader } from "@/components/SectionHeader"
import { FadeIn } from "@/components/FadeIn"

type Entry = {
  period: string
  role: string
  org: string
  location?: string
  note?: string
  kind: "work" | "edu"
}

const entries: Entry[] = [
  {
    period: "2026 — now",
    role: "Research Assistant, IoT × ML Lab",
    org: "Universitas [Kampus]",
    location: "Bali",
    note: "Edge inference untuk sensor lingkungan; sistem monitoring turbin angin kecil.",
    kind: "work",
  },
  {
    period: "2025 — 2026",
    role: "Freelance — Embedded & ML",
    org: "Proyek mandiri",
    location: "Remote",
    note: "Integrasi ESP32, kontrol PID, dashboard realtime untuk klien UMKM.",
    kind: "work",
  },
  {
    period: "2024 — 2025",
    role: "Finalist, National Engineering Competition",
    org: "Plaswa2Grow",
    note: "Konversi limbah plastik jadi nutrisi tanaman — juara kategori hardware.",
    kind: "work",
  },
  {
    period: "2025 — now",
    role: "D-4 Teknologi Rekayasa Elektro",
    org: "Universitas Gadjah Mada",
    location: "Yogyakarta",
    note: "Minat: Power Distribution, Power Generation, Microcontroller.",
    kind: "edu",
  },
]

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-24 md:py-36 border-t border-border"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <FadeIn>
          <SectionHeader command="$ cat experience.log" title="Experience" />
        </FadeIn>

        <div className="max-w-[820px]">
          <ol className="relative">
            {entries.map((e, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <li
                  className="relative grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10 py-6 border-b border-border last:border-b-0"
                >
                  {/* Left column — period + kind tag */}
                  <div className="min-w-[7.5rem] md:min-w-[10rem]">
                    <p className="font-mono text-[0.8125rem] text-accent tabular-nums">
                      {e.period}
                    </p>
                    <p className="font-mono text-[0.75rem] text-ink-muted mt-1 uppercase tracking-wider">
                      {e.kind === "work" ? "// work" : "// edu"}
                    </p>
                  </div>

                  {/* Right column */}
                  <div>
                    <h3 className="font-serif text-[1.125rem] md:text-[1.25rem] text-ink leading-snug">
                      {e.role}
                    </h3>
                    <p className="font-mono text-[0.8125rem] text-ink-muted mt-1">
                      {e.org}
                      {e.location ? ` · ${e.location}` : ""}
                    </p>
                    {e.note && (
                      <p className="font-mono text-[0.875rem] text-ink leading-[1.75] mt-3 max-w-[58ch]">
                        {e.note}
                      </p>
                    )}
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
