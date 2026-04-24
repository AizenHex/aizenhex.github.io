import { SectionHeader } from "@/components/SectionHeader"
import { FadeIn } from "@/components/FadeIn"

const stack = [
  ["Python", "PyTorch", "TensorFlow"],
  ["C/C++", "Arduino", "ESP32"],
  ["Next.js", "React", "TypeScript"],
  ["MATLAB", "Simulink", "LTspice"],
  ["Figma", "Git", "Linux"],
]

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 md:py-36 border-t border-border"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <FadeIn>
          <SectionHeader command="$ cat about.md" title="Tentang" />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-12 md:gap-20">
          {/* Bio — mono body */}
          <FadeIn delay={0.05}>
            <div className="space-y-5">
              <p className="font-mono text-[0.9375rem] text-ink leading-[1.75]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="font-mono text-[0.9375rem] text-ink leading-[1.75]">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <p className="font-mono text-[0.9375rem] text-ink leading-[1.75]">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque
                ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </FadeIn>

          {/* Stack */}
          <FadeIn delay={0.1}>
            <aside aria-label="Technology stack">
              <p className="font-mono text-[0.8125rem] text-accent mb-4 select-none font-medium" aria-hidden>
                $ stack --list
              </p>
              <div className="space-y-3">
                {stack.map((row, i) => (
                  <p
                    key={i}
                    className="font-mono text-[0.8125rem] text-ink-muted leading-relaxed"
                  >
                    {row.join(" · ")}
                  </p>
                ))}
              </div>
            </aside>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
