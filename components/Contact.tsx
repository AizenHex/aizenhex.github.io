import { SectionHeader } from "@/components/SectionHeader"
import { FadeIn } from "@/components/FadeIn"

const contactData = [
  { key: "name",     value: "Made Reeyza",            href: null },
  { key: "email",    value: "madereeyza@gmail.com",   href: "mailto:madereeyza@gmail.com" },
  { key: "github",   value: "@Eyazrim",               href: "https://github.com/Eyazrim" },
  { key: "linkedin", value: "Made Reeyza",            href: "https://linkedin.com/in/made-reeyza" },
  { key: "location", value: "Bali, Indonesia",        href: null },
]

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 md:py-36 border-t border-border"
    >
      <div className="max-w-[720px] mx-auto px-6 md:px-12">
        <FadeIn>
          <SectionHeader command="$ cat contact.txt" title="Get in Touch" />
        </FadeIn>

        <FadeIn delay={0.05}>
          <div
            className="font-mono text-[0.9375rem] leading-[1.8] bg-surface border border-border rounded-[4px] px-6 py-6 md:px-8"
            aria-label="Informasi kontak"
          >
            {contactData.map(({ key, value, href }) => (
              <div key={key} className="flex gap-4 md:gap-8">
                <span className="text-ink-muted w-20 shrink-0 text-right select-none tabular-nums" aria-hidden>
                  {key}:
                </span>
                {href ? (
                  <a
                    href={href}
                    className="text-accent link-underline hover:text-accent-hover transition-colors duration-150"
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-ink">{value}</span>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
