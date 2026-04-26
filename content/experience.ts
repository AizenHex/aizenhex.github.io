export type ExperienceEntry = {
  period: string
  role: string
  org: string
  location?: string
  note?: string
  kind: "work" | "edu"
}

export const experience: ExperienceEntry[] = [
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
