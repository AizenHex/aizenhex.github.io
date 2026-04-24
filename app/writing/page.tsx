import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import { posts } from "@/components/Writing"

export const metadata = {
  title: "Writing — Made Reeyza",
  description: "Catatan tentang engineering, ML, dan hal-hal lain.",
}

export default function WritingIndexPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[72px]">
        <div className="max-w-[780px] mx-auto px-6 md:px-12 pt-20 pb-32">
          <Link
            href="/"
            className="font-mono text-[0.875rem] text-ink-muted link-underline hover:text-ink transition-colors duration-150 inline-block mb-12"
          >
            ← home
          </Link>

          <p className="font-mono text-[0.875rem] text-accent mb-4" aria-hidden>
            $ ls ~/notes/
          </p>

          <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-medium text-ink leading-tight tracking-[-0.02em] mb-6">
            Writing
          </h1>

          <p className="font-mono text-[0.9375rem] text-ink-muted leading-[1.75] mb-12 max-w-[58ch]">
            Catatan panjang dan pendek — tentang engineering, ML, dan
            perjalanan cross-domain.
          </p>

          <div className="space-y-0">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                className="group block py-8 border-b border-border hover:border-accent-hover transition-colors duration-150"
              >
                <div className="flex items-baseline gap-6 mb-3">
                  <time
                    dateTime={post.date}
                    className="font-mono text-[0.8125rem] text-ink-muted shrink-0 w-16 tabular-nums"
                  >
                    {post.date}
                  </time>
                  <h2 className="font-serif text-[1.25rem] md:text-[1.375rem] text-ink leading-snug group-hover:text-accent-hover transition-colors duration-150">
                    {post.title}
                  </h2>
                </div>
                <div className="pl-[5.5rem]">
                  <p className="font-mono text-[0.875rem] text-ink-muted leading-[1.75] max-w-[58ch]">
                    {post.excerpt}
                  </p>
                  <p className="font-mono text-[0.75rem] text-ink-muted mt-3 opacity-80">
                    {post.readTime} · read →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
