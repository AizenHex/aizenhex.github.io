import { SectionHeader } from "@/components/SectionHeader"
import { FadeIn } from "@/components/FadeIn"
import { experience } from "@/content/experience"

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-16 md:py-36 border-t border-border"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <FadeIn>
          <SectionHeader command="$ cat experience.log" title="Experience" />
        </FadeIn>

        <div className="max-w-[820px]">
          <ol className="relative">
            {experience.map((e, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <li
                  className="relative py-6 border-b border-border last:border-b-0 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-y-1 sm:gap-x-6 md:gap-x-10"
                >
                  {/* Period + kind tag */}
                  <div className="sm:min-w-[7.5rem] md:min-w-[10rem] flex sm:flex-col items-baseline sm:items-start gap-3 sm:gap-0 mb-2 sm:mb-0">
                    <p className="font-mono text-[0.8125rem] text-accent tabular-nums">
                      {e.period}
                    </p>
                    <p className="font-mono text-[0.75rem] text-ink-muted sm:mt-1 uppercase tracking-wider">
                      {e.kind === "work" ? "// work" : "// edu"}
                    </p>
                  </div>

                  {/* Role + org + note */}
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
