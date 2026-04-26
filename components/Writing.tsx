import { SectionHeader } from "@/components/SectionHeader"
import { FadeIn } from "@/components/FadeIn"
import Link from "next/link"
import { getAllWriting } from "@/lib/content"

export function Writing() {
  const allPosts = getAllWriting()
  const posts = allPosts.slice(0, 3)

  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="py-16 md:py-36 border-t border-border"
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
                {/* Mobile: date above title; sm+: date inline with title */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-6 gap-1 mb-2">
                  <time
                    dateTime={post.date}
                    className="font-mono text-[0.75rem] sm:text-[0.8125rem] text-ink-muted shrink-0 sm:w-16 tabular-nums"
                  >
                    {post.date}
                  </time>
                  <span className="font-serif text-[1.125rem] md:text-[1.1875rem] text-ink leading-snug group-hover:text-accent-hover transition-colors duration-150">
                    {post.title}
                  </span>
                </div>
                <div className="sm:pl-[5.5rem]">
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
