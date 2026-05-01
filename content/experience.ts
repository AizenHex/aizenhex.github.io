export type ExperienceTrackId = "education" | "competition" | "organization" | "work"

export type ExperienceItem = {
  period: string
  role: string
  org: string
  location?: string
}

export type ExperienceTrack = {
  id: ExperienceTrackId
  label: string
  items: ExperienceItem[]
}

export const experienceTracks: ExperienceTrack[] = [
  {
    id: "education",
    label: "Education",
    items: [
      {
        period: "2025 — now",
        role: "D-4 Teknologi Rekayasa Elektro",
        org: "Universitas Gadjah Mada",
        location: "Yogyakarta",
      },
      {
        period: "2022 — 2025",
        role: "SMA / IPA",
        org: "SMA Negeri 1 Amlapura",
        location: "Bali",
      },
    ],
  },
  {
    id: "competition",
    label: "Competition",
    items: [
      {
        period: "2026 — now",
        role: "PKM-KC — Desain Prototipe",
        org: "Vortexa",
        location: "SKM Jembatan",
      },
    ],
  },
  {
    id: "organization",
    label: "Organization",
    items: [
      {
        period: "2022 — 2026",
        role: "Member",
        org: "Gemra Bali",
      },
      {
        period: "2025 — now",
        role: "Member",
        org: "KOMATIK UGM",
      },
    ],
  },
  {
    id: "work",
    label: "Work",
    items: [
      {
        period: "next",
        role: "Belum ada pengalaman kerja formal",
        org: "Fokus saat ini: proyek, kompetisi, dan organisasi",
      },
    ],
  },
]
