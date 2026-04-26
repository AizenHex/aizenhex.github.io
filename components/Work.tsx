import { SectionHeader } from "@/components/SectionHeader"
import { ProjectCard } from "@/components/ProjectCard"
import { FadeIn } from "@/components/FadeIn"
import { getAllWork } from "@/lib/content"

const defaultColors = [
  "#B8C4B8",
  "#D4C5B0",
  "#C4B8C4",
  "#C4C0B0",
]

export function Work() {
  const projects = getAllWork()

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-16 md:py-36 border-t border-border"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <FadeIn>
          <SectionHeader command="$ ls ~/projects" title="Selected Work" />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16">
          {projects.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.07}>
              <ProjectCard
                {...project}
                color={project.color ?? defaultColors[i % defaultColors.length]}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
