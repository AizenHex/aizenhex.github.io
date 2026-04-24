import { SectionHeader } from "@/components/SectionHeader"
import { FadeIn } from "@/components/FadeIn"
import Link from "next/link"

export const posts = [
  {
    slug: "belajar-cross-domain",
    date: "2026-03",
    title:
      "Belajar cross-domain: kenapa Elektro × ML × IoT terasa seperti satu bahasa",
    excerpt:
      "Catatan pendek tentang melihat sensor, model, dan firmware sebagai bagian dari sistem yang sama — bukan tiga mata kuliah terpisah.",
    readTime: "4 min",
  },
  {
    slug: "esp32-dan-kesabaran",
    date: "2026-01",
    title: "ESP32, watchdog, dan kesabaran: tiga bulan debugging sensor angin",
    excerpt:
      "Tentang reset yang tidak bisa dijelaskan, power budget yang bocor, dan kenapa oscilloscope adalah teman terbaik engineer embedded.",
    readTime: "7 min",
  },
  {
    slug: "nlp-bahasa-indonesia",
    date: "2025-11",
    title: "NLP bahasa Indonesia itu susah — dan itu kenapa menarik",
    excerpt:
      "Catatan dari proyek klasifikasi gejala pasien: tokenisasi, slang daerah, dan kenapa dataset publik sering tidak cukup.",
    readTime: "6 min",
  },
]

export function Writing() {
  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="py-24 md:py-36 border-t border-border"
    >
      <div className="max-w-[780px] mx-auto px-6 md:px-12">
        <FadeIn>
          <SectionHeader command="$ cat ~/notes/*.md" title="Writing" />
        </FadeIn>

        <div className="space-y-0">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.06}>
              <Link
                href={`/writing/${post.slug}`}
                className="group block py-6 border-b border-border hover:border-accent-hover transition-colors duration-150"
              >
                <div className="flex items-baseline gap-6 mb-2">
                  <time
                    dateTime={post.date}
                    className="font-mono text-[0.8125rem] text-ink-muted shrink-0 w-16 tabular-nums"
                  >
                    {post.date}
                  </time>
                  <span className="font-serif text-[1.125rem] md:text-[1.1875rem] text-ink leading-snug group-hover:text-accent-hover transition-colors duration-150">
                    {post.title}
                  </span>
                </div>
                <div className="pl-[5.5rem] md:pl-[5.5rem]">
                  <p className="font-mono text-[0.8125rem] text-ink-muted leading-[1.75] max-w-[58ch]">
                    {post.excerpt}
                  </p>
                  <p className="font-mono text-[0.75rem] text-ink-muted mt-2 opacity-80">
                    {post.readTime} · read →
                  </p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="font-mono text-[0.8125rem] text-ink-muted mt-10">
            // more at{" "}
            <Link
              href="/writing"
              className="text-accent link-underline hover:text-accent-hover transition-colors duration-150"
            >
              /writing
            </Link>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
