import { SectionHeader } from "@/components/SectionHeader"
import { ProjectCard } from "@/components/ProjectCard"
import { FadeIn } from "@/components/FadeIn"

const projects = [
  {
    slug: "vortexa",
    title: "Vortexa",
    description:
      "Sistem monitoring turbin angin kecil berbasis ESP32 + ML untuk prediksi output daya harian di daerah pesisir.",
    category: "iot · ml",
    year: "2025",
    color: "#B8C4B8",
  },
  {
    slug: "plaswa2grow",
    title: "Plaswa2Grow",
    description:
      "Alat konversi limbah plastik menjadi nutrisi tumbuh tanaman — kontrol suhu PID + dashboard realtime.",
    category: "hardware",
    year: "2025",
    color: "#D4C5B0",
  },
  {
    slug: "nlp-for-health",
    title: "NLP for Health",
    description:
      "Model klasifikasi gejala pasien dari catatan bahasa Indonesia untuk mempercepat triage di puskesmas.",
    category: "ml · nlp",
    year: "2024",
    color: "#C4B8C4",
  },
  {
    slug: "template-project",
    title: "Template Project",
    description:
      "Deskripsi template proyek yang bisa digunakan sebagai referensi untuk proyek-proyek baru.",
    category: "template",
    year: "2024",
    color: "#C4B8C4",
  },
]

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-24 md:py-36 border-t border-border"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <FadeIn>
          <SectionHeader command="$ ls ~/projects" title="Selected Work" />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16">
          {projects.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.07}>
              <ProjectCard {...project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
